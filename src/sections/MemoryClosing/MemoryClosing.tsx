import { brandAsset, closingAsset } from '@/data/commercial';
import { ExternalLink } from '@/components/ui/ExternalLink';
import { hasLink, links } from '@/data/links';

export function MemoryClosing() {
  return (
    <section
      id="sobre"
      className="memory-closing"
      aria-labelledby="memory-title"
    >
      <div className="memory-closing__inner">
        <img
          src={brandAsset.src}
          alt={brandAsset.alt}
          className="memory-closing__logo"
          loading="lazy"
        />

        <div className="memory-closing__content">
          <p className="commercial-eyebrow">Paula Personalizados 3D</p>
          <h2 id="memory-title" className="memory-closing__title">
            Feito para quem importa.
          </h2>
          <p className="memory-closing__sub">
            Cada peça conta uma história. A sua próxima memória pode começar agora.
          </p>
          {hasLink('whatsapp') && (
            <ExternalLink
              href={links.whatsapp}
              showIcon={false}
              className="commercial-button commercial-button--primary"
            >
              Criar minha lembrança <span aria-hidden="true">→</span>
            </ExternalLink>
          )}
        </div>

        <div className="memory-closing__photo">
          <img
            src={closingAsset.src}
            alt="Presente personalizado 3D artesanal"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
}
