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

export const brandAsset: CommercialImageAsset = {
  src: '/assets/photo_2026-08-09_20-14-06.jpg',
  alt: 'Logo Paula Personalizados 3D',
  objectPosition: '50% 50%',
};

export const artisanShowcaseAssets = {
  primary: {
    src: '/assets/photo_2026-07-23_10-07-08.jpg',
    alt: 'Personagem feminina personalizada com vestido elegante',
    objectPosition: '50% 44%',
  },
  secondary: {
    src: '/assets/photo_2026-08-09_20-15-54.jpg',
    alt: 'Pai e filho representados em uma lembrança personalizada',
    objectPosition: '50% 58%',
  },
} satisfies Record<'primary' | 'secondary', CommercialImageAsset>;

export const heroAssets: CommercialImageAsset[] = [
  {
    src: '/assets/photo_2026-07-20_12-15-36.jpg',
    alt: 'Miniatura 3D personalizada de uma mulher com óculos',
    objectPosition: '50% 50%',
  },
  {
    src: '/assets/photo_2026-07-23_10-07-08.jpg',
    alt: 'Personagem feminina personalizada com vestido elegante',
    objectPosition: '50% 44%',
  },
  {
    src: '/assets/photo_2026-08-09_20-15-54.jpg',
    alt: 'Pai e filho representados em uma lembrança personalizada',
    objectPosition: '50% 58%',
  },
];

export const transformationStory = {
  source: {
    src: '/assets/photo_2026-07-26_18-37-49.jpg',
    alt: 'Referência original: fotografia de uma mulher em um evento',
    objectPosition: '52% 50%',
  },
  result: {
    src: '/assets/photo_2026-07-20_12-15-36.jpg',
    alt: 'Resultado personalizado: miniatura 3D criada a partir da fotografia',
    objectPosition: '50% 50%',
  },
} satisfies Record<'source' | 'result', CommercialImageAsset>;

export const commercialCategories: CommercialCategory[] = [
  {
    id: 'foto-3d',
    title: 'Miniaturas da sua foto',
    image: {
      src: '/assets/photo_2026-08-09_20-13-26.jpg',
      alt: 'Foto de referência ao lado de uma miniatura 3D personalizada',
      objectPosition: '50% 50%',
    },
  },
  {
    id: 'desenho-3d',
    title: 'Do desenho para a vida em 3D',
    image: {
      src: '/assets/photo_2026-08-09_20-13-47.jpg',
      alt: 'Desenho infantil e peça personalizada inspirada nele',
      objectPosition: '30% 50%',
    },
    revealImage: {
      src: '/assets/photo_2026-08-09_20-13-42.jpg',
      alt: 'Criança segurando uma peça personalizada inspirada em seu desenho',
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
