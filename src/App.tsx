import { Header, Footer } from './components/layout';
import { Hero, Projects, ArtGallery, NFTGallery, Music, Videos, Skills, Contact } from './components/sections';
import { ScrollProgress, CosmicBackground, PerformanceToggle } from './components/ui';
import { PerformanceProvider, usePerformance } from './contexts/PerformanceContext';

function AppContent() {
  const { settings } = usePerformance();

  return (
    <div 
      className="relative min-h-screen"
      style={{ 
        backgroundColor: 'var(--color-background)',
        color: 'var(--color-text-primary)'
      }}
    >
      {/* Cosmic Background Effect */}
      {settings.enableParticles && <CosmicBackground />}
      
      {/* Scroll Progress Indicator */}
      <ScrollProgress />
      
      {/* Performance Settings Toggle */}
      <PerformanceToggle />
      
      {/* Main Content */}
      <div className="relative z-10">
        <Header />
        
        {/* Hero Section */}
        <Hero />

        {/* Projects Section */}
        <Projects />

        {/* Art Gallery Section */}
        <ArtGallery />

        {/* NFT Gallery Section */}
        <NFTGallery />

        {/* Music Section */}
        <Music />

        {/* Videos Section */}
        <Videos />

        {/* Skills Section */}
        <Skills />

        {/* Contact Section */}
        <Contact />

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
}

function App() {
  return (
    <PerformanceProvider>
      <AppContent />
    </PerformanceProvider>
  );
}

export default App;
