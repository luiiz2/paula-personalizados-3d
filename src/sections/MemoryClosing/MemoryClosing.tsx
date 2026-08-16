import { brandAsset, closingAsset } from '@/data/commercial';

export function MemoryClosing() {
  return (
    <section id="sobre" className="sr-only" aria-labelledby="memory-title">
      <h2 id="memory-title">Feito para quem importa.</h2>
      <img src={brandAsset.src} alt="Logo Paula Personalizados 3D" />
      <img src={closingAsset.src} alt="Presente personalizado 3D artesanal" />
    </section>
  );
}
