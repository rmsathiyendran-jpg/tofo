import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider, useCart } from './context/CartContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { Shop } from './pages/Shop';
import { ProductDetail } from './pages/ProductDetail';
import { Cart } from './pages/Cart';
import { Checkout } from './pages/Checkout';
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import {
  ShippingPolicy,
  CancellationPolicy,
  PrivacyPolicy,
  TermsConditions
} from './pages/Policies';

import './styles/global.css';
import './styles/header-footer.css';

const GlobalToastRenderer = () => {
  const { toastMessage } = useCart();
  if (!toastMessage) return null;
  return <div className="global-toast">{toastMessage}</div>;
};

export function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          <Header />
          <main style={{ flex: 1 }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/shipping-policy" element={<ShippingPolicy />} />
              <Route path="/cancellation-policy" element={<CancellationPolicy />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/terms-conditions" element={<TermsConditions />} />
              <Route path="*" element={<Home />} />
            </Routes>
          </main>
          <Footer />
          <GlobalToastRenderer />
        </div>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;
