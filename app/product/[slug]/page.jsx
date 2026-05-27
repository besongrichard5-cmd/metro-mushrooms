"use client";
import React, { useState, useEffect } from 'react';
import { PRODUCTS as STATIC_PRODUCTS } from '@/constants/data';
import { useParams } from 'next/navigation';
import { useCart } from '@/context/CartContext';

export default function ProductDetail() {
  const params = useParams();
  const slug = params.slug;
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch('/api/products');
        if (res.ok) {
          const data = await res.json();
          const pList = data.products.length > 0 ? data.products : STATIC_PRODUCTS;
          setProduct(pList.find(p => p.name.toLowerCase().replace(/\s+/g, '-') === slug));
        } else {
          setProduct(STATIC_PRODUCTS.find(p => p.name.toLowerCase().replace(/\s+/g, '-') === slug));
        }
      } catch (error) {
        setProduct(STATIC_PRODUCTS.find(p => p.name.toLowerCase().replace(/\s+/g, '-') === slug));
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [slug]);

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedAmount, setSelectedAmount] = useState('');

  useEffect(() => {
    if (product) {
      setSelectedAmount(product.options?.[0]?.amount || '');
    }
  }, [product]);
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);

  if (loading) {
    return (
      <main style={{ backgroundColor: '#000', minHeight: '100dvh', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <h1>Loading...</h1>
      </main>
    );
  }

  if (!product) {
    return (
      <main style={{ backgroundColor: '#000', minHeight: '100dvh', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <h1>Product not found</h1>
      </main>
    );
  }

  const currentPrice = product.options?.find(opt => opt.amount === selectedAmount)?.price || product.price;

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedAmount);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  return (
    <main style={{ backgroundColor: '#000', minHeight: '100dvh', color: 'white' }}>
      {/* Background Effect */}
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, background: 'linear-gradient(to bottom, #000 0%, #000d14 100%)' }} />

      <section style={{ position: 'relative', zIndex: 1, padding: 'clamp(100px, 20vh, 150px) 20px 80px 20px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '40px', alignItems: 'start' }}>
            {/* Images Section */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ width: '100%', height: '400px', borderRadius: '10px', overflow: 'hidden', backgroundColor: '#111' }}>
                <img 
                  src={product.images?.[activeImageIndex] || product.images?.[0]} 
                  alt={`${product.name} image ${activeImageIndex + 1}`}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  onError={(e) => { e.target.src = '/placeholder-mushroom.jpg'; }}
                />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxHeight: '260px', overflowY: 'auto', paddingRight: '4px' }}>
                {product.images?.map((img, idx) => (
                  <div
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    style={{
                      width: '100%',
                      height: '80px',
                      borderRadius: '8px',
                      overflow: 'hidden',
                      backgroundColor: '#111',
                      cursor: 'pointer',
                      border: idx === activeImageIndex ? '2px solid #e74c3c' : '2px solid transparent',
                      transition: 'border-color 0.3s',
                      boxShadow: idx === activeImageIndex ? '0 0 0 1px rgba(231, 76, 60, 0.2)' : 'none'
                    }}
                  >
                    <img 
                      src={img} 
                      alt={`${product.name} ${idx + 1}`}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      onError={(e) => { e.target.src = '/placeholder-mushroom.jpg'; }}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Details Section */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
              <div>
                <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: '900', marginBottom: '10px', margin: 0 }}>
                  {product.name}
                </h1>
                <p style={{ color: '#7f8c8d', fontSize: '1rem' }}>
                  Category: {product.category}
                </p>
              </div>

              <div style={{ borderTop: '2px solid #e74c3c', borderBottom: '2px solid #e74c3c', padding: '20px 0' }}>
                <p style={{ fontSize: '1.2rem', color: '#bdc3c7', marginBottom: '15px', margin: 0, whiteSpace: 'pre-wrap' }}>
                  {(product.fullDescription || product.description).split(/(\*\*.*?\*\*)/).map((part, i) => {
                    if (part.startsWith('**') && part.endsWith('**')) {
                      return <strong key={i} style={{ color: '#e74c3c' }}>{part.slice(2, -2)}</strong>;
                    }
                    return part;
                  })}
                </p>
              </div>

              {/* Amount Selection */}
              <div>
                <label style={{ display: 'block', fontSize: '1rem', fontWeight: 'bold', marginBottom: '12px', color: '#ecf0f1' }}>
                  {product.optionLabel || 'Choose an option'}
                </label>
                <select 
                  value={selectedAmount} 
                  onChange={(e) => setSelectedAmount(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px 15px',
                    backgroundColor: '#111',
                    color: '#ecf0f1',
                    border: '2px solid #e74c3c',
                    borderRadius: '5px',
                    fontSize: '1rem',
                    cursor: 'pointer',
                    transition: 'all 0.3s',
                    fontWeight: '500'
                  }}
                >
                  {product.options?.map((opt, idx) => (
                    <option key={idx} value={opt.amount}>
                      {opt.amount} - ${opt.price.toFixed(2)}
                    </option>
                  ))}
                </select>
              </div>

              {/* Price Display */}
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px' }}>
                <span style={{ fontSize: 'clamp(1.5rem, 4vw, 2.5rem)', fontWeight: 'bold', color: '#e74c3c' }}>
                  ${currentPrice.toFixed(2)}
                </span>
                <span style={{ color: '#7f8c8d', textDecoration: 'line-through', fontSize: '1rem' }}>
                  ${(currentPrice * 1.2).toFixed(2)}
                </span>
              </div>

              {/* Quantity Selector */}
              <div>
                <label style={{ display: 'block', fontSize: '1rem', fontWeight: 'bold', marginBottom: '12px', color: '#ecf0f1' }}>
                  Quantity
                </label>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0',
                  backgroundColor: '#111',
                  borderRadius: '5px',
                  border: '2px solid #e74c3c',
                  width: 'fit-content'
                }}>
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    style={{
                      backgroundColor: 'transparent',
                      border: 'none',
                      color: '#e74c3c',
                      fontSize: '1.5rem',
                      padding: '10px 15px',
                      cursor: 'pointer',
                      transition: 'all 0.3s',
                      fontWeight: 'bold'
                    }}
                    onMouseOver={(e) => { e.target.style.backgroundColor = '#e74c3c'; e.target.style.color = '#000'; }}
                    onMouseOut={(e) => { e.target.style.backgroundColor = 'transparent'; e.target.style.color = '#e74c3c'; }}
                  >
                    −
                  </button>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    style={{
                      backgroundColor: 'transparent',
                      border: 'none',
                      color: '#ecf0f1',
                      fontSize: '1.2rem',
                      padding: '10px 15px',
                      textAlign: 'center',
                      width: '60px',
                      fontWeight: 'bold'
                    }}
                  />
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    style={{
                      backgroundColor: 'transparent',
                      border: 'none',
                      color: '#e74c3c',
                      fontSize: '1.5rem',
                      padding: '10px 15px',
                      cursor: 'pointer',
                      transition: 'all 0.3s',
                      fontWeight: 'bold'
                    }}
                    onMouseOver={(e) => { e.target.style.backgroundColor = '#e74c3c'; e.target.style.color = '#000'; }}
                    onMouseOut={(e) => { e.target.style.backgroundColor = 'transparent'; e.target.style.color = '#e74c3c'; }}
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Add to Cart Button */}
              <button
                onClick={handleAddToCart}
                style={{
                  width: '100%',
                  padding: 'clamp(12px, 3vw, 18px)',
                  backgroundColor: '#e74c3c',
                  color: 'white',
                  fontSize: 'clamp(1rem, 2vw, 1.2rem)',
                  fontWeight: 'bold',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                  textTransform: 'uppercase',
                  letterSpacing: '1px'
                }}
                onMouseOver={(e) => { e.target.style.backgroundColor = '#c0392b'; e.target.style.transform = 'scale(1.02)'; }}
                onMouseOut={(e) => { e.target.style.backgroundColor = '#e74c3c'; e.target.style.transform = 'scale(1)'; }}
              >
                {addedToCart ? '✓ Added to Cart' : 'Add to Cart'}
              </button>

              {/* Additional Info */}
              <div style={{ padding: '20px', backgroundColor: 'rgba(231, 76, 60, 0.1)', borderRadius: '5px', borderLeft: '4px solid #e74c3c' }}>
                <p style={{ margin: 0, color: '#bdc3c7', fontSize: '0.95rem', lineHeight: '1.6' }}>
                  ✓ Discreet shipping available<br/>
                  ✓ 100% satisfaction guaranteed<br/>
                  ✓ For educational and research purposes only
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
