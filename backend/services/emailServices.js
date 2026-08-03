const transport = require("../config/emailConfig");

// Registration Otp Email
const sendOtpEmail = async (email, otp) => {
  const htmlTemplate = `<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>Your OTP Code</title>
    <style>
      body { font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0; }
      .email-container { max-width: 600px; margin: 40px auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1); }
      .header { background-color: #000000; padding: 20px; text-align: center; }
      .header img { max-height: 50px; }
      .content { padding: 30px; text-align: center; color: #333333; }
      .otp-box { background-color: #f8f9fa; border: 2px dashed #cccccc; border-radius: 8px; font-size: 32px; font-weight: bold; letter-spacing: 4px; color: #000000; padding: 20px; margin: 30px auto; width: fit-content; }
      .footer { background-color: #f4f4f4; padding: 15px; text-align: center; font-size: 12px; color: #888888; }
    </style>
  </head>
  <body>
    <div class="email-container">
      <div class="header">
        <img src="https://kaj.wikipedia.org/wiki/File:Wikimedia-logo_black.svg" alt="Company Logo" />
      </div>
      <div class="content">
        <h2>Verify Your Email Address</h2>
        <p>Please use the following One-Time Password (OTP) to complete your registration. This code is valid for 10 minutes.</p>
        <div class="otp-box">{{OTP_CODE}}</div>
        <p>If you did not request this code, please ignore this email.</p>
      </div>
      <div class="footer">&copy; 2026 Your E-commerce Store. All rights reserved.</div>
    </div>
  </body>
</html>`;

  try {
    const response = await transport.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      date: new Date(),
      subject: "OTP for Registration",
      html: htmlTemplate.replace("{{OTP_CODE}}", otp),
    });
    return response;
  } catch (error) {
    console.error("Failed to send OTP", error);
    return null; // Safely return null on failure
  }
};

