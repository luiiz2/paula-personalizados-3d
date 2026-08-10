/**
 * ImageReveal — Imagem com animação de reveal no scroll (PRD §30, 88)
 * Usa GSAP ScrollTrigger para clip-path / scale reveal
 * Respeita prefers-reduced-motion
 */
import { useRef, type ImgHTMLAttributes } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { cn } from '@/lib/utils';
import { prefersReducedMotion } from '@/lib/utils';

gsap.registerPlugin(ScrollTrigger);

interface ImageRevealProps extends ImgHTMLAttributes<HTMLImageElement> {
  /** Variante de animação */
  variant?: 'clip' | 'scale' | 'fade' | 'slide-up';
  /** Delay de entrada (ms) */
  delay?: number;
  /** Duração (s) */
  duration?: number;
  /** Trigger customizado (seletor ou elemento) */
  trigger?: string | Element;
  /** Quando iniciar (top bottom, center center, etc) */
  start?: string;
  /** Classe extra */
  className?: string;
}

export function ImageReveal({
  variant = 'clip',
  delay = 0,
  duration = 1.2,
  trigger,
  start = 'top 85%',
  className,
  src,
  alt,
  ...props
}: ImageRevealProps) {
  const imgRef = useRef<HTMLImageElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // GSAP context para cleanup automático (PRD §127)
  useGSAP(() => {
    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      const el = imgRef.current;
      const wrap = wrapperRef.current;
      if (!el || !wrap) return;

      // Estado inicial
      gsap.set(el, { opacity: 1 });

      let animation: gsap.core.Timeline | gsap.core.Tween;

      switch (variant) {
        case 'clip': {
          // Clip-path reveal: imagem "desenhada" da borda para centro
          gsap.set(wrap, { overflow: 'hidden' });
          gsap.set(el, { clipPath: 'inset(100% 0 0 0)' });
          animation = gsap.to(el, {
            clipPath: 'inset(0% 0 0 0)',
            duration,
            delay,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: trigger || wrap,
              start,
              toggleActions: 'play none none reverse',
            },
          });
          break;
        }
        case 'scale': {
          gsap.set(el, { scale: 1.15 });
          animation = gsap.to(el, {
            scale: 1,
            duration,
            delay,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: trigger || wrap,
              start,
              toggleActions: 'play none none reverse',
            },
          });
          break;
        }
        case 'fade': {
          gsap.set(el, { opacity: 0 });
          animation = gsap.to(el, {
            opacity: 1,
            duration,
            delay,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: trigger || wrap,
              start,
              toggleActions: 'play none none reverse',
            },
          });
          break;
        }
        case 'slide-up': {
          gsap.set(el, { y: 60, opacity: 0 });
          animation = gsap.to(el, {
            y: 0,
            opacity: 1,
            duration,
            delay,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: trigger || wrap,
              start,
              toggleActions: 'play none none reverse',
            },
          });
          break;
        }
      }

      return () => {
        animation?.kill();
      };
    }, wrapperRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={wrapperRef} className={cn('relative overflow-hidden', className)} aria-hidden={false}>
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        {...props}
      />
    </div>
  );
}
