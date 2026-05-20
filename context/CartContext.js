"use client";
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const { data: session } = useSession();
  const [cartItems, setCartItems] = useState([]);
  const [userId, setUserId] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // Initialize or fetch cart
  useEffect(() => {
    let currentUserId = null;
    if (session?.user?.email) {
      currentUserId = session.user.email; // Use email as unique ID for logged in users
    } else {
      // Use local storage for guest users
      let guestId = localStorage.getItem('guest_cart_id');
      if (!guestId) {
        guestId = 'guest_' + Math.random().toString(36).substr(2, 9);
        localStorage.setItem('guest_cart_id', guestId);
      }
      currentUserId = guestId;
    }
    
    setUserId(currentUserId);
    
    // Fetch cart from backend
    if (currentUserId) {
      fetch(`/api/cart?userId=${currentUserId}`)
        .then(res => res.json())
        .then(data => {
          if (data.success && data.cart) {
            setCartItems(data.cart.items);
          } else {
            // No cart found or error, initialize empty
            setCartItems([]);
          }
          setIsLoaded(true);
        })
        .catch(err => {
          console.error("Failed to fetch cart:", err);
          setIsLoaded(true);
        });
    }
  }, [session]);

  // Save cart to backend whenever it changes
  useEffect(() => {
    if (isLoaded && userId) {
      fetch('/api/cart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, items: cartItems })
      }).catch(err => console.error("Failed to save cart:", err));
    }
  }, [cartItems, isLoaded, userId]);

  const addToCart = (product, quantity = 1, selectedFlavor = '') => {
    setCartItems(prev => {
      // Check if item already exists with same flavor
      const existingItemIndex = prev.findIndex(item => item.id === product.id && item.selectedFlavor === selectedFlavor);
      
      if (existingItemIndex >= 0) {
        const newCart = [...prev];
        newCart[existingItemIndex].quantity += quantity;
        return newCart;
      } else {
        const price = product.options?.find(opt => opt.amount === selectedFlavor)?.price || product.price;
        const image = product.images?.[0] || product.image;
        
        return [...prev, {
          id: product.id,
          name: product.name,
          price: price,
          quantity: quantity,
          image: image,
          selectedFlavor: selectedFlavor || product.options?.[0]?.amount || ''
        }];
      }
    });
  };

  const removeFromCart = (id, selectedFlavor = '') => {
    setCartItems(prev => prev.filter(item => !(item.id === id && item.selectedFlavor === selectedFlavor)));
  };

  const updateQuantity = (id, selectedFlavor, newQuantity) => {
    if (newQuantity < 1) return;
    setCartItems(prev => {
      const newCart = [...prev];
      const itemIndex = newCart.findIndex(item => item.id === id && item.selectedFlavor === selectedFlavor);
      if (itemIndex >= 0) {
        newCart[itemIndex].quantity = newQuantity;
      }
      return newCart;
    });
  };

  const clearCart = () => setCartItems([]);

  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);
  const totalPrice = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);

  return (
    <CartContext.Provider value={{ 
      cartItems, 
      addToCart, 
      removeFromCart, 
      updateQuantity, 
      clearCart,
      totalItems,
      totalPrice,
      userId
    }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
