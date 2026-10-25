import React from 'react';
import { Link } from 'react-router-dom';
import { FiMail, FiPhone, FiMapPin, FiInstagram, FiFacebook, FiYoutube, FiTwitter } from 'react-icons/fi';
import { SITE_CONFIG } from '../data/config';

export const Footer = () => {
  return (
    <footer className="main-footer">
      <div className="container">
        <div className="footer-grid">
          {/* Brand Info */}
          <div className="footer-brand">
            <img
              src={SITE_CONFIG.logo}
              alt={SITE_CONFIG.brandName}
              style={{ height: '68px', width: 'auto', backgroundColor: '#ffffff', padding: '6px 14px', borderRadius: '10px', objectFit: 'contain' }}
            />
            <p>
              <strong>{SITE_CONFIG.brandName}</strong> – {SITE_CONFIG.tagline}. Delivering cutting-edge acoustic engineering, rapid GaN chargers, and smart lifestyle accessories across India.
            </p>
            <div className="footer-social-icons">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <FiInstagram size={18} />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <FiFacebook size={18} />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
                <FiYoutube size={18} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                <FiTwitter size={18} />
              </a>
            </div>
          </div>

          {/* Quick Shop Links */}
          <div className="footer-col">
            <h4>Shop Categories</h4>
            <ul>
              <li><Link to="/shop?category=audio">Audio & Soundbars</Link></li>
              <li><Link to="/shop?category=wearables">Smartwatches & Bands</Link></li>
              <li><Link to="/shop?category=chargers">GaN Fast Chargers</Link></li>
              <li><Link to="/shop?category=cables">Braided Cables & Hubs</Link></li>
              <li><Link to="/shop">Explore All Gadgets</Link></li>
            </ul>
          </div>

          {/* Policy & Company */}
          <div className="footer-col">
            <h4>Customer Support</h4>
            <ul>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/contact">Contact Support</Link></li>
              <li><Link to="/shipping-policy">Shipping Policy</Link></li>
              <li><Link to="/cancellation-policy">Cancellation & Returns</Link></li>
              <li><Link to="/privacy-policy">Privacy Policy</Link></li>
              <li><Link to="/terms-conditions">Terms & Conditions</Link></li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="footer-col">
            <h4>Get In Touch</h4>
            <ul className="footer-contact-list">
              <li>
                <FiMapPin style={{ flexShrink: 0, marginTop: '4px', color: 'var(--accent-orange)' }} />
                <span>{SITE_CONFIG.address}</span>
              </li>
              <li>
                <FiPhone style={{ flexShrink: 0, marginTop: '4px', color: 'var(--accent-orange)' }} />
                <span>{SITE_CONFIG.phone}<br /><small style={{ color: '#64748b' }}>Mon-Sat 10AM - 7PM IST</small></span>
              </li>
              <li>
                <FiMail style={{ flexShrink: 0, marginTop: '4px', color: 'var(--accent-orange)' }} />
                <span>{SITE_CONFIG.supportEmail}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom Strip */}
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} {SITE_CONFIG.brandName}. All rights reserved.</p>
          <div className="footer-badge-strip">
            <span className="badge-tag">100% Genuine Tech</span>
            <span className="badge-tag">Secure SSL Checkout</span>
            <span className="badge-tag">Fast Pan-India Delivery</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
