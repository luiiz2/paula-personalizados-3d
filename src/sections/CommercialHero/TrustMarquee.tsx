import { trustMessages } from '@/data/commercial';

export function TrustMarquee() {
  const accessibleMessage = trustMessages.join(' · ');

  return (
    <aside className="trust-marquee" aria-label="Diferenciais da Paula Personalizados 3D">
      <p className="sr-only">{accessibleMessage}</p>
      <div className="trust-marquee__track" aria-hidden="true">
        {[0, 1].map((copy) => (
          <div className="trust-marquee__copy" key={copy}>
            {trustMessages.map((message) => (
              <span key={`${copy}-${message}`}>
                {message}
                <i>✦</i>
              </span>
            ))}
          </div>
        ))}
      </div>
    </aside>
  );
}
