import { links, type LinkKey } from './links';

export interface CommercialImageAsset {
  src: string;
  alt: string;
  objectPosition?: string;
}

export interface CommercialCategory {
  id: 'foto-3d' | 'desenho-3d' | 'bonecos' | 'lembrancas';
  title: string;
  image: CommercialImageAsset;
  revealImage?: CommercialImageAsset;
}

export interface CommercialChannel {
  key: LinkKey;
  label: string;
  href: string;
  tone: 'whatsapp' | 'instagram' | 'shopee' | 'mercado-livre';
}

export const trustMessages = [
  'Feito à mão',
  '100% personalizado',
  'Envio para todo Brasil',
  'Produção artesanal',
] as const;

export const heroAssets: CommercialImageAsset[] = [
  {
    src: '/assets/photo_2026-08-09_20-15-54.jpg',
    alt: 'Pai e filho representados em uma peça personalizada 3D',
    objectPosition: '50% 58%',
  },
  {
    src: '/assets/photo_2026-08-09_20-13-47.jpg',
    alt: 'Desenho infantil ao lado da peça criada a partir dele',
    objectPosition: '55% 50%',
  },
  {
    src: '/assets/photo_2026-08-09_20-13-33.jpg',
    alt: 'Boneco personalizado em estilo colecionável',
    objectPosition: '50% 48%',
  },
];

export const transformationStory = {
  source: {
    src: '/assets/photo_2026-08-09_20-13-47.jpg',
    alt: 'Referência original usada para criar uma peça 3D',
    objectPosition: '28% 50%',
  },
  result: {
    src: '/assets/photo_2026-08-09_20-13-42.jpg',
    alt: 'Resultado personalizado criado em 3D',
    objectPosition: '70% 50%',
  },
} satisfies Record<'source' | 'result', CommercialImageAsset>;

export const commercialCategories: CommercialCategory[] = [
  {
    id: 'foto-3d',
    title: 'Miniaturas da sua foto',
    image: {
      src: '/assets/photo_2026-08-09_20-13-26.jpg',
      alt: 'Miniatura criada a partir de uma fotografia',
      objectPosition: '50% 50%',
    },
  },
  {
    id: 'desenho-3d',
    title: 'Do desenho para a vida em 3D',
    image: {
      src: '/assets/photo_2026-08-09_20-13-47.jpg',
      alt: 'Desenho infantil usado como referência',
      objectPosition: '30% 50%',
    },
    revealImage: {
      src: '/assets/photo_2026-08-09_20-13-42.jpg',
      alt: 'Peça 3D pronta criada a partir do desenho',
      objectPosition: '72% 50%',
    },
  },
  {
    id: 'bonecos',
    title: 'Bonecos personalizados',
    image: {
      src: '/assets/photo_2026-08-09_20-13-33.jpg',
      alt: 'Boneco personalizado em estilo colecionável',
      objectPosition: '50% 48%',
    },
  },
  {
    id: 'lembrancas',
    title: 'Lembranças especiais',
    image: {
      src: '/assets/photo_2026-08-09_20-15-54.jpg',
      alt: 'Lembrança personalizada de pai e filho',
      objectPosition: '50% 58%',
    },
  },
];

export const commercialChannels: CommercialChannel[] = [
  { key: 'whatsapp', label: 'WhatsApp', href: links.whatsapp, tone: 'whatsapp' },
  { key: 'instagram', label: 'Instagram', href: links.instagram, tone: 'instagram' },
  { key: 'shopee', label: 'Shopee', href: links.shopee, tone: 'shopee' },
  {
    key: 'mercadoLivre',
    label: 'Mercado Livre',
    href: links.mercadoLivre,
    tone: 'mercado-livre',
  },
];

export const closingAsset: CommercialImageAsset = {
  src: '/assets/photo_2026-08-09_20-15-54.jpg',
  alt: 'Presente personalizado feito para guardar uma memória especial',
  objectPosition: '50% 58%',
};
