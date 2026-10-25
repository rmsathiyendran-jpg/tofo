import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { FiStar, FiShoppingCart, FiShield, FiTruck, FiRefreshCw, FiMinus, FiPlus, FiArrowLeft } from 'react-icons/fi';
import productsData from '../data/products.json';
import { SITE_CONFIG } from '../data/config';
import { useCart } from '../context/CartContext';
import { ProductCard } from '../components/ProductCard';
import '../styles/product-detail.css';

export const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const product = productsData.find((p) => p.id === id);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  // Scroll to top when product ID changes
  useEffect(() => {
    window.scrollTo(0, 0);
    setSelectedImage(0);
    setQuantity(1);
  }, [id]);

  if (!product) {
    return (
      <div className="container" style={{ padding: '6rem 1.25rem', textAlign: 'center' }}>
        <h2>Product Not Found</h2>
        <p style={{ color: '#64748b', margin: '1rem 0 2rem' }}>
          The product you are looking for might have been moved or is currently unavailable.
        </p>
        <Link to="/shop" className="btn btn-primary">
          Back to Shop Catalog
        </Link>
      </div>
    );
  }

  const relatedProducts = productsData
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    navigate('/checkout');
  };

  return (
    <div className="product-detail-page">
      <div className="container">
        {/* Breadcrumb Navigation */}
        <div className="breadcrumb">
          <Link to="/">Home</Link>
          <span>/</span>
          <Link to="/shop">Shop</Link>
          <span>/</span>
          <Link to={`/shop?category=${product.category}`}>{product.categoryName}</Link>
          <span>/</span>
          <span style={{ color: '#0f172a', fontWeight: 600 }}>{product.name}</span>
        </div>

        {/* Product Hero Info Grid */}
        <div className="detail-grid">
          {/* Gallery Column */}
          <div className="gallery-container">
            <div className="main-image-display">
              <img
                src={product.images[selectedImage]}
                alt={product.name}
              />
            </div>
            {product.images.length > 1 && (
              <div className="thumbnails-row">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    className={`thumb-btn ${selectedImage === idx ? 'active' : ''}`}
                    onClick={() => setSelectedImage(idx)}
                  >
                    <img src={img} alt={`${product.name} preview ${idx + 1}`} />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details Column */}
          <div className="detail-info">
            <span className="detail-category">{product.categoryName}</span>
            <h1 className="detail-title">{product.name}</h1>

            <div className="detail-rating-row">
              <span className="rating-stars" style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#f59e0b', fontWeight: 700 }}>
                <FiStar fill="#f59e0b" size={16} /> {product.rating}
              </span>
              <span style={{ color: '#64748b', fontSize: '0.9rem' }}>
                ({product.reviewsCount} verified customer reviews)
              </span>
              <span style={{ color: '#10b981', fontWeight: 700, fontSize: '0.85rem' }}>• In Stock</span>
            </div>

            {/* Price Card */}
            <div className="detail-price-box">
              <span className="detail-price">
                {SITE_CONFIG.currencySymbol}{product.price.toLocaleString('en-IN')}
              </span>
              {product.originalPrice > product.price && (
                <>
                  <span className="detail-original-price">
                    {SITE_CONFIG.currencySymbol}{product.originalPrice.toLocaleString('en-IN')}
                  </span>
                  <span className="detail-discount-badge">
                    {product.discountPercent}% OFF
                  </span>
                </>
              )}
            </div>

            <p className="detail-short-desc">{product.shortDescription}</p>

            {/* Quantity Selector and CTA */}
            <div className="detail-cta-row">
              <div className="qty-counter">
                <button
                  className="qty-btn"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  aria-label="Decrease quantity"
                >
                  <FiMinus size={14} />
                </button>
                <span className="qty-display">{quantity}</span>
                <button
                  className="qty-btn"
                  onClick={() => setQuantity((q) => q + 1)}
                  aria-label="Increase quantity"
                >
                  <FiPlus size={14} />
                </button>
              </div>

              <button
                className="btn btn-primary btn-add-cart"
                onClick={handleAddToCart}
              >
                <FiShoppingCart size={18} /> Add to Cart
              </button>

              <button
                className="btn btn-blue"
                style={{ height: '50px', padding: '0 1.5rem', fontWeight: 700 }}
                onClick={handleBuyNow}
              >
                Buy Now
              </button>
            </div>

            {/* Trust Badges */}
            <div className="detail-guarantees">
              <div className="guarantee-item">
                <FiTruck size={20} />
                <div>
                  <div>Free Express Delivery</div>
                  <small style={{ color: '#64748b' }}>On orders above ₹999</small>
                </div>
              </div>
              <div className="guarantee-item">
                <FiShield size={20} />
                <div>
                  <div>1 Year Warranty</div>
                  <small style={{ color: '#64748b' }}>Hassle-free replacement</small>
                </div>
              </div>
              <div className="guarantee-item">
                <FiRefreshCw size={20} />
                <div>
                  <div>7 Days Replacement</div>
                  <small style={{ color: '#64748b' }}>Transit & tech coverage</small>
                </div>
              </div>
              <div className="guarantee-item">
                <FiStar size={20} />
                <div>
                  <div>100% Genuine Tech</div>
                  <small style={{ color: '#64748b' }}>Certified Tofo India</small>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Specifications and Overview Section */}
        <div className="detail-specs-section">
          <h2 className="specs-title">Product Overview & Features</h2>
          <p style={{ color: '#475569', fontSize: '1.05rem', lineHeight: '1.7', marginBottom: '2rem' }}>
            {product.description}
          </p>

          <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '1rem', color: '#0f172a' }}>
            Key Highlights
          </h3>
          <ul className="features-list">
            {product.features.map((feature, idx) => (
              <li key={idx}>{feature}</li>
            ))}
          </ul>

          <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '1rem', color: '#0f172a' }}>
            Technical Specifications
          </h3>
          <table className="specs-table">
            <tbody>
              {Object.entries(product.specs).map(([key, val]) => (
                <tr key={key}>
                  <td className="spec-name">{key}</td>
                  <td className="spec-val">{val}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Related Products Section */}
        {relatedProducts.length > 0 && (
          <div style={{ marginTop: '5rem' }}>
            <div className="section-header">
              <span className="section-subtitle">You May Also Like</span>
              <h2 className="section-title">Similar Performance Gear</h2>
            </div>
            <div className="products-grid">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
