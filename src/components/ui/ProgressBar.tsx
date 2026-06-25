interface ProgressBarProps {
  value: number; // 0-100
  className?: string;
  showLabel?: boolean;
}

export default function ProgressBar({ value, className = '', showLabel = false }: ProgressBarProps) {
  const clamped = Math.min(Math.max(value, 0), 100);
  const color = clamped >= 100 ? '#22c55e' : clamped >= 70 ? '#3b82f6' : '#22c55e';

  return (
    <div className={`relative ${className}`}>
      <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full progress-bar-fill transition-all duration-1000"
          style={{ width: `${clamped}%`, backgroundColor: color }}
        />
      </div>
      {showLabel && (
        <span className="absolute right-0 -top-5 text-xs font-semibold text-slate-600">
          {clamped}%
        </span>
      )}
    </div>
  );
}
