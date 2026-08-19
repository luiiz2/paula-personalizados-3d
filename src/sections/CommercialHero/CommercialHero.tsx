import { useRef, useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { CommercialImage } from '@/components/ui/CommercialImage';
import { ExternalLink } from '@/components/ui/ExternalLink';
import { heroAssets } from '@/data/commercial';
import { hasLink, links } from '@/data/links';
import { usePointerParallax } from '@/hooks/usePointerParallax';
import { prefersReducedMotion } from '@/lib/utils';
import { MessageCircle, ShoppingBag, Store, Mail, Share2, ChevronDown } from 'lucide-react';
import { InstagramIcon } from '@/components/ui/CustomIcons';
import { ShareModal } from '@/components/ui/ShareModal';

import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function CommercialHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const visualRef = usePointerParallax<HTMLDivElement>();
  const [isSpinning, setIsSpinning] = useState(true);
  const [isShareOpen, setIsShareOpen] = useState(false);

  // Dispara a animação 3D ao carregar a página e encerra após 1.3s
  useEffect(() => {
    if (!isSpinning) return;
    const timer = setTimeout(() => setIsSpinning(false), 1300);
    return () => clearTimeout(timer);
  }, [isSpinning]);

  // Ao clicar na logo, dispara novamente o giro 3D suave (uma rotação)
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

      // 1. Logo hero entrance — refined fade + subtle scale
      gsap.from('[data-hero-logo]', {
        scale: 0.92,
        opacity: 0,
        duration: 1.2,
        transformOrigin: '50% 50%',
        ease: 'power2.out',
      });

      // 2. Storytelling Showcase entrance sequence on entering viewport
      const storyTl = gsap.timeline({
        defaults: { ease: 'power3.out' },
        scrollTrigger: {
          trigger: '[data-story-bg]',
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      });

      storyTl
        .fromTo(
          '[data-story-bg]',
          { opacity: 0 },
          { opacity: 1, duration: 1.1, ease: 'power2.out' }
        )
        .fromTo(
          '[data-story-eyebrow]',
          { opacity: 0, y: 25 },
          { opacity: 1, y: 0, duration: 0.8 },
          '-=0.7'
        )
        .fromTo(
          '[data-hero-line]',
          { opacity: 0, y: 32 },
          { opacity: 1, y: 0, duration: 0.9, stagger: 0.11 },
          '-=0.5'
        )
        .fromTo(
          '[data-story-copy]',
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.8 },
          '-=0.4'
        )
        .fromTo(
          '[data-story-actions]',
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.8 },
          '-=0.4'
        )
        .fromTo(
          '[data-hero-char]',
          { x: -70, y: 20, scale: 0.96, opacity: 0 },
          { x: 0, y: 0, scale: 1, opacity: 1, duration: 1.15 },
          '-=0.7'
        )
        .fromTo(
          '[data-hero-luna]',
          { y: -25, opacity: 0, rotation: 10 },
          { y: 0, opacity: 1, rotation: 4, duration: 0.95 },
          '-=0.9'
        )
        .fromTo(
          '[data-hero-heart]',
          { x: 50, scale: 0.96, opacity: 0, rotation: -6 },
          { x: 0, scale: 1, opacity: 1, rotation: -2, duration: 1.05 },
          '-=0.8'
        );

      return () => {
        storyTl.kill();
      };
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="commercial-hero commercial-hero--topographic relative overflow-hidden"
      aria-labelledby="commercial-hero-title"
    >
      {/* 100svh Hero Header Stage — Fills exactly the first viewport */}
      <div className="commercial-hero__viewport">
        {/* Top-Right Round Share Button */}
        <div className="hero-share-corner">
          <button
            type="button"
            onClick={() => setIsShareOpen(true)}
            className="hero-share-btn"
            aria-label="Compartilhar o site"
            title="Compartilhar site"
          >
            <Share2 className="hero-share-btn__icon" aria-hidden="true" />
          </button>
        </div>

        {/* 3D Glowing Logo Showcase (PNG oficial) — Fills available vertical space */}
        <div className="logo-3d-stage" data-hero-logo>
          <button
            type="button"
            onClick={handleLogoClick}
            className={`logo-3d-disc ${isSpinning ? 'logo-3d-disc--spin' : ''}`}
            aria-label="Logo Paula Personalizados 3D — Clique para ver efeito 3D"
          >
            <img
              src="/assets/logo-paula-personalizados-3d.webp"
              alt=""
              role="presentation"
              aria-hidden="true"
              className="w-full h-full object-contain"
            />
          </button>
        </div>

        {/* Bottom cluster: Navigation Bar + Channel Pill Buttons */}
        <div className="commercial-hero__controls w-full">
          {/* Nav Links Bar under logo */}
          <nav
            className="hero-nav-bar"
            aria-label="Navegação do topo"
            data-hero-support
          >
            <a href="#hero" className="hero-nav-link">
              Início
            </a>
            <span className="hero-nav-divider" aria-hidden="true">|</span>
            <a href="#feito-a-mao" className="hero-nav-link">
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

            <a href="#canais" className="channel-pill">
              <Mail className="channel-pill__icon" />
              <span>Contato</span>
            </a>
          </div>

          {/* Animated Scroll Indicator Arrow (Decorative visual indicator without touch interaction) */}
          <div className="hero-scroll-indicator" data-hero-support aria-hidden="true">
            <div className="hero-scroll-indicator__icon-wrap">
              <ChevronDown className="hero-scroll-indicator__arrow" />
            </div>
          </div>
        </div>

        <ShareModal isOpen={isShareOpen} onClose={() => setIsShareOpen(false)} />
      </div>

      {/* Visual Storytelling & Editorial Brand Showcase Stage */}
      <div
        ref={visualRef}
        className="commercial-storytelling w-full max-w-7xl mx-auto my-12 relative"
        aria-label="Apresentação visual da arte personalizada 3D"
      >
        {/* Delicate Handcrafted Background Curves & Botanicals (Outer edges only) */}
        <div className="commercial-storytelling__bg-art" aria-hidden="true" data-story-bg>
          <svg
            className="commercial-storytelling__svg-decor"
            viewBox="0 0 1440 900"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="xMidYMid slice"
          >
            {/* Top Left Delicate Organic Flow */}
            <path
              d="M-80,180 C180,90 320,280 480,190 C600,120 680,240 760,200"
              stroke="rgba(235, 140, 165, 0.16)"
              strokeWidth="1.5"
              strokeDasharray="4 2"
            />
            <path
              d="M-40,240 C220,160 360,340 540,270"
              stroke="rgba(235, 140, 165, 0.12)"
              strokeWidth="1.2"
            />
            {/* Top Right Delicate Organic Botanicals */}
            <path
              d="M1080,80 C1160,180 1320,120 1480,220"
              stroke="rgba(235, 140, 165, 0.15)"
              strokeWidth="1.5"
            />
            <path
              d="M1160,60 Q1240,140 1340,90 T1480,160"
              stroke="rgba(235, 140, 165, 0.12)"
              strokeWidth="1.2"
              strokeDasharray="6 3"
            />
            {/* Bottom Right Soft Organic Flow */}
            <path
              d="M920,720 C1080,640 1260,780 1480,690"
              stroke="rgba(235, 140, 165, 0.18)"
              strokeWidth="1.5"
            />
            <path
              d="M980,780 C1140,710 1300,840 1480,760"
              stroke="rgba(235, 140, 165, 0.12)"
              strokeWidth="1.2"
            />
            {/* Bottom Left Subtle Root/Leaf Arc */}
            <path
              d="M-60,720 C120,680 240,790 420,750"
              stroke="rgba(235, 140, 165, 0.14)"
              strokeWidth="1.2"
            />
            {/* Abstract botanical leaf outline upper-left */}
            <path
              d="M80,120 C110,90 140,110 130,145 C120,180 85,170 80,120 Z"
              stroke="rgba(235, 140, 165, 0.18)"
              strokeWidth="1.2"
              fill="rgba(255, 225, 232, 0.12)"
            />
            {/* Abstract botanical leaf outline lower-right */}
            <path
              d="M1360,740 C1390,710 1420,730 1410,765 C1400,800 1365,790 1360,740 Z"
              stroke="rgba(235, 140, 165, 0.18)"
              strokeWidth="1.2"
              fill="rgba(255, 225, 232, 0.12)"
            />
          </svg>
        </div>

        <div className="commercial-storytelling__composition">
          {/* Left Side: Large Dominant Main Character */}
          <div className="commercial-storytelling__side commercial-storytelling__side--left">
            <div
              className="commercial-storytelling__char-wrapper"
              data-hero-media
              data-hero-char
            >
              <CommercialImage
                asset={heroAssets[0]}
                priority
                sizes="(max-width: 767px) 85vw, (max-width: 1024px) 40vw, 32vw"
                className="commercial-hero__media commercial-storytelling__char-media"
                imageClassName="commercial-storytelling__char-photo"
              />
            </div>
          </div>

          {/* Center: Editorial High-Contrast Typography & Actions */}
          <div className="commercial-storytelling__center">
            <p className="commercial-storytelling__eyebrow" data-hero-support data-story-eyebrow>
              FEITO A PARTIR DA SUA HISTÓRIA
            </p>
            <h1
              id="commercial-hero-title"
              className="commercial-storytelling__title"
              aria-label="Memórias que ganham forma."
            >
              <span className="commercial-storytelling__line commercial-storytelling__line--1" data-hero-line>
                Memórias
              </span>
              <span className="commercial-storytelling__line commercial-storytelling__line--2" data-hero-line>
                que ganham
              </span>
              <span className="commercial-storytelling__line commercial-storytelling__line--3" data-hero-line>
                forma.
              </span>
            </h1>
            <p className="commercial-storytelling__support mt-4" data-hero-support data-story-copy>
              <span>Fotos, desenhos e ideias viram peças únicas.</span>
              <span>Feitas à mão para guardar histórias.</span>
            </p>
            <div
              className="commercial-storytelling__actions mt-7 flex justify-center gap-4"
              data-hero-support
              data-story-actions
            >
              {hasLink('whatsapp') && (
                <ExternalLink
                  href={links.whatsapp}
                  showIcon={false}
                  aria-label="Quero criar meu personalizado"
                  className="commercial-storytelling__btn-primary"
                >
                  <span>Criar meu personalizado</span>
                  <span className="btn-arrow" aria-hidden="true">→</span>
                </ExternalLink>
              )}
              <a
                href="#categorias"
                aria-label="Ver categorias e explorar criações"
                className="commercial-storytelling__btn-secondary"
              >
                <span>Explorar criações</span>
                <span className="btn-arrow" aria-hidden="true">↘</span>
              </a>
            </div>
          </div>

          {/* Right Side: Natural Secondary Products (Luna Keychain & Heart Plaque) */}
          <div className="commercial-storytelling__side commercial-storytelling__side--right">
            <div
              className="commercial-storytelling__product commercial-storytelling__product--luna"
              data-hero-media
              data-hero-luna
            >
              <CommercialImage
                asset={heroAssets[1]}
                sizes="(max-width: 767px) 45vw, (max-width: 1024px) 20vw, 15vw"
                className="commercial-hero__media commercial-storytelling__product-media"
                imageClassName="commercial-storytelling__product-photo"
              />
            </div>
            <div
              className="commercial-storytelling__product commercial-storytelling__product--heart"
              data-hero-media
              data-hero-heart
            >
              <CommercialImage
                asset={heroAssets[2]}
                sizes="(max-width: 767px) 60vw, (max-width: 1024px) 28vw, 21vw"
                className="commercial-hero__media commercial-storytelling__product-media"
                imageClassName="commercial-storytelling__product-photo commercial-storytelling__product-photo--heart"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
