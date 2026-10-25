import React from 'react';
import { Link } from 'react-router-dom';
import { FiTarget, FiZap, FiAward, FiUsers } from 'react-icons/fi';
import { SITE_CONFIG } from '../data/config';

export const About = () => {
  return (
    <div className="container" style={{ padding: '4rem 1.25rem 6rem' }}>
      <div className="section-header" style={{ maxWidth: '800px', margin: '0 auto 3.5rem' }}>
        <span className="section-subtitle">Our Journey & Philosophy</span>
        <h1 className="section-title">Powering Next-Gen Indian Lifestyles</h1>
        <p className="section-desc">
          At <strong>{SITE_CONFIG.brandName}</strong>, we bridge the gap between premium acoustic fidelity, high-efficiency power architectures, and everyday accessibility.
        </p>
      </div>

      {/* Story Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3.5rem', alignItems: 'center', marginBottom: '5rem' }}>
        <div>
          <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#0f172a', marginBottom: '1.25rem' }}>
            Born For Audio & Tech Enthusiasts
          </h2>
          <p style={{ color: '#475569', fontSize: '1rem', lineHeight: '1.7', marginBottom: '1.25rem' }}>
            Founded with a vision to redefine everyday consumer electronics, <strong>Tofo India</strong> designs, engineers, and curates tech gear that delivers unmatched value without compromising on component quality.
          </p>
          <p style={{ color: '#475569', fontSize: '1rem', lineHeight: '1.7', marginBottom: '1.75rem' }}>
            From high-output 120W cinema soundbars and 35dB hybrid ANC headphones to ultra-dense Gallium Nitride (GaN) fast chargers, every product undergoes rigorous laboratory safety and acoustic stress tests tailored for Indian conditions.
          </p>
          <Link to="/shop" className="btn btn-primary">
            Explore Our Catalog
          </Link>
        </div>

        <div>
          <img
            src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=80"
            alt="Tofo India Acoustics"
            style={{ borderRadius: '20px', width: '100%', maxHeight: '420px', objectFit: 'cover', boxShadow: '0 20px 35px rgba(0,0,0,0.1)' }}
          />
        </div>
      </div>

      {/* Pillars Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '2rem' }}>
        <div style={{ backgroundColor: '#ffffff', padding: '2rem', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '12px', backgroundColor: 'rgba(11, 87, 208, 0.1)', color: '#0b57d0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', marginBottom: '1.25rem' }}>
            <FiZap />
          </div>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '0.5rem' }}>Next-Gen Tech</h3>
          <p style={{ color: '#64748b', fontSize: '0.9rem', lineHeight: '1.6' }}>
            Equipping consumer products with advanced GaN III power ICs, Bluetooth 5.3 chips, and titanium acoustic drivers.
          </p>
        </div>

        <div style={{ backgroundColor: '#ffffff', padding: '2rem', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '12px', backgroundColor: 'rgba(255, 107, 0, 0.1)', color: '#ff6b00', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', marginBottom: '1.25rem' }}>
            <FiTarget />
          </div>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '0.5rem' }}>Precision Engineered</h3>
          <p style={{ color: '#64748b', fontSize: '0.9rem', lineHeight: '1.6' }}>
            Tested to withstand over 25,000 bends, drop impacts, and voltage variations common in daily mobile life.
          </p>
        </div>

        <div style={{ backgroundColor: '#ffffff', padding: '2rem', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '12px', backgroundColor: 'rgba(16, 185, 129, 0.1)', color: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', marginBottom: '1.25rem' }}>
            <FiAward />
          </div>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '0.5rem' }}>Certified Quality</h3>
          <p style={{ color: '#64748b', fontSize: '0.9rem', lineHeight: '1.6' }}>
            Backed by standard 1-Year brand warranty with immediate replacement support for any manufacturing issues.
          </p>
        </div>

        <div style={{ backgroundColor: '#ffffff', padding: '2rem', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '12px', backgroundColor: 'rgba(245, 158, 11, 0.1)', color: '#f59e0b', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', marginBottom: '1.25rem' }}>
            <FiUsers />
          </div>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '0.5rem' }}>Customer Centric</h3>
          <p style={{ color: '#64748b', fontSize: '0.9rem', lineHeight: '1.6' }}>
            Transparent warranty claim process, direct WhatsApp & phone resolution, and hassle-free returns.
          </p>
        </div>
      </div>
    </div>
  );
};
