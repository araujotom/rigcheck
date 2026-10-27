"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import { ChevronIcon, SearchIcon } from "@/components/icons";
import { useLocale } from "@/components/locale-provider";

export interface HardwareItem {
  id: string;
  name: string;
  group: string;
  meta?: string;
  score: number;
}

export function HardwareSelect({
  label,
  icon,
  items,
  value,
  onChange,
  hint,
}: {
  label: string;
  icon?: React.ReactNode;
  items: HardwareItem[];
  value: string;
  onChange: (id: string) => void;
  hint?: string;
}) {
  const { t } = useLocale();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const wrapRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const listId = useId();

  const selected = items.find((item) => item.id === value);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const matches = q
      ? items.filter((item) =>
          `${item.name} ${item.group} ${item.meta ?? ""}`.toLowerCase().includes(q),
        )
      : items.slice();
    return matches.sort((a, b) => b.score - a.score);
  }, [items, query]);

  const groups = useMemo(() => {
    const map = new Map<string, HardwareItem[]>();
    for (const item of filtered) {
      const list = map.get(item.group) ?? [];
      list.push(item);
      map.set(item.group, list);
    }
    return Array.from(map.entries());
  }, [filtered]);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: MouseEvent) => {
      if (!wrapRef.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onPointerDown);
    return () => document.removeEventListener("mousedown", onPointerDown);
  }, [open]);

  useEffect(() => {
    if (open) {
      setQuery("");
      setActive(0);
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const node = listRef.current?.querySelector<HTMLElement>(
      `[data-index="${active}"]`,
    );
    node?.scrollIntoView({ block: "nearest" });
  }, [active, open]);

  const choose = (id: string) => {
    onChange(id);
    setOpen(false);
  };

  const onKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActive((i) => Math.min(i + 1, filtered.length - 1));
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActive((i) => Math.max(i - 1, 0));
    } else if (event.key === "Enter") {
      event.preventDefault();
      const item = filtered[active];
      if (item) choose(item.id);
    } else if (event.key === "Escape") {
      event.preventDefault();
      setOpen(false);
      requestAnimationFrame(() => triggerRef.current?.focus());
    } else if (event.key === "Tab") {
      setOpen(false);
    }
  };

  return (
    <div ref={wrapRef} className="relative">
      <span className="mb-2 flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-white/40">
        {icon}
        {label}
      </span>

      <button
        type="button"
        ref={triggerRef}
        onClick={() => setOpen((current) => !current)}
        onKeyDown={(event) => {
          if (event.key === "ArrowDown" || event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            setOpen(true);
          }
        }}
        aria-label={`${label}: ${selected?.name ?? t.common.select}`}
        aria-haspopup="listbox"
        aria-expanded={open}
        className={`flex h-11 w-full items-center justify-between gap-2 rounded-xl border bg-white/[0.03] px-3 text-left transition hover:border-white/20 hover:bg-white/[0.05] ${
          open ? "border-accent/50 ring-1 ring-accent/20" : "border-white/10"
        }`}
      >
        <span className="flex min-w-0 items-center gap-2">
          <span className="truncate text-sm text-white">
            {selected?.name ?? t.common.select}
          </span>
          {selected?.meta ? (
            <span className="hidden shrink-0 rounded border border-white/10 px-1.5 py-0.5 font-mono text-[10px] text-white/45 sm:inline">
              {selected.meta}
            </span>
          ) : null}
        </span>
        <ChevronIcon
          size={15}
          className={`shrink-0 text-white/40 transition ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open ? (
        <div className="absolute left-0 right-0 z-50 mt-2 overflow-hidden rounded-xl border border-white/10 bg-[#0d1015] shadow-[0_24px_60px_-12px_rgba(0,0,0,0.9)]">
          <div className="flex items-center gap-2 border-b border-white/[0.06] px-3">
            <SearchIcon size={15} className="text-white/35" />
            <input
              ref={inputRef}
              value={query}
              onChange={(event) => {
                setQuery(event.target.value);
                setActive(0);
              }}
              onKeyDown={onKeyDown}
              type="search"
              aria-label={t.specs.searchLabel(label)}
              aria-controls={listId}
              aria-autocomplete="list"
              placeholder={t.specs.searchModel}
              className="h-10 w-full bg-transparent text-sm text-white placeholder:text-white/30 focus:outline-none"
            />
          </div>

          <div
            ref={listRef}
            id={listId}
            role="listbox"
            aria-label={t.specs.optionsLabel(label)}
            className="max-h-64 overflow-y-auto overscroll-contain py-1"
          >
            {filtered.length === 0 ? (
              <p className="px-3 py-6 text-center text-xs text-white/40">
                {t.specs.noMatch}
              </p>
            ) : (
              groups.map(([group, groupItems]) => (
                <div key={group} role="group" aria-label={group}>
                  <p
                    aria-hidden
                    className="sticky top-0 z-10 bg-[#0d1015] px-3 pb-1 pt-2 font-mono text-[10px] uppercase tracking-widest text-white/30"
                  >
                    {group}
                  </p>
                  {groupItems.map((item) => {
                    const index = filtered.indexOf(item);
                    const isActive = index === active;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        role="option"
                        aria-selected={item.id === value}
                        data-index={index}
                        onMouseEnter={() => setActive(index)}
                        onClick={() => choose(item.id)}
                        className={`flex w-full items-center justify-between gap-3 px-3 py-2 text-left text-sm transition ${
                          isActive ? "bg-white/[0.07] text-white" : "text-white/70"
                        }`}
                      >
                        <span className="truncate">{item.name}</span>
                        <span className="flex shrink-0 items-center gap-2">
                          {item.meta ? (
                            <span className="font-mono text-[10px] text-white/35">
                              {item.meta}
                            </span>
                          ) : null}
                          <span className="w-9 rounded bg-white/[0.06] py-0.5 text-center font-mono text-[10px] text-white/45">
                            {item.score}
                          </span>
                        </span>
                      </button>
                    );
                  })}
                </div>
              ))
            )}
          </div>

          {hint ? (
            <p className="border-t border-white/[0.06] px-3 py-2 text-[11px] text-white/35">
              {hint}
            </p>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
