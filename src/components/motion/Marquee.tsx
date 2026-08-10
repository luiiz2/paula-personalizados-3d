/**
 * Marquee — Faixa contínua entre seções (PRD §67, 108)
 * Texto: PERSONALIZADO • IMPRESSÃO 3D • FEITO À MÃO • ÚNICO • CRIADO PARA VOCÊ • PAULA PERSONALIZADOS 3D •
 * Movimento lento e contínuo
 */
const marqueeItems = [
  'PERSONALIZADO',
  'IMPRESSÃO 3D',
  'FEITO À MÃO',
  'ÚNICO',
  'CRIADO PARA VOCÊ',
  'PAULA PERSONALIZADOS 3D',
];

export function Marquee({ className }: { className?: string }) {
  return (
    <div
      className={`relative overflow-hidden bg-ink py-4 ${className || ''}`}
      aria-hidden="true"
      role="presentation"
    >
      <div
        className="animate-marquee flex w-max whitespace-nowrap will-change-transform"
      >
        {[0, 1].map((copy) => (
          <div key={copy} className="flex shrink-0 items-center gap-8 pr-8">
            {marqueeItems.map((word) => (
              <span key={`${copy}-${word}`} className="font-sans font-semibold text-white/60 uppercase tracking-wider text-sm md:text-base">
                {word} <span className="ml-8 text-white/30">•</span>
              </span>
            ))}
          </div>
        ))}
      </div>

      <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-ink via-ink/0 to-ink" />
    </div>
  );
}
