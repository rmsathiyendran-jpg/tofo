import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FiSearch, FiSliders, FiRotateCcw } from 'react-icons/fi';
import productsData from '../data/products.json';
import { CATEGORIES } from '../data/config';
import { ProductCard } from '../components/ProductCard';
import '../styles/shop.css';

export const Shop = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || 'all';
  const initialSearch = searchParams.get('search') || '';

  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [sortBy, setSortBy] = useState('featured');
  const [maxPrice, setMaxPrice] = useState(10000);

  // Sync category state when URL changes
  useEffect(() => {
    const cat = searchParams.get('category');
    if (cat) setSelectedCategory(cat);
    const search = searchParams.get('search');
    if (search !== null) setSearchQuery(search);
  }, [searchParams]);

  const handleCategoryChange = (catId) => {
    setSelectedCategory(catId);
    if (catId === 'all') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', catId);
    }
    setSearchParams(searchParams);
  };

  const handleResetFilters = () => {
    setSelectedCategory('all');
    setSearchQuery('');
    setSortBy('featured');
    setMaxPrice(10000);
    setSearchParams({});
  };

  const filteredProducts = useMemo(() => {
    return productsData
      .filter((p) => {
        // Category match
        if (selectedCategory !== 'all' && p.category !== selectedCategory) {
          return false;
        }
        // Search query match
        if (searchQuery.trim() !== '') {
          const q = searchQuery.toLowerCase();
          const matchTitle = p.name.toLowerCase().includes(q);
          const matchDesc = p.shortDescription.toLowerCase().includes(q);
          const matchCat = p.categoryName.toLowerCase().includes(q);
          if (!matchTitle && !matchDesc && !matchCat) return false;
        }
        // Price ceiling
        if (p.price > maxPrice) {
          return false;
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-low') return a.price - b.price;
        if (sortBy === 'price-high') return b.price - a.price;
        if (sortBy === 'rating') return b.rating - a.rating;
        if (sortBy === 'discount') return b.discountPercent - a.discountPercent;
        // Default featured
        return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
      });
  }, [selectedCategory, searchQuery, sortBy, maxPrice]);

  return (
    <div className="shop-page">
      <div className="container">
        {/* Shop Banner */}
        <div className="shop-header">
          <h1>Explore Premium Tech</h1>
          <p>
            Browse our full catalog of acoustics, smartwatch monitors, high-output GaN adapters, and rugged accessories.
          </p>
        </div>

        <div className="shop-layout">
          {/* Sidebar Filters */}
          <aside className="shop-sidebar">
            <div className="filter-group">
              <div className="filter-title">
                <span>Categories</span>
                <FiSliders size={16} />
              </div>
              <ul className="category-filter-list">
                {CATEGORIES.map((cat) => {
                  const count =
                    cat.id === 'all'
                      ? productsData.length
                      : productsData.filter((p) => p.category === cat.id).length;
                  return (
                    <li key={cat.id}>
                      <button
                        className={`category-filter-btn ${selectedCategory === cat.id ? 'active' : ''}`}
                        onClick={() => handleCategoryChange(cat.id)}
                      >
                        <span>{cat.name}</span>
                        <span style={{ fontSize: '0.8rem', opacity: 0.7 }}>({count})</span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="filter-group">
              <div className="filter-title">
                <span>Max Price: ₹{maxPrice.toLocaleString('en-IN')}</span>
              </div>
              <input
                type="range"
                min="500"
                max="10000"
                step="500"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                style={{ width: '100%', accentColor: 'var(--primary-blue)' }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: '#64748b', marginTop: '0.25rem' }}>
                <span>₹500</span>
                <span>₹10,000</span>
              </div>
            </div>

            <button
              onClick={handleResetFilters}
              className="btn btn-outline btn-block"
              style={{ fontSize: '0.85rem', marginTop: '1rem' }}
            >
              <FiRotateCcw size={14} /> Reset All Filters
            </button>
          </aside>

          {/* Main Products Area */}
          <main className="shop-main">
            {/* Toolbar */}
            <div className="shop-toolbar">
              <div className="toolbar-search">
                <FiSearch className="toolbar-search-icon" size={16} />
                <input
                  type="text"
                  placeholder="Filter by keyword (e.g. 120W, GaN, AMOLED)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <div className="toolbar-sort">
                <label htmlFor="sort-select" style={{ fontSize: '0.85rem', fontWeight: 600, color: '#475569' }}>
                  Sort By:
                </label>
                <select
                  id="sort-select"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="featured">Featured / Best Match</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                  <option value="discount">Biggest Discount</option>
                </select>
              </div>
            </div>

            {/* Results Count */}
            <div style={{ marginBottom: '1.25rem', fontSize: '0.9rem', color: '#64748b' }}>
              Showing <strong>{filteredProducts.length}</strong> product{filteredProducts.length === 1 ? '' : 's'}
            </div>

            {/* Products Grid or Empty State */}
            {filteredProducts.length > 0 ? (
              <div className="products-grid">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="no-products-found">
                <h3>No Matching Products Found</h3>
                <p>We couldn't find any items matching your selected criteria. Try adjusting or clearing your filters.</p>
                <button onClick={handleResetFilters} className="btn btn-primary">
                  Clear All Filters
                </button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};
