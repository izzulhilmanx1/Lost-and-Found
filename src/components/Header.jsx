import React from 'react';

const Header = ({ userRole, onLogout, onLoginClick, onReportClick, onBrowseClick, onDashboardClick }) => {
  return (
    <header style={headerStyle} className="glass">
      <div className="container" style={containerStyle}>
        <div style={logoStyle}>
          <img src="/images/umpsa_logo.png" alt="UMPSA Logo" style={{ height: '60px', marginRight: '15px', backgroundColor: 'white', padding: '6px', borderRadius: '8px' }} />
          <span className="text-gradient" style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
            Campus Hub
          </span>
        </div>
        <nav style={navStyle}>
          <button className="btn btn-secondary" onClick={onBrowseClick} style={navBtnStyle}>
            Browse
          </button>
          
          {userRole === 'security' && (
            <button className="btn btn-secondary" onClick={onDashboardClick} style={navBtnStyle}>
              Admin Dashboard
            </button>
          )}

          <button className="btn btn-primary" onClick={onReportClick} style={navBtnStyle}>
            Guest Report
          </button>

          {userRole === 'guest' ? (
            <button className="btn btn-secondary" onClick={onLoginClick} style={navBtnStyle}>
              Login
            </button>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginLeft: '1rem' }}>
              <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                Logged in as: <strong>{userRole}</strong>
              </span>
              <button className="btn btn-secondary" onClick={onLogout} style={{ padding: '0.5rem 1rem' }}>
                Logout
              </button>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

const headerStyle = {
  position: 'fixed',
  top: '0',
  left: '0',
  right: '0',
  zIndex: 100,
  borderTop: 'none',
  borderLeft: 'none',
  borderRight: 'none',
  borderRadius: '0',
};

const containerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  height: '80px',
};

const logoStyle = {
  display: 'flex',
  alignItems: 'center',
};

const navStyle = {
  display: 'flex',
  alignItems: 'center',
};

const navBtnStyle = {
  marginRight: '0.5rem',
  padding: '0.5rem 1rem',
};

export default Header;
