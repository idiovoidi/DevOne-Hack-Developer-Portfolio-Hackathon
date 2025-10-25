function App() {
  return (
    <div style={{ 
      minHeight: '100vh',
      backgroundColor: 'var(--color-background)',
      color: 'var(--color-text-primary)'
    }}>
      <div className="container-custom" style={{ paddingTop: '4rem' }}>
        <h1 className="text-gradient" style={{
          fontSize: '3rem',
          fontFamily: 'var(--font-heading)',
          fontWeight: 'bold',
          marginBottom: '1rem'
        }}>
          Developer Portfolio
        </h1>
        <p style={{
          fontSize: '1.25rem',
          color: 'var(--color-text-secondary)'
        }}>
          Welcome to your portfolio site! Tailwind CSS is configured and ready.
        </p>
        
        {/* Test buttons */}
        <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
          <button className="btn btn-primary">
            Primary Button
          </button>
          <button className="btn btn-secondary">
            Secondary Button
          </button>
          <button className="btn btn-outline">
            Outline Button
          </button>
        </div>
        
        {/* Test card */}
        <div className="card card-hover" style={{ marginTop: '2rem', maxWidth: '28rem' }}>
          <h3 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '0.5rem' }}>
            Test Card
          </h3>
          <p style={{ color: 'var(--color-text-secondary)' }}>
            This card demonstrates the custom styling with hover effects.
          </p>
        </div>
      </div>
    </div>
  )
}

export default App
