/**
 * Footer (PRD §80)
 * Logo, links: Instagram, WhatsApp, Shopee, Mercado Livre
 * Menu: Início, Personalizados, Nosso trabalho, Sobre, Contato
 * Copyright: © 2026 Paula Personalizados 3D
 */
import { Link } from 'react-scroll';
import { ExternalLink } from '@/components/ui/ExternalLink';
import { links, hasLink } from '@/data/links';
import { MessageSquare, ShoppingBag, Store } from 'lucide-react';

const footerNav = [
  { label: 'Início', href: 'hero' },
  { label: 'Personalizados', href: 'produtos' },
  { label: 'Nosso trabalho', href: 'galeria' },
  { label: 'Sobre', href: 'sobre' },
  { label: 'Contato', href: 'contato' },
] as const;

const socialLinks = [
  { key: 'instagram', label: 'Instagram', enabled: hasLink('instagram'), href: links.instagram },
  { key: 'whatsapp', label: 'WhatsApp', enabled: hasLink('whatsapp'), href: links.whatsapp },
  { key: 'shopee', label: 'Shopee', enabled: hasLink('shopee'), href: links.shopee },
  { key: 'mercadoLivre', label: 'Mercado Livre', enabled: hasLink('mercadoLivre'), href: links.mercadoLivre },
].filter((s) => s.enabled);

export function Footer() {
  return (
    <footer
      className="relative bg-cream border-t border-ink/5"
      role="contentinfo"
      aria-label="Rodapé"
    >
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none" aria-hidden="true">
        <svg
          className="h-12 w-12 text-pink/30"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 2 C8 2 4 6 4 10 c0 3 2 6 5 9 3 3 7 5 11 5 4 0 8-2 11-5 3-3 5-6 5-9 C20 6 16 2 12 2 Z" />
          <path d="M12 8 Q9 6 8 8 Q7 10 9 12 Q8 14 12 16 Q16 14 15 12 Q17 10 15 8 Q16 6 12 8" />
          <circle cx="12" cy="12" r="2" fill="currentColor" />
        </svg>
      </div>

      <div className="container-prose py-16 md:py-24 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16">
          <div className="lg:col-span-1 space-y-6">
            <a href="#hero" className="flex items-center gap-2 shrink-0" aria-label="Paula Personalizados 3D - Início">
              <svg
                className="h-10 w-10 text-ink"
                viewBox="0 0 32 32"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M16 2 C8 2 2 8 2 16 c0 5 3 9 7 13 4 4 9 7 14 7 5 0 10-3 14-7 4-4 7-8 7-13 C30 8 24 2 16 2 Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  fill="none"
                />
                <path d="M16 10 Q12 6 10 10 Q8 14 12 16 Q10 18 16 22 Q22 18 20 16 Q24 14 22 10 Q20 6 16 10" stroke="currentColor" strokeWidth="1.5" fill="none" />
                <circle cx="16" cy="16" r="3" fill="currentColor" />
              </svg>
              <span className="font-editorial font-black text-xl md:text-2xl tracking-tight text-ink">
                Paula Personalizados 3D
              </span>
            </a>

            <p className="text-mute text-base leading-relaxed max-w-xs">
              Transformamos fotos, desenhos, pessoas e ideias em peças únicas através da impressão 3D e acabamento artesanal.
            </p>

            <div className="flex flex-wrap gap-3">
              {socialLinks.map((social) => (
                <ExternalLink
                  key={social.key}
                  href={social.href}
                  className="flex items-center justify-center w-11 h-11 rounded-xl bg-white border border-ink/10 text-ink/60 hover:text-pink hover:border-pink/30 hover:bg-pink-soft/30 transition-all duration-300"
                  aria-label={social.label}
                >
                  {social.key === 'instagram' && (
                    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                    </svg>
                  )}
                  {social.key === 'whatsapp' && <MessageSquare className="h-5 w-5" aria-hidden="true" />}
                  {social.key === 'shopee' && <ShoppingBag className="h-5 w-5" aria-hidden="true" />}
                  {social.key === 'mercadoLivre' && <Store className="h-5 w-5" aria-hidden="true" />}
                </ExternalLink>
              ))}
            </div>
          </div>

          <nav className="lg:col-span-1" aria-label="Navegação do rodapé">
            <h3 className="font-sans font-semibold text-ink mb-4">Navegação</h3>
            <ul className="space-y-3" role="list">
              {footerNav.map((item) => (
                <li key={item.label}>
                  <Link
                    to={item.href}
                    smooth={true}
                    duration={500}
                    offset={-80}
                    className="font-sans text-base text-ink/70 hover:text-pink transition-colors link-underline"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-1" aria-label="Canais de compra e contato">
            <h3 className="font-sans font-semibold text-ink mb-4">Onde encontrar</h3>
            <ul className="space-y-3" role="list">
              {socialLinks.map((social) => (
                <li key={social.key}>
                  <ExternalLink
                    href={social.href}
                    className="flex items-center gap-3 font-sans text-base text-ink/70 hover:text-pink transition-colors link-underline"
                  >
                    {social.key === 'instagram' && (
                      <svg className="h-5 w-5 text-pink shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                        <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                      </svg>
                    )}
                    {social.key === 'whatsapp' && <MessageSquare className="h-5 w-5 text-pink shrink-0" aria-hidden="true" />}
                    {social.key === 'shopee' && <ShoppingBag className="h-5 w-5 text-pink shrink-0" aria-hidden="true" />}
                    {social.key === 'mercadoLivre' && <Store className="h-5 w-5 text-pink shrink-0" aria-hidden="true" />}
                    {social.label}
                  </ExternalLink>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-1" aria-label="Contato direto">
            <h3 className="font-sans font-semibold text-ink mb-4">Fale conosco</h3>
            <address className="not-italic space-y-3 text-ink/70">
              <p className="font-sans">Paula Personalizados 3D</p>
              <p className="font-sans">
                <a href="tel:+5583988513243" className="hover:text-pink transition-colors link-underline">
                  +55 83 98851-3243
                </a>
              </p>
              {hasLink('whatsapp') && (
                <ExternalLink
                  href={links.whatsapp}
                  className="inline-flex items-center gap-2 font-sans font-medium text-sm text-ink hover:text-pink transition-colors link-underline mt-2"
                >
                  <MessageSquare className="h-4 w-4" aria-hidden="true" />
                  WhatsApp
                </ExternalLink>
              )}
            </address>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-ink/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-sans text-sm text-mute text-center md:text-left">
            © 2026 Paula Personalizados 3D. Todos os direitos reservados.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6">
            <a href="#" className="font-sans text-sm text-mute hover:text-pink transition-colors link-underline">
              Privacidade
            </a>
            <a href="#" className="font-sans text-sm text-mute hover:text-pink transition-colors link-underline">
              Termos
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
