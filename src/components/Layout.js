import React, { useState } from 'react';
import { LayoutGrid, Users, RefreshCw, Menu, X, Clock, MapPin, Award, BellRing, Heart, Sparkles, Home } from 'lucide-react';
import { useRouter } from 'next/router';
import Link from 'next/link';

const Layout = ({ children, activeTab, onRefresh, onNavigate }) => {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  
  const tabs = [
    { id: 'home', label: 'Home', icon: <Home size={18} />, path: '/' },
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutGrid size={18} />, path: '/dashboard' },
    { id: 'participants', label: 'Participants', icon: <Users size={18} />, path: '/participants' },
  ];
  
  // Determine active tab from router path
  const getCurrentActiveTab = () => {
    const path = router.pathname;
    if (path === '/') return 'home';
    if (path === '/dashboard') return 'dashboard';
    if (path === '/participants') return 'participants';
    return activeTab || 'home';
  };
  
  const currentActiveTab = getCurrentActiveTab();
  
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  
  const handleRefresh = async () => {
    if (!onRefresh) return;
    setIsRefreshing(true);
    await onRefresh();
    setIsRefreshing(false);
  };

  const handleNavigation = (tab) => {
    // Close mobile menu
    setMenuOpen(false);
    
    // Navigate using Next.js router
    router.push(tab.path);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <header className="navbar">
        <div className="container flex items-center justify-between">
          <Link href="/" className="navbar-brand">
            <div className="navbar-brand-icon">
              <img src="https://neighborhood.hackclub.dev/neighborhoodLogo.png" alt="Neighborhood" width={128} height={128} />
            </div>
          </Link>
          
          {/* Mobile menu button - only visible on small screens */}
          <button 
            onClick={toggleMenu} 
            className="button-outline md:hidden"
            style={{
              padding: '0.375rem',
              borderRadius: 'var(--radius-md)',
              transition: 'all 0.3s ease'
            }}
          >
            {menuOpen ? (
              <X size={24} strokeWidth={1.5} />
            ) : (
              <Menu size={24} strokeWidth={1.5} />
            )}
          </button>
          
          {/* Desktop navigation - always visible on desktop */}
          <nav className="navbar-menu">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => handleNavigation(tab)}
                className={`nav-link ${currentActiveTab === tab.id ? 'active' : ''}`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            ))}
            
            {onRefresh && (
              <button 
                onClick={handleRefresh}
                disabled={isRefreshing}
                className="button-outline"
                style={{marginLeft: '0.5rem'}}
              >
                <RefreshCw size={16} className={isRefreshing ? 'animate-spin' : ''} />
                <span>{isRefreshing ? 'Refreshing...' : 'Refresh Data'}</span>
              </button>
            )}
          </nav>
        </div>
      </header>
      
      {/* Mobile menu - only visible when menuOpen is true and on small screens */}
      {menuOpen && (
        <div className={`mobile-menu ${menuOpen ? 'active' : ''} md:hidden`} 
          style={{
            backgroundColor: 'var(--color-gray-50)',
            borderBottom: '1px solid var(--color-gray-200)',
            boxShadow: 'var(--shadow-sm)',
            animation: 'fadeIn 0.2s ease-in-out'
          }}>
          <nav className="container flex flex-col" style={{padding: '0.75rem 0', gap: '0.75rem'}}>
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => handleNavigation(tab)}
                className={`nav-link ${currentActiveTab === tab.id ? 'active' : ''}`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            ))}
            
            {onRefresh && (
              <button
                onClick={handleRefresh}
                disabled={isRefreshing} 
                className="button-outline"
                style={{marginTop: '0.5rem'}}
              >
                <RefreshCw size={16} className={isRefreshing ? 'animate-spin' : ''} />
                <span>{isRefreshing ? 'Refreshing...' : 'Refresh Data'}</span>
              </button>
            )}
          </nav>
        </div>
      )}
      
      <main className="container" style={{padding: '1.5rem 0', flex: '1 1 auto'}}>
        {children}
      </main>
      
      <footer className="footer">
        <div className="container">
          {/* Beautiful Adventure Time Fanmade Credit */}
          <div className="text-center py-6 mb-6 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/10 to-transparent opacity-50"></div>
            <div className="relative">
              <div className="flex items-center justify-center gap-2 mb-3">
                <Sparkles size={20} className="text-accent animate-pulse" />
                <span className="text-lg font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                  Fanmade Adventure Edition
                </span>
                <Sparkles size={20} className="text-accent animate-pulse" />
              </div>
              <div className="flex items-center justify-center gap-2 text-base font-medium">
                <span className="text-gray-700">Crafted with</span>
                <Heart 
                  size={18} 
                  className="text-candy animate-bounce fill-current" 
                  style={{ color: 'var(--color-candy)' }}
                />
                <span className="text-gray-700">by</span>
                <span className="font-bold text-xl bg-gradient-to-r from-accent via-primary to-secondary bg-clip-text text-transparent animate-gradient-shift">
                  Khaled Muhammad
                </span>
              </div>
              <div className="mt-2 text-sm text-gray-500 italic">
                "Mathematical! Adventure Time meets Hack Club vibes ✨"
              </div>
            </div>
          </div>
          
          <div className="footer-divider"></div>
          
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-2" style={{marginBottom: '0.5rem'}}>
                <MapPin size={16} className="text-accent" />
                <p className="font-medium">Neighborhood SF Trip Challenge</p>
              </div>
              <p className="text-sm text-gray-500">Track your progress toward 100 hours to earn your trip to San Francisco</p>
            </div>
            
            <div className="flex flex-col md:flex-row items-center gap-4">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Award size={16} className="text-primary" />
                <span>100+ hours qualifies you</span>
              </div>
              
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Clock size={16} className="text-secondary" />
                <span>Every hour counts</span>
              </div>
              
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <BellRing size={16} className="text-warning" />
                <span>Updated daily</span>
              </div>
            </div>
          </div>
          
          <div className="footer-divider"></div>
          
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="footer-bottom">© 2025 Hack Club - Neighborhood Challenge</p>
            <div className="footer-links">
              <a href="https://hackclub.com" target="_blank" rel="noopener noreferrer" className="footer-link">Hack Club</a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="footer-link">GitHub</a>
              <a href="https://slack.com" target="_blank" rel="noopener noreferrer" className="footer-link">Slack</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout; 