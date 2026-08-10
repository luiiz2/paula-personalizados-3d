/**
 * Image — Wrapper otimizado para imagens (PRD §101)
 * WebP/AVIF via Vite, lazy loading, srcset, width/height definidos
 */
import { type ImgHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface ImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  fill?: boolean;
  priority?: boolean;
  sizes?: string;
  className?: string;
}

export const Image = forwardRef<HTMLImageElement, ImageProps>(
  ({ src, alt, fill = false, priority = false, sizes, className, ...props }, ref) => {
    // Se fill, usa object-fit cover e position absolute
    const fillStyles = fill
      ? 'absolute inset-0 w-full h-full object-cover'
      : '';

    return (
      <img
        ref={ref}
        src={src}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        decoding={priority ? 'sync' : 'async'}
        fetchPriority={priority ? 'high' : 'auto'}
        sizes={sizes}
        className={cn(fillStyles, className)}
        {...props}
      />
    );
  }
);

Image.displayName = 'Image';