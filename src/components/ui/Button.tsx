import { cn } from '@/lib/utils';
import { ButtonHTMLAttributes, forwardRef } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', loading, disabled, children, ...props }, ref) => {
    const base = 'inline-flex items-center justify-center font-semibold rounded-full transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2';

    const variants = {
      primary: 'bg-[#22c55e] hover:bg-[#16a34a] text-white shadow-sm hover:shadow-md focus:ring-[#22c55e]',
      secondary: 'bg-[#0c2461] hover:bg-[#1a3a8f] text-white shadow-sm focus:ring-[#0c2461]',
      outline: 'border-2 border-[#0c2461] text-[#0c2461] hover:bg-[#0c2461] hover:text-white focus:ring-[#0c2461]',
      ghost: 'text-slate-600 hover:bg-slate-100 focus:ring-slate-300',
      danger: 'bg-red-600 hover:bg-red-700 text-white focus:ring-red-600',
    };

    const sizes = {
      sm: 'px-4 py-2 text-sm gap-1.5',
      md: 'px-6 py-2.5 text-sm gap-2',
      lg: 'px-8 py-3.5 text-base gap-2',
    };

    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={cn(base, variants[variant], sizes[size], className)}
        {...props}
      >
        {loading && (
          <svg className="animate-spin w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
        )}
        {children}
      </button>
    );
  }
);
Button.displayName = 'Button';
export default Button;
