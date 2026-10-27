"use client";

import { useEffect, useMemo, useState } from "react";
import { HardwareSelect } from "@/components/hardware-select";
import {
  CpuIcon,
  DiskIcon,
  GpuIcon,
  LinkIcon,
  MonitorIcon,
  RamIcon,
  SparkIcon,
  TargetIcon,
} from "@/components/icons";
import { useLocale } from "@/components/locale-provider";
import { Segmented } from "@/components/segmented";
import { useSpecs } from "@/components/specs-provider";
import { CPUS, GPUS, GPU_BY_ID } from "@/lib/hardware";
import { detectGpu, detectRam } from "@/lib/detect";

export function SpecBuilder() {
  const { t } = useLocale();
  const { specs, resolved, update, selectCpu, selectGpu, reset, shareUrl } = useSpecs();
  const [message, setMessage] = useState<{ tone: "ok" | "warn"; text: string } | null>(null);
  const [copied, setCopied] = useState(false);

  const gpu = GPU_BY_ID.get(specs.gpuId);

  const cpuItems = useMemo(
    () =>
      CPUS.map((cpu) => ({
        id: cpu.id,
        name: cpu.name,
        group: cpu.brand,
        meta: `${cpu.cores}C / ${cpu.threads}T`,
        score: cpu.score,
      })),
    [],
  );

  const gpuItems = useMemo(
    () =>
      GPUS.map((item) => ({
        id: item.id,
        name: item.name,
        group:
          item.kind === "integrated"
            ? t.specs.integrated
            : t.specs.discrete,
        meta: `${item.brand} · ${item.vram} GB`,
        score: item.score,
      })),
    [t],
  );

  const handleDetect = () => {
    const detection = detectGpu();
    if (!detection) {
      setMessage({ tone: "warn", text: t.specs.detectBlocked });
      return;
    }
    if (detection.matched && detection.gpuId) {
      selectGpu(detection.gpuId);
      const ram = detectRam();
      if (ram) update({ ram });
      setMessage({
        tone: "ok",
        text: t.specs.detected(GPU_BY_ID.get(detection.gpuId)?.name ?? "your GPU"),
      });
    } else if (detection.integratedHint) {
      setMessage({
        tone: "warn",
        text: t.specs.detectedIntegrated(detection.renderer),
      });
    } else {
      setMessage({
        tone: "warn",
        text: t.specs.detectedUnknown(detection.renderer),
      });
    }
  };

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl || window.location.href);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      setMessage({ tone: "warn", text: t.specs.copyFailed });
    }
  };

  return (
    <section id="rig" className="container-x scroll-mt-24">
      <div className="relative rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.06] to-white/[0.015] shadow-[0_30px_80px_-40px_rgba(0,0,0,1)]">
        <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-3xl">
          <div className="absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-accent/70 to-transparent" />
          <div className="absolute -left-24 -top-24 h-56 w-56 rounded-full bg-accent/[0.07] blur-3xl" />
        </div>

        <div className="relative p-5 md:p-7">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-accent/70">
                {t.specs.step}
              </p>
              <h2 className="mt-1.5 text-xl font-semibold tracking-tight">
                {t.specs.title}
              </h2>
              <p className="mt-1 text-sm text-white/45">{t.specs.hint}</p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={handleDetect}
                className="group inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-3.5 py-2 text-xs font-medium text-white/80 transition hover:border-accent/50 hover:text-white"
              >
                <SparkIcon size={14} className="text-accent" />
                {t.specs.detect}
              </button>
              <button
                type="button"
                onClick={handleShare}
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-3.5 py-2 text-xs font-medium text-white/80 transition hover:border-white/35 hover:text-white"
              >
                <LinkIcon size={14} />
                {copied ? t.specs.copied : t.specs.share}
              </button>
            </div>
          </div>

          {message ? (
            <p
              className={`mt-4 rounded-lg border px-3 py-2 text-xs ${
                message.tone === "ok"
                  ? "border-accent/25 bg-accent/[0.07] text-accent/90"
                  : "border-amber-400/25 bg-amber-400/[0.07] text-amber-200/90"
              }`}
            >
              {message.text}
            </p>
          ) : null}

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <HardwareSelect
              label={t.specs.cpu}
              icon={<CpuIcon size={12} />}
              items={cpuItems}
              value={specs.cpuId}
              onChange={selectCpu}
              hint={t.specs.cpuHint(CPUS.length)}
            />
            <HardwareSelect
              label={t.specs.gpu}
              icon={<GpuIcon size={12} />}
              items={gpuItems}
              value={specs.gpuId}
              onChange={selectGpu}
              hint={t.specs.gpuHint(GPUS.length)}
            />
          </div>

          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div>
              <span className="mb-2 flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-white/40">
                <RamIcon size={12} /> {t.specs.ram}
              </span>
              <NumberField
                value={specs.ram}
                min={2}
                max={256}
                step={2}
                suffix="GB"
                onChange={(ram) => update({ ram })}
              />
            </div>
            <div>
              <span className="mb-2 flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-white/40">
                <GpuIcon size={12} /> {t.specs.vram}
                <span className="normal-case tracking-normal text-white/25">
                  {gpu?.kind === "integrated" ? t.specs.shared : t.specs.auto}
                </span>
              </span>
              <NumberField
                value={specs.vram}
                min={1}
                max={48}
                step={1}
                suffix="GB"
                onChange={(vram) => update({ vram })}
              />
            </div>
            <div>
              <span className="mb-2 flex items-center justify-between gap-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-white/40">
                <span className="flex items-center gap-1.5">
                  <DiskIcon size={12} /> {t.specs.storage}
                </span>
                <span className="text-white/60">{specs.storage} GB</span>
              </span>
              <input
                type="range"
                min={0}
                max={1000}
                step={10}
                value={specs.storage}
                onChange={(event) => update({ storage: Number(event.target.value) })}
                aria-label={t.specs.storageAria}
                className="mt-2 h-1.5 w-full cursor-pointer appearance-none rounded-full bg-white/10"
              />
              <div className="mt-1 flex justify-between font-mono text-[10px] text-white/25">
                <span>0</span>
                <span>500</span>
                <span>1 TB</span>
              </div>
            </div>
          </div>

          <div className="mt-5 grid gap-4 border-t border-white/[0.06] pt-5 sm:grid-cols-2">
            <div>
              <span className="mb-2 flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-white/40">
                <MonitorIcon size={12} /> {t.specs.maxRes}
              </span>
              <Segmented
                ariaLabel={t.specs.maxResAria}
                value={specs.maxResolution}
                onChange={(maxResolution) => update({ maxResolution })}
                options={[
                  { value: 1080 as const, label: "1080p" },
                  { value: 1440 as const, label: "1440p" },
                  { value: 2160 as const, label: "4K" },
                ]}
              />
            </div>
            <div>
              <span className="mb-2 flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-white/40">
                <TargetIcon size={12} /> {t.specs.targetFps}
              </span>
              <Segmented
                ariaLabel={t.specs.targetAria}
                value={specs.targetFps}
                onChange={(targetFps) => update({ targetFps })}
                options={[
                  { value: 30, label: "30" },
                  { value: 60, label: "60" },
                  { value: 120, label: "120" },
                  { value: 144, label: "144" },
                ]}
              />
            </div>
          </div>

          <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-white/[0.06] pt-4 text-[11px] text-white/35">
            <p>
              {resolved.gpuName} · {resolved.cpuName} · {specs.ram} GB RAM
            </p>
            <div className="flex items-center gap-4">
              <span>
                {gpu?.kind === "integrated" ? t.specs.integrated : t.specs.discrete}
              </span>
              <button
                type="button"
                onClick={reset}
                className="text-white/35 underline decoration-white/20 underline-offset-4 transition hover:text-white/70"
              >
                {t.specs.reset}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function NumberField({
  value,
  onChange,
  min,
  max,
  step,
  suffix,
}: {
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  step: number;
  suffix: string;
}) {
  const [draft, setDraft] = useState(String(value));

  useEffect(() => {
    setDraft(String(value));
  }, [value]);

  const clamp = (input: number) => Math.min(max, Math.max(min, Math.round(input)));

  return (
    <div className="relative">
      <input
        type="number"
        inputMode="numeric"
        min={min}
        max={max}
        step={step}
        value={draft}
        onChange={(event) => {
          setDraft(event.target.value);
          const next = Number(event.target.value);
          if (Number.isFinite(next) && next >= min && next <= max) onChange(next);
        }}
        onBlur={() => {
          const next = clamp(Number(draft) || value);
          setDraft(String(next));
          onChange(next);
        }}
        className="h-11 w-full rounded-xl border border-white/10 bg-white/[0.03] px-3 pr-12 text-sm text-white transition focus:border-accent/50 focus:outline-none focus:ring-1 focus:ring-accent/20"
      />
      <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 font-mono text-[10px] text-white/30">
        {suffix}
      </span>
    </div>
  );
}
