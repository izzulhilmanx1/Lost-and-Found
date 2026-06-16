import React from 'react';

const AdminDashboard = ({ items, onApproveClaim, onRejectClaim, onDisposeItem }) => {
  // Only show items that are Under Review
  const pendingClaims = items.filter(item => item.status === 'Under Review');
  
  // Flag items older than 30 days that are still Available
  // For mock purposes, let's just say any Available item older than '2026-05-15' is flagged
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  
  const flaggedItems = items.filter(item => {
    if (item.status !== 'Available') return false;
    const itemDate = new Date(item.date);
    return itemDate < thirtyDaysAgo;
  });

  return (
    <section style={dashboardStyle} id="admin-dashboard">
      <div className="container">
        <h2 style={{ fontSize: '2.5rem', marginBottom: '2rem', color: 'var(--accent)' }}>Security Staff Dashboard</h2>
        
        <div style={panelStyle}>
          <h3 style={sectionTitleStyle}>Pending Claims (Physical Matrix Card Verification Required)</h3>
          {pendingClaims.length > 0 ? (
            <table style={tableStyle}>
              <thead>
                <tr>
                  <th>Ref #</th>
                  <th>Item Title</th>
                  <th>Claimant ID</th>
                  <th>Proof Provided</th>
                  <th>Supporting Doc</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {pendingClaims.map(item => (
                  <tr key={item.id}>
                    <td>{item.refNumber}</td>
                    <td>{item.title}</td>
                    <td>{item.claimData?.matricCard || 'N/A'}</td>
                    <td>{item.claimData?.proofDescription || 'N/A'}</td>
                    <td>
                      {item.claimData?.supportingDocUrl ? (
                        <a href={item.claimData.supportingDocUrl} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent)', fontSize: '0.9rem', textDecoration: 'underline' }}>
                          View Doc
                        </a>
                      ) : (
                        <span style={{ color: 'var(--text-muted)' }}>None</span>
                      )}
                    </td>
                    <td>
                      <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <button 
                          className="btn btn-primary" 
                          style={{ padding: '0.3rem 0.6rem', fontSize: '0.8rem' }}
                          onClick={() => onApproveClaim(item.id)}
                        >
                          Verify & Approve
                        </button>
                        <button 
                          className="btn btn-secondary" 
                          style={{ padding: '0.3rem 0.6rem', fontSize: '0.8rem', background: 'rgba(239, 68, 68, 0.2)' }}
                          onClick={() => onRejectClaim(item.id)}
                        >
                          Reject
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p style={{ color: 'var(--text-muted)' }}>No pending claims to review.</p>
          )}
        </div>

        <div style={panelStyle}>
          <h3 style={{ ...sectionTitleStyle, color: '#f87171' }}>Automated Lifecycle (Items &gt; 30 Days Old)</h3>
          {flaggedItems.length > 0 ? (
            <table style={tableStyle}>
              <thead>
                <tr>
                  <th>Ref #</th>
                  <th>Item Title</th>
                  <th>Date Found</th>
                  <th>Location</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {flaggedItems.map(item => (
                  <tr key={item.id}>
                    <td>{item.refNumber}</td>
                    <td>{item.title}</td>
                    <td>{item.date}</td>
                    <td>{item.location}</td>
                    <td>
                      <button 
                        className="btn btn-secondary" 
                        style={{ padding: '0.3rem 0.6rem', fontSize: '0.8rem' }}
                        onClick={() => onDisposeItem(item.id)}
                      >
                        Confirm Disposal/Donation
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p style={{ color: 'var(--text-muted)' }}>No items require disposal at this time.</p>
          )}
        </div>
      </div>
    </section>
  );
};

const dashboardStyle = {
  padding: '6rem 0',
  minHeight: '100vh',
};

const panelStyle = {
  background: 'rgba(25, 25, 35, 0.7)',
  backdropFilter: 'blur(12px)',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  borderRadius: '16px',
  padding: '2rem',
  marginBottom: '2rem',
};

const sectionTitleStyle = {
  fontSize: '1.5rem',
  marginBottom: '1.5rem',
  borderBottom: '1px solid rgba(255,255,255,0.1)',
  paddingBottom: '0.5rem',
};

const tableStyle = {
  width: '100%',
  borderCollapse: 'collapse',
  textAlign: 'left',
};

export default AdminDashboard;
