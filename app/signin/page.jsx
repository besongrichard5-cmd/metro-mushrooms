"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { signIn } from 'next-auth/react';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    let users = [];
    try {
      users = JSON.parse(localStorage.getItem('metroUsers') || '[]');
    } catch (err) {
      users = [];
    }

    const user = users.find((u) => u.email === email);
    if (!user) {
      setError('No account found for this email.');
      return;
    }

    if (user.password !== password) {
      setError('Incorrect password.');
      return;
    }

    setSuccess(`Signed in successfully as ${user.fullName}.`);
    localStorage.setItem('currentUser', JSON.stringify(user));
    setEmail('');
    setPassword('');
    console.log('Local signin success:', user);
    
    // Redirect to home page after a short delay
    setTimeout(() => {
      window.location.href = '/';
    }, 1000);
  };

  return (
    <main style={{ backgroundColor: '#000', minHeight: '100dvh', display: 'flex', color: 'white' }}>
      {/* Background Video */}
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, overflow: 'hidden' }}>
        <video
          autoPlay
          loop
          muted
          playsInline
          style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.5 }}
        >
          <source src="/bgvideo.mp4" type="video/mp4" />
        </video>
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'linear-gradient(135deg, rgba(0,13,20,0.9) 0%, rgba(0,0,0,0.7) 100%)' }} />
      </div>

      <div style={{ position: 'relative', zIndex: 1, width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
        <div className="glass-card animate-fade-in" style={{ width: '100%', maxWidth: '450px', padding: '50px 40px' }}>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <h1 style={{ fontSize: '2.5rem', fontWeight: '900', marginBottom: '10px' }}>
              Welcome <span style={{ color: '#e74c3c' }}>Back</span>
            </h1>
            <p style={{ color: '#bdc3c7' }}>Sign in to continue your journey</p>
          </div>

          <button
            type="button"
            style={{
              width: '100%',
              padding: '14px',
              backgroundColor: '#4285f4',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontWeight: 'bold',
              fontSize: '1rem',
              cursor: 'pointer',
              marginBottom: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px'
            }}
            onClick={() => signIn('google')}
          >
            <svg width="18" height="18" viewBox="0 0 24 24">
              <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Sign in with Google
          </button>

          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', color: '#bdc3c7' }}>Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  backgroundColor: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '8px',
                  color: 'white',
                  outline: 'none',
                  transition: 'border-color 0.3s'
                }}
                onFocus={(e) => e.target.style.borderColor = '#e74c3c'}
                onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                placeholder="you@example.com"
              />
            </div>

            <div style={{ marginBottom: '30px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <label style={{ fontSize: '0.9rem', color: '#bdc3c7' }}>Password</label>
                <a href="#" style={{ fontSize: '0.85rem', color: '#e74c3c', textDecoration: 'none' }}>Forgot?</a>
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  backgroundColor: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '8px',
                  color: 'white',
                  outline: 'none',
                  transition: 'border-color 0.3s'
                }}
                onFocus={(e) => e.target.style.borderColor = '#e74c3c'}
                onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                placeholder="••••••••"
              />
            </div>

            {error && (
              <div style={{ marginBottom: '20px', color: '#f39c12', fontWeight: '600' }}>
                {error}
              </div>
            )}
            {success && (
              <div style={{ marginBottom: '20px', color: '#2ecc71', fontWeight: '600' }}>
                {success}
              </div>
            )}
            <button
              type="submit"
              style={{
                width: '100%',
                padding: '14px',
                backgroundColor: '#e74c3c',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontWeight: 'bold',
                fontSize: '1rem',
                cursor: 'pointer',
                boxShadow: '0 4px 14px 0 rgba(231, 76, 60, 0.4)',
                transition: 'transform 0.2s, background-color 0.2s'
              }}
              onMouseOver={(e) => e.target.style.backgroundColor = '#c0392b'}
              onMouseOut={(e) => e.target.style.backgroundColor = '#e74c3c'}
              onMouseDown={(e) => e.target.style.transform = 'scale(0.98)'}
              onMouseUp={(e) => e.target.style.transform = 'scale(1)'}
            >
              Sign In
            </button>
          </form>

          <div style={{ marginTop: '30px', textAlign: 'center', fontSize: '0.9rem', color: '#bdc3c7' }}>
            Don&apos;t have an account? {' '}
            <Link href="/signup" style={{ color: '#e74c3c', textDecoration: 'none', fontWeight: 'bold' }}>
              Create one
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
