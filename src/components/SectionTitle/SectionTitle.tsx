/**
 * SectionTitle — Título de seção editorial (PRD §22, 33, 38, 43, 47, 52, 55, 59, 62, 68, 71, 77, 110–120)
 * Suporta: headline editorial + sublinha manuscrita + eyebrow + descrição
 */
import { type ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface SectionTitleProps {
  /** ID para acessibilidade/âncora */
  id?: string;
  /** Texto pequeno acima do título (ex: categoria) */
  eyebrow?: string;
  /** Headline principal — tipografia editorial gigante */
  headline: string | ReactNode;
  /** Parte manuscrita (rosa) — ex: "sua história" */
  scriptLine?: string;
  /** Linha final editorial — ex: "EM 3D." */
  headlineEnd?: string;
  /** Descrição/subtexto abaixo */
  description?: string;
  /** Alinhamento */
  align?: 'left' | 'center' | 'right';
  /** Classes extras */
  className?: string;
  /** Tamanho do headline */
  size?: 'hero' | 'section' | 'medium';
}

export function SectionTitle({
  id,
  eyebrow,
  headline,
  scriptLine,
  headlineEnd,
  description,
  align = 'left',
  className,
  size = 'section',
}: SectionTitleProps) {
  const alignClasses = { left: 'text-left', center: 'text-center', right: 'text-right' };
  const sizeClasses = {
    hero: 'display-hero',
    section: 'display-section',
    medium: 'text-4xl md:text-5xl lg:text-6xl font-editorial font-black tracking-tight leading-[0.9]',
  };

  return (
    <header className={cn('relative z-10', alignClasses[align], className)}>
      {eyebrow && (
        <p className={cn('eyebrow mb-4', align === 'center' && 'mx-auto', align === 'right' && 'mr-0')}>
          {eyebrow}
        </p>
      )}
      <div className="flex flex-col gap-1">
        <h2 id={id} className={cn('font-editorial font-black tracking-tight', sizeClasses[size])}>
          {headline}
        </h2>
        {scriptLine && (
          <p className={cn('font-script text-pink display-script', align === 'center' && 'mx-auto')}>
            {scriptLine}
          </p>
        )}
        {headlineEnd && (
          <p className={cn('font-editorial font-black tracking-tight', sizeClasses[size])}>
            {headlineEnd}
          </p>
        )}
      </div>
      {description && (
        <p className={cn('mt-6 text-lg md:text-xl text-mute max-w-2xl', align === 'center' && 'mx-auto', align === 'right' && 'ml-auto')}>
          {description}
        </p>
      )}
    </header>
  );
}
