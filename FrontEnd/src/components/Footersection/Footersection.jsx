import React from 'react';
import './Footersection.css';
import { FaFacebookF, FaInstagram, FaPinterest, FaTwitter } from 'react-icons/fa';

 function Footersec() {
  return (
    <footer className="footer">
      <div className="footer-container">
        
        {/* Branding & Social */}
        <div className="footer-section">
          <h2 className="footer-logo">Infinart</h2>
          <p className="footer-desc">
            Curated gifts & timeless decor for every space.
          </p>
          <div className="footer-social">
            <FaInstagram />
            <FaPinterest />
            <FaFacebookF />
            <FaTwitter />
          </div>
        </div>

        {/* Quick Links */}
        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li>Home</li>
            <li>Shop</li>
            <li>Categories</li>
            <li>About Us</li>
            <li>Contact</li>
          </ul>
        </div>

        {/* Customer Support */}
        <div className="footer-section">
          <h3>Customer Support</h3>
          <ul>
            <li>Help Center</li>
            <li>Shipping & Returns</li>
            <li>FAQs</li>
            <li>Track Order</li>
            <li>Refund Policy</li>
          </ul>
        </div>

        {/* Newsletter */}
       

        <div className="footer-section">
          <h3>Our Store</h3>
          <p>Infinart HQ, Noida, India</p>
          <p>Mon – Sat: 10AM – 8PM</p>
          <p>Email: support@infinart.in</p>
        </div>
      </div>

      

      {/* Bottom Bar */}
      <div className="footer-bottom">
        © 2025 Infinart. All rights reserved. | Made with ❤️ by Team Infinart.
      </div>
    </footer>
  );
}

export default Footersec;