import React from 'react';
import { Link } from 'react-router-dom';
import { FiFacebook, FiTwitter, FiInstagram, FiLinkedin } from 'react-icons/fi';
import '../styles/Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>About EShop</h3>
          <p>Your trusted online shopping destination for quality products at great prices.</p>
          <div className="social-links">
            <a href="#facebook" aria-label="Facebook"><FiFacebook /></a>
            <a href="#twitter" aria-label="Twitter"><FiTwitter /></a>
            <a href="#instagram" aria-label="Instagram"><FiInstagram /></a>
            <a href="#linkedin" aria-label="LinkedIn"><FiLinkedin /></a>
          </div>
        </div>

        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li><Link to="/products">Products</Link></li>
            <li><Link to="/">Home</Link></li>
            <li><a href="#about">About Us</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Customer Service</h3>
          <ul>
            <li><a href="#help">Help Center</a></li>
            <li><a href="#shipping">Shipping Info</a></li>
            <li><a href="#returns">Returns</a></li>
            <li><a href="#faq">FAQ</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Contact Us</h3>
          <p>Email: support@eshop.com</p>
          <p>Phone: +1 (555) 123-4567</p>
          <p>Address: 123 Main St, City, State 12345</p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2024 EShop. All rights reserved.</p>
        <div className="footer-links">
          <a href="#privacy">Privacy Policy</a>
          <a href="#terms">Terms of Service</a>
          <a href="#cookies">Cookie Settings</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
