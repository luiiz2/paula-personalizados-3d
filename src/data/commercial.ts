import { links, type LinkKey } from './links';

export interface CommercialImageAsset {
  src: string;
  alt: string;
  objectPosition?: string;
}

export interface CommercialCategory {
  id: string;
  title: string;
  description: string;
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
  src: '/assets/logo-paula-personalizados-3d.webp',
  alt: 'Logo Paula Personalizados 3D',
  objectPosition: '50% 50%',
};

export const artisanShowcaseAssets = {
  primary: {
    src: '/assets/woman-magenta-dress-3d.webp',
    alt: 'Personagem feminina personalizada com vestido elegante em 3D',
    objectPosition: '50% 50%',
  },
  secondary: {
    src: '/assets/father-son-3d.webp',
    alt: 'Pai e filho representados em uma lembrança personalizada em 3D',
    objectPosition: '50% 50%',
  },
} satisfies Record<'primary' | 'secondary', CommercialImageAsset>;

export const heroAssets: CommercialImageAsset[] = [
  {
    src: '/assets/hero-paula-figure-3d.png',
    alt: 'Escultura 3D personalizada da Paula sentada com livro de gratidão',
    objectPosition: '50% 50%',
  },
  {
    src: '/assets/hero-luna-keychain-3d.png',
    alt: 'Chaveiro 3D personalizado da cachorrinha Luna com laço rosa',
    objectPosition: '50% 50%',
  },
  {
    src: '/assets/hero-heart-lamp-3d.png',
    alt: 'Luminária personalizada em coração 3D de casal com cachorrinho',
    objectPosition: '50% 50%',
  },
];

export const transformationStory = {
  source: {
    src: '/assets/transform-red-dress-photo.png',
    alt: 'Referência original: fotografia de mulher em vestido vermelho',
    objectPosition: '50% 50%',
  },
  process: {
    src: '/assets/transform-red-dress-clay-3d.png',
    alt: 'Modelagem 3D digital em escala de cinza',
    objectPosition: '50% 50%',
  },
  result: {
    src: '/assets/transform-red-dress-figure-3d.png',
    alt: 'Resultado personalizado: miniatura 3D com vestido vermelho e base dourada',
    objectPosition: '50% 50%',
  },
} satisfies Record<'source' | 'process' | 'result', CommercialImageAsset>;

export const commercialCategories: CommercialCategory[] = [
  {
    id: 'foto-3d',
    title: 'Miniaturas da sua foto',
    description: 'Sua foto transformada em escultura 3D rica em detalhes e afeto.',
    image: {
      src: '/assets/woman-holding-figure-3d.webp',
      alt: 'Foto de referência ao lado de uma miniatura 3D personalizada',
      objectPosition: '50% 50%',
    },
  },
  {
    id: 'desenho-3d',
    title: 'Do desenho para a vida em 3D',
    description: 'Damos volume e realidade a desenhos e ilustrações especiais.',
    image: {
      src: '/assets/chaves-3d.webp',
      alt: 'Peça personalizada inspirada em personagem 3D',
      objectPosition: '50% 50%',
    },
  },
  {
    id: 'bonecos',
    title: 'Bonecos personalizados',
    description: 'Figuras colecionáveis feitas sob medida com o seu estilo único.',
    image: {
      src: '/assets/spiderman-3d.webp',
      alt: 'Boneco personalizado em estilo colecionável 3D',
      objectPosition: '50% 50%',
    },
  },
  {
    id: 'lembrancas',
    title: 'Lembranças especiais',
    description: 'Momentos inesquecíveis e laços de amor eternizados em 3D.',
    image: {
      src: '/assets/father-son-3d.webp',
      alt: 'Lembrança personalizada de pai e filho em 3D',
      objectPosition: '50% 50%',
    },
  },
  {
    id: 'luminarias-3d',
    title: 'Luminárias & Placas 3D',
    description: 'Luminárias em acrílico e madeira com arte 3D e iluminação acolhedora.',
    image: {
      src: '/assets/hero-heart-lamp-3d.png',
      alt: 'Luminária personalizada em coração 3D de casal com cachorrinho',
      objectPosition: '50% 50%',
    },
  },
  {
    id: 'chaveiros-pets',
    title: 'Chaveiros & Pets 3D',
    description: 'Seu pet do coração e memórias eternizados em chaveiros 3D.',
    image: {
      src: '/assets/hero-luna-keychain-3d.png',
      alt: 'Chaveiro 3D personalizado de pet',
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
  src: '/assets/woman-holding-figure-3d.webp',
  alt: 'Presente personalizado feito para guardar uma memória especial',
  objectPosition: '50% 50%',
};
