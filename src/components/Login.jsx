import React, { useState } from 'react';

const Login = ({ onLogin, onClose }) => {
  const [role, setRole] = useState('claimant');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const password = formData.get('password');
    
    // Simulate invalid login if user types 'fail' or leaves it empty
    if (!password || password.toLowerCase() === 'fail') {
      setError('Invalid username or password. Please verify your credentials and try again.');
      return;
    }
    
    setError('');
    onLogin(role);
  };

  return (
    <div style={overlayStyle}>
      <div className="glass-panel" style={modalStyle}>
        <button onClick={onClose} style={closeButtonStyle}>×</button>
        <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Login</h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>
          {/* Please select a role to simulate login. (Type 'fail' in password to see error) */}
        </p>

        {error && (
          <div style={errorStyle}>
            ⚠️ {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
            <button 
              type="button"
              className={`btn ${role === 'claimant' ? 'btn-primary' : 'btn-secondary'}`}
              style={{ flex: 1 }}
              onClick={() => { setRole('claimant'); setError(''); }}
            >
              Claimant (Student/Staff)
            </button>
            <button 
              type="button"
              className={`btn ${role === 'security' ? 'btn-primary' : 'btn-secondary'}`}
              style={{ flex: 1 }}
              onClick={() => { setRole('security'); setError(''); }}
            >
              Security Staff (Admin)
            </button>
          </div>
          
          <label>Username / Student ID</label>
          <input type="text" name="username" className="form-control" defaultValue={role === 'claimant' ? 'CB25000' : 'admin'} required />

          <label>Password</label>
          <input type="password" name="password" className="form-control" defaultValue="password" required />

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', marginTop: '0.5rem' }}>
            <input type="checkbox" id="rememberMe" name="rememberMe" />
            <label htmlFor="rememberMe" style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.9rem', cursor: 'pointer' }}>Remember Me</label>
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem', padding: '1rem' }}>
            Secure Login
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

const errorStyle = {
  background: 'rgba(239, 68, 68, 0.1)',
  border: '1px solid rgba(239, 68, 68, 0.3)',
  color: '#fca5a5',
  padding: '1rem',
  borderRadius: '8px',
  marginBottom: '1.5rem',
  fontSize: '0.9rem',
};

export default Login;
