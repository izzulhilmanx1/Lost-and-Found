import React, { useState } from 'react';

const ReportForm = ({ onClose, onReportSubmit }) => {
  const [isAnonymous, setIsAnonymous] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Simulate Unique Reference Number Generation (LF-YYYY-XXXXX)
    const year = new Date().getFullYear();
    const randomStr = Math.random().toString(36).substring(2, 7).toUpperCase();
    const refNum = `LF-${year}-${randomStr}`;

    const formData = new FormData(e.target);
    const file = formData.get('itemImage');
    
    let imageUrl = 'https://images.unsplash.com/photo-1544816155-12df9643f363?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60';
    if (file && file.size > 0) {
      imageUrl = URL.createObjectURL(file);
    }

    const newItem = {
      id: Date.now(),
      refNumber: refNum,
      title: `${formData.get('brand')} ${formData.get('category')}`,
      category: formData.get('category'),
      description: formData.get('description'),
      color: formData.get('color'),
      brand: formData.get('brand'),
      location: formData.get('location'),
      date: new Date().toISOString().split('T')[0],
      status: 'Available',
      imageUrl: imageUrl,
      finderName: isAnonymous ? 'Anonymous' : formData.get('finderName'),
      finderContact: isAnonymous ? 'N/A' : formData.get('finderContact'),
    };

    onReportSubmit(newItem);
    alert(`Report submitted successfully! Your Reference Number is: ${refNum}. Please keep this safe.`);
    onClose();
  };

  return (
    <div style={overlayStyle}>
      <div className="glass-panel" style={modalStyle}>
        <button onClick={onClose} style={closeButtonStyle}>×</button>
        <h2 style={titleStyle}>Fast Guest Report</h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
          Submit a found item quickly. Your report helps keep the UMPSA campus organized.
        </p>

        <form onSubmit={handleSubmit}>
          <h3 style={sectionTitleStyle}>1. Finder Information</h3>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', color: 'var(--text-main)' }}>
              <input 
                type="checkbox" 
                checked={isAnonymous} 
                onChange={(e) => setIsAnonymous(e.target.checked)}
              />
              Report Anonymously
            </label>
          </div>
          
          {!isAnonymous && (
            <div style={{ display: 'flex', gap: '1rem' }}>
              <div style={{ flex: 1 }}>
                <label>Full Name</label>
                <input type="text" name="finderName" className="form-control" placeholder="e.g., John Doe" required={!isAnonymous} />
              </div>
              <div style={{ flex: 1 }}>
                <label>Contact (Phone/Email)</label>
                <input type="text" name="finderContact" className="form-control" placeholder="e.g., 012-3456789" required={!isAnonymous} />
              </div>
            </div>
          )}

          <h3 style={sectionTitleStyle}>2. Item Details</h3>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <div style={{ flex: 1 }}>
              <label>Category</label>
              <select name="category" className="form-control" required>
                <option value="">Select Category...</option>
                <option value="Electronics">Electronics</option>
                <option value="Wallet/Purse">Wallet / Purse</option>
                <option value="Keys">Keys</option>
                <option value="ID/Card">ID / Matrix Card</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div style={{ flex: 1 }}>
              <label>Brand</label>
              <input type="text" name="brand" className="form-control" placeholder="e.g., Apple, Casio" required />
            </div>
            <div style={{ flex: 1 }}>
              <label>Color</label>
              <input type="text" name="color" className="form-control" placeholder="e.g., Black" required />
            </div>
          </div>

          <label>Description (10 - 500 characters)</label>
          <textarea 
            name="description" 
            className="form-control" 
            rows="3" 
            minLength="10"
            maxLength="500"
            placeholder="Provide any identifying marks or features..." 
            required>
          </textarea>

          <h3 style={sectionTitleStyle}>3. Location Found</h3>
          <label>Specific Building / Area</label>
          <input type="text" name="location" className="form-control" placeholder="e.g., FSKKP Lab 3, Library Level 2" required />

          <h3 style={sectionTitleStyle}>4. Image Upload</h3>
          <label>Upload Item Picture (Optional)</label>
          <input type="file" name="itemImage" className="form-control" accept="image/*" style={{ paddingTop: '0.6rem', marginBottom: '1.5rem' }} />

          <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem', padding: '1rem' }}>
            Submit Report
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
  maxWidth: '700px',
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

const titleStyle = {
  fontSize: '2rem',
  marginBottom: '0.5rem',
};

const sectionTitleStyle = {
  fontSize: '1.2rem',
  marginTop: '1.5rem',
  marginBottom: '1rem',
  color: 'var(--accent)',
  borderBottom: '1px solid rgba(255,255,255,0.1)',
  paddingBottom: '0.5rem',
};

export default ReportForm;
