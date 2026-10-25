# Tofo India - Premium E-Commerce Platform

A premium, responsive direct-to-consumer (D2C) e-commerce website for **Tofo India** ("*Electronics for a Smarter You*"), inspired by top consumer electronics storefronts with modular vanilla CSS, responsive navigation, configurable product catalog, shopping cart with persistent localStorage, and a secure serverless order notification backend powered by Google Apps Script and Gmail.

---

## ⚡ Tech Stack & Architecture

- **Frontend:** React 19 + Vite
- **Styling:** Vanilla CSS3 only (Clean custom variables, BEM-inspired naming, responsive CSS grid/flexbox, zero Tailwind)
- **Icons:** React Icons (`react-icons/fi`)
- **Routing:** React Router v7 (`react-router-dom`)
- **Cart State:** React Context API + Browser `localStorage`
- **Data Source:** Configurable JSON catalogue at `src/data/products.json`
- **Order Notification Backend:** Google Apps Script Web App (GAS) integrated with Gmail Service
- **Security:** Server-side price & shipping validation, zero frontend credential leaks, HTTPS CORS compatible

---

## 📁 Project Structure

```
tofo/
├── index.html                   # HTML entry point with fonts & metadata
├── package.json                 # Project dependencies & scripts
├── vite.config.js               # Vite build configuration
├── .env.example                 # Template for Apps Script webhook URL
├── .env                         # Active environment variables
│
├── public/
│   └── tofo-logo.png            # Official Tofo India brand logo
│
├── google-apps-script/
│   └── Code.js                  # Complete Google Apps Script server code
│
└── src/
    ├── main.jsx                 # React root renderer
    ├── App.jsx                  # Main application router & providers
    ├── context/
    │   └── CartContext.jsx      # Global cart state, item totals & toast notifications
    ├── data/
    │   ├── config.js            # Brand details, threshold, contacts, categories
    │   └── products.json        # Configurable master product catalog
    ├── components/
    │   ├── Header.jsx           # Sticky header, search overlay & mobile drawer
    │   ├── Footer.jsx           # Comprehensive footer with quick links & company info
    │   └── ProductCard.jsx      # Product showcase card with badges, rating, add-to-cart
    ├── pages/
    │   ├── Home.jsx             # Hero banner, features, categories, trending & promo
    │   ├── Shop.jsx             # Filter by category, price slider, search & sorting
    │   ├── ProductDetail.jsx    # Image gallery, specs table, highlights & related gear
    │   ├── Cart.jsx             # Quantity counter, remove items & free shipping tracker
    │   ├── Checkout.jsx         # Customer details, pin code validation & order submission
    │   ├── About.jsx            # Brand philosophy, mission & core pillars
    │   ├── Contact.jsx          # Office address, contact numbers, email & enquiry form
    │   └── Policies.jsx         # Shipping, Cancellation, Privacy & Terms & Conditions
    └── styles/
        ├── global.css           # Design tokens, buttons, resets & typography
        ├── header-footer.css    # Header, drawer & footer styling
        ├── product-card.css     # Product cards and responsive grid
        ├── home.css             # Hero banners, feature strips & promos
        ├── shop.css             # Shop sidebar, search bar & filter layouts
        ├── product-detail.css   # Gallery, specification tables & breadcrumbs
        ├── cart.css             # Cart items table & sticky order summary
        └── checkout.css         # Form fields, validation alerts & confirmation view
```

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```
Open your browser at `http://localhost:5173`.

### 3. Production Build
```bash
npm run build
```
Creates an optimized, minified bundle inside the `dist/` folder ready for hosting on Vercel, Netlify, Cloudflare Pages, or GitHub Pages.

---

## ✉️ Setting Up Google Apps Script for Gmail Order Notifications

Follow these simple steps to configure your own business email notifications:

