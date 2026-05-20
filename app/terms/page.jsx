"use client";
import React from 'react';

export default function Terms() {
  return (
    <main style={{ backgroundColor: '#000', minHeight: '100dvh', color: 'white' }}>
      {/* Video Background */}
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, overflow: 'hidden' }}>
        <video
          autoPlay
          loop
          muted
          playsInline
          style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.3 }}
        >
          <source src="/bgvideo.mp4" type="video/mp4" />
        </video>
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'linear-gradient(to bottom, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.95) 100%)' }} />
      </div>

      <section style={{ position: 'relative', zIndex: 1, padding: '120px 20px 60px 20px', maxWidth: '850px', margin: '0 auto' }}>
        <div className="animate-fade-in">
          <h1 style={{ fontSize: 'clamp(2rem, 6vw, 3.5rem)', fontWeight: '900', marginBottom: '1rem', textAlign: 'center' }}>
            Terms & <span style={{ color: '#e74c3c' }}>Conditions</span>
          </h1>
          <p style={{ textAlign: 'center', color: '#bdc3c7', marginBottom: '3rem' }}>Last Updated: May 2026</p>
          
          <div className="glass-card" style={{ padding: '40px', lineHeight: '1.8', color: '#ecf0f1' }}>
            <p style={{ marginBottom: '2rem' }}>
              Welcome to <strong>[METRO-MUSHROOMS]</strong>. These Terms and Conditions outline the rules and regulations for the use of our website and the purchase of our products. By accessing this website and placing an order, you engage in our "Service" and agree to be bound by the following terms.
            </p>

            <hr style={{ borderColor: 'rgba(255,255,255,0.1)', marginBottom: '2rem' }} />

            <section style={{ marginBottom: '2.5rem' }}>
              <h2 style={{ color: '#e74c3c', fontSize: '1.5rem', marginBottom: '1rem' }}>1. General Conditions</h2>
              <p>
                By agreeing to these Terms and Conditions, you represent that you are at least the age of majority in your state or province of residence. We reserve the right to refuse service to anyone for any reason at any time.
              </p>
            </section>

            <section style={{ marginBottom: '2.5rem' }}>
              <h2 style={{ color: '#e74c3c', fontSize: '1.5rem', marginBottom: '1rem' }}>2. Payment Terms</h2>
              <p style={{ fontWeight: 'bold', marginBottom: '1rem' }}>
                To ensure streamlined processing and security, payment must be made in full before any order is dispatched.
              </p>
              <ul style={{ paddingLeft: '20px', listStyleType: 'disc' }}>
                <li>All transactions are processed through secure payment gateways.</li>
                <li>Orders will only enter the fulfillment stage once payment confirmation is received.</li>
                <li>We do not offer "Cash on Delivery" (COD) services.</li>
              </ul>
            </section>

            <section style={{ marginBottom: '2.5rem' }}>
              <h2 style={{ color: '#e74c3c', fontSize: '1.5rem', marginBottom: '1rem' }}>3. Shipping and Delivery</h2>
              <p>We pride ourselves on providing efficient and reliable logistics for our customers.</p>
              <ul style={{ paddingLeft: '20px', listStyleType: 'disc', marginTop: '1rem' }}>
                <li><strong>Doorstep Delivery:</strong> We provide direct shipping to the address provided at checkout. It is the customer's responsibility to ensure the accuracy of the shipping address.</li>
                <li><strong>Speed:</strong> We utilize expedited shipping methods to ensure your products arrive as quickly as possible.</li>
                <li><strong>Discretion:</strong> We understand the importance of privacy. All orders are packaged in <em>plain, unmarked boxes</em> with no external indication of the contents to ensure a discreet delivery process.</li>
              </ul>
            </section>

            <section style={{ marginBottom: '2.5rem' }}>
              <h2 style={{ color: '#e74c3c', fontSize: '1.5rem', marginBottom: '1rem' }}>4. Refund and Return Policy</h2>
              <p>We want you to be satisfied with your purchase. However, due to the nature of our products, the following rules apply:</p>
              <ul style={{ paddingLeft: '20px', listStyleType: 'disc', marginTop: '1rem' }}>
                <li><strong>Refund Eligibility:</strong> Refunds are considered on a case-by-case basis (e.g., if the product is damaged during transit or the wrong item is received).</li>
                <li><strong>Reporting Issues:</strong> Any claims for damaged or missing items must be submitted to our support team within <strong>48 hours</strong> of the recorded delivery time.</li>
                <li><strong>Process:</strong> If a refund is approved, it will be processed back to your original method of payment within a certain amount of days.</li>
                <li><strong>Shipping Costs:</strong> Original shipping charges are non-refundable.</li>
              </ul>
            </section>

            <section style={{ marginBottom: '2.5rem' }}>
              <h2 style={{ color: '#e74c3c', fontSize: '1.5rem', marginBottom: '1rem' }}>5. Product Disclaimer</h2>
              <p>
                The products sold on this website are intended for <strong>Medical Use (e.g., PTSD, DEPRESSION, ANXIETY), culinary, educational, or microscopy</strong> purposes only. 
                We do not take responsibility for the misuse of our products. It is the customer's responsibility to ensure that the purchase and possession of these products comply with their local, state, and federal laws.
              </p>
            </section>

            <section style={{ marginBottom: '2.5rem' }}>
              <h2 style={{ color: '#e74c3c', fontSize: '1.5rem', marginBottom: '1rem' }}>6. Modifications to Prices and Service</h2>
              <p>
                Prices for our products are subject to change without notice. We reserve the right at any time to modify or discontinue the Service (or any part or content thereof) without notice at any time.
              </p>
            </section>

            <hr style={{ borderColor: 'rgba(255,255,255,0.1)', marginBottom: '2rem' }} />

            <section style={{ textAlign: 'center' }}>
              <h3 style={{ marginBottom: '1rem' }}>Contact Information</h3>
              <p>If you have any questions about these Terms and Conditions, please contact us at:</p>
              <p style={{ color: '#e74c3c', fontWeight: 'bold', fontSize: '1.2rem' }}>support@metro-mushrooms.com</p>
            </section>
          </div>
        </div>
      </section>
    </main>
  );
}
