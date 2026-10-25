import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiCheckCircle, FiAlertCircle, FiArrowRight, FiLock, FiPackage, FiTruck } from 'react-icons/fi';
import { useCart } from '../context/CartContext';
import { SITE_CONFIG } from '../data/config';
import '../styles/checkout.css';

export const Checkout = () => {
  const { cartItems, subtotal, shippingFee, totalAmount, clearCart } = useCart();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    orderNotes: ''
  });

  const [formErrors, setFormErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [orderConfirmed, setOrderConfirmed] = useState(null);

  const indianStates = [
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa",
    "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala",
    "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland",
    "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana",
    "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal", "Delhi", "Chandigarh"
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.fullName.trim()) errors.fullName = 'Please enter your full name';
    if (!formData.phone.trim()) {
      errors.phone = 'Mobile phone number is required';
    } else if (!/^[6-9]\d{9}$/.test(formData.phone.trim())) {
      errors.phone = 'Enter a valid 10-digit Indian phone number';
    }

    if (!formData.email.trim()) {
      errors.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errors.email = 'Please provide a valid email address';
    }

    if (!formData.address.trim()) errors.address = 'Detailed delivery address is required';
    if (!formData.city.trim()) errors.city = 'City name is required';
    if (!formData.state.trim()) errors.state = 'Please select your state';
    if (!formData.pincode.trim()) {
      errors.pincode = 'Pincode is required';
    } else if (!/^\d{6}$/.test(formData.pincode.trim())) {
      errors.pincode = 'Enter a valid 6-digit postal pincode';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (cartItems.length === 0) {
      setErrorMessage('Your cart is empty. Please add items before placing an order.');
      return;
    }

    if (!validateForm()) {
      return;
    }

    setSubmitting(true);

    // Generate random reference ID: TOFO-YYYYMMDD-XXXX
    const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, '');
    const randomHex = Math.random().toString(36).substring(2, 6).toUpperCase();
    const orderReference = `TOFO-${dateStr}-${randomHex}`;

    // Payload sent to Google Apps Script endpoint
    const orderPayload = {
      orderReference,
      createdAt: new Date().toISOString(),
      customer: {
        fullName: formData.fullName.trim(),
        phone: formData.phone.trim(),
        email: formData.email.trim(),
        address: formData.address.trim(),
        city: formData.city.trim(),
        state: formData.state.trim(),
        pincode: formData.pincode.trim(),
        notes: formData.orderNotes.trim()
      },
      // Send item IDs and quantities; server verifies prices from master catalogue
      items: cartItems.map((item) => ({
        id: item.id,
        name: item.name,
        quantity: item.quantity,
        unitPrice: item.price
      })),
      subtotal,
      shippingFee,
      totalAmount
    };

    try {
      const endpoint = SITE_CONFIG.orderApiUrl;

      if (!endpoint) {
        // If Google Apps Script Web App URL has not been deployed yet:
        // Provide simulated fallback for testing while keeping safety prompt
        console.warn('VITE_ORDER_API_URL not configured. Simulating successful Apps Script submission.');
        await new Promise((res) => setTimeout(res, 1400));
        
        const confirmedState = {
          orderReference,
          customer: orderPayload.customer,
          items: cartItems,
          subtotal,
          shippingFee,
          totalAmount,
          isSimulated: true
        };
        clearCart();
        setOrderConfirmed(confirmedState);
        return;
      }

      // Live Google Apps Script POST request
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'text/plain;charset=utf-8' // Standard CORS-safe method for Apps Script
        },
        body: JSON.stringify(orderPayload)
      });

      const result = await response.json();

      if (result && result.status === 'success') {
        const confirmedState = {
          orderReference: result.orderReference || orderReference,
          customer: orderPayload.customer,
          items: cartItems,
          subtotal,
          shippingFee,
          totalAmount,
          isSimulated: false
        };
        clearCart();
        setOrderConfirmed(confirmedState);
      } else {
        throw new Error(result?.message || 'Server rejected order verification');
      }
    } catch (err) {
      console.error('Order submission error:', err);
      setErrorMessage(
        `Unable to place order: ${err.message || 'Network error communicating with the order service'}. Please check your connection or contact care@tofoindia.com.`
      );
    } finally {
      setSubmitting(false);
    }
  };

  // If order is confirmed, display the confirmation screen
  if (orderConfirmed) {
    return (
      <div className="checkout-page">
        <div className="container">
          <div className="confirmation-container">
            <div className="confirmation-icon-circle">
              <FiCheckCircle />
            </div>
            <h1 style={{ fontSize: '2rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>
              Order Confirmed Successfully!
            </h1>
            <p style={{ color: '#64748b', fontSize: '1.05rem' }}>
              Thank you for shopping with <strong>{SITE_CONFIG.brandName}</strong>. An official dispatch confirmation email has been dispatched to <strong>{orderConfirmed.customer.email}</strong>.
            </p>

            <div className="order-ref-pill">
              Order Reference: {orderConfirmed.orderReference}
            </div>

            {orderConfirmed.isSimulated && (
              <div style={{ backgroundColor: '#fffbeb', border: '1px solid #fef3c7', color: '#92400e', padding: '0.75rem', borderRadius: '8px', fontSize: '0.85rem', marginBottom: '1.5rem', textAlign: 'left' }}>
                <strong>Demo Mode Active:</strong> Order processed locally. Set <code>VITE_ORDER_API_URL</code> in your <code>.env</code> file to deliver live notifications to your inbox via Google Apps Script.
              </div>
            )}

            <div className="order-details-box">
              <h4 style={{ marginBottom: '1rem', color: '#0f172a', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.5rem' }}>
                Delivery Destination
              </h4>
              <div className="order-details-row">
                <span style={{ color: '#64748b' }}>Recipient:</span>
                <span style={{ fontWeight: 600 }}>{orderConfirmed.customer.fullName} ({orderConfirmed.customer.phone})</span>
              </div>
              <div className="order-details-row">
                <span style={{ color: '#64748b' }}>Address:</span>
                <span>{orderConfirmed.customer.address}, {orderConfirmed.customer.city}, {orderConfirmed.customer.state} - {orderConfirmed.customer.pincode}</span>
              </div>
              <div className="order-details-row" style={{ marginTop: '1rem', borderTop: '1px solid #e2e8f0', paddingTop: '0.5rem' }}>
                <span style={{ color: '#64748b' }}>Total Paid via COD/Standard:</span>
                <span style={{ fontWeight: 800, color: '#0b57d0', fontSize: '1.1rem' }}>
                  {SITE_CONFIG.currencySymbol}{orderConfirmed.totalAmount.toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
              <Link to="/shop" className="btn btn-primary">
                Continue Shopping <FiArrowRight />
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // If cart is empty and not confirmed
  if (cartItems.length === 0) {
    return (
      <div className="container" style={{ padding: '6rem 1.25rem', textAlign: 'center' }}>
        <h2>Your Cart Is Empty</h2>
        <p style={{ color: '#64748b', margin: '1rem 0 2rem' }}>
          Please select products before checking out.
        </p>
        <Link to="/shop" className="btn btn-primary">
          Browse Shop
        </Link>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <div className="container">
        <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '2rem' }}>
          Secure Checkout
        </h1>

        {errorMessage && (
          <div className="error-banner">
            <FiAlertCircle style={{ verticalAlign: 'middle', marginRight: '6px' }} />
            {errorMessage}
          </div>
        )}

        <div className="checkout-grid">
          {/* Customer & Delivery Form */}
          <div className="checkout-card">
            <h2 className="checkout-card-title">
              <FiTruck /> Shipping & Customer Details
            </h2>

            <form onSubmit={handlePlaceOrder}>
              <div className="form-group-row">
                <div className={`form-field ${formErrors.fullName ? 'has-error' : ''}`}>
                  <label htmlFor="fullName">Full Name *</label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    placeholder="e.g. Rahul Sharma"
                    value={formData.fullName}
                    onChange={handleInputChange}
                  />
                  {formErrors.fullName && <span className="field-error">{formErrors.fullName}</span>}
                </div>

                <div className={`form-field ${formErrors.phone ? 'has-error' : ''}`}>
                  <label htmlFor="phone">Phone / Mobile (10 digits) *</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    placeholder="e.g. 9876543210"
                    value={formData.phone}
                    onChange={handleInputChange}
                  />
                  {formErrors.phone && <span className="field-error">{formErrors.phone}</span>}
                </div>
              </div>

              <div className={`form-field ${formErrors.email ? 'has-error' : ''}`}>
                <label htmlFor="email">Email Address (for order receipts & tracking) *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="e.g. rahul@example.com"
                  value={formData.email}
                  onChange={handleInputChange}
                />
                {formErrors.email && <span className="field-error">{formErrors.email}</span>}
              </div>

              <div className={`form-field ${formErrors.address ? 'has-error' : ''}`}>
                <label htmlFor="address">Flat / House No., Apartment & Street Address *</label>
                <textarea
                  id="address"
                  name="address"
                  rows="3"
                  placeholder="Flat 402, Sunshine Towers, 12th Main, Indiranagar"
                  value={formData.address}
                  onChange={handleInputChange}
                />
                {formErrors.address && <span className="field-error">{formErrors.address}</span>}
              </div>

              <div className="form-group-row">
                <div className={`form-field ${formErrors.city ? 'has-error' : ''}`}>
                  <label htmlFor="city">City / Town *</label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    placeholder="e.g. Bengaluru"
                    value={formData.city}
                    onChange={handleInputChange}
                  />
                  {formErrors.city && <span className="field-error">{formErrors.city}</span>}
                </div>

                <div className={`form-field ${formErrors.state ? 'has-error' : ''}`}>
                  <label htmlFor="state">State *</label>
                  <select
                    id="state"
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                  >
                    <option value="">Select State</option>
                    {indianStates.map((st) => (
                      <option key={st} value={st}>
                        {st}
                      </option>
                    ))}
                  </select>
                  {formErrors.state && <span className="field-error">{formErrors.state}</span>}
                </div>
              </div>

              <div className="form-group-row">
                <div className={`form-field ${formErrors.pincode ? 'has-error' : ''}`}>
                  <label htmlFor="pincode">PIN Code (6 digits) *</label>
                  <input
                    type="text"
                    id="pincode"
                    name="pincode"
                    maxLength="6"
                    placeholder="e.g. 560038"
                    value={formData.pincode}
                    onChange={handleInputChange}
                  />
                  {formErrors.pincode && <span className="field-error">{formErrors.pincode}</span>}
                </div>

                <div className="form-field">
                  <label htmlFor="orderNotes">Order / Landmark Notes (Optional)</label>
                  <input
                    type="text"
                    id="orderNotes"
                    name="orderNotes"
                    placeholder="Near Metro Station, Gate 2"
                    value={formData.orderNotes}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div style={{ marginTop: '2rem' }}>
                <button
                  type="submit"
                  disabled={submitting}
                  className="btn btn-primary btn-block"
                  style={{ padding: '1rem', fontSize: '1.05rem', fontWeight: 700 }}
                >
                  {submitting ? 'Verifying & Submitting Order...' : `Confirm & Place Order (₹${totalAmount.toLocaleString('en-IN')})`}
                </button>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem', color: '#64748b', fontSize: '0.8rem', marginTop: '1rem' }}>
                <FiLock /> 256-Bit SSL Encrypted & Direct Business Verification
              </div>
            </form>
          </div>

          {/* Cart Order Summary */}
          <div className="checkout-card">
            <h2 className="checkout-card-title">
              <FiPackage /> Ordered Items ({cartItems.length})
            </h2>

            <div>
              {cartItems.map((item) => (
                <div key={item.id} className="checkout-item-preview">
                  <img src={item.images[0]} alt={item.name} />
                  <div className="checkout-item-meta">
                    <h5>{item.name}</h5>
                    <span>Qty: {item.quantity} × {SITE_CONFIG.currencySymbol}{item.price.toLocaleString('en-IN')}</span>
                  </div>
                  <div style={{ fontWeight: 700, color: '#0f172a' }}>
                    {SITE_CONFIG.currencySymbol}{(item.price * item.quantity).toLocaleString('en-IN')}
                  </div>
                </div>
              ))}
            </div>

            <div style={{ marginTop: '1.75rem', paddingTop: '1.25rem', borderTop: '1px solid #e2e8f0' }}>
              <div className="order-details-row">
                <span style={{ color: '#64748b' }}>Subtotal</span>
                <span>{SITE_CONFIG.currencySymbol}{subtotal.toLocaleString('en-IN')}</span>
              </div>
              <div className="order-details-row">
                <span style={{ color: '#64748b' }}>Shipping</span>
                <span>
                  {shippingFee === 0 ? (
                    <strong style={{ color: '#10b981' }}>FREE Express</strong>
                  ) : (
                    `${SITE_CONFIG.currencySymbol}${shippingFee}`
                  )}
                </span>
              </div>
              <div className="order-details-row" style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0b214d', marginTop: '1rem', paddingTop: '1rem', borderTop: '2px dashed #cbd5e1' }}>
                <span>Total Amount</span>
                <span>{SITE_CONFIG.currencySymbol}{totalAmount.toLocaleString('en-IN')}</span>
              </div>
            </div>

            <div style={{ marginTop: '1.5rem', background: '#f8fafc', padding: '1rem', borderRadius: '8px', fontSize: '0.85rem', color: '#64748b' }}>
              <strong>Payment Method:</strong> Cash on Delivery (COD) / Direct Invoice Settlement upon dispatch confirmation.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
