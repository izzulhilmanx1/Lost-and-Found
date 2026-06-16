import React, { useState } from 'react';

const ClaimModal = ({ item, onClose, onSubmitClaim }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const file = formData.get('supportingDoc');
    let docUrl = null;
    if (file && file.size > 0) {
      docUrl = URL.createObjectURL(file);
    }
    
    // Simulate submission
    onSubmitClaim(item.id, {
      matricCard: formData.get('matricCard'),
      proofDescription: formData.get('proofDescription'),
      supportingDocUrl: docUrl
    });
    
    alert('Claim request submitted successfully! Security Staff will review it shortly.');
    onClose();
  };

  return (
    <div style={overlayStyle}>
      <div className="glass-panel" style={modalStyle}>
        <button onClick={onClose} style={closeButtonStyle}>×</button>
        <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Submit Claim Request</h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
          You are claiming: <strong>{item.title} (Ref: {item.refNumber})</strong>
        </p>

        <div style={warningStyle}>
          ⚠️ <strong>Security Notice:</strong> You must present your physical Matrix Card to Campus Security upon approval to finalize the handover.
        </div>

        <form onSubmit={handleSubmit}>
          <label>UMPSA Matrix Card ID</label>
          <input type="text" name="matricCard" className="form-control" placeholder="e.g., CB25000" required />

          <label>Proof of Ownership (Description)</label>
          <textarea 
            name="proofDescription" 
            className="form-control" 
            rows="4" 
            placeholder="Describe unique features, what was inside, password lock screen details, etc." 
            required>
          </textarea>

          <label>Upload Supporting Documents (Optional)</label>
          <input type="file" name="supportingDoc" className="form-control" style={{ paddingTop: '0.6rem' }} />

          <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
            <button type="button" className="btn btn-secondary" style={{ flex: 1 }} onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>
              Submit Proof
            </button>
          </div>
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
  maxWidth: '600px',
  padding: '2.5rem',
  position: 'relative',
  maxHeight: '90vh',
  overflowY: 'auto',
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

const warningStyle = {
  background: 'rgba(239, 68, 68, 0.1)',
  border: '1px solid rgba(239, 68, 68, 0.3)',
  color: '#fca5a5',
  padding: '1rem',
  borderRadius: '8px',
  marginBottom: '2rem',
  fontSize: '0.9rem',
};

export default ClaimModal;
