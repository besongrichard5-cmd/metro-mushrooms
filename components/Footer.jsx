"use client"
import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer style={{
      backgroundColor: '#050505',
      color: '#ffffff',
      padding: '60px 20px 20px 20px',
      fontFamily: 'sans-serif',
      borderTop: '1px solid rgba(255, 255, 255, 0.1)',
      position: 'relative',
      zIndex: 2
    }}>
      <div style={{
        maxWidth: '1100px',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '40px'
      }}>
        
        {/* Column 1: Brand & Mission */}
        <div>
          <h3 style={{ color: '#e74c3c', fontSize: '1.5rem', marginBottom: '20px' }}>
            Metro-Mushrooms 🍄
          </h3>
          <p style={{ lineHeight: '1.6', color: '#bdc3c7', fontSize: '0.95rem' }}>
            Spreading accurate information and fostering a responsible community in the heart of the city. 
            Join us on the journey of discovery.
          </p>
        </div>

        {/* Column 2: Quick Links */}
        <div>
          <h4 style={{ marginBottom: '20px', fontSize: '1.1rem' }}>Explore</h4>
          <ul style={{ listStyle: 'none', padding: 0, lineHeight: '2.2', color: '#bdc3c7' }}>
            <li><a href="#grow" style={{ color: 'inherit', textDecoration: 'none' }}>How to Grow</a></li>
            <li><a href="#reports" style={{ color: 'inherit', textDecoration: 'none' }}>Trip Reports</a></li>
            <li><a href="#gallery" style={{ color: 'inherit', textDecoration: 'none' }}>Gallery</a></li>
            <li><a href="#recipes" style={{ color: 'inherit', textDecoration: 'none' }}>Mushroom Recipes</a></li>
          </ul>
        </div>

        {/* Column 3: Newsletter */}
        <div>
          <h4 style={{ marginBottom: '20px', fontSize: '1.1rem' }}>Stay Informed</h4>
          <p style={{ fontSize: '0.85rem', color: '#bdc3c7', marginBottom: '15px' }}>
            Get the latest research and shop updates delivered to your inbox.
          </p>
          <form 
            onSubmit={(e) => e.preventDefault()} 
            style={{ display: 'flex', gap: '5px' }}
          >
            <input 
              type="email" 
              placeholder="Email address" 
              style={{
                padding: '10px',
                borderRadius: '5px',
                border: '1px solid #333',
                backgroundColor: '#1a1a1a',
                color: 'white',
                flex: 1
              }} 
            />
            <button 
              type="submit"
              style={{
                backgroundColor: '#e74c3c',
                color: 'white',
                border: 'none',
                padding: '10px 15px',
                borderRadius: '5px',
                cursor: 'pointer',
                fontWeight: 'bold'
              }}
            >
              Join
            </button>
          </form>
        </div>
      </div>

      {/* Bottom Bar */}
      <div style={{
        marginTop: '60px',
        paddingTop: '20px',
        borderTop: '1px solid rgba(255, 255, 255, 0.05)',
        textAlign: 'center',
        fontSize: '0.8rem',
        color: '#7f8c8d'
      }}>
        <p>© {currentYear} Metro-Mushrooms. Always under construction, always evolving.</p>
        <div style={{ marginTop: '10px', display: 'flex', justifyContent: 'center', gap: '20px' }}>
          <a href="/terms" style={{ color: 'inherit', textDecoration: 'none' }}>Terms</a>
          <a href="/privacy" style={{ color: 'inherit', textDecoration: 'none' }}>Privacy</a>
          <a href="/contact" style={{ color: 'inherit', textDecoration: 'none' }}>Contact</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;