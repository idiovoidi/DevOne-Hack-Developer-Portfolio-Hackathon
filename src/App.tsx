import { Header, Footer } from './components/layout';
import { Hero, Projects, ArtGallery, Skills, Contact } from './components/sections';
import { ScrollProgress } from './components/ui';

function App() {
  return (
    <div style={{ 
      minHeight: '100vh',
      backgroundColor: 'var(--color-background)',
      color: 'var(--color-text-primary)'
    }}>
      {/* Scroll Progress Indicator */}
      <ScrollProgress />
      
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
  )
}

export default App
