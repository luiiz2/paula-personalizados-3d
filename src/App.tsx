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
      <Header />

      <main id="main-content">
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