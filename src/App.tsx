import { Header } from './components/layout';
import { Hero, Projects, ArtGallery, Skills, Contact } from './components/sections';

function App() {
  return (
    <div style={{ 
      minHeight: '100vh',
      backgroundColor: 'var(--color-background)',
      color: 'var(--color-text-primary)'
    }}>
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
    </div>
  )
}

export default App
