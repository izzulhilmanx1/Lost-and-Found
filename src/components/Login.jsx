import React, { useState } from 'react';

const Login = ({ onLogin, onClose }) => {
  const [role, setRole] = useState('claimant');

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(role);
  };

  return (
    <div style={overlayStyle}>
      <div className="glass-panel" style={modalStyle}>
        <button onClick={onClose} style={closeButtonStyle}>×</button>
        <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Login</h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>
          Please select a role to simulate login.
        </p>

        <form onSubmit={handleSubmit}>
          <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
            <button 
              type="button"
              className={`btn ${role === 'claimant' ? 'btn-primary' : 'btn-secondary'}`}
              style={{ flex: 1 }}
              onClick={() => setRole('claimant')}
            >
              Claimant (Student/Staff)
            </button>
            <button 
              type="button"
              className={`btn ${role === 'security' ? 'btn-primary' : 'btn-secondary'}`}
              style={{ flex: 1 }}
              onClick={() => setRole('security')}
            >
              Security Staff (Admin)
            </button>
          </div>
          
          <label>Username</label>
          <input type="text" className="form-control" defaultValue={role === 'claimant' ? 'student123' : 'admin'} required />

          <label>Password</label>
          <input type="password" className="form-control" defaultValue="password" required />

          <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem', padding: '1rem' }}>
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

const overlayStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.7)',
  backdropFilter: 'blur(5px)',
  zIndex: 1000,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '1rem',
};

const modalStyle = {
  width: '100%',
  maxWidth: '500px',
  padding: '2.5rem',
  position: 'relative',
};

const closeButtonStyle = {
  position: 'absolute',
  top: '1.5rem',
  right: '1.5rem',
  background: 'none',
  border: 'none',
  color: 'var(--text-muted)',
  fontSize: '2rem',
  cursor: 'pointer',
  lineHeight: 1,
};

export default Login;
