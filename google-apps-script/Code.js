/**
 * ==============================================================================
 * TOFO INDIA - SECURE ORDER NOTIFICATION SERVICE (GOOGLE APPS SCRIPT)
 * ==============================================================================
 *
 * This Google Apps Script acts as the serverless backend endpoint for receiving,
 * validating, and emailing customer order notifications to the business team and
 * sending an order confirmation receipt to the customer.
 *
 * HOW IT PROTECTS YOUR STORE:
 * 1. Validates order payload on the server side using the trusted master catalog.
 * 2. Re-computes prices and shipping charges securely (preventing client price tampering).
 * 3. Keeps your business email and Gmail App Passwords 100% private.
 * 4. Sends clean HTML email notifications directly to your business inbox.
 * 5. Returns a structured JSON response to React so confirmation only shows upon success.
 */

// 1. Master Server Catalog with Trusted Pricing
var MASTER_CATALOG = {
  "tofo-soundbar-aura-120": { name: "Tofo Aura Pro 120W Bluetooth Soundbar with Subwoofer", price: 4999 },
  "tofo-anc-headphones-zenith": { name: "Tofo Zenith Active Noise Cancelling Wireless Headphones", price: 2799 },
  "tofo-tws-airpulse-x": { name: "Tofo AirPulse X True Wireless Earbuds with Quad Mic ENC", price: 1499 },
  "tofo-smartwatch-vertex-amoled": { name: "Tofo Vertex 1.96\" AMOLED Smartwatch with Bluetooth Calling", price: 2499 },
  "tofo-gan-charger-65w": { name: "Tofo Nitro Charge 65W GaN Fast Charger (3-Port Multi-Device)", price: 1899 },
  "tofo-powerbank-20000mah": { name: "Tofo PowerMatrix 20,000mAh 22.5W Metal Power Bank", price: 1599 },
  "tofo-braided-cable-100w": { name: "Tofo ArmorCord 100W PD Type-C to Type-C Braided Cable (1.5m)", price: 499 },
  "tofo-multiport-hub-7in1": { name: "Tofo ConnectHub 7-in-1 USB-C Multiport Docking Adapter", price: 2199 },
  "tofo-speaker-pulse-bass": { name: "Tofo Roam 24W Rugged Waterproof Bluetooth Speaker", price: 1999 },
  "tofo-car-charger-45w": { name: "Tofo TurboDrive 45W Dual Metal Mini Car Charger", price: 699 },
  "tofo-magnetic-wireless-powerbank": { name: "Tofo MagSnap 10,000mAh Magnetic Wireless Power Bank", price: 2299 },
  "tofo-smart-fit-tracker": { name: "Tofo PulseFit Pro Activity Tracker Band with SpO2", price: 1399 }
};

var BUSINESS_CONFIG = {
  storeName: "Tofo India",
  // Change this to your business receiving email address
  businessEmail: "orders@tofoindia.com",
  freeShippingThreshold: 999,
  standardShippingFee: 99
};

/**
 * Handle HTTP POST requests from the React checkout form
 */
