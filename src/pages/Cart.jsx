import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiTrash2, FiMinus, FiPlus, FiShoppingBag, FiArrowRight, FiShield } from 'react-icons/fi';
import { useCart } from '../context/CartContext';
import { SITE_CONFIG } from '../data/config';
import '../styles/cart.css';

export const Cart = () => {
  const { cartItems, updateQuantity, removeFromCart, clearCart, subtotal, shippingFee, totalAmount } = useCart();
  const navigate = useNavigate();

  if (cartItems.length === 0) {
    return (
      <div className="cart-page">
        <div className="container">
          <div className="cart-empty-box">
            <FiShoppingBag className="cart-empty-icon" />
            <h2 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '0.75rem' }}>Your Bag is Empty</h2>
            <p style={{ color: '#64748b', marginBottom: '2rem', maxWidth: '400px', margin: '0 auto 2rem' }}>
              Explore our state-of-the-art acoustics, high-output fast chargers, and smart electronics to fill your cart.
            </p>
            <Link to="/shop" className="btn btn-primary" style={{ padding: '0.85rem 2rem' }}>
              Start Shopping Now <FiArrowRight />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const freeShippingDifference = SITE_CONFIG.freeShippingThreshold - subtotal;

  return (
    <div className="cart-page">
      <div className="container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <h1 style={{ fontSize: '2rem', fontWeight: 800 }}>Shopping Cart ({cartItems.length})</h1>
          <button
            onClick={clearCart}
            style={{ color: '#ef4444', fontSize: '0.9rem', fontWeight: 600, textDecoration: 'underline' }}
          >
            Clear All
          </button>
        </div>

        <div className="cart-layout">
          {/* Items List */}
          <div className="cart-table-card">
            <div className="cart-items-list">
              {cartItems.map((item) => (
                <div key={item.id} className="cart-item-row">
                  <img src={item.images[0]} alt={item.name} className="cart-item-thumb" />

                  <div className="cart-item-info">
                    <Link to={`/product/${item.id}`}>
                      <h4>{item.name}</h4>
                    </Link>
                    <p>{item.categoryName}</p>
                    <div className="cart-item-price" style={{ marginTop: '0.4rem' }}>
                      {SITE_CONFIG.currencySymbol}{item.price.toLocaleString('en-IN')}
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <div className="qty-counter" style={{ height: '38px' }}>
                      <button
                        className="qty-btn"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        aria-label="Decrease quantity"
                      >
                        <FiMinus size={12} />
                      </button>
                      <span className="qty-display" style={{ width: '36px', fontSize: '0.9rem' }}>
                        {item.quantity}
                      </span>
                      <button
                        className="qty-btn"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        aria-label="Increase quantity"
                      >
                        <FiPlus size={12} />
                      </button>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
                    <div style={{ fontWeight: 800, fontSize: '1.1rem', color: '#0f172a' }}>
                      {SITE_CONFIG.currencySymbol}{(item.price * item.quantity).toLocaleString('en-IN')}
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="cart-remove-btn"
                      title="Remove product"
                      aria-label="Remove product"
                    >
                      <FiTrash2 />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Cart Summary */}
          <div className="summary-card">
            <h3 className="summary-title">Order Summary</h3>

            {freeShippingDifference > 0 ? (
              <div className="free-shipping-progress">
                Add <strong>{SITE_CONFIG.currencySymbol}{freeShippingDifference.toLocaleString('en-IN')}</strong> more of items to unlock <strong>FREE Express Delivery</strong>!
              </div>
            ) : (
              <div className="free-shipping-progress" style={{ borderLeftColor: '#10b981', color: '#065f46', backgroundColor: '#ecfdf5' }}>
                🎉 You've unlocked <strong>FREE Express Pan-India Delivery</strong>!
              </div>
            )}

            <div className="summary-line">
              <span>Subtotal</span>
              <span>{SITE_CONFIG.currencySymbol}{subtotal.toLocaleString('en-IN')}</span>
            </div>

            <div className="summary-line">
              <span>Standard Shipping</span>
              <span>
                {shippingFee === 0 ? (
                  <strong style={{ color: '#10b981' }}>FREE</strong>
                ) : (
                  `${SITE_CONFIG.currencySymbol}${shippingFee}`
                )}
              </span>
            </div>

            <div className="summary-line total">
              <span>Estimated Total</span>
              <span>{SITE_CONFIG.currencySymbol}{totalAmount.toLocaleString('en-IN')}</span>
            </div>

            <button
              onClick={() => navigate('/checkout')}
              className="btn btn-primary btn-block"
              style={{ marginTop: '1.5rem', padding: '0.9rem' }}
            >
              Proceed To Checkout <FiArrowRight />
            </button>

            <Link
              to="/shop"
              className="btn btn-outline btn-block"
              style={{ marginTop: '0.75rem', fontSize: '0.9rem' }}
            >
              Continue Shopping
            </Link>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginTop: '1.5rem', color: '#64748b', fontSize: '0.8rem' }}>
              <FiShield size={16} /> 100% Genuine Tofo India Products Guaranteed
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
