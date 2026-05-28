"use client";
import React, { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { useSession } from 'next-auth/react';
import Link from 'next/link';

export default function CartPage() {
  const { cartItems, updateQuantity, removeFromCart, totalPrice, clearCart, userId } = useCart();
  const { data: session } = useSession();
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    customerName: session?.user?.name || '',
    customerEmail: session?.user?.email || '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCheckout = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const orderData = {
        userId: userId,
        customerName: formData.customerName,
        customerEmail: formData.customerEmail,
        shippingAddress: {
          street: formData.street,
          city: formData.city,
          state: formData.state,
          zipCode: formData.zipCode,
          country: formData.country,
        },
        // --- FIXED DATA MAPPING HERE ---
        items: cartItems.map((item) => ({
          id: item._id || item.id, // Maps MongoDB's _id or item.id safely to 'id'
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          image: item.image || '',
          selectedFlavor: item.selectedFlavor || ''
        })),
        totalAmount: totalPrice
      };

      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData)
      });

      const data = await res.json();

      if (data.success) {
        setOrderPlaced(true);
        clearCart();
      } else {
        setError(data.error || 'Failed to place order');
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (orderPlaced) {
    return (
      <main style={{ backgroundColor: '#000', minHeight: '100dvh', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', padding: '20px', textAlign: 'center' }}>
        <div style={{ fontSize: '4rem', marginBottom: '20px' }}>🍄</div>
        <h1 style={{ fontSize: '3rem', color: '#e74c3c', marginBottom: '20px', fontWeight: '900' }}>Order Received!</h1>
        <p style={{ fontSize: '1.2rem', color: '#bdc3c7', maxWidth: '600px', marginBottom: '30px' }}>
          Thank you for your purchase. We have received your order and will begin processing it shortly. You will receive an email confirmation soon.
        </p>
        <Link href="/shop" style={{ padding: '12px 24px', backgroundColor: '#111', color: 'white', textDecoration: 'none', borderRadius: '8px', border: '1px solid #e74c3c', fontWeight: 'bold' }}>
          CONTINUE SHOPPING
        </Link>
      </main>
    );
  }

  return (
    <main style={{ backgroundColor: '#000', minHeight: '100dvh', color: 'white', paddingTop: '100px', paddingBottom: '50px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
        <h1 style={{ fontSize: '3rem', fontWeight: '900', marginBottom: '40px', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '20px' }}>
          YOUR <span style={{ color: '#e74c3c' }}>CART</span>
        </h1>

        {cartItems.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '100px 0' }}>
            <h2 style={{ color: '#bdc3c7', marginBottom: '20px' }}>Your cart is currently empty.</h2>
            <Link href="/shop" style={{ padding: '12px 24px', backgroundColor: '#e74c3c', color: 'white', textDecoration: 'none', borderRadius: '8px', fontWeight: 'bold' }}>
              RETURN TO SHOP
            </Link>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '40px' }}>
            {/* Cart Items List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {cartItems.map((item, index) => (
                <div key={index} style={{ display: 'flex', gap: '20px', backgroundColor: '#111', padding: '15px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.05)' }}>
                  <div style={{ width: '100px', height: '100px', borderRadius: '8px', overflow: 'hidden' }}>
                    <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={(e) => { e.target.src = '/placeholder-mushroom.jpg'; }} />
                  </div>
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div>
                      <h3 style={{ margin: '0 0 5px 0', fontSize: '1.2rem' }}>{item.name}</h3>
                      {item.selectedFlavor && <p style={{ margin: 0, color: '#bdc3c7', fontSize: '0.9rem' }}>Variant: {item.selectedFlavor}</p>}
                      <p style={{ margin: '5px 0 0 0', color: '#e74c3c', fontWeight: 'bold' }}>${item.price.toFixed(2)}</p>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', backgroundColor: '#222', borderRadius: '5px' }}>
                        <button onClick={() => updateQuantity(item.id, item.selectedFlavor, item.quantity - 1)} style={{ background: 'none', border: 'none', color: 'white', padding: '5px 10px', cursor: 'pointer' }}>-</button>
                        <span>{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, item.selectedFlavor, item.quantity + 1)} style={{ background: 'none', border: 'none', color: 'white', padding: '5px 10px', cursor: 'pointer' }}>+</button>
                      </div>
                      <button onClick={() => removeFromCart(item.id, item.selectedFlavor)} style={{ background: 'none', border: 'none', color: '#e74c3c', cursor: 'pointer', textDecoration: 'underline', fontSize: '0.9rem' }}>Remove</button>
                    </div>
                  </div>
                </div>
              ))}
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '20px', backgroundColor: '#111', borderRadius: '10px', marginTop: '20px', border: '1px solid rgba(231, 76, 60, 0.3)' }}>
                <span style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>Total</span>
                <span style={{ fontSize: '1.5rem', fontWeight: '900', color: '#e74c3c' }}>${totalPrice.toFixed(2)}</span>
              </div>
            </div>

            {/* Checkout Form */}
            <div style={{ backgroundColor: '#111', padding: '30px', borderRadius: '10px', height: 'fit-content' }}>
              <h2 style={{ margin: '0 0 20px 0', fontSize: '1.5rem', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '10px' }}>Shipping Details</h2>
              {error && <div style={{ backgroundColor: 'rgba(231, 76, 60, 0.2)', color: '#e74c3c', padding: '10px', borderRadius: '5px', marginBottom: '20px', border: '1px solid #e74c3c' }}>{error}</div>}
              
              <form onSubmit={handleCheckout} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <Input type="text" name="customerName" placeholder="Full Name" value={formData.customerName} onChange={handleChange} required />
                <Input type="email" name="customerEmail" placeholder="Email Address" value={formData.customerEmail} onChange={handleChange} required />
                <Input type="text" name="street" placeholder="Street Address" value={formData.street} onChange={handleChange} required />
                <div style={{ display: 'flex', gap: '15px' }}>
                  <Input type="text" name="city" placeholder="City" value={formData.city} onChange={handleChange} required />
                  <Input type="text" name="state" placeholder="State/Province" value={formData.state} onChange={handleChange} required />
                </div>
                <div style={{ display: 'flex', gap: '15px' }}>
                  <Input type="text" name="zipCode" placeholder="ZIP/Postal Code" value={formData.zipCode} onChange={handleChange} required />
                  <div style={{ width: '100%' }}>
                    <input 
                      type="text" 
                      name="country" 
                      list="country-list"
                      placeholder="Search Country..." 
                      value={formData.country} 
                      onChange={handleChange} 
                      required 
                      style={{
                        padding: '12px 15px',
                        backgroundColor: '#222',
                        border: '1px solid rgba(255,255,255,0.1)',
                        borderRadius: '5px',
                        color: 'white',
                        width: '100%',
                        outline: 'none',
                        boxSizing: 'border-box'
                      }}
                      onFocus={(e) => e.target.style.borderColor = '#e74c3c'}
                      onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                    />
                    <datalist id="country-list">
                      <option value="United States">United States</option>
                      <option value="Canada">Canada</option>
                      <option value="United Kingdom">United Kingdom</option>
                      <option value="Australia">Australia</option>
                      <option value="Germany">Germany</option>
                      <option value="France">France</option>
                      <option value="Italy">Italy</option>
                      <option value="Spain">Spain</option>
                      <option value="Brazil">Brazil</option>
                      <option value="Mexico">Mexico</option>
                      <option value="Japan">Japan</option>
                      <option value="China">China</option>
                      <option value="India">India</option>
                      <option value="South Africa">South Africa</option>
                      <option value="Nigeria">Nigeria</option>
                      <option value="Argentina">Argentina</option>
                      <option value="Netherlands">Netherlands</option>
                      <option value="Sweden">Sweden</option>
                      <option value="Switzerland">Switzerland</option>
                      <option value="New Zealand">New Zealand</option>
                      <option value="Ireland">Ireland</option>
                      <option value="Norway">Norway</option>
                      <option value="Denmark">Denmark</option>
                      <option value="Finland">Finland</option>
                      <option value="Austria">Austria</option>
                      <option value="Belgium">Belgium</option>
                      <option value="Portugal">Portugal</option>
                      <option value="Greece">Greece</option>
                      <option value="Poland">Poland</option>
                      <option value="South Korea">South Korea</option>
                      <option value="Singapore">Singapore</option>
                      <option value="Malaysia">Malaysia</option>
                      <option value="Philippines">Philippines</option>
                      <option value="Thailand">Thailand</option>
                      <option value="Vietnam">Vietnam</option>
                      <option value="Indonesia">Indonesia</option>
                      <option value="Saudi Arabia">Saudi Arabia</option>
                      <option value="United Arab Emirates">United Arab Emirates</option>
                      <option value="Israel">Israel</option>
                      <option value="Turkey">Turkey</option>
                      <option value="Egypt">Egypt</option>
                      <option value="Kenya">Kenya</option>
                      <option value="Ghana">Ghana</option>
                      <option value="Colombia">Colombia</option>
                      <option value="Chile">Chile</option>
                      <option value="Peru">Peru</option>
                      <option value="Venezuela">Venezuela</option>
                      <option value="Ecuador">Ecuador</option>
                      <option value="Uruguay">Uruguay</option>
                      <option value="Bolivia">Bolivia</option>
                      <option value="Paraguay">Paraguay</option>
                    </datalist>
                  </div>
                </div>
                
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  style={{
                    padding: '15px',
                    backgroundColor: isSubmitting ? '#555' : '#e74c3c',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    fontWeight: '900',
                    fontSize: '1.1rem',
                    cursor: isSubmitting ? 'not-allowed' : 'pointer',
                    marginTop: '20px',
                    letterSpacing: '1px'
                  }}
                >
                  {isSubmitting ? 'PROCESSING...' : 'PLACE ORDER'}
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

function Input({ ...props }) {
  return (
    <input 
      {...props} 
      style={{
        padding: '12px 15px',
        backgroundColor: '#222',
        border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: '5px',
        color: 'white',
        width: '100%',
        outline: 'none',
      }}
      onFocus={(e) => e.target.style.borderColor = '#e74c3c'}
      onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
    />
  );
}