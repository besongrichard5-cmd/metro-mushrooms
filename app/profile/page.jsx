"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { useSession } from 'next-auth/react';

export default function ProfilePage() {
  const { data: session } = useSession();
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (session?.user) {
      setUser({
        fullName: session.user.name,
        email: session.user.email,
        image: session.user.image,
        createdAt: null // Session doesn't provide this by default
      });
    } else {
      const userStr = localStorage.getItem('currentUser');
      if (userStr) {
        setUser(JSON.parse(userStr));
      }
    }
  }, [session]);

  if (!user) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#000',
        color: 'white',
        fontFamily: 'Inter, sans-serif'
      }}>
        <h1 style={{ fontSize: '2rem', marginBottom: '20px' }}>Please Sign In</h1>
        <Link href="/signin" style={{
          padding: '12px 24px',
          backgroundColor: '#e74c3c',
          color: 'white',
          textDecoration: 'none',
          borderRadius: '8px',
          fontWeight: 'bold'
        }}>
          Sign In
        </Link>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#000',
      color: 'white',
      padding: '120px 20px 60px',
      fontFamily: 'Inter, sans-serif'
    }}>
      <div style={{
        maxWidth: '800px',
        margin: '0 auto',
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        borderRadius: '24px',
        padding: '40px',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(10px)'
      }}>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '20px',
          marginBottom: '40px'
        }}>
          {user.image ? (
            <img 
              src={user.image} 
              alt={user.fullName} 
              style={{
                width: '120px',
                height: '120px',
                borderRadius: '50%',
                border: '4px solid #e74c3c',
                objectFit: 'cover'
              }}
            />
          ) : (
            <div style={{
              width: '120px',
              height: '120px',
              borderRadius: '50%',
              backgroundColor: '#e74c3c',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '3rem',
              fontWeight: 'bold',
              color: 'white',
              boxShadow: '0 0 20px rgba(231, 76, 60, 0.3)'
            }}>
              {user.fullName ? user.fullName.charAt(0).toUpperCase() : 'U'}
            </div>
          )}
          
          <div style={{ textAlign: 'center' }}>
            <h1 style={{ fontSize: '2.5rem', fontWeight: '900', marginBottom: '5px' }}>{user.fullName}</h1>
            <p style={{ color: '#bdc3c7', fontSize: '1.1rem' }}>{user.email}</p>
          </div>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '20px',
          marginTop: '20px'
        }}>
          <div style={{
            padding: '20px',
            backgroundColor: 'rgba(255, 255, 255, 0.03)',
            borderRadius: '16px',
            border: '1px solid rgba(255, 255, 255, 0.05)'
          }}>
            <h3 style={{ color: '#bdc3c7', fontSize: '0.9rem', marginBottom: '10px' }}>Account Type</h3>
            <p style={{ fontSize: '1.1rem', fontWeight: 'bold' }}>Free Member</p>
          </div>
          <div style={{
            padding: '20px',
            backgroundColor: 'rgba(255, 255, 255, 0.03)',
            borderRadius: '16px',
            border: '1px solid rgba(255, 255, 255, 0.05)'
          }}>
            <h3 style={{ color: '#bdc3c7', fontSize: '0.9rem', marginBottom: '10px' }}>Joined</h3>
            <p style={{ fontSize: '1.1rem', fontWeight: 'bold' }}>{user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'Recently'}</p>
          </div>
        </div>

        <div style={{ marginTop: '40px', display: 'flex', gap: '15px' }}>
          <Link href="/shop" style={{
            flex: 1,
            padding: '14px',
            backgroundColor: '#e74c3c',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '12px',
            textAlign: 'center',
            fontWeight: 'bold',
            transition: 'all 0.3s'
          }}>
            Go to Shop
          </Link>
          <Link href="/" style={{
            flex: 1,
            padding: '14px',
            backgroundColor: 'transparent',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '12px',
            textAlign: 'center',
            fontWeight: 'bold',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            transition: 'all 0.3s'
          }}>
            Back Home
          </Link>
        </div>
      </div>
    </div>
  );
}
