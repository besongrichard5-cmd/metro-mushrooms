"use client";
import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function AdminDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [activeTab, setActiveTab] = useState('products');
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const [editingProduct, setEditingProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (status === 'loading') return;
    if (!session || session.user.email !== 'opararichard47@gmail.com') {
      router.push('/');
    } else {
      fetchData();
    }
  }, [session, status]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [prodRes, ordRes] = await Promise.all([
        fetch('/api/products'),
        fetch('/api/orders')
      ]);
      if (prodRes.ok) {
        const pData = await prodRes.json();
        setProducts(pData.products || []);
      }
      if (ordRes.ok) {
        const oData = await ordRes.json();
        setOrders(oData.orders || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const seedProducts = async () => {
    if (confirm("Are you sure you want to seed products? This will only work if the DB is empty.")) {
      const res = await fetch('/api/products/seed', { method: 'POST' });
      const data = await res.json();
      alert(data.message || 'Error seeding');
      if (res.ok) fetchData();
    }
  };

  const handleEdit = (product) => {
    setEditingProduct({ ...product, optionsStr: JSON.stringify(product.options, null, 2) });
    setIsModalOpen(true);
  };

  const handleAddNew = () => {
    setEditingProduct({
      name: '',
      category: '',
      price: 0,
      description: '',
      fullDescription: '',
      images: [''],
      optionLabel: 'Options',
      optionsStr: '[]'
    });
    setIsModalOpen(true);
  };

  const handleSaveProduct = async (e) => {
    e.preventDefault();
    try {
      let parsedOptions = [];
      try {
        parsedOptions = JSON.parse(editingProduct.optionsStr);
      } catch (e) {
        alert("Invalid JSON for options");
        return;
      }
      const payload = {
        name: editingProduct.name,
        category: editingProduct.category,
        price: Number(editingProduct.price),
        description: editingProduct.description,
        fullDescription: editingProduct.fullDescription,
        images: Array.isArray(editingProduct.images) ? editingProduct.images : editingProduct.images.split(',').map(s=>s.trim()),
        optionLabel: editingProduct.optionLabel,
        options: parsedOptions
      };

      const url = editingProduct._id ? `/api/products/${editingProduct._id}` : `/api/products`;
      const method = editingProduct._id ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        setIsModalOpen(false);
        fetchData();
      } else {
        const err = await res.json();
        alert(err.error || 'Failed to save');
      }
    } catch (err) {
      console.error(err);
      alert('Error saving product');
    }
  };

  const handleDeleteProduct = async (id) => {
    if (confirm("Are you sure you want to delete this product?")) {
      const res = await fetch(`/api/products/${id}`, { method: 'DELETE' });
      if (res.ok) fetchData();
    }
  };

  if (status === 'loading' || loading) {
    return (
      <main style={{ minHeight: '100vh', background: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
        <h2>Loading Admin Dashboard...</h2>
      </main>
    );
  }

  if (!session || session.user.email !== 'opararichard47@gmail.com') return null;

  return (
    <main style={{ minHeight: '100vh', backgroundColor: '#000', color: 'white', paddingTop: '100px', fontFamily: 'Inter, sans-serif' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
        <h1 style={{ fontSize: '3rem', fontWeight: '900', color: '#e74c3c', marginBottom: '10px' }}>ADMIN PANEL</h1>
        <p style={{ color: '#bdc3c7', marginBottom: '40px' }}>Welcome, {session.user.name}.</p>

        <div style={{ display: 'flex', gap: '20px', marginBottom: '30px' }}>
          <button 
            onClick={() => setActiveTab('products')}
            style={{ padding: '12px 24px', backgroundColor: activeTab === 'products' ? '#e74c3c' : '#111', color: 'white', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}
          >
            Manage Products
          </button>
          <button 
            onClick={() => setActiveTab('orders')}
            style={{ padding: '12px 24px', backgroundColor: activeTab === 'orders' ? '#e74c3c' : '#111', color: 'white', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}
          >
            View Orders
          </button>
        </div>

        {activeTab === 'products' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
              <button onClick={handleAddNew} style={{ padding: '10px 20px', backgroundColor: '#2ecc71', color: '#000', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}>+ Add New Product</button>
              {products.length === 0 && (
                <button onClick={seedProducts} style={{ padding: '10px 20px', backgroundColor: '#3498db', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}>Seed Demo Products</button>
              )}
            </div>

            <div style={{ background: '#111', borderRadius: '12px', overflow: 'hidden' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ background: 'rgba(255,255,255,0.05)', textAlign: 'left' }}>
                    <th style={{ padding: '15px', color: '#bdc3c7' }}>Name</th>
                    <th style={{ padding: '15px', color: '#bdc3c7' }}>Category</th>
                    <th style={{ padding: '15px', color: '#bdc3c7' }}>Price</th>
                    <th style={{ padding: '15px', color: '#bdc3c7' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map(p => (
                    <tr key={p._id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                      <td style={{ padding: '15px' }}>{p.name}</td>
                      <td style={{ padding: '15px' }}>{p.category}</td>
                      <td style={{ padding: '15px', color: '#2ecc71', fontWeight: 'bold' }}>${p.price.toFixed(2)}</td>
                      <td style={{ padding: '15px', display: 'flex', gap: '10px' }}>
                        <button onClick={() => handleEdit(p)} style={{ padding: '6px 12px', backgroundColor: '#f39c12', color: '#000', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>Edit</button>
                        <button onClick={() => handleDeleteProduct(p._id)} style={{ padding: '6px 12px', backgroundColor: '#e74c3c', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>Delete</button>
                      </td>
                    </tr>
                  ))}
                  {products.length === 0 && (
                    <tr><td colSpan="4" style={{ padding: '20px', textAlign: 'center', color: '#7f8c8d' }}>No products found.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'orders' && (
          <div>
            <div style={{ background: '#111', borderRadius: '12px', overflow: 'hidden' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ background: 'rgba(255,255,255,0.05)', textAlign: 'left' }}>
                    <th style={{ padding: '15px', color: '#bdc3c7' }}>Customer</th>
                    <th style={{ padding: '15px', color: '#bdc3c7' }}>Email</th>
                    <th style={{ padding: '15px', color: '#bdc3c7' }}>Total</th>
                    <th style={{ padding: '15px', color: '#bdc3c7' }}>Status</th>
                    <th style={{ padding: '15px', color: '#bdc3c7' }}>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map(o => (
                    <tr key={o._id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                      <td style={{ padding: '15px' }}>{o.customerName}</td>
                      <td style={{ padding: '15px' }}>{o.customerEmail}</td>
                      <td style={{ padding: '15px', color: '#2ecc71', fontWeight: 'bold' }}>${o.totalAmount.toFixed(2)}</td>
                      <td style={{ padding: '15px' }}>
                        <span style={{ padding: '4px 8px', borderRadius: '4px', fontSize: '0.8rem', fontWeight: 'bold', background: o.status === 'pending' ? 'rgba(243, 156, 18, 0.2)' : 'rgba(46, 204, 113, 0.2)', color: o.status === 'pending' ? '#f39c12' : '#2ecc71' }}>
                          {o.status.toUpperCase()}
                        </span>
                      </td>
                      <td style={{ padding: '15px', color: '#7f8c8d' }}>{new Date(o.createdAt).toLocaleDateString()}</td>
                    </tr>
                  ))}
                  {orders.length === 0 && (
                    <tr><td colSpan="5" style={{ padding: '20px', textAlign: 'center', color: '#7f8c8d' }}>No orders found.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {isModalOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.8)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ background: '#111', padding: '30px', borderRadius: '12px', width: '90%', maxWidth: '600px', maxHeight: '90vh', overflowY: 'auto', border: '1px solid rgba(255,255,255,0.1)' }}>
            <h2 style={{ marginBottom: '20px', color: '#e74c3c' }}>{editingProduct._id ? 'Edit Product' : 'Add New Product'}</h2>
            <form onSubmit={handleSaveProduct} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '5px', color: '#bdc3c7' }}>Name</label>
                <input required type="text" value={editingProduct.name} onChange={e => setEditingProduct({...editingProduct, name: e.target.value})} style={{ width: '100%', padding: '10px', background: '#000', border: '1px solid rgba(255,255,255,0.2)', color: '#fff', borderRadius: '4px' }} />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '5px', color: '#bdc3c7' }}>Category</label>
                <input required type="text" value={editingProduct.category} onChange={e => setEditingProduct({...editingProduct, category: e.target.value})} style={{ width: '100%', padding: '10px', background: '#000', border: '1px solid rgba(255,255,255,0.2)', color: '#fff', borderRadius: '4px' }} />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '5px', color: '#bdc3c7' }}>Base Price</label>
                <input required type="number" step="0.01" value={editingProduct.price} onChange={e => setEditingProduct({...editingProduct, price: e.target.value})} style={{ width: '100%', padding: '10px', background: '#000', border: '1px solid rgba(255,255,255,0.2)', color: '#fff', borderRadius: '4px' }} />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '5px', color: '#bdc3c7' }}>Short Description</label>
                <input required type="text" value={editingProduct.description} onChange={e => setEditingProduct({...editingProduct, description: e.target.value})} style={{ width: '100%', padding: '10px', background: '#000', border: '1px solid rgba(255,255,255,0.2)', color: '#fff', borderRadius: '4px' }} />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '5px', color: '#bdc3c7' }}>Full Description</label>
                <textarea required rows="4" value={editingProduct.fullDescription} onChange={e => setEditingProduct({...editingProduct, fullDescription: e.target.value})} style={{ width: '100%', padding: '10px', background: '#000', border: '1px solid rgba(255,255,255,0.2)', color: '#fff', borderRadius: '4px', fontFamily: 'inherit' }} />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '5px', color: '#bdc3c7' }}>Images (Comma separated paths/URLs)</label>
                <input type="text" value={Array.isArray(editingProduct.images) ? editingProduct.images.join(', ') : editingProduct.images} onChange={e => setEditingProduct({...editingProduct, images: e.target.value})} style={{ width: '100%', padding: '10px', background: '#000', border: '1px solid rgba(255,255,255,0.2)', color: '#fff', borderRadius: '4px' }} />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '5px', color: '#bdc3c7' }}>Options (JSON Format: [{`{"amount":"3.5g","price":60}`}] )</label>
                <textarea rows="4" value={editingProduct.optionsStr} onChange={e => setEditingProduct({...editingProduct, optionsStr: e.target.value})} style={{ width: '100%', padding: '10px', background: '#000', border: '1px solid rgba(255,255,255,0.2)', color: '#fff', borderRadius: '4px', fontFamily: 'monospace' }} />
              </div>
              <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                <button type="submit" style={{ flex: 1, padding: '12px', background: '#e74c3c', color: '#fff', border: 'none', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer' }}>Save Product</button>
                <button type="button" onClick={() => setIsModalOpen(false)} style={{ flex: 1, padding: '12px', background: '#555', color: '#fff', border: 'none', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer' }}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}
