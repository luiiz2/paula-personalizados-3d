/**
 * Gallery data — centralizado (PRD §62–64)
 * Grid assimétrico com proporções variadas (2:3, 1:1, 4:3, 3:4).
 * Misturar: bonecas, bonecos, famílias, personagens, desenhos, ambientados, close-ups.
 */
export interface GalleryItem {
  id: string;
  image: string;
  alt: string;
  // Proporção sugerida para layout assimétrico
  aspect: '2:3' | '1:1' | '4:3' | '3:4';
  // Categoria para filtros futuros
  category: 'boneca' | 'boneco' | 'familia' | 'personagem' | 'desenho' | 'ambientado' | 'detalhe';
}

/**
 * Distribuição das 42 fotos em gallery (após reservar 7 para products).
 * As imagens são atribuídas sequencialmente; ajuste alt/aspect/category conforme conteúdo real.
 */
export const gallery: GalleryItem[] = [
  { id: 'gal-01', image: '/assets/photo_2026-01-30_20-02-34.jpg', alt: 'Boneca personalizada detalhe', aspect: '2:3', category: 'boneca' },
  { id: 'gal-02', image: '/assets/photo_2026-05-12_19-00-06.jpg', alt: 'Família em peça 3D', aspect: '1:1', category: 'familia' },
  { id: 'gal-03', image: '/assets/photo_2026-05-15_15-16-00.jpg', alt: 'Boneco estilo colecionável', aspect: '4:3', category: 'personagem' },
  { id: 'gal-04', image: '/assets/photo_2026-07-07_11-52-30.jpg', alt: 'Desenho infantil transformado', aspect: '3:4', category: 'desenho' },
  { id: 'gal-05', image: '/assets/photo_2026-07-17_18-25-03.jpg', alt: 'Pai e filho personalizados', aspect: '2:3', category: 'familia' },
  { id: 'gal-06', image: '/assets/photo_2026-07-19_22-09-47.jpg', alt: 'Boneca em ambiente', aspect: '1:1', category: 'ambientado' },
  { id: 'gal-07', image: '/assets/photo_2026-07-19_22-09-51.jpg', alt: 'Close-up acabamento artesanal', aspect: '4:3', category: 'detalhe' },
  { id: 'gal-08', image: '/assets/photo_2026-07-19_22-10-00.jpg', alt: 'Personagem 3D completo', aspect: '3:4', category: 'personagem' },
  { id: 'gal-09', image: '/assets/photo_2026-07-19_22-10-03.jpg', alt: 'Boneca personalizada rosto', aspect: '2:3', category: 'boneca' },
  { id: 'gal-10', image: '/assets/photo_2026-07-19_22-14-01.jpg', alt: 'Família completa em 3D', aspect: '1:1', category: 'familia' },
  { id: 'gal-11', image: '/assets/photo_2026-07-20_12-15-33.jpg', alt: 'Boneco detalhe pintura', aspect: '4:3', category: 'detalhe' },
  { id: 'gal-12', image: '/assets/photo_2026-07-20_12-15-36.jpg', alt: 'Peça temática personagem', aspect: '3:4', category: 'personagem' },
  { id: 'gal-13', image: '/assets/photo_2026-07-20_21-22-32.jpg', alt: 'Desenho → modelo 3D', aspect: '2:3', category: 'desenho' },
  { id: 'gal-14', image: '/assets/photo_2026-07-20_21-47-58.jpg', alt: 'Boneca vestido detalhe', aspect: '1:1', category: 'boneca' },
  { id: 'gal-15', image: '/assets/photo_2026-07-21_15-35-19.jpg', alt: 'Ambientado presente', aspect: '4:3', category: 'ambientado' },
  { id: 'gal-16', image: '/assets/photo_2026-07-22_13-06-31.jpg', alt: 'Personagem colecionável pose', aspect: '3:4', category: 'personagem' },
  { id: 'gal-17', image: '/assets/photo_2026-07-23_10-07-08.jpg', alt: 'Boneco personalizado corpo', aspect: '2:3', category: 'boneco' },
  { id: 'gal-18', image: '/assets/photo_2026-07-23_13-18-45.jpg', alt: 'Detalhe acessório', aspect: '1:1', category: 'detalhe' },
  { id: 'gal-19', image: '/assets/photo_2026-07-26_18-37-49.jpg', alt: 'Família momentos especiais', aspect: '4:3', category: 'familia' },
  { id: 'gal-20', image: '/assets/photo_2026-07-27_13-06-36.jpg', alt: 'Boneca perfil', aspect: '3:4', category: 'boneca' },
  { id: 'gal-21', image: '/assets/photo_2026-07-27_13-08-04.jpg', alt: 'Personagem detalhe rosto', aspect: '2:3', category: 'personagem' },
  { id: 'gal-22', image: '/assets/photo_2026-07-28_16-59-54.jpg', alt: 'Peça temática ambiente', aspect: '1:1', category: 'ambientado' },
  { id: 'gal-23', image: '/assets/photo_2026-07-29_12-51-16.jpg', alt: 'Boneco costas', aspect: '4:3', category: 'boneco' },
  { id: 'gal-24', image: '/assets/photo_2026-07-29_13-31-03.jpg', alt: 'Desenho original e 3D', aspect: '3:4', category: 'desenho' },
  { id: 'gal-25', image: '/assets/photo_2026-07-29_15-46-03.jpg', alt: 'Boneca close cabelo', aspect: '2:3', category: 'detalhe' },
  { id: 'gal-26', image: '/assets/photo_2026-07-29_15-47-11.jpg', alt: 'Presente embalado', aspect: '1:1', category: 'ambientado' },
  { id: 'gal-27', image: '/assets/photo_2026-07-31_12-34-15.jpg', alt: 'Personagem corpo inteiro', aspect: '4:3', category: 'personagem' },
  { id: 'gal-28', image: '/assets/photo_2026-08-02_13-12-18.jpg', alt: 'Família pai mãe filho', aspect: '3:4', category: 'familia' },
  { id: 'gal-29', image: '/assets/photo_2026-08-04_15-23-31.jpg', alt: 'Boneca detalhe roupa', aspect: '2:3', category: 'boneca' },
  { id: 'gal-30', image: '/assets/photo_2026-08-04_15-23-35.jpg', alt: 'Boneco detalhe mão', aspect: '1:1', category: 'detalhe' },
  { id: 'gal-31', image: '/assets/photo_2026-08-04_15-23-38.jpg', alt: 'Personagem acessórios', aspect: '4:3', category: 'personagem' },
  { id: 'gal-32', image: '/assets/photo_2026-08-05_12-08-26.jpg', alt: 'Ambientado mesa', aspect: '3:4', category: 'ambientado' },
  { id: 'gal-33', image: '/assets/photo_2026-08-07_10-29-53.jpg', alt: 'Boneca pequena', aspect: '2:3', category: 'boneca' },
  { id: 'gal-34', image: '/assets/photo_2026-08-09_20-13-23.jpg', alt: 'Hero boneca principal', aspect: '1:1', category: 'boneca' },
];