"use client";
import React, { useState, useEffect } from 'react';
import Image from "next/image";
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { useCart } from '@/context/CartContext';

export default function Navbar() {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { totalItems } = useCart();

  useEffect(() => {
    if (session?.user) {
      setCurrentUser({
        fullName: session.user.name,
        email: session.user.email,
        image: session.user.image
      });
    } else {
      try {
        const userStr = localStorage.getItem('currentUser');
        if (userStr) {
          setCurrentUser(JSON.parse(userStr));
        } else {
          setCurrentUser(null);
        }
      } catch (err) {
        console.error(err);
      }
    }
  }, [session]);

  const handleLogout = async () => {
    localStorage.removeItem('currentUser');
    setCurrentUser(null);
    setIsProfileOpen(false);
    if (session) {
      await signOut({ callbackUrl: '/' });
    } else {
      window.location.href = '/';
    }
  };

  return (
    <nav style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      zIndex: 100,
      background: 'rgba(0, 13, 20, 0.7)',
      backdropFilter: 'blur(10px)',
      borderBottom: '1px solid rgba(231, 76, 60, 0.2)',
      padding: '15px 30px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }}>
      {/* Logo */}
      <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '12px' }}>
        <Image 
          src="/favicon.ico" 
          alt="Logo" 
          width={35} 
          height={35} 
          style={{ borderRadius: '50%' }}
        />
        <span style={{ 
          color: 'white', 
          fontSize: '1.5rem', 
          fontWeight: '900', 
          letterSpacing: '-1px' 
        }}>
          METRO <span style={{ color: '#e74c3c' }}>MUSHROOMS</span>
        </span>
      </Link>

      {/* Desktop Links */}
      <div style={{ display: 'flex', gap: '25px', alignItems: 'center' }} className="desktop-menu">
        <NavLink href="/">Home</NavLink>
        <NavLink href="/shop">Shop</NavLink>
        <NavLink href="/posts">Posts</NavLink>
        <NavLink href="/about">About</NavLink>
        <NavLink href="/faq">FAQ</NavLink>
        
        <Link href="/cart" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', position: 'relative' }}>
          <span style={{ fontSize: '1.5rem' }}>🛒</span>
          {totalItems > 0 && (
            <span style={{
              position: 'absolute',
              top: '-8px',
              right: '-10px',
              backgroundColor: '#e74c3c',
              color: 'white',
              borderRadius: '50%',
              padding: '2px 6px',
              fontSize: '0.75rem',
              fontWeight: 'bold',
              minWidth: '20px',
              textAlign: 'center'
            }}>
              {totalItems}
            </span>
          )}
        </Link>
        
        {currentUser ? (
          <div style={{ position: 'relative', marginLeft: '10px' }}>
            <div
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                backgroundColor: '#bdc3c7',
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                userSelect: 'none',
                overflow: 'hidden',
                border: currentUser.image ? '2px solid #e74c3c' : 'none'
              }}
            >
              {currentUser.image ? (
                <img 
                  src={currentUser.image} 
                  alt="Profile" 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              ) : (
                <span style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>
                  {currentUser.fullName ? currentUser.fullName.charAt(0).toUpperCase() : 'U'}
                </span>
              )}
            </div>
            
            {isProfileOpen && (
              <div style={{
                position: 'absolute',
                top: '55px',
                right: 0,
                backgroundColor: 'white',
                borderRadius: '8px',
                boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
                padding: '10px',
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
                minWidth: '150px',
                zIndex: 200
              }}>
                <Link href="/profile" style={{ color: '#333', textDecoration: 'none', padding: '5px 10px', fontSize: '0.95rem' }}>
                  My Profile
                </Link>
                <Link href="/posts" style={{ color: '#333', textDecoration: 'none', padding: '5px 10px', fontSize: '0.95rem' }}>
                  Posts
                </Link>
                <button
                  onClick={handleLogout}
                  style={{
                    backgroundColor: '#f84141',
                    color: 'white',
                    border: 'none',
                    padding: '8px',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    fontWeight: 'bold',
                    marginTop: '5px'
                  }}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <div style={{ display: 'flex', gap: '10px', marginLeft: '10px' }}>
            <Link href="/signin" style={{
              color: 'white',
              textDecoration: 'none',
              fontSize: '0.85rem',
              fontWeight: 'bold',
              padding: '8px 16px',
              borderRadius: '8px',
              border: '1px solid rgba(255,255,255,0.2)',
              transition: 'all 0.3s'
            }} className="hover-border">
              Sign In
            </Link>
            <Link href="/signup" style={{
              backgroundColor: '#e74c3c',
              color: 'white',
              textDecoration: 'none',
              fontSize: '0.85rem',
              fontWeight: 'bold',
              padding: '8px 16px',
              borderRadius: '8px',
              boxShadow: '0 4px 10px rgba(231, 76, 60, 0.3)',
              transition: 'all 0.3s'
            }} className="hover-scale">
              Sign Up
            </Link>
          </div>
        )}
      </div>

      {/* Mobile Toggle */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        style={{
          display: 'none',
          background: 'none',
          border: 'none',
          color: 'white',
          fontSize: '1.5rem',
          cursor: 'pointer'
        }}
        className="mobile-toggle"
      >
        {isOpen ? '✕' : '☰'}
      </button>

      {/* Mobile Menu */}
      {isOpen && (
        <div style={{
          position: 'absolute',
          top: '100%',
          left: 0,
          width: '100%',
          background: 'rgba(0, 13, 20, 0.98)',
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '15px',
          borderBottom: '1px solid #e74c3c',
          boxShadow: '0 10px 30px rgba(0,0,0,0.5)'
        }}>
          <NavLink href="/" onClick={() => setIsOpen(false)}>Home</NavLink>
          <NavLink href="/shop" onClick={() => setIsOpen(false)}>Shop</NavLink>
          <NavLink href="/posts" onClick={() => setIsOpen(false)}>Posts</NavLink>
          <NavLink href="/about" onClick={() => setIsOpen(false)}>About</NavLink>
          <NavLink href="/faq" onClick={() => setIsOpen(false)}>FAQ</NavLink>
          <Link href="/cart" onClick={() => setIsOpen(false)} style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold', fontSize: '1rem', display: 'flex', justifyContent: 'space-between' }}>
            Cart <span style={{ color: '#e74c3c' }}>{totalItems > 0 ? `(${totalItems})` : ''}</span>
          </Link>
          <hr style={{ borderColor: 'rgba(255,255,255,0.1)', margin: '5px 0' }} />
          {currentUser ? (
            <>
              <Link href="/profile" onClick={() => setIsOpen(false)} style={{ color: 'white', textDecoration: 'none', fontSize: '1rem' }}>My Profile</Link>
              <button onClick={handleLogout} style={{ color: '#e74c3c', textDecoration: 'none', fontWeight: 'bold', fontSize: '1rem', background: 'none', border: 'none', textAlign: 'left', padding: 0, cursor: 'pointer' }}>Logout</button>
            </>
          ) : (
            <>
              <Link href="/signin" onClick={() => setIsOpen(false)} style={{ color: 'white', textDecoration: 'none', fontSize: '1rem' }}>Sign In</Link>
              <Link href="/signup" onClick={() => setIsOpen(false)} style={{ color: '#e74c3c', textDecoration: 'none', fontWeight: 'bold', fontSize: '1rem' }}>Sign Up</Link>
            </>
          )}
        </div>
      )}

      <style jsx>{`
        @media (max-width: 768px) {
          .desktop-menu { display: none !important; }
          .mobile-toggle { display: block !important; }
        }
        .hover-border:hover { border-color: #e74c3c !important; color: #e74c3c !important; }
        .hover-scale:hover { transform: scale(1.05); background-color: #c0392b !important; }
      `}</style>
    </nav>
  );
}

function NavLink({ href, children, onClick }) {
  return (
    <Link 
      href={href} 
      onClick={onClick}
      style={{
        color: 'white',
        textDecoration: 'none',
        fontWeight: 'bold',
        fontSize: '0.95rem',
        transition: 'color 0.3s'
      }}
      className="nav-link"
    >
      {children}
      <style jsx>{`
        .nav-link:hover { color: #e74c3c !important; }
      `}</style>
    </Link>
  );
}


