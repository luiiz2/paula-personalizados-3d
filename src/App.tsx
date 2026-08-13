import { SmoothScroll } from '@/components/motion/SmoothScroll';
import { CommercialHero } from '@/sections/CommercialHero/CommercialHero';
import { TrustMarquee } from '@/sections/CommercialHero/TrustMarquee';
import { ArtisanShowcase } from '@/sections/ArtisanShowcase/ArtisanShowcase';
import { TransformationStory } from '@/sections/TransformationStory/TransformationStory';
import { CategoryCoverflow } from '@/sections/CategoryCoverflow/CategoryCoverflow';
import { ChannelGrid } from '@/sections/ChannelGrid/ChannelGrid';
import { MemoryClosing } from '@/sections/MemoryClosing/MemoryClosing';
import { Footer } from '@/sections/Footer/Footer';

function App() {
  return (
    <SmoothScroll>
      <div className="commercial-site">
        <a href="#main-content" className="skip-link">
          Ir para o conteúdo principal
        </a>
        <main id="main-content" tabIndex={-1}>
          <CommercialHero />
          <TrustMarquee />
          <ArtisanShowcase />
          <TransformationStory />
          <CategoryCoverflow />
          <div className="commercial-closing-chapter">
            <ChannelGrid />
            <MemoryClosing />
          </div>
        </main>
        <Footer />
      </div>
    </SmoothScroll>
  );
}

export default App;
