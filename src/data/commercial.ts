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
  src: '/assets/logo-paula-personalizados-3d.png',
  alt: 'Logo Paula Personalizados 3D',
  objectPosition: '50% 50%',
};

export const artisanShowcaseAssets = {
  primary: {
    src: '/assets/woman-magenta-dress-3d.png',
    alt: 'Personagem feminina personalizada com vestido elegante em 3D',
    objectPosition: '50% 50%',
  },
  secondary: {
    src: '/assets/father-son-3d.png',
    alt: 'Pai e filho representados em uma lembrança personalizada em 3D',
    objectPosition: '50% 50%',
  },
} satisfies Record<'primary' | 'secondary', CommercialImageAsset>;

export const heroAssets: CommercialImageAsset[] = [
  {
    src: '/assets/spiderman-3d.png',
    alt: 'Miniatura 3D estilo colecionável',
    objectPosition: '50% 50%',
  },
  {
    src: '/assets/woman-magenta-dress-3d.png',
    alt: 'Personagem feminina personalizada com vestido elegante 3D',
    objectPosition: '50% 50%',
  },
  {
    src: '/assets/father-son-3d.png',
    alt: 'Pai e filho representados em 3D',
    objectPosition: '50% 50%',
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
      src: '/assets/woman-holding-figure-3d.png',
      alt: 'Foto de referência ao lado de uma miniatura 3D personalizada',
      objectPosition: '50% 50%',
    },
  },
  {
    id: 'desenho-3d',
    title: 'Do desenho para a vida em 3D',
    image: {
      src: '/assets/chaves-3d.png',
      alt: 'Peça personalizada inspirada em personagem 3D',
      objectPosition: '50% 50%',
    },
    revealImage: {
      src: '/assets/spiderman-3d.png',
      alt: 'Peça personalizada estilo colecionável',
      objectPosition: '50% 50%',
    },
  },
  {
    id: 'bonecos',
    title: 'Bonecos personalizados',
    image: {
      src: '/assets/spiderman-3d.png',
      alt: 'Boneco personalizado em estilo colecionável 3D',
      objectPosition: '50% 50%',
    },
  },
  {
    id: 'lembrancas',
    title: 'Lembrancas especiais',
    image: {
      src: '/assets/father-son-3d.png',
      alt: 'Lembrança personalizada de pai e filho em 3D',
      objectPosition: '50% 50%',
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
  src: '/assets/woman-holding-figure-3d.png',
  alt: 'Presente personalizado feito para guardar uma memória especial',
  objectPosition: '50% 50%',
};
