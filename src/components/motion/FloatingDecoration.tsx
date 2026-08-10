/**
 * FloatingDecoration — Elementos decorativos flutuantes (PRD §28–29, 79)
 * Borboleta, flor, coração, estrelas, curvas
 * Parallax em velocidades diferentes
 * Respeita prefers-reduced-motion
 */
import { type CSSProperties, type SVGProps } from 'react';
import { cn } from '@/lib/utils';

interface FloatingDecorationProps extends SVGProps<SVGSVGElement> {
  /** Tipo de decoração */
  type?: 'butterfly' | 'flower' | 'heart' | 'star' | 'curve' | 'blob';
  /** Velocidade do float (1 = normal, 0.5 = lento, 2 = rápido) */
  speed?: number;
  /** Amplitude do float Y (px) */
  amplitude?: number;
  /** Delay inicial (s) */
  delay?: number;
  /** Parallax no scroll (0–1) */
  parallax?: number;
  /** Tamanho */
  size?: number;
  /** Cor override */
  color?: string;
  /** Rotação inicial */
  rotation?: number;
  /** Classe extra */
  className?: string;
}

const icons = {
  butterfly: (
    <g transform="translate(0, -12)">
      <path
        d="M0 0 C-8 -20 -20 -20 -20 0 C-20 15 -8 25 0 12 C8 25 20 15 20 0 C20 -20 8 -20 0 0 Z"
        fill="currentColor"
        opacity="0.9"
      />
      <path
        d="M0 0 C-5 -12 -12 -12 -12 0 C-12 9 -5 14 0 8 C5 14 12 9 12 0 C12 -12 5 -12 0 0 Z"
        fill="currentColor"
        opacity="0.6"
      />
      {/* Antenas */}
      <path d="M-2 -12 Q-8 -20 -6 -24" stroke="currentColor" strokeWidth="1.5" fill="none" />
      <path d="M2 -12 Q8 -20 6 -24" stroke="currentColor" strokeWidth="1.5" fill="none" />
    </g>
  ),
  flower: (
    <g transform="translate(0, -12)">
      <circle cx="0" cy="0" r="8" fill="currentColor" opacity="0.3" />
      {[0, 72, 144, 216, 288].map((deg) => (
        <ellipse
          key={deg}
          cx="0"
          cy="-12"
          rx="6"
          ry="12"
          fill="currentColor"
          opacity="0.8"
          transform={`rotate(${deg} 0 0)`}
        />
      ))}
      <circle cx="0" cy="0" r="4" fill="currentColor" />
    </g>
  ),
  heart: <path d="M0 6 C-6 0 -12 0 -12 6 C-12 12 0 18 0 18 C0 18 12 12 12 6 C12 0 6 0 0 6 Z" fill="currentColor" />,
  star: (
    <path
      d="M0 -12 L2 -4 L10 -4 L4 1 L6 10 L0 6 L-6 10 L-4 1 L-10 -4 L-2 -4 Z"
      fill="currentColor"
    />
  ),
  curve: (
    <path
      d="M-20 0 Q0 -20 20 0"
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
      strokeLinecap="round"
      opacity="0.5"
    />
  ),
  blob: (
    <path
      d="M0 -15 Q15 -5 15 10 Q15 20 0 25 Q-15 20 -15 10 Q-15 -5 0 -15"
      fill="currentColor"
      opacity="0.15"
    />
  ),
};

export function FloatingDecoration({
  type = 'butterfly',
  speed = 1,
  amplitude = 20,
  delay = 0,
  parallax = 0,
  size = 40,
  color,
  rotation = 0,
  className,
  style,
  ...props
}: FloatingDecorationProps) {
  const Icon = icons[type] || icons.butterfly;
  const animationStyle = {
    ...style,
    '--float-distance': `${amplitude + parallax * 20}px`,
    '--float-rotation': `${rotation}deg`,
    animationDuration: speed > 0 ? `${Math.max(4, 7 / speed)}s` : undefined,
    animationDelay: `${delay}s`,
  } as CSSProperties;

  return (
    <svg
      width={size}
      height={size}
      viewBox="-24 -24 48 48"
      fill={color || 'currentColor'}
      className={cn(
        'pointer-events-none select-none transform-gpu',
        speed > 0 && 'animate-float',
        className,
      )}
      style={animationStyle}
      aria-hidden="true"
      {...props}
    >
      {Icon}
    </svg>
  );
}
