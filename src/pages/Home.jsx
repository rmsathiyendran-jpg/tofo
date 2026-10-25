import React from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiShield, FiTruck, FiRefreshCw, FiHeadphones, FiZap } from 'react-icons/fi';
import productsData from '../data/products.json';
import { CATEGORIES, SITE_CONFIG } from '../data/config';
import { ProductCard } from '../components/ProductCard';
import '../styles/home.css';

export const Home = () => {
  const featuredProducts = productsData.filter(p => p.featured).slice(0, 4);
  const bestSellers = productsData.filter(p => p.isBestSeller).slice(0, 4);
  const newArrivals = productsData.filter(p => p.isNewArrival).slice(0, 4);

  return (
    <div className="home-page">
      {/* 1. Hero Banner */}
      <section className="hero-section">
        <div className="container">
          <div className="hero-grid">
            <div className="hero-content">
              <span className="hero-pill">
                <FiZap /> Next-Gen Audio & Smart Tech
              </span>
              <h1 className="hero-title">
                Electronics For A <br />
                <span className="highlight-orange">Smarter You</span>
              </h1>
              <p className="hero-lead">
                Immerse yourself in precision acoustic soundbars, active noise cancelling headphones, fast GaN power solutions, and intelligent wearables crafted for modern lifestyle.
              </p>
              <div className="hero-btn-group">
                <Link to="/shop" className="btn btn-primary" style={{ padding: '0.9rem 2rem', fontSize: '1rem' }}>
                  Shop Collection <FiArrowRight />
                </Link>
                <Link to="/shop?category=audio" className="btn btn-outline" style={{ background: 'transparent', color: '#fff', borderColor: 'rgba(255,255,255,0.3)', padding: '0.9rem 1.75rem' }}>
                  Explore Audio
                </Link>
              </div>
            </div>

            <div className="hero-image-wrapper">
              <div className="hero-image-card">
                <img
                  src="https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=1000&q=80"
                  alt="Tofo Aura Pro Soundbar"
                  className="hero-main-img"
                />
                <div className="hero-floating-badge">
                  <FiZap size={24} color="var(--accent-orange)" />
                  <div>
                    <strong>Flagship 120W Cinema</strong>
                    <span>Tofo Aura Pro Soundbar • 50% Off</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Value Propositions Bar */}
      <section className="features-strip">
        <div className="container">
          <div className="features-grid">
            <div className="feature-box">
              <div className="feature-icon-circle"><FiTruck /></div>
              <div className="feature-info">
                <h4>Pan-India Delivery</h4>
                <p>Free express delivery on orders over ₹999</p>
              </div>
            </div>
            <div className="feature-box">
              <div className="feature-icon-circle"><FiShield /></div>
              <div className="feature-info">
                <h4>1 Year Warranty</h4>
                <p>Official brand replacement & repair guarantee</p>
              </div>
            </div>
            <div className="feature-box">
              <div className="feature-icon-circle"><FiRefreshCw /></div>
              <div className="feature-info">
                <h4>7-Day Easy Returns</h4>
                <p>Hassle-free replacement for defective items</p>
              </div>
            </div>
            <div className="feature-box">
              <div className="feature-icon-circle"><FiHeadphones /></div>
              <div className="feature-info">
                <h4>Expert Customer Care</h4>
                <p>Direct assistance via phone and email</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Shop by Category */}
      <section className="categories-section">
        <div className="container">
          <div className="section-header">
            <span className="section-subtitle">Curated Categories</span>
            <h2 className="section-title">Designed For Everyday Performance</h2>
            <p className="section-desc">Browse through our flagship product categories engineered to power your everyday digital life.</p>
          </div>

          <div className="category-cards-grid">
            {CATEGORIES.filter(c => c.id !== 'all').map((cat) => (
              <Link to={`/shop?category=${cat.id}`} key={cat.id} className="category-card">
                <img src={cat.image} alt={cat.name} className="category-card-bg" />
                <div className="category-overlay"></div>
                <div className="category-card-content">
                  <h3>{cat.name}</h3>
                  <span>Explore Gear <FiArrowRight size={14} /></span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Featured Products */}
      <section className="home-products-section" style={{ backgroundColor: '#ffffff' }}>
        <div className="container">
          <div className="section-header">
            <span className="section-subtitle">Featured Highlights</span>
            <h2 className="section-title">Trending Tech Loved By India</h2>
            <p className="section-desc">Experience our most sought-after electronics packed with industry-leading specs.</p>
          </div>

          <div className="products-grid">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '3rem' }}>
            <Link to="/shop" className="btn btn-blue" style={{ padding: '0.85rem 2.25rem' }}>
              View All Products <FiArrowRight />
            </Link>
          </div>
        </div>
      </section>

      {/* 5. Promotional Mid Banner */}
      <div className="container">
        <div className="promo-banner">
          <div className="promo-grid">
            <div>
              <span className="promo-tag">Special Festival Deal</span>
              <h2 className="promo-title">Upgrade To Ultra-Fast 65W GaN Power</h2>
              <p className="promo-desc">
                Charge your laptop, phone, and tablet all at once from one ultra-compact gallium nitride wall adapter. Runs cooler and recharges devices in half the time.
              </p>
              <Link to="/product/tofo-gan-charger-65w" className="btn btn-primary" style={{ padding: '0.85rem 1.75rem' }}>
                Get 45% OFF Now <FiArrowRight />
              </Link>
            </div>
            <div style={{ textAlign: 'center' }}>
              <img
                src="https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=700&q=80"
                alt="Nitro 65W GaN Charger"
                style={{ borderRadius: '16px', maxHeight: '280px', width: '100%', objectFit: 'cover', margin: '0 auto', boxShadow: '0 10px 30px rgba(0,0,0,0.4)' }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* 6. Best Sellers */}
      <section className="home-products-section">
        <div className="container">
          <div className="section-header">
            <span className="section-subtitle">Top Customer Favorites</span>
            <h2 className="section-title">Our Best Sellers</h2>
            <p className="section-desc">Thousands of five-star reviews from creators, professionals, and tech enthusiasts across India.</p>
          </div>

          <div className="products-grid">
            {bestSellers.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* 7. New Arrivals */}
      <section className="home-products-section" style={{ backgroundColor: '#ffffff', paddingTop: '3.5rem', paddingBottom: '5rem' }}>
        <div className="container">
          <div className="section-header">
            <span className="section-subtitle">Fresh Innovations</span>
            <h2 className="section-title">New Arrivals</h2>
            <p className="section-desc">The newest additions to the Tofo India family of smart electronics.</p>
          </div>

          <div className="products-grid">
            {newArrivals.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
