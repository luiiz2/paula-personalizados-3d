/**
 * Products data — centralizado (PRD §81–83)
 * Não hardcodar produtos dentro dos componentes.
 * Interface Product define o contrato usado por ProductCard.
 */
export interface Product {
  id: string;
  name: string;
  category: string;
  description?: string;
  image: string;
  gallery?: string[];
  featured?: boolean;
  shopeeUrl?: string;
  mercadoLivreUrl?: string;
  whatsappUrl?: string;
}

/**
 * 5–7 destaques (PRD §39).
 * As imagens usam os assets copiados para /assets (ou /public futuramente).
 * Ajuste os caminhos quando mover para /public/assets.
 */
export const products: Product[] = [
  {
    id: 'boneca-personalizada',
    name: 'Boneca personalizada',
    category: 'Bonecas',
    description: 'Criada especialmente a partir da sua foto.',
    image: '/assets/photo_2026-08-09_20-13-26.jpg',
    featured: true,
    shopeeUrl: '',
    mercadoLivreUrl: '',
    whatsappUrl: 'https://wa.me/message/MLMN335KHJQGL1',
  },
  {
    id: 'boneco-personalizado',
    name: 'Boneco personalizado',
    category: 'Bonecos',
    description: 'Transforme sua foto em um boneco único.',
    image: '/assets/photo_2026-08-09_20-13-42.jpg',
    featured: true,
    shopeeUrl: '',
    mercadoLivreUrl: '',
    whatsappUrl: 'https://wa.me/message/MLMN335KHJQGL1',
  },
  {
    id: 'pessoa-familia',
    name: 'Pessoas e famílias',
    category: 'Família',
    description: 'Peças que eternizam momentos especiais.',
    image: '/assets/photo_2026-07-23_13-19-49.jpg',
    featured: true,
    shopeeUrl: '',
    mercadoLivreUrl: '',
    whatsappUrl: 'https://wa.me/message/MLMN335KHJQGL1',
  },
  {
    id: 'desenho-3d',
    name: 'Desenho transformado em 3D',
    category: 'Desenhos',
    description: 'Uma ideia pequena vira lembrança para sempre.',
    image: '/assets/photo_2026-08-09_20-13-33.jpg',
    featured: true,
    shopeeUrl: '',
    mercadoLivreUrl: '',
    whatsappUrl: 'https://wa.me/message/MLMN335KHJQGL1',
  },
  {
    id: 'personagem-colecionavel',
    name: 'Personagem estilo colecionável',
    category: 'Personagens',
    description: 'Seu personagem favorito em impressão 3D.',
    image: '/assets/photo_2026-08-09_20-14-06.jpg',
    featured: true,
    shopeeUrl: '',
    mercadoLivreUrl: '',
    whatsappUrl: 'https://wa.me/message/MLMN335KHJQGL1',
  },
  {
    id: 'chaveiro-personalizado',
    name: 'Chaveiro personalizado',
    category: 'Lembrancinhas',
    description: 'Pequeno no tamanho, grande no significado.',
    image: '/assets/photo_2026-08-09_20-13-44.jpg',
    featured: false,
    shopeeUrl: 'https://s.shopee.com.br/7AcdQhxtJo',
    mercadoLivreUrl: 'https://produto.mercadolivre.com.br/MLB-4949058627?matt_tool=38524122&ua=JRE1CtzhRngN48gcobaHTEcKkx67Zt_n56hVYsbySBz2XMOk#origin=share&sid=share&action=copy',
    whatsappUrl: '',
  },
  {
    id: 'presente-afetivo',
    name: 'Presente afetivo',
    category: 'Presentes',
    description: 'Para quem você ama, feito com carinho.',
    image: '/assets/photo_2026-08-09_20-15-54.jpg',
    featured: false,
    shopeeUrl: '',
    mercadoLivreUrl: '',
    whatsappUrl: 'https://wa.me/message/MLMN335KHJQGL1',
  },
];