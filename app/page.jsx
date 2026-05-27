"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { PRODUCTS as STATIC_PRODUCTS, POSTS } from '@/constants/data';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('/api/products');
        if (res.ok) {
          const data = await res.json();
          setProducts(data.products.length > 0 ? data.products : STATIC_PRODUCTS);
        } else {
          setProducts(STATIC_PRODUCTS);
        }
      } catch (error) {
        setProducts(STATIC_PRODUCTS);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);
  return (
    <main style={{ backgroundColor: '#000', minHeight: '100dvh' }}>
      {/* --- HERO SECTION --- */}
      <section style={{ 
        position: 'relative',
        height: '100dvh', 
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        color: 'white'
      }}>
        <video autoPlay loop muted playsInline
          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 0, opacity: 0.8 }}>
          <source src="/bgvideo.mp4" type="video/mp4" />
        </video>
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'radial-gradient(circle, rgba(0,13,20,0.5) 0%, rgba(0,0,0,0.8) 100%)', zIndex: 1 }} />
        
        <div className="animate-fade-in" style={{ position: 'relative', zIndex: 2, padding: '20px', textAlign: 'center', maxWidth: '900px', width: '100%' }}>
          <h1 style={{ fontSize: 'clamp(2.5rem, 10vw, 5rem)', marginBottom: '1rem', lineHeight: '1', fontWeight: '900', letterSpacing: '-2px', textShadow: '0px 10px 30px rgba(0,0,0,0.5)' }}>
            WELCOME TO <span style={{ color: '#e74c3c' }}>METRO</span> <br/>
            <span style={{ color: '#fff' }}>MUSHROOMS</span> 🍄
          </h1>
          <div style={{ fontSize: 'clamp(1rem, 3vw, 1.25rem)', lineHeight: '1.6', maxWidth: '700px', margin: '0 auto', color: '#ecf0f1' }}>
            <p className="animate-float" style={{ marginBottom: '2rem', fontWeight: '500' }}>
              Spreading <strong>accurate information</strong> about magic mushrooms to help you make informed decisions.
            </p>
            <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/shop" style={{ textDecoration: 'none' }}>
                <button style={{ padding: '16px 40px', fontSize: '1.1rem', backgroundColor: '#e74c3c', color: 'white', border: 'none', borderRadius: '12px', fontWeight: '900', cursor: 'pointer', boxShadow: '0 8px 20px 0 rgba(231, 76, 60, 0.4)' }} className="hover-scale">
                  VIEW SHOP
                </button>
              </Link>
              <Link href="/about" style={{ textDecoration: 'none' }}>
                <button style={{ padding: '16px 40px', fontSize: '1.1rem', backgroundColor: 'rgba(255,255,255,0.05)', color: 'white', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '12px', fontWeight: '900', cursor: 'pointer', backdropFilter: 'blur(10px)' }} className="hover-border">
                  LEARN MORE
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* --- PRODUCTS SECTION --- */}
      <section style={{ padding: '100px 20px', backgroundColor: '#000d14' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <h2 style={{ fontSize: '3rem', fontWeight: '900', color: 'white' }}>FEATURED <span style={{ color: '#e74c3c' }}>PRODUCTS</span></h2>
            <p style={{ color: '#bdc3c7', fontSize: '1.1rem' }}>Premium quality, curated for your journey.</p>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '30px' }}>
            {loading ? (
              <p style={{ color: '#bdc3c7', textAlign: 'center', width: '100%' }}>Loading products...</p>
            ) : (
              products.slice(0, 3).map(product => (
                <ProductCard key={product._id || product.id} product={product} />
              ))
            )}
          </div>

          <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <Link href="/shop" style={{ color: '#e74c3c', fontWeight: 'bold', textDecoration: 'none', fontSize: '1.1rem' }}>
              View All Products →
            </Link>
          </div>
        </div>
      </section>

      {/* --- TESTIMONIALS/POSTS SECTION --- */}
      <section style={{ padding: '100px 20px', backgroundColor: '#000', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <h2 style={{ fontSize: '3rem', fontWeight: '900', color: 'white' }}>COMMUNITY <span style={{ color: '#e74c3c' }}>POSTS</span></h2>
            <p style={{ color: '#bdc3c7', fontSize: '1.1rem' }}>How Metro Mushrooms has helped others.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '25px' }}>
            {POSTS.map(post => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <Link href="/posts" style={{ color: '#e74c3c', fontWeight: 'bold', textDecoration: 'none', fontSize: '1.1rem' }}>
              Read All Posts →
            </Link>
          </div>
        </div>
      </section>

      <style jsx>{`
        .hover-scale:hover { transform: translateY(-5px); background-color: #c0392b !important; }
        .hover-border:hover { border-color: #e74c3c !important; color: #e74c3c !important; background: rgba(231, 76, 60, 0.1) !important; }
      `}</style>
    </main>
  );
}

function ProductCard({ product }) {
  return (
    <div className="glass-card" style={{ padding: '0', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
      <div style={{ height: '220px', width: '100%', overflow: 'hidden' }}>
        <img src={product.images?.[0] ?? product.image} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s' }} className="product-img" />
      </div>
      <div style={{ padding: '25px', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
          <span style={{ fontSize: '0.8rem', color: '#e74c3c', fontWeight: 'bold', textTransform: 'uppercase' }}>{product.category}</span>
          <span style={{ fontWeight: '900', color: 'white' }}>${product.price.toFixed(2)}</span>
        </div>
        <h3 style={{ fontSize: '1.4rem', color: 'white', marginBottom: '15px' }}>{product.name}</h3>
        <p style={{ color: '#bdc3c7', fontSize: '0.9rem', lineHeight: '1.6', marginBottom: '20px', flex: 1 }}>{product.description}</p>
        <button style={{ width: '100%', padding: '12px', backgroundColor: '#e74c3c', border: 'none', color: 'white', fontWeight: 'bold', borderRadius: '8px', cursor: 'pointer' }}>
          Add to Cart
        </button>
      </div>
      <style jsx>{`
        .glass-card:hover .product-img { transform: scale(1.1); }
      `}</style>
    </div>
  );
}

function PostCard({ post }) {
  return (
    <div className="glass-card" style={{ padding: '30px', position: 'relative' }}>
      <div style={{ fontSize: '3rem', position: 'absolute', top: '10px', right: '20px', color: 'rgba(231, 76, 60, 0.2)', fontFamily: 'serif' }}>“</div>
      <div style={{ display: 'flex', gap: '15px', alignItems: 'center', marginBottom: '20px' }}>
        <div style={{ width: '45px', height: '45px', borderRadius: '50%', backgroundColor: '#e74c3c', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', color: 'white' }}>
          {post.user[0]}
        </div>
        <div>
          <h4 style={{ color: 'white', margin: 0 }}>{post.user}</h4>
          <span style={{ fontSize: '0.8rem', color: '#7f8c8d' }}>{post.date}</span>
        </div>
      </div>
      <p style={{ color: '#ecf0f1', lineHeight: '1.8', fontStyle: 'italic', marginBottom: '20px' }}>"{post.content}"</p>
      <div style={{ color: '#e74c3c', fontSize: '0.85rem', fontWeight: 'bold' }}>
        Product: {post.product}
      </div>
    </div>
  );
}