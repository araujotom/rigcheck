"use client";

export function Segmented<T extends string | number>({
  value,
  options,
  onChange,
  ariaLabel,
  className = "",
}: {
  value: T;
  options: { value: T; label: string; hint?: string }[];
  onChange: (value: T) => void;
  ariaLabel?: string;
  className?: string;
}) {
  return (
    <div
      role="group"
      aria-label={ariaLabel}
      className={`inline-flex w-full items-center gap-1 rounded-xl border border-white/10 bg-white/[0.02] p-1 ${className}`}
    >
      {options.map((option) => {
        const active = option.value === value;
        return (
          <button
            key={String(option.value)}
            type="button"
            aria-pressed={active}
            title={option.hint}
            onClick={() => onChange(option.value)}
            className={`flex-1 whitespace-nowrap rounded-lg px-2 py-1.5 text-center text-xs font-medium transition ${
              active
                ? "bg-accent text-ink-950 shadow-[0_2px_12px_rgba(201,247,90,0.25)]"
                : "text-white/55 hover:bg-white/[0.06] hover:text-white"
            }`}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
