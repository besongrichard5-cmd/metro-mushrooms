"use client"
import React, { useState } from 'react';
import Link from 'next/link';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.trim()) {
      setMessage('Enter a valid email to join.');
      return;
    }
    setMessage('Thanks for joining!');
    setEmail('');
  };

  return (
    <footer style={{
      backgroundColor: '#000d14',
      color: '#ffffff',
      padding: '80px 20px 40px 20px',
      borderTop: '1px solid rgba(231, 76, 60, 0.2)',
      position: 'relative',
      zIndex: 2
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '60px'
      }}>
        
        {/* Column 1: Brand & Mission */}
        <div>
          <h3 style={{ color: 'white', fontSize: '1.5rem', fontWeight: '900', marginBottom: '20px' }}>
            METRO <span style={{ color: '#e74c3c' }}>MUSHROOMS</span> 🍄
          </h3>
          <p style={{ lineHeight: '1.8', color: '#bdc3c7', fontSize: '0.95rem' }}>
            Spreading accurate information and fostering a responsible community in the heart of the city. 
            Join us on the journey of discovery and mindfulness.
          </p>
        </div>

        {/* Column 2: Quick Links */}
        <div>
          <h4 style={{ marginBottom: '25px', fontSize: '1.1rem', fontWeight: 'bold', color: '#e74c3c' }}>Explore</h4>
          <ul style={{ listStyle: 'none', padding: 0, lineHeight: '2.5', color: '#bdc3c7' }}>
            <li><Link href="/about" style={{ color: 'inherit', textDecoration: 'none' }} className="footer-link">How to Grow</Link></li>
            <li><Link href="/posts" style={{ color: 'inherit', textDecoration: 'none' }} className="footer-link">Community Posts</Link></li>
            <li><Link href="/faq" style={{ color: 'inherit', textDecoration: 'none' }} className="footer-link">Support & FAQ</Link></li>
            <li><Link href="/shop" style={{ color: 'inherit', textDecoration: 'none' }} className="footer-link">Shop Products</Link></li>
          </ul>
        </div>

        {/* Column 3: Newsletter */}
        <div>
          <h4 style={{ marginBottom: '25px', fontSize: '1.1rem', fontWeight: 'bold', color: '#e74c3c' }}>Stay Informed</h4>
          <p style={{ fontSize: '0.9rem', color: '#bdc3c7', marginBottom: '20px' }}>
            Get the latest research and shop updates delivered to your inbox.
          </p>
          <form 
            onSubmit={handleSubmit} 
            style={{ display: 'flex', gap: '10px', flexDirection: 'column' }}
          >
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email address" 
              style={{
                padding: '12px 16px',
                borderRadius: '8px',
                border: '1px solid rgba(255,255,255,0.1)',
                backgroundColor: 'rgba(255,255,255,0.05)',
                color: 'white',
                flex: 1,
                outline: 'none'
              }} 
            />
            <button 
              type="submit"
              style={{
                backgroundColor: '#e74c3c',
                color: 'white',
                border: 'none',
                padding: '12px 20px',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: 'bold',
                boxShadow: '0 4px 10px rgba(231, 76, 60, 0.2)'
              }}
            >
              Join
            </button>
            {message && (
              <p style={{ marginTop: '10px', color: '#bdc3c7', fontSize: '0.9rem' }}>
                {message}
              </p>
            )}
          </form>
        </div>
      </div>

      {/* Bottom Bar */}
      <div style={{
        marginTop: '80px',
        paddingTop: '30px',
        borderTop: '1px solid rgba(255, 255, 255, 0.05)',
        textAlign: 'center',
        fontSize: '0.85rem',
        color: '#7f8c8d'
      }}>
        <p>© {currentYear} Metro-Mushrooms. Always under construction, always evolving.</p>
        <div style={{ marginTop: '15px', display: 'flex', justifyContent: 'center', gap: '30px' }}>
          <Link href="/terms" style={{ color: 'inherit', textDecoration: 'none' }} className="footer-link">Terms & Conditions</Link>
          <Link href="/terms" style={{ color: 'inherit', textDecoration: 'none' }} className="footer-link">Privacy Policy</Link>
          <Link href="/about" style={{ color: 'inherit', textDecoration: 'none' }} className="footer-link">Contact Support</Link>
        </div>
      </div>

      <style jsx>{`
        .footer-link:hover { color: #e74c3c !important; }
      `}</style>
    </footer>
  );
};

export default Footer;
