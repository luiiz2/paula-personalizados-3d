import { describe, expect, it } from 'vitest';
import { WHATSAPP_MESSAGE, buildWhatsappUrl, links } from './links';

describe('commercial links', () => {
  it('builds a WhatsApp URL with the approved general message', () => {
    const url = new URL(buildWhatsappUrl('5583988513243', WHATSAPP_MESSAGE));

    expect(url.origin).toBe('https://wa.me');
    expect(url.pathname).toBe('/5583988513243');
    expect(url.searchParams.get('text')).toBe(WHATSAPP_MESSAGE);
    expect(links.whatsapp).toBe(url.toString());
  });
});
