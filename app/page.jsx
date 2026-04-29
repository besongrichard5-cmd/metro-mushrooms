export default function Home() {
  return (
    <main style={{ backgroundColor: '#000', minHeight: '100dvh' }}>
      <section style={{ 
        position: 'relative',
        height: '100dvh', 
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        fontFamily: 'sans-serif',
        color: 'white'
      }}>
        
        {/* 1. The Video remains as the base layer */}
        <video
          autoPlay
          loop
          muted
          playsInline
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            zIndex: 0
          }}
        >
          <source src="/bgvideo.mp4" type="video/mp4" />
        </video>

        {/* 2. Background moved to a focal overlay layer */}
        {/* This creates a dark "vignette" centered behind the text for readability */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'radial-gradient(circle, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 70%, rgba(0,0,0,0.2) 100%)',
          zIndex: 1
        }} />

        {/* 3. Content Container (No longer has its own background) */}
        <div style={{ 
          position: 'relative',
          zIndex: 2,
          padding: '20px', 
          textAlign: 'center', 
          maxWidth: '850px',
          width: '100%'
        }}>
          <h1 style={{ 
            fontSize: 'clamp(2.5rem, 8vw, 4.5rem)', 
            marginBottom: '1.5rem',
            lineHeight: '1.1',
            fontWeight: '900',
            textShadow: '0px 4px 15px rgba(0,0,0,1)' // Heavy shadow for floating text
          }}>
            Welcome to <span style={{ color: '#e74c3c' }}>Metro-Mushrooms</span> 🍄
          </h1>

          <div style={{ 
            fontSize: '1.15rem', 
            lineHeight: '1.8',
            padding: '1rem', // Padding kept for spacing, but background removed
          }}>
            <p style={{ 
              marginBottom: '1.5rem', 
              fontWeight: '500',
              textShadow: '1px 1px 5px rgba(0,0,0,0.8)' 
            }}>
              We spread <strong>accurate information</strong> about magic mushrooms to help you make 
              informed decisions about your body and mind.
            </p>
            
            <p style={{ 
              marginBottom: '1.5rem', 
              opacity: 0.9,
              textShadow: '1px 1px 5px rgba(0,0,0,0.8)'
            }}>
              Explore <span style={{ color: '#ff7675' }}>trip reports</span>, master 
              the <span style={{ color: '#ff7675' }}>mushroom grow</span>, or discover 
              gourmet <span style={{ color: '#ff7675' }}>recipes</span>.
            </p>

            <p style={{ 
              fontStyle: 'italic', 
              fontSize: '1rem', 
              color: '#bdc3c7',
              textShadow: '1px 1px 5px rgba(0,0,0,0.8)'
            }}>
              Enjoy the site—we look forward to welcoming you into our community.
            </p>

            {/* CTA Buttons */}
            <div style={{ marginTop: '2.5rem', display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button style={{
                padding: '1rem 2.5rem',
                fontSize: '1.1rem',
                backgroundColor: '#e74c3c',
                color: 'white',
                border: 'none',
                borderRadius: '12px',
                fontWeight: 'bold',
                cursor: 'pointer',
                boxShadow: '0 4px 14px 0 rgba(231, 76, 60, 0.39)'
              }}>
                View Shop
              </button>
              <button style={{
                padding: '1rem 2.5rem',
                fontSize: '1.1rem',
                backgroundColor: 'rgba(255,255,255,0.1)',
                color: 'white',
                border: '1px solid rgba(255,255,255,0.4)',
                borderRadius: '12px',
                fontWeight: 'bold',
                cursor: 'pointer'
              }}>
                Contact Us
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}