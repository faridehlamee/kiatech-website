import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>Kiatech Software Inc.</h3>
          <p>
            We are a professional software development company specializing in 
            web applications, e-commerce solutions, and digital services.
          </p>
        </div>
        
        <div className="footer-section">
          <h3>Services</h3>
          <ul>
            <li><a href="/services">Web Development</a></li>
            <li><a href="/services">E-commerce Solutions</a></li>
            <li><a href="/services">Brand Design</a></li>
            <li><a href="/services">SEO & Marketing</a></li>
            <li><a href="/services">Backup & Restore</a></li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="/about">About Us</a></li>
            <li><a href="/portfolio">Portfolio</a></li>
            <li><a href="/pricing">Pricing</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h3>Contact Info</h3>
          <p>Email: info@kiatechsoftware.com</p>
          <p>Phone: (604) 781-4912</p>
          <p>Address: Coquitlam, BC, Canada</p>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; 2025 Kiatech Software Inc. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;