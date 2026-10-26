export const SITE_CONFIG = {
  brandName: "Tofo India",
  brandShort: "Tofo India",
  tagline: "Electronics for a Smarter You",
  logo: "/tofo-logo.png",
  supportEmail: "care@tofoindia.com",
  salesEmail: "orders@tofoindia.com",
  phone: "+91 98765 43210",
  businessHours: "Monday – Saturday: 10:00 AM – 7:00 PM IST",
  address: "Tofo India Pvt Ltd,GANESH NAGAR,SIVIGIRIPATTI,PALANI, India",
  currencySymbol: "₹",
  freeShippingThreshold: 999,
  standardShippingFee: 99,
  // Google Apps Script Web App URL for placing validated orders
  // Users can set this in .env (VITE_ORDER_API_URL) or leave the fallback here
  orderApiUrl: import.meta.env.VITE_ORDER_API_URL || ""
};

export const CATEGORIES = [
  {
    id: "all",
    name: "All Products",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80",
    description: "Explore our complete range of premium audio, power and smart wearables."
  },
  {
    id: "audio",
    name: "Audio & Soundbars",
    image: "https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=600&q=80",
    description: "Soundbars, ANC headphones and true wireless earbuds engineered for pure acoustic bliss."
  },
  {
    id: "wearables",
    name: "Smartwatches & Wearables",
    image: "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=600&q=80",
    description: "AMOLED smartwatches with Bluetooth calling and 24/7 fitness tracking."
  },
  {
    id: "chargers",
    name: "Fast Chargers & Power",
    image: "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=600&q=80",
    description: "GaN 65W chargers, 20000mAh metal power banks, and MagSafe wireless packs."
  },
  {
    id: "cables",
    name: "Cables & Hubs",
    image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80",
    description: "Armored 100W PD cables and 7-in-1 4K USB-C multi-docking adapters."
  }
];
