"use client";
import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';

export default function SignUp() {
  const { data: session } = useSession();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [signedUp, setSignedUp] = useState(false);
  const [createdName, setCreatedName] = useState('');
  const [error, setError] = useState('');

  const avatarData = useMemo(() => {
    const image = session?.user?.image;
    const name = session?.user?.name || createdName || formData.fullName || '';
    const initial = name.trim().charAt(0).toUpperCase() || '';
    return image ? { type: 'image', src: image } : { type: 'initial', label: initial };
  }, [session, createdName, formData.fullName]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    const user = {
      fullName: formData.fullName,
      email: formData.email,
      password: formData.password,
      createdAt: new Date().toISOString()
    };

    let users = [];
    try {
      users = JSON.parse(localStorage.getItem('metroUsers') || '[]');
    } catch (err) {
      users = [];
    }

    if (users.some((existing) => existing.email === user.email)) {
      setError('An account with this email already exists.');
      return;
    }

    users.push(user);
    localStorage.setItem('metroUsers', JSON.stringify(users));
    localStorage.setItem('currentUser', JSON.stringify(user));

    setError('');
    setCreatedName(user.fullName);
    setFormData({ fullName: '', email: '', password: '', confirmPassword: '' });
    setSignedUp(true);
    console.log('Account created:', user);

    // Redirect to home page after a short delay
    setTimeout(() => {
      window.location.href = '/';
    }, 1500);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
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
        <div className="glass-card animate-fade-in" style={{ width: '100%', maxWidth: '500px', padding: '50px 40px' }}>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <h1 style={{ fontSize: '2.5rem', fontWeight: '900', marginBottom: '10px' }}>
              Join <span style={{ color: '#e74c3c' }}>Us</span>
            </h1>
            <p style={{ color: '#bdc3c7' }}>Start your journey with Metro Mushrooms</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', color: '#bdc3c7' }}>Full Name</label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
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
                placeholder="John Doe"
              />
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', color: '#bdc3c7' }}>Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
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

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '30px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', color: '#bdc3c7' }}>Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    backgroundColor: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '8px',
                    color: 'white',
                    outline: 'none'
                  }}
                  placeholder="••••••••"
                />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', color: '#bdc3c7' }}>Confirm</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    backgroundColor: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '8px',
                    color: 'white',
                    outline: 'none'
                  }}
                  placeholder="••••••••"
                />
              </div>
            </div>

            {error && (
              <div style={{ marginBottom: '20px', color: '#f39c12', fontWeight: '600' }}>
                {error}
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
            >
              Join
            </button>
          </form>

          {(signedUp || session?.user) && (
            <div style={{ marginTop: '30px', textAlign: 'center' }}>
              <h2 style={{ color: '#e74c3c', marginBottom: '20px' }}>
                Welcome, {session?.user?.name || formData.fullName || 'Friend'}!
              </h2>
              {avatarData.type === 'image' ? (
                <img
                  src={avatarData.src}
                  alt="Profile"
                  style={{ width: '100px', height: '100px', borderRadius: '50%', objectFit: 'cover' }}
                />
              ) : (
                <div
                  style={{
                    width: '100px',
                    height: '100px',
                    borderRadius: '50%',
                    backgroundColor: '#e74c3c',
                    display: 'grid',
                    placeItems: 'center',
                    fontSize: '2.5rem',
                    fontWeight: '900',
                    color: 'white',
                    margin: '0 auto'
                  }}
                >
                  {avatarData.label}
                </div>
              )}
            </div>
          )}

          <div style={{ marginTop: '30px', textAlign: 'center', fontSize: '0.9rem', color: '#bdc3c7' }}>
            Already have an account? {' '}
            <Link href="/signin" style={{ color: '#e74c3c', textDecoration: 'none', fontWeight: 'bold' }}>
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
