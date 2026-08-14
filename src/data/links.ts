export const WHATSAPP_MESSAGE =
  'Olá! Conheci a Paula Personalizados 3D pelo site e gostaria de criar um personalizado. Pode me ajudar?';

export function buildWhatsappUrl(phone: string, message: string): string {
  const normalizedPhone = phone.replace(/\D/g, '');
  const url = new URL(`https://wa.me/${normalizedPhone}`);
  url.searchParams.set('text', message);
  return url.toString();
}

export const links = {
  instagram: 'https://www.instagram.com/paulapersonalizados3d?igsh=M3ZwbzRsbGNsdWc2',
  whatsapp: buildWhatsappUrl('5583988513243', WHATSAPP_MESSAGE),
  shopee: 'https://s.shopee.com.br/7AcdQhxtJo',
  mercadoLivre: 'https://produto.mercadolivre.com.br/MLB-4949058627?matt_tool=38524122&ua=JRE1CtzhRngN48gcobaHTEcKkx67Zt_n56hVYsbySBz2XMOk#origin=share&sid=share&action=copy',
} as const;

export type LinkKey = keyof typeof links;

/**
 * Verifica se link está configurado
 */
export function hasLink(key: LinkKey): boolean {
  return Boolean(links[key] && links[key].trim().length > 0);
}
