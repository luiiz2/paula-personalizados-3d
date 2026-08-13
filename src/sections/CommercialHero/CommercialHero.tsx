import { useRef, useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { CommercialImage } from '@/components/ui/CommercialImage';
import { ExternalLink } from '@/components/ui/ExternalLink';
import { heroAssets } from '@/data/commercial';
import { hasLink, links } from '@/data/links';
import { usePointerParallax } from '@/hooks/usePointerParallax';
import { prefersReducedMotion } from '@/lib/utils';
import { MessageCircle, ShoppingBag, Store, Mail } from 'lucide-react';
import { InstagramIcon } from '@/components/ui/CustomIcons';

export function CommercialHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const visualRef = usePointerParallax<HTMLDivElement>();
  const [isSpinning, setIsSpinning] = useState(true);

  // Dispara a animação 3D ao carregar a página e encerra após 4.2s
  useEffect(() => {
    if (!isSpinning) return;
    const timer = setTimeout(() => setIsSpinning(false), 4200);
    return () => clearTimeout(timer);
  }, [isSpinning]);

  // Ao clicar na logo, dispara novamente o giro e brilho 3D suave
  const handleLogoClick = () => {
    setIsSpinning(false);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setIsSpinning(true);
      });
    });
  };

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;

      const timeline = gsap.timeline({ defaults: { ease: 'power2.out' } });
      timeline
        .from('[data-hero-logo]', {
          scale: 3.0,
          opacity: 0,
          duration: 3.2,
          transformOrigin: '50% 50%',
          ease: 'power2.out',
        })
        .from(
          '[data-hero-line]',
          {
            y: 36,
            opacity: 0,
            duration: 1.2,
            stagger: 0.12,
          },
          '-=1.8',
        )
        .from(
          '[data-hero-support]',
          { y: 18, opacity: 0, duration: 0.65 },
          '-=0.4',
        )
        .from(
          '[data-hero-media]',
          { y: 28, opacity: 0, scale: 0.97, duration: 0.9, stagger: 0.12 },
          '-=0.6',
        );

      return () => timeline.kill();
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="commercial-hero commercial-hero--topographic flex flex-col items-center justify-center text-center py-6 px-4 relative overflow-hidden"
      aria-labelledby="commercial-hero-title"
    >
      {/* 3D Glowing Logo Showcase (PNG oficial) */}
      <div className="logo-3d-stage my-1" data-hero-logo>
        <button
          type="button"
          onClick={handleLogoClick}
          className={`logo-3d-disc ${isSpinning ? 'logo-3d-disc--spin' : ''}`}
          aria-label="Logo Paula Personalizados 3D — Clique para ver efeito 3D"
        >
          <img
            src="/assets/logo-paula-personalizados-3d.png"
            alt=""
            role="presentation"
            aria-hidden="true"
            className="w-full h-full object-contain"
          />
        </button>
      </div>

      {/* Nav Links Bar under logo */}
      <nav
        className="hero-nav-bar"
        aria-label="Navegação do topo"
        data-hero-support
      >
        <a href="#hero" className="hero-nav-link hero-nav-link--active">
          Início
        </a>
        <span className="hero-nav-divider" aria-hidden="true">|</span>
        <a href="#sobre" className="hero-nav-link">
          Sobre
        </a>
        <span className="hero-nav-divider" aria-hidden="true">|</span>
        <a href="#categorias" className="hero-nav-link">
          Produtos
        </a>
        <span className="hero-nav-divider" aria-hidden="true">|</span>
        <a href="#como-funciona" className="hero-nav-link">
          Como Funciona
        </a>
        <span className="hero-nav-divider" aria-hidden="true">|</span>
        <a href="#sobre" className="hero-nav-link">
          Galeria
        </a>
        <span className="hero-nav-divider" aria-hidden="true">|</span>
        <a href="#canais" className="hero-nav-link">
          Contato
        </a>
      </nav>

      {/* Commercial Channel Pill Buttons */}
      <div className="channel-pill-row w-full" data-hero-support>
        {hasLink('shopee') && (
          <ExternalLink href={links.shopee} showIcon={false} className="channel-pill">
            <ShoppingBag className="channel-pill__icon" />
            <span>Shopee</span>
          </ExternalLink>
        )}

        {hasLink('mercadoLivre') && (
          <ExternalLink href={links.mercadoLivre} showIcon={false} className="channel-pill">
            <Store className="channel-pill__icon" />
            <span>Mercado Livre</span>
          </ExternalLink>
        )}

        {hasLink('instagram') && (
          <ExternalLink href={links.instagram} showIcon={false} className="channel-pill">
            <InstagramIcon className="channel-pill__icon" />
            <span>Instagram</span>
          </ExternalLink>
        )}

        {hasLink('whatsapp') && (
          <ExternalLink href={links.whatsapp} showIcon={false} className="channel-pill">
            <MessageCircle className="channel-pill__icon" />
            <span>WhatsApp</span>
          </ExternalLink>
        )}

        <a href="#sobre" className="channel-pill">
          <Mail className="channel-pill__icon" />
          <span>Contato</span>
        </a>
      </div>

      {/* Hero Copy (Preserving test contract) */}
      <div className="commercial-hero__copy mt-8 max-w-3xl mx-auto">
        <p className="commercial-eyebrow" data-hero-support>
          Feito a partir da sua história
        </p>
        <h1
          id="commercial-hero-title"
          className="commercial-hero__title"
          aria-label="Memórias que ganham forma."
        >
          <span data-hero-line>Memórias</span>
          <span className="commercial-hero__accent" data-hero-line>
            que ganham
          </span>
          <span data-hero-line>forma.</span>
        </h1>
        <p className="commercial-hero__support mt-3" data-hero-support>
          <span>Fotos, desenhos e ideias viram peças únicas.</span>
          <span>Feitas à mão para guardar histórias.</span>
        </p>
        <div className="commercial-hero__actions mt-5 flex justify-center gap-4" data-hero-support>
          {hasLink('whatsapp') && (
            <ExternalLink
              href={links.whatsapp}
              showIcon={false}
              className="commercial-button commercial-button--primary"
            >
              Quero criar <span aria-hidden="true">→</span>
            </ExternalLink>
          )}
          <a href="#categorias" className="commercial-button commercial-button--ghost">
            Ver categorias <span aria-hidden="true">↘</span>
          </a>
        </div>
      </div>

      {/* Visual media layers (Preserved for tests & layout) */}
      <div
        ref={visualRef}
        className="commercial-hero__visual"
        aria-label="Exemplos de personalizados 3D"
      >
        {heroAssets.map((asset, index) => (
          <div
            key={asset.src}
            className={`commercial-hero__media-reveal commercial-hero__media-reveal--${index + 1}`}
            data-hero-media
          >
            <CommercialImage
              asset={asset}
              priority={index === 0}
              sizes="(max-width: 767px) 78vw, (max-width: 1199px) 42vw, 30vw"
              className={`commercial-hero__media commercial-hero__media--${index + 1}`}
              imageClassName="commercial-hero__photo"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
