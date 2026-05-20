"use client";
import React, { useState, useEffect } from 'react';
import { POSTS } from '@/constants/data';

export default function Posts() {
  const [posts, setPosts] = useState(POSTS);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [newPost, setNewPost] = useState({
    user: '',
    content: '',
    product: '',
    rating: 5,
  });

  useEffect(() => {
    const savedPosts = localStorage.getItem('metro_mushrooms_posts');
    if (savedPosts) {
      try {
        setPosts(JSON.parse(savedPosts));
      } catch (e) {
        console.error('Failed to parse posts', e);
      }
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newPost.user || !newPost.content || !newPost.product) return;
    
    const randomTime = Math.floor(Math.random() * 5) + 1;
    const timeUnit = Math.random() > 0.5 ? 'days' : 'weeks';
    const gender = Math.random() > 0.5 ? 'men' : 'women';
    const randomId = Math.floor(Math.random() * 99) + 1;
    
    const postToAdd = {
      id: Date.now(),
      user: newPost.user,
      content: newPost.content,
      product: newPost.product,
      rating: newPost.rating,
      date: `${randomTime} ${timeUnit} ago`,
      profilePic: `https://randomuser.me/api/portraits/${gender}/${randomId}.jpg`
    };

    const updatedPosts = [postToAdd, ...posts];
    setPosts(updatedPosts);
    localStorage.setItem('metro_mushrooms_posts', JSON.stringify(updatedPosts));
    
    setNewPost({ user: '', content: '', product: '', rating: 5 });
    setIsFormVisible(false);
  };

  return (
    <main style={{ backgroundColor: '#000', minHeight: '100dvh', color: 'white' }}>
      {/* Background Effect */}
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, background: 'linear-gradient(to bottom, #000 0%, #000d14 100%)' }} />

      <section style={{ position: 'relative', zIndex: 1, padding: '150px 20px 80px 20px' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '80px' }}>
            <h1 style={{ fontSize: 'clamp(2.5rem, 8vw, 4rem)', fontWeight: '900', marginBottom: '1rem' }}>
              COMMUNITY <span style={{ color: '#e74c3c' }}>STORIES</span>
            </h1>
            <p style={{ color: '#bdc3c7', fontSize: '1.2rem' }}>
              Real people, real experiences. Read how Metro Mushrooms is making an impact.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
            {posts.map(post => (
              <div key={post.id} className="glass-card animate-fade-in" style={{ padding: '40px', borderLeft: '4px solid #e74c3c' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '25px', flexWrap: 'wrap', gap: '20px' }}>
                  <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                    <img src={post.profilePic} alt={post.user} style={{ width: '60px', height: '60px', borderRadius: '50%', objectFit: 'cover' }} />
                    <div>
                      <h3 style={{ color: 'white', margin: 0, fontSize: '1.4rem' }}>{post.user}</h3>
                      <div style={{ display: 'flex', gap: '5px', marginTop: '5px' }}>
                        {[...Array(5)].map((_, i) => (
                          <span key={i} style={{ color: i < post.rating ? '#e74c3c' : '#333' }}>★</span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <span style={{ color: '#7f8c8d', fontSize: '0.9rem' }}>Posted {post.date}</span>
                </div>
                
                <p style={{ color: '#ecf0f1', lineHeight: '2', fontSize: '1.1rem', fontStyle: 'italic', marginBottom: '25px' }}>
                  "{post.content}"
                </p>
                
                <div style={{ display: 'inline-block', padding: '8px 16px', backgroundColor: 'rgba(231, 76, 60, 0.1)', border: '1px solid rgba(231, 76, 60, 0.3)', borderRadius: '20px', fontSize: '0.9rem', color: '#e74c3c', fontWeight: 'bold' }}>
                  Product Experience: {post.product}
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: '80px', textAlign: 'center', padding: '60px', borderRadius: '20px', background: 'rgba(231, 76, 60, 0.05)', border: '1px dashed rgba(231, 76, 60, 0.3)' }}>
            <h3 style={{ fontSize: '1.8rem', marginBottom: '15px' }}>Have a story to share?</h3>
            <p style={{ color: '#bdc3c7', marginBottom: '25px' }}>Your experience could help others on their path to wellness.</p>
            {!isFormVisible ? (
              <button 
                onClick={() => setIsFormVisible(true)}
                style={{ padding: '14px 35px', backgroundColor: '#e74c3c', border: 'none', color: 'white', fontWeight: 'bold', borderRadius: '10px', cursor: 'pointer', transition: 'all 0.3s ease' }}>
                SUBMIT YOUR POST
              </button>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px', maxWidth: '500px', margin: '0 auto', textAlign: 'left', animation: 'fadeIn 0.3s ease' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '5px', color: '#bdc3c7' }}>Name</label>
                  <input 
                    type="text" 
                    value={newPost.user} 
                    onChange={e => setNewPost({...newPost, user: e.target.value})} 
                    style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #333', background: '#0a0a0a', color: 'white', fontSize: '1rem', outline: 'none' }} 
                    required 
                  />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '5px', color: '#bdc3c7' }}>Product Used</label>
                  <input 
                    type="text" 
                    value={newPost.product} 
                    onChange={e => setNewPost({...newPost, product: e.target.value})} 
                    style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #333', background: '#0a0a0a', color: 'white', fontSize: '1rem', outline: 'none' }} 
                    required 
                  />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '5px', color: '#bdc3c7' }}>Rating (1-5)</label>
                  <input 
                    type="number" 
                    min="1" 
                    max="5" 
                    value={newPost.rating} 
                    onChange={e => setNewPost({...newPost, rating: parseInt(e.target.value)})} 
                    style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #333', background: '#0a0a0a', color: 'white', fontSize: '1rem', outline: 'none' }} 
                    required 
                  />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '5px', color: '#bdc3c7' }}>Your Story</label>
                  <textarea 
                    value={newPost.content} 
                    onChange={e => setNewPost({...newPost, content: e.target.value})} 
                    style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #333', background: '#0a0a0a', color: 'white', minHeight: '120px', fontSize: '1rem', outline: 'none', resize: 'vertical' }} 
                    required 
                  />
                </div>
                <div style={{ display: 'flex', gap: '15px', justifyContent: 'flex-end', marginTop: '10px' }}>
                  <button 
                    type="button" 
                    onClick={() => setIsFormVisible(false)} 
                    style={{ padding: '12px 24px', backgroundColor: 'transparent', border: '1px solid #e74c3c', color: '#e74c3c', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    style={{ padding: '12px 24px', backgroundColor: '#e74c3c', border: 'none', color: 'white', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>
                    Submit Post
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
