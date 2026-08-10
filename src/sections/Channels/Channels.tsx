/**
 * Channels — Canais da marca (PRD §71–76)
 * 4 cards: Instagram, WhatsApp, Shopee, Mercado Livre
 * Todos abrem em nova aba com noopener noreferrer
 */
import { SocialCard } from '@/components/SocialCard/SocialCard';
import { SectionTitle } from '@/components/SectionTitle/SectionTitle';
import { FloatingDecoration } from '@/components/motion/FloatingDecoration';
import { links, hasLink } from '@/data/links';

export function Channels() {
  const channels = [
    {
      key: 'instagram' as const,
      enabled: hasLink('instagram'),
      title: 'Instagram',
      description: 'Veja nossas últimas criações.',
      cta: 'Ver Instagram',
      href: links.instagram,
    },
    {
      key: 'whatsapp' as const,
      enabled: hasLink('whatsapp'),
      title: 'WhatsApp',
      description: 'Conte sua ideia para a gente.',
      cta: 'Falar no WhatsApp',
      href: links.whatsapp,
    },
    {
      key: 'shopee' as const,
      enabled: hasLink('shopee'),
      title: 'Shopee',
      description: 'Confira nossos produtos disponíveis na Shopee.',
      cta: 'Comprar na Shopee',
      href: links.shopee,
    },
    {
      key: 'mercadoLivre' as const,
      enabled: hasLink('mercadoLivre'),
      title: 'Mercado Livre',
      description: 'Veja nossos produtos disponíveis no Mercado Livre.',
      cta: 'Ver no Mercado Livre',
      href: links.mercadoLivre,
    },
  ].filter((c) => c.enabled);

  return (
    <section
      id="contato"
      className="section relative overflow-hidden"
      aria-labelledby="canais-title"
    >
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <FloatingDecoration type="butterfly" className="absolute top-20 left-10" size={48} speed={0.8} amplitude={15} delay={0.2} />
        <FloatingDecoration type="flower" className="absolute bottom-20 right-10" size={40} speed={0.7} amplitude={12} delay={0.5} />
        <FloatingDecoration type="heart" className="absolute top-1/2 right-10" size={36} speed={1} amplitude={10} delay={0.8} />
      </div>

      <div className="container-prose relative z-10">
        <SectionTitle
          id="canais-title"
          headline="CONTINUE"
          scriptLine="com a gente."
          align="center"
          size="section"
        />

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {channels.map((channel) => (
            <SocialCard
              key={channel.key}
              icon={channel.key}
              title={channel.title}
              description={channel.description}
              cta={channel.cta}
              href={channel.href}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