### Step 1: Create a Google Apps Script Project
1. Open [Google Apps Script](https://script.google.com/) and click **New project**.
2. Rename the project to `Anme Tofo Order Notifier`.

### Step 2: Paste the Server Code
1. Open the file `google-apps-script/Code.js` in this repository.
2. Replace all content in the Apps Script editor (`Code.gs`) with the contents of `google-apps-script/Code.js`.
3. In `Code.gs`, locate `BUSINESS_CONFIG`:
   ```javascript
   var BUSINESS_CONFIG = {
     storeName: "Anme Tofo India",
     businessEmail: "your-actual-email@gmail.com", // <-- Enter your business recipient email here
     freeShippingThreshold: 999,
     standardShippingFee: 99
   };
   ```

### Step 3: Deploy as a Web App
1. Click **Deploy** > **New deployment** (top right).
2. Click the gear icon next to "Select type" and choose **Web app**.
3. Configure the fields:
   - **Description:** `Tofo Order Processing Gateway`
   - **Execute as:** `Me (your-google-account@gmail.com)`
   - **Who has access:** `Anyone` *(Crucial so the website can post orders without requiring Google account login)*
4. Click **Deploy**.
5. Click **Authorize access**, choose your Google account, click *Advanced* > *Go to Anme Tofo Order Notifier (unsafe)*, and allow Gmail access.
6. Copy the generated **Web App URL** (it looks like `https://script.google.com/macros/s/AKfycbx.../exec`).

### Step 4: Connect to React
1. In your project root, open `.env`.
2. Paste the Web App URL:
   ```env
   VITE_ORDER_API_URL=https://script.google.com/macros/s/AKfycbx.../exec
   ```
3. Restart or rebuild the application (`npm run dev` or `npm run build`).

---

## 🧪 Testing an Order

1. Launch the store: `npm run dev`.
2. Browse the **Audio & Soundbars** category or click any product card on the Home page.
3. On the Product page, select quantity and click **Add to Cart**.
4. Click the cart icon in the header and review the summary (free delivery applies above ₹999).
5. Click **Proceed to Checkout**.
6. Fill in the required details:
   - Name: `Aditya Sharma`
   - Phone: `9876543210`
   - Email: Your test email address
   - Address, City, State, and Pincode (e.g. `560038`).
7. Click **Confirm & Place Order**.
8. **Verification:**
   - The application displays the **Order Confirmation Screen** with a unique reference (e.g. `TOFO-20261025-ABCD`).
   - If `VITE_ORDER_API_URL` is set: Check your configured `businessEmail` inbox. You will see a styled HTML order table with the customer's shipping address, item breakdown, and totals. The customer also receives an automated confirmation receipt.
   - If `VITE_ORDER_API_URL` is not yet configured: The store automatically runs in safe **Demo Mode**, displaying simulated success without throwing errors.

---

## 🛠️ Adding or Editing Products

All product specifications and images are kept in `src/data/products.json`.
To add a new product or edit pricing, update the JSON object:

```json
{
  "id": "tofo-sample-product",
  "name": "Tofo Signature ANC Earphones",
  "category": "audio",
  "categoryName": "Audio & Soundbars",
  "price": 1999,
  "originalPrice": 3999,
  "discountPercent": 50,
  "rating": 4.9,
  "reviewsCount": 120,
  "inStock": true,
  "featured": true,
  "isBestSeller": true,
  "isNewArrival": true,
  "shortDescription": "Brief single-sentence product pitch.",
  "description": "Full detailed description...",
  "images": [
    "https://example.com/image1.jpg"
  ],
  "features": [
    "Feature 1",
    "Feature 2"
  ],
  "specs": {
    "Output": "50W",
    "Warranty": "1 Year"
  }
}
```
*Note: Also remember to update `MASTER_CATALOG` in `google-apps-script/Code.js` to keep server-side price validation in sync.*

---

## 🌐 Deployment to Production

### Deploying on Vercel
1. Push your repository to GitHub.
2. Import the repository in [Vercel](https://vercel.com).
3. Set the Environment Variable:
   - Key: `VITE_ORDER_API_URL`
   - Value: `https://script.google.com/macros/s/AKfycbx.../exec`
4. Click **Deploy**.

### Deploying on Netlify
1. Create a `_redirects` file in `public/` containing:
   ```
   /*    /index.html   200
   ```
2. Build command: `npm run build`
3. Publish directory: `dist`
4. Set `VITE_ORDER_API_URL` in the Netlify site settings.
