/**
 * AnimatedButton — Botão com microinteração (PRD §105–106)
 * Seta desloca, background expande, feedback tátil.
 */
import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AnimatedButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  external?: boolean;
  arrowRight?: boolean;
}

export const AnimatedButton = forwardRef<HTMLButtonElement, AnimatedButtonProps>(
  (
    {
      children,
      variant = 'primary',
      size = 'md',
      external = false,
      arrowRight = true,
      className,
      disabled,
      ...props
    },
    ref
  ) => {
    const baseStyles = `
      inline-flex items-center justify-center gap-2
      font-sans font-semibold
      transition-all duration-300 ease-soft
      focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink focus-visible:ring-offset-2 focus-visible:ring-offset-cream
      disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:transform-none
      min-h-[44px] min-w-[44px]
    `;

    const variants = {
      primary: `
        bg-ink text-white
        hover:bg-ink/90 hover:shadow-[0_8px_30px_-8px_rgb(23_23_23/0.4)]
        hover:-translate-y-0.5
        active:scale-[0.98] active:translate-y-0
      `,
      secondary: `
        bg-pink text-ink
        hover:bg-pink/90 hover:shadow-[0_8px_30px_-8px_rgb(232_154_182/0.4)]
        hover:-translate-y-0.5
        active:scale-[0.98]
      `,
      outline: `
        border-2 border-ink text-ink bg-transparent
        hover:bg-ink hover:text-white hover:border-ink
        hover:-translate-y-0.5
        active:scale-[0.98]
      `,
      ghost: `
        text-ink bg-transparent
        hover:bg-pink-soft hover:text-ink
        hover:-translate-y-0.5
        active:scale-[0.98]
      `,
    };

    const sizes = {
      sm: 'px-4 py-2 text-sm rounded-lg',
      md: 'px-6 py-3 text-base rounded-xl',
      lg: 'px-8 py-4 text-lg rounded-xl',
    };

    const arrowStyles = `
      inline-flex shrink-0 transition-transform duration-300 ease-soft
      group-hover:translate-x-1 group-focus-visible:translate-x-1
    `;

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], 'group', className)}
        disabled={disabled}
        {...props}
      >
        <span className="relative z-10">{children}</span>
        {arrowRight && (
          <ArrowRight
            className={cn(arrowStyles, size === 'sm' && 'h-4 w-4', size === 'md' && 'h-5 w-5', size === 'lg' && 'h-6 w-6')}
            aria-hidden="true"
          />
        )}
        {external && (
          <svg
            className={cn(arrowStyles, 'h-4 w-4', size === 'sm' && 'h-3 w-3', size === 'lg' && 'h-5 w-5')}
            aria-hidden="true"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
            <polyline points="15 3 21 3 21 9" />
            <line x1="10" y1="14" x2="21" y2="3" />
          </svg>
        )}
      </button>
    );
  }
);

AnimatedButton.displayName = 'AnimatedButton';