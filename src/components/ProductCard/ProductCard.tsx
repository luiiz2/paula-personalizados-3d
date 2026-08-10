/**
 * ProductCard — Card de produto reutilizável (PRD §40–42, 124–125)
 * Recebe dados via props. Hover: scale, translateY, tilt, sombra, CTA desloca.
 * Mobile: swipe horizontal, scroll snap, sem tilt.
 */
import { useRef, type MouseEvent } from 'react';
import { Image } from '@/components/ui/Image';
import { AnimatedButton } from '@/components/ui/AnimatedButton';
import { ExternalLink } from '@/components/ui/ExternalLink';
import { type Product } from '@/data/products';
import { cn } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
  priority?: boolean;
  className?: string;
}

export function ProductCard({ product, priority = false, className }: ProductCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  // Tilt effect apenas desktop (PRD §42)
  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (window.innerWidth < 1024) return;
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * 4; // max 4deg
    const rotateY = ((x - centerX) / centerX) * -4;
    if (imageRef.current) {
      imageRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    }
  };

  const handleMouseLeave = () => {
    if (imageRef.current) {
      imageRef.current.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
    }
  };

  const hasShopee = product.shopeeUrl && product.shopeeUrl.trim().length > 0;
  const hasMercadoLivre = product.mercadoLivreUrl && product.mercadoLivreUrl.trim().length > 0;
  const hasWhatsApp = product.whatsappUrl && product.whatsappUrl.trim().length > 0;
  const isCustom = hasWhatsApp && !hasShopee && !hasMercadoLivre;
  const isMarketplace = hasShopee || hasMercadoLivre;

  return (
    <article
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={cn(
        'group relative bg-white rounded-2xl overflow-hidden',
        'transition-all duration-500 ease-soft',
        'hover:shadow-[0_20px_50px_-12px_rgb(23_23_23/0.15)]',
        'hover:-translate-y-1.5',
        'hover:scale-[1.02]',
        'focus-within:ring-2 focus-within:ring-pink focus-within:ring-offset-2',
        'touch-action-pan-x', // permite swipe horizontal
        className
      )}
    >
      {/* Imagem do produto */}
      <div
        ref={imageRef}
        className={cn(
          'relative aspect-[3/4] overflow-hidden',
          'transition-transform duration-500 ease-soft',
          'group-hover:scale-[1.03]',
          priority && 'will-change-transform'
        )}
        style={{ willChange: 'transform' }}
      >
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-700 ease-soft group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          priority={priority}
        />

        {/* Badge categoria */}
        <div className="absolute bottom-4 left-4 right-4 flex flex-wrap gap-2">
          <span className="px-3 py-1 text-xs font-sans font-semibold text-ink/80 bg-white/90 backdrop-blur rounded-full border border-ink/10">
            {product.category}
          </span>
        </div>
      </div>

      {/* Conteúdo */}
      <div className="p-6 space-y-4">
        <h3 className="font-editorial font-bold text-xl md:text-2xl tracking-tight leading-tight text-ink">
          {product.name}
        </h3>

        {product.description && (
          <p className="text-mute text-base leading-relaxed line-clamp-2">
            {product.description}
          </p>
        )}

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          {isCustom && (
            <AnimatedButton
              variant="primary"
              size="md"
              className="w-full sm:w-auto flex-1"
              onClick={() => window.open(product.whatsappUrl!, '_blank', 'noopener,noreferrer')}
            >
              Quero personalizar
            </AnimatedButton>
          )}

          {isMarketplace && (
            <>
              {hasShopee && (
                <ExternalLink
                  href={product.shopeeUrl!}
                  className="w-full sm:w-auto flex-1 text-center"
                >
                  Comprar na Shopee
                </ExternalLink>
              )}
              {hasMercadoLivre && (
                <ExternalLink
                  href={product.mercadoLivreUrl!}
                  className="w-full sm:w-auto flex-1 text-center"
                >
                  Ver no Mercado Livre
                </ExternalLink>
              )}
            </>
          )}

          {!isCustom && !isMarketplace && hasWhatsApp && (
            <AnimatedButton
              variant="outline"
              size="md"
              className="w-full sm:w-auto flex-1"
              onClick={() => window.open(product.whatsappUrl!, '_blank', 'noopener,noreferrer')}
            >
              Fale conosco
            </AnimatedButton>
          )}
        </div>
      </div>

      {/* Overlay sutil no hover */}
      <div
        className="absolute inset-0 bg-gradient-to-t from-ink/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        aria-hidden="true"
      />
    </article>
  );
}