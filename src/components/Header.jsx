import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { FiShoppingCart, FiSearch, FiMenu, FiX, FiShield, FiTruck, FiHeadphones } from 'react-icons/fi';
import { useCart } from '../context/CartContext';
import { SITE_CONFIG } from '../data/config';

export const Header = () => {
  const { cartCount } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchOpen, setSearchOpen] = useState(false);
  const navigate = useNavigate();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery('');
    }
  };

  return (
    <>
      {/* Top Value Banner */}
      <div className="top-bar">
        <div className="container top-bar-inner">
          <span className="top-bar-item">
            <FiTruck /> Free Express Delivery on orders above ₹999
          </span>
          <span className="top-bar-item">
            <FiShield /> 1 Year Official Brand Warranty
          </span>
          <span className="top-bar-item">
            <FiHeadphones /> Dedicated Support: {SITE_CONFIG.phone}
          </span>
        </div>
      </div>

      {/* Main Header */}
      <header className="main-header">
        <div className="container header-container">
          {/* Logo */}
          <Link to="/" className="brand-link">
            <img src={SITE_CONFIG.logo} alt={SITE_CONFIG.brandName} className="brand-logo-img" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="desktop-nav">
            <NavLink to="/" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
              Home
            </NavLink>
            <NavLink to="/shop" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
              All Products
            </NavLink>
            <NavLink to="/shop?category=audio" className="nav-link">
              Audio & Soundbars
            </NavLink>
            <NavLink to="/shop?category=wearables" className="nav-link">
              Smartwatches
            </NavLink>
            <NavLink to="/shop?category=chargers" className="nav-link">
              GaN Chargers & Power
            </NavLink>
            <NavLink to="/about" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
              About Us
            </NavLink>
            <NavLink to="/contact" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
              Contact
            </NavLink>
          </nav>

          {/* Header Action Buttons */}
          <div className="header-actions">
            {/* Search Toggle */}
            <button
              className="icon-btn"
              onClick={() => setSearchOpen(!searchOpen)}
              title="Search Products"
              aria-label="Search"
            >
              <FiSearch size={20} />
            </button>

            {/* Shopping Cart Button */}
            <Link to="/cart" className="icon-btn" title="View Cart" aria-label="Cart">
              <FiShoppingCart size={20} />
              {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
            </Link>

            {/* Mobile Hamburger Menu Toggle */}
            <button
              className="icon-btn mobile-toggle-btn"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open Navigation Menu"
            >
              <FiMenu size={24} />
            </button>
          </div>
        </div>

        {/* Inline Search Bar Popup */}
        {searchOpen && (
          <div style={{ backgroundColor: '#ffffff', borderTop: '1px solid #e2e8f0', padding: '1rem 0' }}>
            <div className="container">
              <form onSubmit={handleSearchSubmit} style={{ display: 'flex', gap: '0.75rem', maxWidth: '640px', margin: '0 auto' }}>
                <input
                  type="text"
                  placeholder="Search audio, smartwatches, 65W GaN chargers, cables..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                  style={{
                    flex: 1,
                    padding: '0.75rem 1.25rem',
                    borderRadius: '8px',
                    border: '1.5px solid #cbd5e1',
                    fontSize: '0.95rem',
                    outline: 'none'
                  }}
                />
                <button type="submit" className="btn btn-primary">
                  Search
                </button>
                <button
                  type="button"
                  className="btn btn-outline"
                  onClick={() => setSearchOpen(false)}
                >
                  <FiX size={18} />
                </button>
              </form>
            </div>
          </div>
        )}
      </header>

      {/* Mobile Drawer Overlay */}
      {mobileMenuOpen && (
        <div className="mobile-nav-overlay" onClick={() => setMobileMenuOpen(false)}>
          <div className="mobile-nav-drawer open" onClick={(e) => e.stopPropagation()}>
            <div className="drawer-header">
              <img src={SITE_CONFIG.logo} alt={SITE_CONFIG.brandName} style={{ height: '40px' }} />
              <button
                className="drawer-close-btn"
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close Menu"
              >
                <FiX size={24} />
              </button>
            </div>

            <div className="mobile-nav-links">
              <NavLink to="/" className="mobile-link" onClick={() => setMobileMenuOpen(false)}>
                Home
              </NavLink>
              <NavLink to="/shop" className="mobile-link" onClick={() => setMobileMenuOpen(false)}>
                Explore Shop
              </NavLink>
              <NavLink to="/shop?category=audio" className="mobile-link" onClick={() => setMobileMenuOpen(false)}>
                Audio & Soundbars
              </NavLink>
              <NavLink to="/shop?category=wearables" className="mobile-link" onClick={() => setMobileMenuOpen(false)}>
                Smartwatches
              </NavLink>
              <NavLink to="/shop?category=chargers" className="mobile-link" onClick={() => setMobileMenuOpen(false)}>
                Fast Chargers & Power
              </NavLink>
              <NavLink to="/shop?category=cables" className="mobile-link" onClick={() => setMobileMenuOpen(false)}>
                Cables & Hubs
              </NavLink>
              <NavLink to="/about" className="mobile-link" onClick={() => setMobileMenuOpen(false)}>
                About Tofo India
              </NavLink>
              <NavLink to="/contact" className="mobile-link" onClick={() => setMobileMenuOpen(false)}>
                Contact Us
              </NavLink>
              <NavLink to="/cart" className="mobile-link" onClick={() => setMobileMenuOpen(false)}>
                Shopping Cart ({cartCount})
              </NavLink>
            </div>

            <div style={{ marginTop: 'auto', paddingTop: '1.5rem', borderTop: '1px solid #e2e8f0', fontSize: '0.85rem', color: '#64748b' }}>
              <p style={{ fontWeight: 600, color: '#0f172a' }}>{SITE_CONFIG.brandShort}</p>
              <p>Electronics for a Smarter You</p>
              <p style={{ marginTop: '0.4rem' }}>{SITE_CONFIG.phone}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