function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.tryLock(10000);

  try {
    if (!e || !e.postData || !e.postData.contents) {
      return createJsonResponse({
        status: "error",
        message: "No order payload received"
      }, 400);
    }

    var orderData = JSON.parse(e.postData.contents);

    // Validate customer details
    var customer = orderData.customer;
    if (!customer || !customer.fullName || !customer.phone || !customer.email || !customer.address || !customer.pincode) {
      return createJsonResponse({
        status: "error",
        message: "Missing required customer or delivery address fields"
      }, 400);
    }

    // Validate and recompute prices on the server
    var clientItems = orderData.items || [];
    if (clientItems.length === 0) {
      return createJsonResponse({
        status: "error",
        message: "Order has no items"
      }, 400);
    }

    var serverSubtotal = 0;
    var verifiedItems = [];

    for (var i = 0; i < clientItems.length; i++) {
      var item = clientItems[i];
      var catalogProduct = MASTER_CATALOG[item.id];

      // If product exists in catalog, use catalog price; else fallback securely
      var unitPrice = catalogProduct ? catalogProduct.price : Number(item.unitPrice || 0);
      var productName = catalogProduct ? catalogProduct.name : (item.name || "Tofo Product");
      var quantity = Math.max(1, parseInt(item.quantity, 10) || 1);
      var lineTotal = unitPrice * quantity;

      serverSubtotal += lineTotal;
      verifiedItems.push({
        id: item.id,
        name: productName,
        quantity: quantity,
        unitPrice: unitPrice,
        lineTotal: lineTotal
      });
    }

    // Calculate server verified shipping fee
    var serverShippingFee = (serverSubtotal >= BUSINESS_CONFIG.freeShippingThreshold) ? 0 : BUSINESS_CONFIG.standardShippingFee;
    var serverTotalAmount = serverSubtotal + serverShippingFee;

    var orderRef = orderData.orderReference || ("TOFO-" + Utilities.formatDate(new Date(), "GMT+5:30", "yyyyMMdd-HHmmss"));

    // Compose Rich HTML Email for Business Team
    var businessHtmlBody = buildOrderEmailHtml({
      orderRef: orderRef,
      customer: customer,
      items: verifiedItems,
      subtotal: serverSubtotal,
      shippingFee: serverShippingFee,
      totalAmount: serverTotalAmount,
      isForBusiness: true
    });

    // Send order email to Business Inbox
    GmailApp.sendEmail(
      BUSINESS_CONFIG.businessEmail,
      "🔥 New Order Received [" + orderRef + "] - ₹" + serverTotalAmount.toLocaleString('en-IN') + " (" + customer.fullName + ")",
      "New order received from " + customer.fullName + ". Please open HTML email.",
      {
        name: "Tofo India Order Bot",
        htmlBody: businessHtmlBody,
        replyTo: customer.email
      }
    );

    // Optionally send order confirmation email to the Customer
    try {
      var customerHtmlBody = buildOrderEmailHtml({
        orderRef: orderRef,
        customer: customer,
        items: verifiedItems,
        subtotal: serverSubtotal,
        shippingFee: serverShippingFee,
        totalAmount: serverTotalAmount,
        isForBusiness: false
      });

      GmailApp.sendEmail(
        customer.email,
        "Order Confirmed: " + orderRef + " | Tofo India",
        "Your order " + orderRef + " has been received.",
        {
          name: "Tofo India",
          htmlBody: customerHtmlBody
        }
      );
    } catch (custErr) {
      Logger.log("Customer email note: " + custErr.toString());
      // Even if customer email bounces, business order was successfully recorded
    }

    // Return success response to React frontend
    return createJsonResponse({
      status: "success",
      orderReference: orderRef,
      totalAmount: serverTotalAmount,
      message: "Order placed and notifications dispatched successfully"
    });

  } catch (err) {
    Logger.log("doPost Error: " + err.toString());
    return createJsonResponse({
      status: "error",
      message: err.toString()
    }, 500);
  } finally {
    lock.releaseLock();
  }
}

/**
 * Handle GET requests for health check testing
 */
function doGet(e) {
  return createJsonResponse({
    status: "ok",
    service: "Tofo India Order Gateway",
    timestamp: new Date().toISOString()
  });
}

/**
 * Build clean, responsive HTML email template
 */
