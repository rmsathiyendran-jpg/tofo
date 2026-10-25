import React, { useState } from 'react';
import { FiMail, FiPhone, FiMapPin, FiClock, FiCheck } from 'react-icons/fi';
import { SITE_CONFIG } from '../data/config';

export const Contact = () => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="container" style={{ padding: '4rem 1.25rem 6rem' }}>
      <div className="section-header">
        <span className="section-subtitle">Get In Touch</span>
        <h1 className="section-title">We Are Here To Assist You</h1>
        <p className="section-desc">
          Have queries about product specs, bulk commercial orders, or warranty service? Reach out to our dedicated support squad.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '3rem', alignItems: 'start' }}>
        {/* Contact Info Card */}
        <div style={{ backgroundColor: '#ffffff', borderRadius: '16px', border: '1px solid #e2e8f0', padding: '2.5rem', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '1.5rem', color: '#0f172a' }}>
            Official Head Office
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <div style={{ width: '44px', height: '44px', borderRadius: '50%', backgroundColor: '#eff6ff', color: '#0b57d0', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <FiMapPin size={20} />
              </div>
              <div>
                <strong style={{ display: 'block', color: '#0f172a', marginBottom: '0.2rem' }}>Registered Corporate Address</strong>
                <p style={{ color: '#64748b', fontSize: '0.92rem', lineHeight: '1.5' }}>{SITE_CONFIG.address}</p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1rem' }}>
              <div style={{ width: '44px', height: '44px', borderRadius: '50%', backgroundColor: '#eff6ff', color: '#0b57d0', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <FiPhone size={20} />
              </div>
              <div>
                <strong style={{ display: 'block', color: '#0f172a', marginBottom: '0.2rem' }}>Customer Helpline</strong>
                <p style={{ color: '#64748b', fontSize: '0.92rem' }}>{SITE_CONFIG.phone}</p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1rem' }}>
              <div style={{ width: '44px', height: '44px', borderRadius: '50%', backgroundColor: '#eff6ff', color: '#0b57d0', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <FiMail size={20} />
              </div>
              <div>
                <strong style={{ display: 'block', color: '#0f172a', marginBottom: '0.2rem' }}>Email Support</strong>
                <p style={{ color: '#64748b', fontSize: '0.92rem' }}>Support: {SITE_CONFIG.supportEmail}</p>
                <p style={{ color: '#64748b', fontSize: '0.92rem' }}>Corporate & Sales: {SITE_CONFIG.salesEmail}</p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1rem' }}>
              <div style={{ width: '44px', height: '44px', borderRadius: '50%', backgroundColor: '#eff6ff', color: '#0b57d0', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <FiClock size={20} />
              </div>
              <div>
                <strong style={{ display: 'block', color: '#0f172a', marginBottom: '0.2rem' }}>Operational Hours</strong>
                <p style={{ color: '#64748b', fontSize: '0.92rem' }}>{SITE_CONFIG.businessHours}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Message Form */}
        <div style={{ backgroundColor: '#ffffff', borderRadius: '16px', border: '1px solid #e2e8f0', padding: '2.5rem', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '1.5rem', color: '#0f172a' }}>
            Send Us A Message
          </h2>

          {submitted ? (
            <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
              <div style={{ width: '60px', height: '60px', borderRadius: '50%', backgroundColor: '#ecfdf5', color: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem', fontSize: '1.75rem' }}>
                <FiCheck />
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '0.5rem' }}>Message Received!</h3>
              <p style={{ color: '#64748b', fontSize: '0.95rem' }}>
                Thank you for getting in touch. One of our technical representatives will reply within 24 business hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 600, color: '#334155', marginBottom: '0.35rem' }}>Your Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Priya Sharma"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  style={{ width: '100%', padding: '0.75rem 1rem', border: '1.5px solid #cbd5e1', borderRadius: '8px', fontSize: '0.95rem', outline: 'none' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 600, color: '#334155', marginBottom: '0.35rem' }}>Email Address *</label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. priya@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    style={{ width: '100%', padding: '0.75rem 1rem', border: '1.5px solid #cbd5e1', borderRadius: '8px', fontSize: '0.95rem', outline: 'none' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 600, color: '#334155', marginBottom: '0.35rem' }}>Phone Number</label>
                  <input
                    type="tel"
                    placeholder="e.g. 9876543210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    style={{ width: '100%', padding: '0.75rem 1rem', border: '1.5px solid #cbd5e1', borderRadius: '8px', fontSize: '0.95rem', outline: 'none' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 600, color: '#334155', marginBottom: '0.35rem' }}>Subject *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Bulk inquiry or Product specifications"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  style={{ width: '100%', padding: '0.75rem 1rem', border: '1.5px solid #cbd5e1', borderRadius: '8px', fontSize: '0.95rem', outline: 'none' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 600, color: '#334155', marginBottom: '0.35rem' }}>Your Message *</label>
                <textarea
                  required
                  rows="4"
                  placeholder="Type your question or query here..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  style={{ width: '100%', padding: '0.75rem 1rem', border: '1.5px solid #cbd5e1', borderRadius: '8px', fontSize: '0.95rem', outline: 'none' }}
                />
              </div>

              <button type="submit" className="btn btn-primary" style={{ padding: '0.9rem' }}>
                Send Message
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
