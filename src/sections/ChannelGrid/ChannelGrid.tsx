import { useState, type ComponentType, type SVGProps } from 'react';
import { MessageCircle, ShoppingBag, Store, Share2 } from 'lucide-react';
import { ExternalLink } from '@/components/ui/ExternalLink';
import { InstagramIcon } from '@/components/ui/CustomIcons';
import { ShareModal } from '@/components/ui/ShareModal';
import { commercialChannels, type CommercialChannel } from '@/data/commercial';
import { hasLink } from '@/data/links';
import { useSectionReveal } from '@/hooks/useSectionReveal';

const icons: Record<
  CommercialChannel['key'],
  ComponentType<SVGProps<SVGSVGElement>>
> = {
  whatsapp: MessageCircle,
  instagram: InstagramIcon,
  shopee: ShoppingBag,
  mercadoLivre: Store,
};

export function ChannelGrid() {
  const sectionRef = useSectionReveal<HTMLElement>('[data-reveal-channel]');
  const [isShareOpen, setIsShareOpen] = useState(false);

  return (
    <section
      ref={sectionRef}
      id="canais"
      className="channel-grid commercial-section py-12 px-4 flex justify-center items-center"
      aria-labelledby="channels-title"
    >
      {/* Novo Card CTA Escuro com Brilho Rosa exatamente como na imagem enviada */}
      <div className="commercial-cta-card max-w-4xl w-full mx-auto text-center p-8 md:p-14 relative overflow-hidden">
        <p className="commercial-cta-card__eyebrow">
          SEU PRÓXIMO PERSONALIZADO COMEÇA AQUI
        </p>

        <h2 id="channels-title" className="commercial-cta-card__title mt-3" aria-label="Onde você nos encontra. Entre em contato.">
          <span>Entre em </span>
          <span className="commercial-cta-card__accent font-italic">contato.</span>
        </h2>

        <p className="commercial-cta-card__support mt-3">
          Estamos no WhatsApp, Instagram, Shopee e Mercado Livre.
        </p>

        <div className="commercial-cta-card__buttons mt-8 flex flex-wrap justify-center items-center gap-4">
          {commercialChannels
            .filter((channel) => hasLink(channel.key))
            .map((channel) => {
              const Icon = icons[channel.key];

              return (
                <ExternalLink
                  key={channel.key}
                  href={channel.href}
                  showIcon={false}
                  className="cta-pill-button"
                  aria-label={`Abrir ${channel.label}`}
                  data-reveal-channel
                >
                  <Icon className="cta-pill-button__icon" aria-hidden="true" />
                  <span className="cta-pill-button__label">{channel.label}</span>
                  <span className="cta-pill-button__arrow" aria-hidden="true">
                    →
                  </span>
                </ExternalLink>
              );
            })}

          <button
            type="button"
            onClick={() => setIsShareOpen(true)}
            className="cta-pill-button cursor-pointer"
            aria-label="Compartilhar o site"
            data-reveal-channel
          >
            <Share2 className="cta-pill-button__icon" aria-hidden="true" />
            <span className="cta-pill-button__label">Compartilhar</span>
            <span className="cta-pill-button__arrow" aria-hidden="true">
              ↗
            </span>
          </button>
        </div>

        <ShareModal isOpen={isShareOpen} onClose={() => setIsShareOpen(false)} />
      </div>
    </section>
  );
}
