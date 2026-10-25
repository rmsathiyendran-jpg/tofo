import React from 'react';
import { Link } from 'react-router-dom';
import { FiStar, FiShoppingCart, FiEye } from 'react-icons/fi';
import { useCart } from '../context/CartContext';
import { SITE_CONFIG } from '../data/config';
import '../styles/product-card.css';

export const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
  };

  return (
    <div className="product-card">
      <div className="card-image-wrapper">
        <Link to={`/product/${product.id}`}>
          <img
            src={product.images[0]}
            alt={product.name}
            className="card-image"
            loading="lazy"
          />
        </Link>

        {/* Badges */}
        <div className="badge-container">
          {product.discountPercent > 0 && (
            <span className="badge-tag-sale">-{product.discountPercent}% OFF</span>
          )}
          {product.isNewArrival && (
            <span className="badge-tag-new">New</span>
          )}
          {product.isBestSeller && (
            <span className="badge-tag-bestseller">Best Seller</span>
          )}
        </div>
      </div>

      <div className="card-content">
        <div className="card-category">{product.categoryName}</div>
        <Link to={`/product/${product.id}`} title={product.name}>
          <h3 className="card-title">{product.name}</h3>
        </Link>

        {/* Rating */}
        <div className="card-rating">
          <span className="rating-stars">
            <FiStar fill="#f59e0b" size={14} /> {product.rating}
          </span>
          <span className="rating-reviews">({product.reviewsCount} reviews)</span>
        </div>

        {/* Price Row */}
        <div className="card-price-row">
          <span className="current-price">
            {SITE_CONFIG.currencySymbol}{product.price.toLocaleString('en-IN')}
          </span>
          {product.originalPrice > product.price && (
            <>
              <span className="original-price">
                {SITE_CONFIG.currencySymbol}{product.originalPrice.toLocaleString('en-IN')}
              </span>
              <span className="discount-tag">
                Save {SITE_CONFIG.currencySymbol}{(product.originalPrice - product.price).toLocaleString('en-IN')}
              </span>
            </>
          )}
        </div>

        {/* Action Buttons */}
        <div className="card-actions">
          <button
            onClick={handleAddToCart}
            className="btn btn-primary btn-card-cart"
            title="Add to Shopping Cart"
          >
            <FiShoppingCart size={16} /> Add to Cart
          </button>
          <Link
            to={`/product/${product.id}`}
            className="btn btn-outline"
            style={{ padding: '0.65rem 0.8rem' }}
            title="View Details"
          >
            <FiEye size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
};
