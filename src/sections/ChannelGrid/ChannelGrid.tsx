import type { ComponentType, SVGProps } from 'react';
import { MessageCircle, ShoppingBag, Store } from 'lucide-react';
import { ExternalLink } from '@/components/ui/ExternalLink';
import { InstagramIcon } from '@/components/ui/CustomIcons';
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

  return (
    <section
      ref={sectionRef}
      id="canais"
      className="channel-grid commercial-section"
      aria-labelledby="channels-title"
    >
      <div className="channel-grid__heading">
        <p className="commercial-eyebrow">Escolha seu canal preferido</p>
        <h2 id="channels-title">Onde você nos encontra</h2>
      </div>
      <div className="channel-grid__links">
        {commercialChannels
          .filter((channel) => hasLink(channel.key))
          .map((channel) => {
            const Icon = icons[channel.key];

            return (
              <ExternalLink
                key={channel.key}
                href={channel.href}
                showIcon={false}
                className={`channel-link channel-link--${channel.tone}`}
                aria-label={`Abrir ${channel.label}`}
                data-reveal-channel
              >
                <Icon className="channel-link__icon" aria-hidden="true" />
                <span>{channel.label}</span>
                <span className="channel-link__arrow" aria-hidden="true">
                  →
                </span>
              </ExternalLink>
            );
          })}
      </div>
    </section>
  );
}
