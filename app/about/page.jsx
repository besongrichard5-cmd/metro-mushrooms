"use client";
import React from 'react';

export default function About() {
  const healthBenefits = [
    { area: "Treatment-Resistant Depression", observation: "Patients often report a 'reset' effect, feeling a lift in mood that can last weeks or months after a single dose." },
    { area: "Anxiety & End-of-Life Care", observation: "Significant reductions in existential anxiety for patients facing terminal diagnoses." },
    { area: "Addiction Recovery", observation: "Psilocybin has shown high efficacy in helping individuals break cycles of nicotine, alcohol, and opioid dependence." },
    { area: "Neurogenesis", observation: "Studies in animal models suggest psilocybin may help repair brain cells damaged by chronic stress or trauma." }
  ];

  return (
    <main style={{ backgroundColor: '#000', minHeight: '100dvh', color: 'white' }}>
      {/* Video Background */}
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, overflow: 'hidden' }}>
        <video
          autoPlay
          loop
          muted
          playsInline
          style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.4 }}
        >
          <source src="/bgvideo.mp4" type="video/mp4" />
        </video>
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'radial-gradient(circle, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.9) 100%)' }} />
      </div>

      <section style={{ position: 'relative', zIndex: 1, padding: '120px 20px 60px 20px', maxWidth: '1000px', margin: '0 auto' }}>
        <div className="animate-fade-in">
          <h1 style={{ fontSize: 'clamp(2.5rem, 8vw, 4rem)', fontWeight: '900', marginBottom: '2rem', textAlign: 'center' }}>
            About <span style={{ color: '#e74c3c' }}>Metro Mushrooms</span>
          </h1>
          
          <div className="glass-card" style={{ padding: '40px', marginBottom: '40px' }}>
            <p style={{ fontSize: '1.2rem', lineHeight: '1.8', marginBottom: '1.5rem', color: '#ecf0f1' }}>
              Welcome to <strong>Metro Mushrooms</strong>! We’re glad you found us. 
              At Metro Mushrooms, we believe that knowledge is the most important ingredient in any journey. 
              Our mission is simple: to provide clear, honest, and accurate information about magic mushrooms 
              so you can make informed decisions for your own well-being.
            </p>
            <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: '#bdc3c7' }}>
              Whether you are a curious newcomer or a seasoned mycologist, we’ve built this space to be your ultimate digital fungal forest.
            </p>
          </div>

          <h2 style={{ fontSize: '2rem', color: '#e74c3c', marginBottom: '1.5rem' }}>What You’ll Find Here</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px', marginBottom: '60px' }}>
            <div className="glass-card" style={{ padding: '25px' }}>
              <h3 style={{ marginBottom: '15px', color: '#fff' }}>The Experience</h3>
              <p style={{ color: '#bdc3c7', lineHeight: '1.6' }}>
                Dive into the effects of shrooms to understand the science and the soul of the journey. 
                For a more personal perspective, browse our community trip reports.
              </p>
            </div>
            <div className="glass-card" style={{ padding: '25px' }}>
              <h3 style={{ marginBottom: '15px', color: '#fff' }}>The Science</h3>
              <p style={{ color: '#bdc3c7', lineHeight: '1.6' }}>
                Explore the latest research on psilocybin and how it interacts with the human brain 
                to foster significant health improvements.
              </p>
            </div>
          </div>

          <h2 style={{ fontSize: '2rem', color: '#e74c3c', marginBottom: '1.5rem' }}>The Science of Psychedelics: Health and Potential</h2>
          <div className="glass-card" style={{ padding: '40px', marginBottom: '60px' }}>
            <p style={{ lineHeight: '1.8', marginBottom: '2rem', color: '#ecf0f1' }}>
              As research into psilocybin—the primary psychoactive compound in magic mushrooms—undergoes a modern "renaissance," 
              the scientific community is uncovering how these fungi interact with the human brain to foster significant health improvements.
            </p>

            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid #e74c3c' }}>
                    <th style={{ textAlign: 'left', padding: '15px', color: '#e74c3c' }}>Area of Improvement</th>
                    <th style={{ textAlign: 'left', padding: '15px', color: '#e74c3c' }}>Scientific Observation</th>
                  </tr>
                </thead>
                <tbody>
                  {healthBenefits.map((item, index) => (
                    <tr key={index} style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                      <td style={{ padding: '15px', fontWeight: 'bold' }}>{item.area}</td>
                      <td style={{ padding: '15px', color: '#bdc3c7' }}>{item.observation}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <h2 style={{ fontSize: '2rem', color: '#e74c3c', marginBottom: '1.5rem' }}>How Psilocybin Works in the Brain</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', marginBottom: '60px' }}>
            <div className="glass-card" style={{ padding: '25px' }}>
              <h4 style={{ color: '#fff', marginBottom: '10px' }}>The 5-HT2A Receptor</h4>
              <p style={{ color: '#bdc3c7', fontSize: '0.9rem', lineHeight: '1.6' }}>
                Psilocin binds primarily to serotonin 2A receptors. This activation mutes the Default Mode Network (DMN)—the part of the brain associated with the "ego."
              </p>
            </div>
            <div className="glass-card" style={{ padding: '25px' }}>
              <h4 style={{ color: '#fff', marginBottom: '10px' }}>Neuroplasticity</h4>
              <p style={{ color: '#bdc3c7', fontSize: '0.9rem', lineHeight: '1.6' }}>
                Research suggests that psilocybin promotes "synaptogenesis," the growth of new neural connections, helping the brain reorganize itself.
              </p>
            </div>
            <div className="glass-card" style={{ padding: '25px' }}>
              <h4 style={{ color: '#fff', marginBottom: '10px' }}>Functional Connectivity</h4>
              <p style={{ color: '#bdc3c7', fontSize: '0.9rem', lineHeight: '1.6' }}>
                While the DMN is suppressed, other areas of the brain begin to communicate, leading to perspective shifts and "aha!" moments.
              </p>
            </div>
          </div>

          <div className="glass-card" style={{ padding: '40px', borderLeft: '4px solid #e74c3c' }}>
            <h2 style={{ fontSize: '1.8rem', color: '#fff', marginBottom: '1.5rem' }}>Safety and Harmonic Health</h2>
            <p style={{ color: '#bdc3c7', lineHeight: '1.8', marginBottom: '1.5rem' }}>
              While the potential is vast, "scientific" also means acknowledging the variables. Health improvements are most often observed when the following are managed:
            </p>
            <ul style={{ listStyle: 'none', padding: 0, color: '#ecf0f1' }}>
              <li style={{ marginBottom: '15px' }}>🚀 <strong>Set and Setting:</strong> Your internal mindset and physical environment dictate the experience.</li>
              <li style={{ marginBottom: '15px' }}>⚖️ <strong>Dosage Accuracy:</strong> Different species contain varying concentrations. Accuracy is paramount.</li>
              <li style={{ marginBottom: '15px' }}>🧘 <strong>Integration:</strong> Applying insights to daily life is where long-term benefits take root.</li>
            </ul>
            <p style={{ marginTop: '20px', fontStyle: 'italic', color: '#e74c3c' }}>We keep evolving.</p>
          </div>
        </div>
      </section>
    </main>
  );
}
