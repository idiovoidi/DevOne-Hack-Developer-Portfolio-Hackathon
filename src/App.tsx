import { Header } from './components/layout';
import { Hero } from './components/sections';

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
      <section id="projects" className="section" style={{ minHeight: '100vh', backgroundColor: 'var(--color-surface)' }}>
        <div className="container-custom">
          <h2 className="section-heading">Projects</h2>
          <p className="section-subheading">
            This is a placeholder for the projects section.
          </p>
          <div className="card card-hover" style={{ maxWidth: '28rem' }}>
            <h3 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '0.5rem' }}>
              Project Card
            </h3>
            <p style={{ color: 'var(--color-text-secondary)' }}>
              Project cards will be displayed here.
            </p>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="section" style={{ minHeight: '100vh' }}>
        <div className="container-custom">
          <h2 className="section-heading">Skills</h2>
          <p className="section-subheading">
            This is a placeholder for the skills section.
          </p>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            {['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion'].map((skill) => (
              <div
                key={skill}
                className="card"
                style={{ padding: '0.75rem 1.5rem' }}
              >
                {skill}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="section" style={{ minHeight: '100vh', backgroundColor: 'var(--color-surface)' }}>
        <div className="container-custom">
          <h2 className="section-heading">Contact</h2>
          <p className="section-subheading">
            This is a placeholder for the contact section.
          </p>
          <div className="card" style={{ maxWidth: '32rem' }}>
            <h3 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem' }}>
              Get in Touch
            </h3>
            <p style={{ color: 'var(--color-text-secondary)' }}>
              Contact form will be displayed here.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default App
