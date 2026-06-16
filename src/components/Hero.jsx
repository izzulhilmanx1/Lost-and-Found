import React from 'react';

const Hero = ({ onReportClick, onBrowseClick }) => {
  return (
    <section style={heroStyle}>
      <div className="container" style={contentStyle}>
        <img src="/images/umpsa_logo.png" alt="UMPSA Logo" style={{ height: '80px', marginBottom: '1.5rem' }} />
        <h1 style={titleStyle}>
          Centralized Farris <br />
          <span className="text-gradient">Lost & Found</span>
        </h1>
        <p style={subtitleStyle}>
          The official UMPSA Campus Hub to securely report found items and claim your lost belongings. 
        </p>
        <div style={actionsStyle}>
          <button className="btn btn-primary" onClick={onReportClick}>
            Fast Guest Report
          </button>
          <button className="btn btn-secondary" onClick={onBrowseClick}>
            Browse Items
          </button>
        </div>
      </div>
    </section>
  );
};

const heroStyle = {
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  paddingTop: '80px',
  position: 'relative',
  backgroundImage: 'url("/images/hero_background.png")',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
};

const contentStyle = {
  textAlign: 'center',
  position: 'relative',
  zIndex: 10,
  maxWidth: '800px',
  background: 'rgba(10, 10, 15, 0.7)',
  padding: '4rem',
  borderRadius: '24px',
  backdropFilter: 'blur(12px)',
  border: '1px solid rgba(255, 255, 255, 0.1)',
};

const titleStyle = {
  fontSize: '4.5rem',
  lineHeight: 1.1,
  marginBottom: '1.5rem',
};

const subtitleStyle = {
  fontSize: '1.25rem',
  color: 'var(--text-muted)',
  marginBottom: '2.5rem',
  maxWidth: '600px',
  margin: '0 auto 2.5rem auto',
};

const actionsStyle = {
  display: 'flex',
  gap: '1.5rem',
  justifyContent: 'center',
};

export default Hero;