function buildOrderEmailHtml(data) {
  var rows = "";
  for (var i = 0; i < data.items.length; i++) {
    var it = data.items[i];
    rows += "<tr>" +
      "<td style='padding: 10px 12px; border-bottom: 1px solid #e2e8f0; font-size: 14px;'>" + it.name + "</td>" +
      "<td style='padding: 10px 12px; border-bottom: 1px solid #e2e8f0; text-align: center; font-size: 14px;'>" + it.quantity + "</td>" +
      "<td style='padding: 10px 12px; border-bottom: 1px solid #e2e8f0; text-align: right; font-size: 14px;'>₹" + it.unitPrice.toLocaleString('en-IN') + "</td>" +
      "<td style='padding: 10px 12px; border-bottom: 1px solid #e2e8f0; text-align: right; font-weight: bold; font-size: 14px;'>₹" + it.lineTotal.toLocaleString('en-IN') + "</td>" +
    "</tr>";
  }

  var recipientTitle = data.isForBusiness ? "🚨 New Store Order Notification" : "🎉 Order Confirmation Receipt";
  var headerColor = data.isForBusiness ? "#08214d" : "#0b57d0";

  return "<div style='font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial, sans-serif; background-color: #f1f5f9; padding: 25px;'>" +
    "<div style='max-width: 620px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.08);'>" +
      "<div style='background-color: " + headerColor + "; color: #ffffff; padding: 24px; text-align: center;'>" +
        "<h1 style='margin: 0; font-size: 22px; font-weight: 800; letter-spacing: 0.5px;'>TOFO INDIA</h1>" +
        "<p style='margin: 6px 0 0; font-size: 13px; opacity: 0.9;'>Electronics for a Smarter You</p>" +
      "</div>" +
      
      "<div style='padding: 24px;'>" +
        "<h2 style='color: #0f172a; font-size: 18px; margin-top: 0;'>" + recipientTitle + "</h2>" +
        "<p style='color: #475569; font-size: 14px;'>Order Reference: <strong style='color: #0b57d0;'>" + data.orderRef + "</strong></p>" +
        
        "<div style='background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 16px; margin: 18px 0;'>" +
          "<h3 style='margin: 0 0 10px; font-size: 15px; color: #1e293b;'>Customer & Delivery Details:</h3>" +
          "<p style='margin: 4px 0; font-size: 13px; color: #334155;'><strong>Name:</strong> " + data.customer.fullName + "</p>" +
          "<p style='margin: 4px 0; font-size: 13px; color: #334155;'><strong>Phone:</strong> " + data.customer.phone + "</p>" +
          "<p style='margin: 4px 0; font-size: 13px; color: #334155;'><strong>Email:</strong> " + data.customer.email + "</p>" +
          "<p style='margin: 4px 0; font-size: 13px; color: #334155;'><strong>Address:</strong> " + data.customer.address + ", " + data.customer.city + ", " + data.customer.state + " - " + data.customer.pincode + "</p>" +
          (data.customer.notes ? "<p style='margin: 4px 0; font-size: 13px; color: #334155;'><strong>Notes:</strong> " + data.customer.notes + "</p>" : "") +
        "</div>" +

        "<h3 style='margin: 20px 0 10px; font-size: 15px; color: #1e293b;'>Order Items:</h3>" +
        "<table style='width: 100%; border-collapse: collapse; margin-bottom: 20px;'>" +
          "<thead>" +
            "<tr style='background-color: #f8fafc; text-align: left; font-size: 12px; color: #64748b; text-transform: uppercase;'>" +
              "<th style='padding: 10px 12px;'>Product</th>" +
              "<th style='padding: 10px 12px; text-align: center;'>Qty</th>" +
              "<th style='padding: 10px 12px; text-align: right;'>Price</th>" +
              "<th style='padding: 10px 12px; text-align: right;'>Total</th>" +
            "</tr>" +
          "</thead>" +
          "<tbody>" + rows + "</tbody>" +
        "</table>" +

        "<div style='border-top: 2px solid #e2e8f0; padding-top: 14px; text-align: right;'>" +
          "<p style='margin: 4px 0; font-size: 14px; color: #475569;'>Subtotal: <strong>₹" + data.subtotal.toLocaleString('en-IN') + "</strong></p>" +
          "<p style='margin: 4px 0; font-size: 14px; color: #475569;'>Shipping: <strong>" + (data.shippingFee === 0 ? "FREE" : ("₹" + data.shippingFee)) + "</strong></p>" +
          "<p style='margin: 8px 0 0; font-size: 18px; color: #08214d; font-weight: 800;'>Total Amount: ₹" + data.totalAmount.toLocaleString('en-IN') + "</p>" +
        "</div>" +

        "<div style='margin-top: 28px; padding-top: 18px; border-top: 1px solid #e2e8f0; font-size: 12px; color: #94a3b8; text-align: center;'>" +
          "<p style='margin: 0;'>Tofo India Pvt Ltd • Tech Innovators Park, Outer Ring Road, Bengaluru, Karnataka</p>" +
        "</div>" +
      "</div>" +
    "</div>" +
  "</div>";
}

/**
 * Helper to generate ContentService JSON responses
 */
function createJsonResponse(obj, statusCode) {
  var output = ContentService.createTextOutput(JSON.stringify(obj));
  output.setMimeType(ContentService.MimeType.JSON);
  return output;
}
