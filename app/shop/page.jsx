"use client";
import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { PRODUCTS } from '@/constants/data';

export default function Shop() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = useMemo(() => {
    const cats = ["All", ...new Set(PRODUCTS.map(p => p.category))];
    return cats;
  }, []);

  const filteredProducts = useMemo(() => {
    if (selectedCategory === "All") return PRODUCTS;
    return PRODUCTS.filter(p => p.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <main style={{ backgroundColor: '#000', minHeight: '100dvh', color: 'white' }}>
      {/* Background Effect */}
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, background: 'linear-gradient(to bottom, #000d14 0%, #000000 100%)' }} />

      <section style={{ position: 'relative', zIndex: 1, padding: '150px 20px 80px 20px' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <h1 style={{ fontSize: 'clamp(2.5rem, 8vw, 4.5rem)', fontWeight: '900', marginBottom: '1rem' }}>
              OUR <span style={{ color: '#e74c3c' }}>SHOP</span>
            </h1>
            <p style={{ color: '#bdc3c7', fontSize: '1.2rem', maxWidth: '800px', margin: '0 auto' }}>
              Explore our comprehensive collection of over 30 premium mushroom varieties, gourmet extracts, and cultivation supplies.
            </p>
          </div>

          {/* Category Filter */}
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            gap: '10px', 
            marginBottom: '60px', 
            flexWrap: 'wrap',
            padding: '10px',
            background: 'rgba(255,255,255,0.02)',
            borderRadius: '20px',
            backdropFilter: 'blur(5px)',
            border: '1px solid rgba(255,255,255,0.05)'
          }}>
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                style={{
                  padding: '10px 24px',
                  borderRadius: '12px',
                  border: 'none',
                  backgroundColor: selectedCategory === cat ? '#e74c3c' : 'transparent',
                  color: selectedCategory === cat ? 'white' : '#bdc3c7',
                  fontWeight: 'bold',
                  fontSize: '0.9rem',
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                  boxShadow: selectedCategory === cat ? '0 4px 15px rgba(231, 76, 60, 0.4)' : 'none'
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Product Grid */}
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', 
            gap: '35px' 
          }}>
            {filteredProducts.map(product => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div style={{ textAlign: 'center', padding: '100px', color: '#bdc3c7' }}>
              <p style={{ fontSize: '1.5rem' }}>No products found in this category.</p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

function ProductCard({ product }) {
  const coverImage = product.images?.[0] ?? product.image;

  return (
    <div className="glass-card animate-fade-in" style={{ padding: '0', overflow: 'hidden', display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div style={{ height: '260px', width: '100%', overflow: 'hidden', position: 'relative' }}>
        <img 
          src={coverImage} 
          alt={product.name} 
          style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.6s' }} 
          className="product-img" 
        />
        <div style={{ 
          position: 'absolute', 
          top: '15px', 
          right: '15px', 
          padding: '6px 12px', 
          background: 'rgba(0,0,0,0.6)', 
          backdropFilter: 'blur(5px)', 
          borderRadius: '8px',
          fontSize: '0.8rem',
          fontWeight: 'bold',
          color: '#e74c3c',
          border: '1px solid rgba(231, 76, 60, 0.3)'
        }}>
          {product.category}
        </div>
      </div>
      <div style={{ padding: '30px', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '15px' }}>
          <h3 style={{ fontSize: '1.5rem', color: 'white', margin: 0, fontWeight: '900' }}>{product.name}</h3>
          <span style={{ fontSize: '1.3rem', fontWeight: '900', color: '#e74c3c' }}>${product.price.toFixed(2)}</span>
        </div>
        <p style={{ color: '#bdc3c7', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '25px', flex: 1 }}>
          {product.description}
        </p>
        <Link href={`/product/${product.name.toLowerCase().replace(/\s+/g, '-')}`} style={{ textDecoration: 'none', width: '100%' }}>
          <button style={{
            width: '100%',
            padding: '14px',
            marginBottom: '14px',
            backgroundColor: '#111',
            border: '1px solid rgba(231, 76, 60, 0.45)',
            color: 'white',
            fontWeight: '900',
            borderRadius: '12px',
            cursor: 'pointer',
            boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.05)',
            transition: 'all 0.3s',
            letterSpacing: '1px'
          }} className="hover-scale">
            VIEW IMAGES
          </button>
        </Link>
        <Link href={`/product/${product.name.toLowerCase().replace(/\s+/g, '-')}`} style={{ textDecoration: 'none', width: '100%' }}>
          <button style={{
            width: '100%',
            padding: '14px',
            backgroundColor: '#e74c3c',
            border: 'none',
            color: 'white',
            fontWeight: '900',
            borderRadius: '12px',
            cursor: 'pointer',
            transition: 'all 0.3s',
            letterSpacing: '1px'
          }} className="hover-scale">
            ADD TO CART
          </button>
        </Link>
      </div>
      <style jsx>{`
        .glass-card:hover .product-img { transform: scale(1.1); }
        .hover-scale:hover { transform: translateY(-3px); background-color: #c0392b !important; box-shadow: 0 8px 25px rgba(231, 76, 60, 0.5) !important; }
      `}</style>
    </div>
  );
}
