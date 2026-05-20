"use client";
import React, { useState } from 'react';
import { FAQS } from '@/constants/data';

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <main style={{ backgroundColor: '#000', minHeight: '100dvh', color: 'white' }}>
      {/* Background Effect */}
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, background: 'radial-gradient(circle at top right, #000d14 0%, #000 100%)' }} />

      <section style={{ position: 'relative', zIndex: 1, padding: '150px 20px 80px 20px' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '80px' }}>
            <h1 style={{ fontSize: 'clamp(2.5rem, 8vw, 4rem)', fontWeight: '900', marginBottom: '1rem' }}>
              FREQUENTLY ASKED <br/>
              <span style={{ color: '#e74c3c' }}>QUESTIONS</span>
            </h1>
            <p style={{ color: '#bdc3c7', fontSize: '1.2rem' }}>
              Everything you need to know about our products and services.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            {FAQS.map((faq, index) => (
              <div 
                key={faq.id} 
                className="glass-card" 
                style={{ 
                  padding: '0', 
                  overflow: 'hidden', 
                  border: activeIndex === index ? '1px solid #e74c3c' : '1px solid rgba(255,255,255,0.1)',
                  transition: 'all 0.3s'
                }}
              >
                <button 
                  onClick={() => toggleAccordion(index)}
                  style={{
                    width: '100%',
                    padding: '25px 30px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    background: 'none',
                    border: 'none',
                    color: 'white',
                    fontSize: '1.2rem',
                    fontWeight: 'bold',
                    textAlign: 'left',
                    cursor: 'pointer'
                  }}
                >
                  <span style={{ color: activeIndex === index ? '#e74c3c' : 'white' }}>{faq.question}</span>
                  <span style={{ 
                    fontSize: '1.5rem', 
                    color: '#e74c3c', 
                    transform: activeIndex === index ? 'rotate(45deg)' : 'rotate(0deg)',
                    transition: 'transform 0.3s'
                  }}>+</span>
                </button>
                
                <div style={{ 
                  maxHeight: activeIndex === index ? '500px' : '0',
                  overflow: 'hidden',
                  transition: 'max-height 0.3s ease-in-out, padding 0.3s ease-in-out',
                  padding: activeIndex === index ? '0 30px 30px 30px' : '0 30px',
                  color: '#bdc3c7',
                  lineHeight: '1.8'
                }}>
                  {faq.answer}
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: '80px', textAlign: 'center' }}>
            <p style={{ color: '#bdc3c7' }}>Still have questions?</p>
            <Link href="/about" style={{ 
              display: 'inline-block',
              marginTop: '15px',
              padding: '12px 30px',
              backgroundColor: 'transparent',
              border: '1px solid #e74c3c',
              color: '#e74c3c',
              fontWeight: 'bold',
              borderRadius: '8px',
              textDecoration: 'none',
              transition: 'all 0.3s'
            }} className="contact-btn">
              CONTACT OUR TEAM
            </Link>
          </div>
        </div>
      </section>

      <style jsx>{`
        .contact-btn:hover { background: #e74c3c; color: white; }
      `}</style>
    </main>
  );
}

// Internal Link component since I need it for the contact button
import Link from 'next/link';
