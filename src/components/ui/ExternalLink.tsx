/**
 * ExternalLink — Link externo seguro (PRD §76, 122)
 * target="_blank" + rel="noopener noreferrer"
 * Underline animado (PRD §105)
 */
import { type AnchorHTMLAttributes, forwardRef } from 'react';
import { cn, openExternal } from '@/lib/utils';
import { ExternalLink as ExternalLinkIcon } from 'lucide-react';

interface ExternalLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  children: React.ReactNode;
  href: string;
  showIcon?: boolean;
  className?: string;
}

export const ExternalLink = forwardRef<HTMLAnchorElement, ExternalLinkProps>(
  ({ children, href, showIcon = true, className, onClick, ...props }, ref) => {
    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
      if (!href) {
        e.preventDefault();
        return;
      }
      // openExternal já aplica _blank, noopener, noreferrer
      openExternal(href);
      onClick?.(e);
    };

    return (
      <a
        ref={ref}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleClick}
        className={cn(
          'inline-flex items-center gap-1.5 link-underline font-sans font-medium transition-colors duration-200',
          'text-ink hover:text-pink',
          className
        )}
        {...props}
      >
        {children}
        {showIcon && <ExternalLinkIcon className="h-4 w-4 shrink-0 opacity-70" aria-hidden="true" />}
      </a>
    );
  }
);

ExternalLink.displayName = 'ExternalLink';