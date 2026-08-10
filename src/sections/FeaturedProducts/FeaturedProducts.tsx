/**
 * FeaturedProducts — Produtos em destaque (PRD §38–42)
 * Fundo rosa
 * Headline: CRIADOS / especialmente / PARA VOCÊ.
 * Grid de cards (5–7 destaques)
 * Hover: scale, tilt, sombra, CTA desloca
 * Mobile: swipe horizontal, scroll snap
 */
import { useRef } from 'react';
import { ProductCard } from '@/components/ProductCard/ProductCard';
import { SectionTitle } from '@/components/SectionTitle/SectionTitle';
import { FloatingDecoration } from '@/components/motion/FloatingDecoration';
import { products } from '@/data/products';
import { links } from '@/data/links';

export function FeaturedProducts() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const railRef = useRef<HTMLDivElement>(null);

  const featuredProducts = products.filter((p) => p.featured);

  return (
    <section
      ref={sectionRef}
      id="produtos"
      className="section relative bg-pink overflow-hidden"
      aria-labelledby="produtos-title"
    >
      <div className="absolute inset-0 pointer-events-none opacity-20" aria-hidden="true">
        <FloatingDecoration type="butterfly" className="absolute top-20 left-10" size={60} speed={0.8} amplitude={20} color="#ffffff" delay={0.1} />
        <FloatingDecoration type="flower" className="absolute top-1/3 right-10" size={50} speed={0.7} amplitude={15} color="#ffffff" delay={0.4} />
        <FloatingDecoration type="heart" className="absolute bottom-20 left-1/3" size={40} speed={1} amplitude={12} color="#ffffff" delay={0.7} />
        <FloatingDecoration type="star" className="absolute bottom-10 right-20" size={30} speed={0.9} amplitude={18} color="#ffffff" delay={1} />
        <FloatingDecoration type="curve" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" size={120} speed={0.5} amplitude={10} color="#ffffff" delay={1.2} />
      </div>

      <div className="container-prose relative z-10">
        <SectionTitle
          id="produtos-title"
          headline="CRIADOS"
          scriptLine="especialmente"
          headlineEnd="PARA VOCÊ."
          align="center"
          size="section"
        />

        <div className="mt-16">
          <div className="hidden lg:grid grid-cols-2 xl:grid-cols-3 gap-8">
            {featuredProducts.map((product, i) => (
              <ProductCard key={product.id} product={product} priority={i < 2} />
            ))}
          </div>

          <div
            ref={railRef}
            className="lg:hidden flex gap-4 overflow-x-auto no-scrollbar pb-4 snap-x snap-mandatory -mx-[clamp(1.25rem,5vw,3rem)] px-[clamp(1.25rem,5vw,3rem)]"
            role="region"
            aria-label="Produtos em destaque - deslize para ver mais"
          >
            {featuredProducts.map((product, i) => (
              <div key={product.id} className="flex-[0_0_85%] min-w-[280px] max-w-xs snap-center snap-always">
                <ProductCard product={product} priority={i < 2} />
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 text-center">
          <a
            href={links.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-sans font-medium text-white hover:text-pink-soft/80 transition-colors link-underline"
          >
            Veja mais no Instagram
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              <polyline points="15 3 21 3 21 9" />
              <line x1="10" y1="14" x2="21" y2="3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
