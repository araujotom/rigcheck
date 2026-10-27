type IconProps = { className?: string; size?: number };

function base(size = 16) {
  return {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
}

export function CpuIcon({ className, size = 16 }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <rect x="6" y="6" width="12" height="12" rx="2" />
      <rect x="9.5" y="9.5" width="5" height="5" rx="1" />
      <path d="M9 3v3M15 3v3M9 18v3M15 18v3M3 9h3M3 15h3M18 9h3M18 15h3" />
    </svg>
  );
}

export function GpuIcon({ className, size = 16 }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <rect x="2.5" y="6" width="19" height="11" rx="2" />
      <circle cx="9" cy="11.5" r="2.6" />
      <path d="M14.5 9.5h4M14.5 13.5h4M6 17v3M18 17v3" />
    </svg>
  );
}

export function RamIcon({ className, size = 16 }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <rect x="2.5" y="7" width="19" height="8" rx="1.5" />
      <path d="M6 15v3M10 15v3M14 15v3M18 15v3M7 10.5h2M11 10.5h2M15 10.5h2" />
    </svg>
  );
}

export function DiskIcon({ className, size = 16 }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <path d="M3 13h18" />
      <circle cx="16.5" cy="16.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function SearchIcon({ className, size = 16 }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <circle cx="11" cy="11" r="6.5" />
      <path d="m20 20-3.5-3.5" />
    </svg>
  );
}

export function SparkIcon({ className, size = 16 }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <path d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9L12 3Z" />
      <path d="M19 15.5l.9 2.1L22 18.5l-2.1.9L19 21.5l-.9-2.1L16 18.5l2.1-.9.9-2.1Z" />
    </svg>
  );
}

export function ArrowIcon({ className, size = 16 }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

export function ArrowUpRightIcon({ className, size = 16 }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <path d="M7 17 17 7M8 7h9v9" />
    </svg>
  );
}

export function ChevronIcon({ className, size = 16 }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

export function AlertIcon({ className, size = 16 }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <path d="M12 3.5 21.5 20h-19L12 3.5Z" />
      <path d="M12 9.5v4.5M12 17.2v.1" />
    </svg>
  );
}

export function LinkIcon({ className, size = 16 }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <path d="M10 13.5a4 4 0 0 0 5.7 0l2.8-2.8a4 4 0 1 0-5.7-5.7L11.5 6.3" />
      <path d="M14 10.5a4 4 0 0 0-5.7 0L5.5 13.3a4 4 0 1 0 5.7 5.7l1.3-1.3" />
    </svg>
  );
}

export function TargetIcon({ className, size = 16 }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <circle cx="12" cy="12" r="8.5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="12" cy="12" r="0.6" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function MonitorIcon({ className, size = 16 }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <rect x="2.5" y="4" width="19" height="13" rx="2" />
      <path d="M9 21h6M12 17v4" />
    </svg>
  );
}

export function GlobeIcon({ className, size = 16 }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M3.5 12h17M12 3.5c2.4 2.3 3.6 5.2 3.6 8.5s-1.2 6.2-3.6 8.5c-2.4-2.3-3.6-5.2-3.6-8.5s1.2-6.2 3.6-8.5Z" />
    </svg>
  );
}
