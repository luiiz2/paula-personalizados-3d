/**
 * SocialCard — Card de canal externo (PRD §71–75)
 * Instagram, WhatsApp, Shopee, Mercado Livre
 * Abre em nova aba com segurança
 */
import { ExternalLink } from '@/components/ui/ExternalLink';
import { cn } from '@/lib/utils';
import { MessageSquare, ShoppingBag, Store } from 'lucide-react';
import { InstagramIcon } from '@/components/ui/CustomIcons';

interface SocialCardProps {
  icon: 'instagram' | 'whatsapp' | 'shopee' | 'mercadoLivre';
  title: string;
  description: string;
  cta: string;
  href: string;
  className?: string;
}

const icons = {
  instagram: InstagramIcon,
  whatsapp: MessageSquare,
  shopee: ShoppingBag,
  mercadoLivre: Store,
};

const brandColors = {
  instagram: 'from-pink-500 via-pink-600 to-ink',
  whatsapp: 'from-green-500 to-green-600',
  shopee: 'from-orange-500 to-orange-600',
  mercadoLivre: 'from-blue-500 via-yellow-500 to-blue-600',
};

export function SocialCard({ icon, title, description, cta, href, className }: SocialCardProps) {
  const Icon = icons[icon];

  return (
    <article
      className={cn(
        'group relative p-6 md:p-8 rounded-2xl overflow-hidden',
        'bg-white border border-ink/5',
        'transition-all duration-500 ease-soft',
        'hover:border-pink/30 hover:shadow-[0_20px_50px_-12px_rgb(232_154_182/0.2)]',
        'hover:-translate-y-1',
        'focus-within:ring-2 focus-within:ring-pink focus-within:ring-offset-2',
        className
      )}
    >
      {/* Background gradient sutil */}
      <div
        className={cn(
          'absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500',
          'bg-gradient-to-br',
          brandColors[icon]
        )} 
        aria-hidden="true"
      />

      <div className="relative z-10 space-y-4">
        {/* Icon */}
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-ink/5 group-hover:bg-ink/10 transition-colors duration-300">
          <Icon className="h-7 w-7 text-ink group-hover:text-pink transition-colors duration-300" aria-hidden="true" />
        </div>

        {/* Content */}
        <div className="space-y-2">
          <h3 className="font-editorial font-bold text-xl tracking-tight text-ink">
            {title}
          </h3>
          <p className="text-mute text-base leading-relaxed">
            {description}
          </p>
        </div>

        {/* CTA */}
        <ExternalLink
          href={href}
          className="inline-flex items-center gap-2 font-sans font-semibold text-sm text-ink hover:text-pink transition-colors"
        >
          {cta}
        </ExternalLink>
      </div>
    </article>
  );
}
