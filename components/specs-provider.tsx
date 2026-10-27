"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { CPUS, CPU_BY_ID, DEFAULT_SPECS, GPUS, GPU_BY_ID } from "@/lib/hardware";
import type { RatedSpecs, UserSpecs } from "@/lib/types";
import { useIsomorphicLayoutEffect } from "@/lib/use-isomorphic-layout-effect";

const STORAGE_KEY = "rigcheck.specs.v1";

export interface ResolvedSpecs extends RatedSpecs {
  cpuName: string;
  gpuName: string;
}

interface SpecsContextValue {
  specs: UserSpecs;
  resolved: ResolvedSpecs;
  hydrated: boolean;
  update: (patch: Partial<UserSpecs>) => void;
  selectCpu: (id: string) => void;
  selectGpu: (id: string) => void;
  reset: () => void;
  shareUrl: string;
}

const SpecsContext = createContext<SpecsContextValue | null>(null);

const RESOLUTIONS = [1080, 1440, 2160];
const TARGETS = [30, 60, 120, 144];

function parseFromUrl(): UserSpecs | null {
  if (typeof window === "undefined") return null;
  const params = new URLSearchParams(window.location.search);
  const cpuId = params.get("cpu");
  const gpuId = params.get("gpu");
  if (!cpuId || !gpuId) return null;
  if (!CPU_BY_ID.has(cpuId) || !GPU_BY_ID.has(gpuId)) return null;

  const gpu = GPU_BY_ID.get(gpuId)!;
  const num = (key: string, fallback: number) => {
    const value = Number(params.get(key));
    return Number.isFinite(value) && value > 0 ? value : fallback;
  };
  const resolution = Number(params.get("res"));
  const target = Number(params.get("fps"));
  const ram = Math.min(256, Math.max(2, num("ram", 16)));
  const defaultVram =
    gpu.kind === "integrated" ? sharedVram(ram, gpu.vram) : gpu.vram;

  return {
    cpuId,
    gpuId,
    ram,
    vram: Math.min(48, Math.max(1, num("vram", defaultVram))),
    storage: Math.min(4000, Math.max(0, num("storage", 250))),
    maxResolution: (RESOLUTIONS.includes(resolution)
      ? resolution
      : 1440) as UserSpecs["maxResolution"],
    targetFps: TARGETS.includes(target) ? target : 60,
  };
}

function parseFromStorage(): UserSpecs | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<UserSpecs>;
    if (!parsed.cpuId || !parsed.gpuId) return null;
    if (!CPU_BY_ID.has(parsed.cpuId) || !GPU_BY_ID.has(parsed.gpuId)) return null;
    return {
      ...DEFAULT_SPECS,
      ...parsed,
      maxResolution: (RESOLUTIONS.includes(Number(parsed.maxResolution))
        ? parsed.maxResolution
        : 1440) as UserSpecs["maxResolution"],
      targetFps: TARGETS.includes(Number(parsed.targetFps))
        ? Number(parsed.targetFps)
        : 60,
    };
  } catch {
    return null;
  }
}

function toQuery(specs: UserSpecs) {
  // Keep unrelated params (such as lang) intact when the rig changes.
  const params = new URLSearchParams(window.location.search);
  params.set("cpu", specs.cpuId);
  params.set("gpu", specs.gpuId);
  params.set("ram", String(specs.ram));
  params.set("vram", String(specs.vram));
  params.set("storage", String(specs.storage));
  params.set("res", String(specs.maxResolution));
  params.set("fps", String(specs.targetFps));
  return params.toString();
}

/**
 * Integrated GPUs have no dedicated VRAM: they borrow system memory. Give them
 * a quarter of RAM (2-8 GB) instead of the nominal 2-4 GB, which keeps the
 * engine from hard-failing games on a "VRAM" limit the chip does not really have.
 */
function sharedVram(ram: number, minimum: number) {
  return Math.min(8, Math.max(minimum, Math.floor(ram / 4)));
}

export function SpecsProvider({ children }: { children: React.ReactNode }) {
  const [specs, setSpecs] = useState<UserSpecs>(DEFAULT_SPECS);
  const [hydrated, setHydrated] = useState(false);
  const [shareUrl, setShareUrl] = useState("");

  // Read the URL/localStorage rig before paint so the default rig never flashes
  // on top of the user's own parts.
  useIsomorphicLayoutEffect(() => {
    const next = parseFromUrl() ?? parseFromStorage();
    if (next) setSpecs(next);
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(specs));
    } catch {
      /* private mode */
    }

    const query = toQuery(specs);
    // Only mirror the rig into the address bar on the home page. Game pages
    // keep a clean, canonical URL for search engines and shared links.
    if (window.location.pathname === "/") {
      window.history.replaceState(null, "", `/?${query}${window.location.hash}`);
    }
    setShareUrl(`${window.location.origin}/?${query}`);
  }, [specs, hydrated]);

  const update = useCallback((patch: Partial<UserSpecs>) => {
    setSpecs((current) => {
      const next = { ...current, ...patch };
      const gpu = GPU_BY_ID.get(next.gpuId);
      if (gpu?.kind === "integrated" && patch.ram !== undefined) {
        next.vram = sharedVram(next.ram, gpu.vram);
      }
      return next;
    });
  }, []);

  const selectCpu = useCallback((id: string) => {
    const cpu = CPU_BY_ID.get(id);
    if (!cpu) return;
    setSpecs((current) => {
      const currentGpu = GPU_BY_ID.get(current.gpuId);
      // APUs: follow the CPU when the visitor is on integrated graphics (or
      // still on the stock default). A deliberately chosen dGPU is kept.
      const followIgpu =
        cpu.igpu &&
        (currentGpu?.kind === "integrated" ||
          current.gpuId === DEFAULT_SPECS.gpuId);
      if (followIgpu) {
        const igpu = GPU_BY_ID.get(cpu.igpu!);
        if (igpu) {
          return {
            ...current,
            cpuId: id,
            gpuId: igpu.id,
            vram: sharedVram(current.ram, igpu.vram),
          };
        }
      }
      return { ...current, cpuId: id };
    });
  }, []);

  const selectGpu = useCallback((id: string) => {
    const gpu = GPU_BY_ID.get(id);
    if (!gpu) return;
    setSpecs((current) => ({
      ...current,
      gpuId: id,
      vram:
        gpu.kind === "integrated"
          ? sharedVram(current.ram, gpu.vram)
          : gpu.vram,
    }));
  }, []);

  const reset = useCallback(() => setSpecs(DEFAULT_SPECS), []);

  const resolved = useMemo<ResolvedSpecs>(() => {
    const cpu = CPU_BY_ID.get(specs.cpuId) ?? CPUS[0];
    const gpu = GPU_BY_ID.get(specs.gpuId) ?? GPUS[0];
    return {
      ...specs,
      cpuScore: cpu.score,
      gpuScore: gpu.score,
      cpuName: cpu.name,
      gpuName: gpu.name,
    };
  }, [specs]);

  const value = useMemo(
    () => ({ specs, resolved, hydrated, update, selectCpu, selectGpu, reset, shareUrl }),
    [specs, resolved, hydrated, update, selectCpu, selectGpu, reset, shareUrl],
  );

  return <SpecsContext.Provider value={value}>{children}</SpecsContext.Provider>;
}

export function useSpecs() {
  const context = useContext(SpecsContext);
  if (!context) throw new Error("useSpecs must be used inside SpecsProvider");
  return context;
}
