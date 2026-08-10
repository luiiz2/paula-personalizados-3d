/**
 * Links externos centralizados (PRD §84, 121–122)
 * Nunca inventar URLs. Se indisponível, string vazia + TODO.
 */
export const links = {
  instagram: 'https://www.instagram.com/paulapersonalizados3d?igsh=M3ZwbzRsbGNsdWc2',
  whatsapp: 'https://wa.me/message/MLMN335KHJQGL1',
  shopee: 'https://s.shopee.com.br/7AcdQhxtJo',
  mercadoLivre: 'https://produto.mercadolivre.com.br/MLB-4949058627?matt_tool=38524122&ua=JRE1CtzhRngN48gcobaHTEcKkx67Zt_n56hVYsbySBz2XMOk#origin=share&sid=share&action=copy',
} as const;

export type LinkKey = keyof typeof links;

/**
 * Helper para abrir links externos com segurança (PRD §76)
 */
export function openExternal(url: string): void {
  if (!url) return;
  window.open(url, '_blank', 'noopener,noreferrer');
}

/**
 * Verifica se link está configurado
 */
export function hasLink(key: LinkKey): boolean {
  return Boolean(links[key] && links[key].trim().length > 0);
}