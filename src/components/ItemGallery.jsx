import React, { useState } from 'react';
import ItemCard from './ItemCard';

const ItemGallery = ({ items, userRole, onClaimClick }) => {
  const [filter, setFilter] = useState('All');

  // Filter out disposed items from the public gallery
  const activeItems = items.filter(item => item.status !== 'Disposed/Donated');

  const filteredItems = activeItems.filter(item => {
    if (filter === 'All') return true;
    return item.status === filter;
  });

  return (
    <section style={gallerySectionStyle} id="gallery">
      <div className="container">
        <div style={headerStyle}>
          <h2 style={{ fontSize: '2.5rem' }}>Recent Items</h2>
          <div style={filterStyle}>
            {['All', 'Available', 'Under Review', 'Handed Over'].map(status => (
              <button 
                key={status}
                className={`btn ${filter === status ? 'btn-primary' : 'btn-secondary'}`}
                onClick={() => setFilter(status)}
                style={{ padding: '0.5rem 1rem' }}
              >
                {status}
              </button>
            ))}
          </div>
        </div>
        
        <div style={gridStyle}>
          {filteredItems.length > 0 ? (
            filteredItems.map(item => (
              <ItemCard 
                key={item.id} 
                item={item} 
                userRole={userRole} 
                onClaimClick={onClaimClick} 
              />
            ))
          ) : (
            <p style={{ color: 'var(--text-muted)' }}>No items found for this filter.</p>
          )}
        </div>
      </div>
    </section>
  );
};

const gallerySectionStyle = {
  padding: '6rem 0',
};

const headerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '3rem',
  flexWrap: 'wrap',
  gap: '1.5rem',
};

const filterStyle = {
  display: 'flex',
  gap: '0.5rem',
  flexWrap: 'wrap',
};

const gridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
  gap: '2rem',
};

export default ItemGallery;
