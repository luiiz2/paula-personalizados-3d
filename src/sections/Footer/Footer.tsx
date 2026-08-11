import { ExternalLink } from '@/components/ui/ExternalLink';
import { commercialChannels } from '@/data/commercial';
import { hasLink } from '@/data/links';

const footerNav = [
  { label: 'Início', href: '#hero' },
  { label: 'Como funciona', href: '#como-funciona' },
  { label: 'Categorias', href: '#categorias' },
  { label: 'Sobre', href: '#sobre' },
] as const;

export function Footer() {
  return (
    <footer className="commercial-footer" role="contentinfo" aria-label="Rodapé">
      <a
        href="#hero"
        className="commercial-footer__brand"
        aria-label="Paula Personalizados 3D - Início"
      >
        Paula Personalizados 3D
      </a>
      <nav aria-label="Navegação do rodapé">
        {footerNav.map((item) => (
          <a key={item.href} href={item.href}>
            {item.label}
          </a>
        ))}
      </nav>
      <div className="commercial-footer__channels" aria-label="Canais comerciais">
        {commercialChannels
          .filter((channel) => hasLink(channel.key))
          .map((channel) => (
            <ExternalLink
              key={channel.key}
              href={channel.href}
              showIcon={false}
              className="commercial-footer__channel"
            >
              {channel.label}
            </ExternalLink>
          ))}
      </div>
      <p>© 2026 Paula Personalizados 3D. Todos os direitos reservados.</p>
    </footer>
  );
}