// Registration Completion Email
const sendWelcomeEmail = async (email, name) => {
  const htmlTemplate = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Welcome to Our Store</title>
  <style>
    body { font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0; }
    .email-container { max-width: 600px; margin: 40px auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 10px rgba(0,0,0,0.1); }
    .header { background-color: #000000; padding: 20px; text-align: center; }
    .header img { max-height: 50px; }
    .content { padding: 30px; text-align: center; color: #333333; }
    .welcome-text { font-size: 24px; font-weight: bold; margin-bottom: 15px; color: #000000; }
    .cta-button { display: inline-block; background-color: #000000; color: #ffffff; text-decoration: none; padding: 12px 30px; border-radius: 5px; font-weight: bold; margin-top: 25px; margin-bottom: 15px; }
    .footer { background-color: #f4f4f4; padding: 15px; text-align: center; font-size: 12px; color: #888888; }
  </style>
</head>
<body>
  <div class="email-container">
    <div class="header">
      <img src="https://kaj.wikipedia.org/wiki/File:Wikimedia-logo_black.svg" alt="Company Logo" />
    </div>
    <div class="content">
      <div class="welcome-text">Welcome, {{NAME}}!</div>
      <p>Your registration is complete and your account is now active. We are thrilled to have you on board!</p>
      <p>Discover the latest collections, exclusive deals, and much more.</p>
      <a href="https://yourwebsite.com" class="cta-button">Start Shopping</a>
    </div>
    <div class="footer">&copy; 2026 Your E-commerce Store. All rights reserved.</div>
  </div>
</body>
</html>`;

  try {
    const response = await transport.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      date: new Date(),
      subject: "Registration Successful",
      html: htmlTemplate.replace("{{NAME}}", name),
    });
    return response;
  } catch (error) {
    console.error("Failed to send Welcome email", error);
    return null;
  }
};

// Promotion Product Mail
const sendPromotionEmail = async (email, productName) => {
  const htmlTemplate = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0; }
    .email-container { max-width: 600px; margin: 40px auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 10px rgba(0,0,0,0.1); }
    .header { background-color: #000000; padding: 20px; text-align: center; }
    .header img { max-height: 50px; }
    .content { padding: 30px; text-align: center; color: #333333; }
    .product-box { background-color: #f8f9fa; border: 1px solid #e0e0e0; border-radius: 8px; padding: 20px; margin: 20px 0; font-size: 20px; font-weight: bold; }
    .product-image { max-width: 100%; border-radius: 5px; margin-bottom: 15px; }
    .cta-button { display: inline-block; background-color: #000000; color: #ffffff; text-decoration: none; padding: 12px 30px; border-radius: 5px; font-weight: bold; margin-top: 15px; }
    .footer { background-color: #f4f4f4; padding: 15px; text-align: center; font-size: 12px; color: #888888; }
  </style>
</head>
<body>
  <div class="email-container">
    <div class="header">
      <img src="https://kaj.wikipedia.org/wiki/File:Wikimedia-logo_black.svg" alt="Company Logo" />
    </div>
    <div class="content">
      <h2>New Arrivals Just Landed! 🔥</h2>
      <p>Be the first to check out our latest drop. We think you are going to love this new addition to our store.</p>
      
      <div class="product-box">
        <!-- Replace src with your actual dynamic product image URL if you have one -->
        <img class="product-image" src="https://via.placeholder.com/400x250?text=New+Product+Image" alt="${productName}" />
        <br>
        ${productName}
      </div>
      
      <a href="https://yourwebsite.com/new-arrivals" class="cta-button">Shop Now</a>
    </div>
    <div class="footer">&copy; 2026 Your E-commerce Store. All rights reserved.</div>
  </div>
</body>
</html>`;

  try {
    return await transport.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Check out our newest arrival: " + productName,
      html: htmlTemplate,
    });
  } catch (error) {
    console.error("Failed to send promotion email", error);
    return null;
  }
};

// Order Placed Mail
const sendOrderPlacedEmail = async (email, orderId, totalAmount) => {
  const htmlTemplate = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0; }
    .email-container { max-width: 600px; margin: 40px auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 10px rgba(0,0,0,0.1); }
    .header { background-color: #000000; padding: 20px; text-align: center; }
    .header img { max-height: 50px; }
    .content { padding: 30px; text-align: left; color: #333333; }
    .summary-box { background-color: #f8f9fa; border: 1px solid #e0e0e0; border-radius: 8px; padding: 20px; margin: 20px 0; }
    .summary-row { display: flex; justify-content: space-between; margin-bottom: 10px; font-size: 16px; }
    .summary-row.total { font-weight: bold; font-size: 18px; border-top: 1px solid #cccccc; padding-top: 10px; }
    .cta-button { display: block; text-align: center; background-color: #000000; color: #ffffff; text-decoration: none; padding: 12px 30px; border-radius: 5px; font-weight: bold; margin-top: 25px; }
    .footer { background-color: #f4f4f4; padding: 15px; text-align: center; font-size: 12px; color: #888888; }
  </style>
</head>
<body>
  <div class="email-container">
    <div class="header">
      <img src="https://kaj.wikipedia.org/wiki/File:Wikimedia-logo_black.svg" alt="Company Logo" />
    </div>
    <div class="content">
      <h2>Thank You For Your Order!</h2>
      <p>We've received your order and are getting it ready to ship. Here are the details:</p>
      
      <div class="summary-box">
        <div class="summary-row">
          <span>Order ID:</span>
          <span>#${orderId}</span>
        </div>
        <div class="summary-row total">
          <span>Total Amount:</span>
          <span>₹${totalAmount}</span>
        </div>
      </div>
      
      <p>We will send you another email once your order has shipped.</p>
      <a href="https://yourwebsite.com/orders" class="cta-button">View Order Details</a>
    </div>
    <div class="footer">&copy; 2026 Your E-commerce Store. All rights reserved.</div>
  </div>
</body>
</html>`;

  try {
    return await transport.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Order Confirmation - #" + orderId,
      html: htmlTemplate,
    });
  } catch (error) {
    console.error("Failed to send order placed email", error);
    return null;
  }
};

module.exports = {
  sendOtpEmail,
  sendWelcomeEmail,
  sendPromotionEmail,
  sendOrderPlacedEmail,
};
