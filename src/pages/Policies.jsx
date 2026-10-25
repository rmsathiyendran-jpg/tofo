import React from 'react';
import { SITE_CONFIG } from '../data/config';

export const Policy = ({ title, effectiveDate, sections }) => {
  return (
    <div className="container" style={{ padding: '4rem 1.25rem 6rem', maxWidth: '860px' }}>
      <div style={{ marginBottom: '2.5rem', borderBottom: '1px solid #e2e8f0', paddingBottom: '1.5rem' }}>
        <h1 style={{ fontSize: '2.25rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>{title}</h1>
        <p style={{ color: '#64748b', fontSize: '0.9rem' }}>
          Effective Date: {effectiveDate || 'October 2026'} | {SITE_CONFIG.brandName}
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', color: '#334155', lineHeight: '1.7', fontSize: '1rem' }}>
        {sections.map((sec, idx) => (
          <div key={idx} style={{ backgroundColor: '#ffffff', padding: '1.75rem', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.75rem' }}>
              {sec.heading}
            </h3>
            <p style={{ whiteSpace: 'pre-line' }}>{sec.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export const ShippingPolicy = () => {
  const sections = [
    {
      heading: "1. Pan-India Delivery Coverage",
      body: "Tofo India delivers to over 27,000+ pincodes across all Indian states and Union Territories through tier-1 logistics partners including Blue Dart, Delhivery, DTDC, and Xpressbees."
    },
    {
      heading: "2. Shipping Charges & Free Delivery Threshold",
      body: "We offer FREE Express Shipping on all prepaid and Cash-on-Delivery orders with a total order value of ₹999 or above.\nFor orders under ₹999, a nominal standard flat delivery fee of ₹99 is applicable at checkout."
    },
    {
      heading: "3. Order Processing & Dispatch Timelines",
      body: "All verified orders are packed and dispatched from our primary warehouse within 24 to 48 business hours.\nMetro Cities: Delivered within 2 to 4 business days.\nRest of India / Tier 2 & Tier 3 Cities: Delivered within 4 to 7 business days."
    },
    {
      heading: "4. Shipment Tracking",
      body: "Once your parcel is handed over to the courier partner, an automated SMS and email containing the tracking AWB code and live status link will be dispatched to your registered contact credentials."
    }
  ];
  return <Policy title="Shipping & Delivery Policy" sections={sections} />;
};

export const CancellationPolicy = () => {
  const sections = [
    {
      heading: "1. Order Cancellation by Customer",
      body: "You can request a cancellation of your order at zero cost anytime before it has been dispatched from our facility. To cancel, please email orders@tofoindia.com or reach out to our customer helpline with your Order Reference."
    },
    {
      heading: "2. 7-Day Replacement Guarantee",
      body: "If your received gadget arrives damaged in transit, with missing parts, or exhibits technical non-performance upon unboxing, you are entitled to a free, hassle-free replacement within 7 calendar days of delivery."
    },
    {
      heading: "3. Refund Process",
      body: "In cases where a replacement cannot be provided due to out-of-stock inventory, a full 100% refund will be credited back to your original source payment instrument within 5 to 7 working days."
    },
    {
      heading: "4. Non-Returnable Scenarios",
      body: "Products showing physical water damage (where non-rated), intentional tampering, missing original brand tags, cables or packaging boxes are not eligible for free return or replacement under this clause."
    }
  ];
  return <Policy title="Cancellation & Return Policy" sections={sections} />;
};

export const PrivacyPolicy = () => {
  const sections = [
    {
      heading: "1. Information We Collect",
      body: "When you place an order on our store, we collect basic details necessary to fulfil and deliver your package: your name, contact phone number, shipping address, email ID, and item preferences."
    },
    {
      heading: "2. How We Safeguard Your Information",
      body: "We strictly never sell, lease, or rent customer personal information to third-party marketing companies. Data submitted during order checkout is transmitted via secure 256-bit SSL encryption directly to our authorized order-dispatch service."
    },
    {
      heading: "3. Cookies & Session Storage",
      body: "Our web store utilizes your browser's local storage (localStorage) to maintain your shopping cart selections between visits. We do not store sensitive payment card details or unencrypted secrets on your browser."
    },
    {
      heading: "4. Data Privacy Contact",
      body: "If you have questions regarding data retention or wish to request deletion of your order contact history, please email care@tofoindia.com."
    }
  ];
  return <Policy title="Privacy Policy" sections={sections} />;
};

export const TermsConditions = () => {
  const sections = [
    {
      heading: "1. Agreement to Terms",
      body: "By accessing and using this website, you agree to comply with and be bound by the Terms and Conditions of Tofo India Pvt Ltd."
    },
    {
      heading: "2. Product Information & Pricing",
      body: "While we strive for 100% precision in product descriptions, images, and prices, typographical discrepancies may occasionally occur. Tofo India reserves the right to correct pricing errors before order dispatch."
    },
    {
      heading: "3. 1-Year Official Brand Warranty",
      body: "All Tofo India electronic products are covered by a comprehensive 1-Year brand warranty covering internal component failure and manufacturing defects from the date of purchase."
    },
    {
      heading: "4. Governing Jurisdiction",
      body: "Any disputes or legal proceedings arising from transactions on this website shall fall strictly under the jurisdiction of the competent courts in Bengaluru, Karnataka, India."
    }
  ];
  return <Policy title="Terms & Conditions" sections={sections} />;
};
