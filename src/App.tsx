import { Header, Footer } from './components/layout';
import { Hero, Projects, ArtGallery, Skills, Contact } from './components/sections';
import { ScrollProgress, CosmicBackground } from './components/ui';

function App() {
  return (
    <div 
      className="relative min-h-screen"
      style={{ 
        backgroundColor: 'var(--color-background)',
        color: 'var(--color-text-primary)'
      }}
    >
      {/* Cosmic Background Effect */}
      <CosmicBackground />
      
      {/* Scroll Progress Indicator */}
      <ScrollProgress />
      
      {/* Main Content */}
      <div className="relative z-10">
        <Header />
        
        {/* Hero Section */}
        <Hero />

        {/* Projects Section */}
        <Projects />

        {/* Art Gallery Section */}
        <ArtGallery />

        {/* Skills Section */}
        <Skills />

        {/* Contact Section */}
        <Contact />

        {/* Footer */}
        <Footer />
      </div>
    </div>
  )
}

export default App
