import React, { useState } from 'react';

const AdminDashboard = ({ items, onApproveClaim, onRejectClaim, onDisposeItem }) => {
  const [itemToDispose, setItemToDispose] = useState(null);

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

  const historicalLogs = items.filter(item => item.status === 'Disposed/Donated');

  const handleDisposeSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const disposalData = {
      method: formData.get('disposalMethod'),
      notes: formData.get('disposalNotes'),
      date: new Date().toISOString().split('T')[0]
    };
    onDisposeItem(itemToDispose.id, disposalData);
    setItemToDispose(null);
  };

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
                        onClick={() => setItemToDispose(item)}
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

        <div style={panelStyle}>
          <h3 style={sectionTitleStyle}>Historical Logs (Cleaned Clutter)</h3>
          {historicalLogs.length > 0 ? (
            <table style={tableStyle}>
              <thead>
                <tr>
                  <th>Ref #</th>
                  <th>Item Title</th>
                  <th>Found Date</th>
                  <th>Disposal Date</th>
                  <th>Method</th>
                  <th>Notes</th>
                </tr>
              </thead>
              <tbody>
                {historicalLogs.map(item => (
                  <tr key={item.id}>
                    <td>{item.refNumber}</td>
                    <td>{item.title}</td>
                    <td>{item.date}</td>
                    <td>{item.disposalData?.date || 'N/A'}</td>
                    <td><span style={{ padding: '0.2rem 0.5rem', background: 'rgba(255,255,255,0.1)', borderRadius: '4px', fontSize: '0.85rem' }}>{item.disposalData?.method || 'Archived'}</span></td>
                    <td style={{ maxWidth: '200px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.disposalData?.notes || 'N/A'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p style={{ color: 'var(--text-muted)' }}>No historical logs available.</p>
          )}
        </div>
      </div>

      {itemToDispose && (
        <div style={overlayStyle}>
          <div className="glass-panel" style={{ width: '100%', maxWidth: '500px', padding: '2.5rem', position: 'relative' }}>
            <h2 style={{ fontSize: '1.8rem', marginBottom: '1rem' }}>Disposal Confirmation</h2>
            <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
              You are about to archive <strong>{itemToDispose.title} ({itemToDispose.refNumber})</strong>. This will remove it from the public gallery.
            </p>
            <form onSubmit={handleDisposeSubmit}>
              <label>Disposal Method</label>
              <select name="disposalMethod" className="form-control" required>
                <option value="">Select Method...</option>
                <option value="Donated to Charity">Donated to Charity</option>
                <option value="Discarded / Trashed">Discarded / Trashed</option>
                <option value="Claimed by Authorities">Claimed by Authorities</option>
                <option value="Other">Other</option>
              </select>

              <label>Administrator Notes / Recipient</label>
              <textarea name="disposalNotes" className="form-control" rows="3" placeholder="e.g., Donated to local orphanage, discarded due to damage..." required></textarea>

              <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
                <button type="button" className="btn btn-secondary" style={{ flex: 1 }} onClick={() => setItemToDispose(null)}>Cancel</button>
                <button type="submit" className="btn btn-primary" style={{ flex: 1, background: '#ef4444', borderColor: '#ef4444' }}>Finalize Disposal</button>
              </div>
            </form>
          </div>
        </div>
      )}
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

export default AdminDashboard;
