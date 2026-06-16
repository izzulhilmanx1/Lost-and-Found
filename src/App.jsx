import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import ItemGallery from './components/ItemGallery';
import ReportForm from './components/ReportForm';
import Login from './components/Login';
import ClaimModal from './components/ClaimModal';
import AdminDashboard from './components/AdminDashboard';

// Mock initial data with dates for automated lifecycle testing
const thirtyOneDaysAgo = new Date();
thirtyOneDaysAgo.setDate(thirtyOneDaysAgo.getDate() - 31);

const INITIAL_ITEMS = [
  {
    id: 1,
    refNumber: 'LF-2026-XQZ12',
    title: 'Apple iPad Pro',
    category: 'Electronics',
    description: 'Found a silver iPad Pro in the library, 3rd floor. Has a black case.',
    brand: 'Apple',
    color: 'Silver',
    location: 'Library Level 3',
    date: new Date().toISOString().split('T')[0],
    status: 'Available',
    imageUrl: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60',
  },
  {
    id: 2,
    refNumber: 'LF-2026-A1B2C',
    title: 'Leather Wallet',
    category: 'Wallet/Purse',
    description: 'Brown leather wallet with some cash and cards. Dropped near cafeteria.',
    brand: 'Unknown',
    color: 'Brown',
    location: 'Cafeteria',
    date: '2026-06-15',
    status: 'Under Review',
    claimData: { matricCard: 'CB25017', proofDescription: 'It has my matrix card inside and a family photo.' },
    imageUrl: 'public/images/lost_wallet_1781601686255.png'
  },
  {
    id: 3,
    refNumber: 'LF-2026-OLD99',
    title: 'Old Umbrella',
    category: 'Other',
    description: 'Black umbrella left in lecture hall.',
    brand: 'Generic',
    color: 'Black',
    location: 'FSKKP Lecture Hall 1',
    date: thirtyOneDaysAgo.toISOString().split('T')[0], // > 30 days old
    status: 'Available',
    imageUrl: 'public/images/umbrella.jpeg'
  }
];

function App() {
  const [userRole, setUserRole] = useState('guest'); // 'guest', 'claimant', 'security'
  const [showLogin, setShowLogin] = useState(false);
  const [showReportForm, setShowReportForm] = useState(false);
  const [showClaimModal, setShowClaimModal] = useState(false);
  const [selectedItemToClaim, setSelectedItemToClaim] = useState(null);
  const [viewingDashboard, setViewingDashboard] = useState(false);
  
  const [items, setItems] = useState(INITIAL_ITEMS);

  // Navigation Handlers
  const handleBrowseClick = () => {
    setViewingDashboard(false);
    setTimeout(() => {
      document.getElementById('gallery')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleDashboardClick = () => {
    setViewingDashboard(true);
  };

  // Auth Handlers
  const handleLogin = (role) => {
    setUserRole(role);
    setShowLogin(false);
    if (role === 'security') {
      setViewingDashboard(true);
    }
  };

  const handleLogout = () => {
    setUserRole('guest');
    setViewingDashboard(false);
  };

  // Action Handlers
  const handleReportSubmit = (newItem) => {
    setItems([newItem, ...items]);
  };

  const handleClaimClick = (item) => {
    if (userRole === 'guest') {
      setShowLogin(true); // Prompt login if guest
    } else {
      setSelectedItemToClaim(item);
      setShowClaimModal(true);
    }
  };

  const handleSubmitClaim = (itemId, claimData) => {
    setItems(items.map(item => 
      item.id === itemId 
        ? { ...item, status: 'Under Review', claimData } 
        : item
    ));
  };

  // Security Admin Handlers
  const handleApproveClaim = (itemId) => {
    setItems(items.map(item => 
      item.id === itemId 
        ? { ...item, status: 'Handed Over' } 
        : item
    ));
    alert('Matrix card verified. Item marked as Handed Over/Claimed.');
  };

  const handleRejectClaim = (itemId) => {
    setItems(items.map(item => 
      item.id === itemId 
        ? { ...item, status: 'Available', claimData: null } 
        : item
    ));
    alert('Claim rejected. Item is available again.');
  };

  const handleDisposeItem = (itemId) => {
    setItems(items.map(item => 
      item.id === itemId 
        ? { ...item, status: 'Disposed/Donated' } 
        : item
    ));
    alert('Item has been disposed/donated and removed from the public gallery.');
  };

  return (
    <>
      <Header 
        userRole={userRole}
        onLoginClick={() => setShowLogin(true)}
        onLogout={handleLogout}
        onReportClick={() => setShowReportForm(true)} 
        onBrowseClick={handleBrowseClick} 
        onDashboardClick={handleDashboardClick}
      />
      
      <main>
        {!viewingDashboard && (
          <>
            <Hero 
              onReportClick={() => setShowReportForm(true)} 
              onBrowseClick={handleBrowseClick} 
            />
            <ItemGallery 
              items={items} 
              userRole={userRole}
              onClaimClick={handleClaimClick}
            />
          </>
        )}

        {viewingDashboard && userRole === 'security' && (
          <AdminDashboard 
            items={items}
            onApproveClaim={handleApproveClaim}
            onRejectClaim={handleRejectClaim}
            onDisposeItem={handleDisposeItem}
          />
        )}
      </main>

      <footer style={footerStyle}>
        <div className="container">
          <p>© 2026 UMPSA Lost-and-Found Campus Hub. Developed by BitBuilders.</p>
        </div>
      </footer>

      {showLogin && (
        <Login onLogin={handleLogin} onClose={() => setShowLogin(false)} />
      )}

      {showReportForm && (
        <ReportForm onClose={() => setShowReportForm(false)} onReportSubmit={handleReportSubmit} />
      )}

      {showClaimModal && selectedItemToClaim && (
        <ClaimModal 
          item={selectedItemToClaim} 
          onClose={() => setShowClaimModal(false)} 
          onSubmitClaim={handleSubmitClaim} 
        />
      )}
    </>
  );
}

const footerStyle = {
  textAlign: 'center',
  padding: '2rem 0',
  borderTop: '1px solid var(--glass-border)',
  marginTop: '4rem',
  color: 'var(--text-muted)',
};

export default App;
