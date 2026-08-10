import { Header } from '@/components/Header/Header';
import { Hero } from '@/sections/Hero/Hero';
import { YouIn3D } from '@/sections/YouIn3D/YouIn3D';
import { FeaturedProducts } from '@/sections/FeaturedProducts/FeaturedProducts';
import { DrawingTo3D } from '@/sections/DrawingTo3D/DrawingTo3D';
import { EternizeMoment } from '@/sections/EternizeMoment/EternizeMoment';
import { FamilyMoments } from '@/sections/FamilyMoments/FamilyMoments';
import { CharacterExperience } from '@/sections/CharacterExperience/CharacterExperience';
import { Process } from '@/sections/Process/Process';
import { Gallery } from '@/sections/Gallery/Gallery';
import { About } from '@/sections/About/About';
import { Channels } from '@/sections/Channels/Channels';
import { FinalCTA } from '@/sections/FinalCTA/FinalCTA';
import { Footer } from '@/sections/Footer/Footer';
import { Marquee } from '@/components/motion/Marquee';

function App() {
  return (
    <>
      <a
        href="#main-content"
        className="fixed left-4 top-4 z-[100] -translate-y-24 rounded-lg bg-ink px-4 py-3 font-sans font-semibold text-white transition-transform focus:translate-y-0"
      >
        Ir para o conteúdo principal
      </a>
      <Header />

      <main id="main-content" tabIndex={-1}>
        {/* Hero */}
        <Hero />

        {/* Você em 3D */}
        <YouIn3D />

        {/* Marquee */}
        <Marquee />

        {/* Produtos em destaque */}
        <FeaturedProducts />

        {/* Do desenho para o 3D */}
        <DrawingTo3D />

        {/* Eternize um momento */}
        <EternizeMoment />

        {/* Momentos em família */}
        <FamilyMoments />

        {/* Personagens */}
        <CharacterExperience />

        {/* Processo */}
        <Process />

        {/* Marquee */}
        <Marquee />

        {/* Galeria */}
        <Gallery />

        {/* Sobre */}
        <About />

        {/* Canais */}
        <Channels />

        {/* CTA Final */}
        <FinalCTA />
      </main>

      {/* Footer */}
      <Footer />
    </>
  );
}

export default App;
