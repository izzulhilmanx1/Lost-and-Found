import React from 'react';

const ItemCard = ({ item, userRole, onClaimClick }) => {
  const isAvailable = item.status === 'Available';
  
  let statusColor = '#10b981'; // Available (Green)
  if (item.status === 'Under Review') statusColor = '#f59e0b'; // Amber
  if (item.status === 'Handed Over' || item.status === 'Claimed') statusColor = '#6366f1'; // Indigo
  if (item.status === 'Disposed/Donated') statusColor = '#ef4444'; // Red

  return (
    <div className="glass" style={cardStyle}>
      <div style={imageContainerStyle}>
        <img src={item.imageUrl} alt={item.title} style={imageStyle} />
        <span style={{...badgeStyle, backgroundColor: statusColor}}>
          {(item.status || 'Available').toUpperCase()}
        </span>
      </div>
      <div style={contentStyle}>
        <h3 style={titleStyle}>{item.title}</h3>
        <p style={descriptionStyle}>{item.description}</p>
        
        <div style={detailsGridStyle}>
          <span style={detailItemStyle}><strong>Ref:</strong> {item.refNumber}</span>
          <span style={detailItemStyle}><strong>Date:</strong> {item.date}</span>
          <span style={detailItemStyle}><strong>Loc:</strong> {item.location}</span>
          <span style={detailItemStyle}><strong>Brand:</strong> {item.brand}</span>
        </div>

        {isAvailable && (userRole === 'claimant' || userRole === 'guest') && (
          <button 
            className="btn btn-primary" 
            style={buttonStyle}
            onClick={() => onClaimClick(item)}
          >
            {userRole === 'guest' ? 'Login to Claim' : 'Claim Item'}
          </button>
        )}
      </div>
    </div>
  );
};

const cardStyle = {
  overflow: 'hidden',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  display: 'flex',
  flexDirection: 'column',
};

const imageContainerStyle = {
  position: 'relative',
  height: '200px',
  width: '100%',
};

const imageStyle = {
  width: '100%',
  height: '100%',
  objectFit: 'cover',
};

const badgeStyle = {
  position: 'absolute',
  top: '12px',
  right: '12px',
  padding: '4px 12px',
  borderRadius: '9999px',
  fontSize: '0.75rem',
  fontWeight: 'bold',
  color: 'white',
  textShadow: '0 1px 2px rgba(0,0,0,0.5)',
  boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
};

const contentStyle = {
  padding: '1.5rem',
  display: 'flex',
  flexDirection: 'column',
  flexGrow: 1,
};

const titleStyle = {
  fontSize: '1.25rem',
  marginBottom: '0.5rem',
};

const descriptionStyle = {
  color: 'var(--text-muted)',
  fontSize: '0.9rem',
  marginBottom: '1rem',
  flexGrow: 1,
};

const detailsGridStyle = {
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: '0.5rem',
  fontSize: '0.8rem',
  color: 'var(--text-main)',
  marginBottom: '1.5rem',
  background: 'rgba(0,0,0,0.2)',
  padding: '0.75rem',
  borderRadius: '8px',
};

const detailItemStyle = {
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
};

const buttonStyle = {
  width: '100%',
  padding: '0.75rem',
};

export default ItemCard;
