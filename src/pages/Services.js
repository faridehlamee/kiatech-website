import React from 'react';
import { Link } from 'react-router-dom';
import './Services.css';

const Services = () => {
  return (
    <div className="services">
      {/* Hero Section */}
      <section className="services-hero" role="banner">
        <div className="container">
          <div className="hero-content">
            <h1>Our Services</h1>
            <h2>Comprehensive Software Solutions</h2>
            <p>From custom web applications to mobile solutions, we provide end-to-end software development services that drive business growth and digital transformation.</p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="services-stats" aria-labelledby="services-stats-heading">
        <div className="container">
          <h2 id="services-stats-heading" className="sr-only">Our Achievements</h2>
          <div className="stats-grid">
            <div className="stat-item">
              <h3>100+ Projects Delivered</h3>
            </div>
            <div className="stat-item">
              <h3>5+ Years Experience</h3>
            </div>
            <div className="stat-item">
              <h3>24/7 Support</h3>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Buttons */}
      <section className="services-cta" aria-labelledby="services-cta-heading">
        <div className="container">
          <h2 id="services-cta-heading" className="sr-only">Call to Action</h2>
          <div className="cta-buttons">
            <Link to="/contact" className="btn btn-primary" aria-label="Get free consultation">Get Free Consultation</Link>
            <Link to="/services" className="btn btn-secondary" aria-label="Explore our services">Explore Services</Link>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="services-overview" aria-labelledby="services-overview-heading">
        <div className="container">
          <h2 id="services-overview-heading" className="sr-only">Our Core Services</h2>
          <div className="services-grid">
            <div className="service-item">
              <h3>Web Development</h3>
            </div>
            <div className="service-item">
              <h3>Mobile Apps</h3>
            </div>
            <div className="service-item">
              <h3>System Integration</h3>
            </div>
            <div className="service-item">
              <h3>Cloud Solutions</h3>
            </div>
          </div>
        </div>
      </section>

      {/* What We Offer */}
      <section className="what-we-offer" aria-labelledby="what-we-offer-heading">
        <div className="container">
          <h2 id="what-we-offer-heading">What We Offer</h2>
          <p>Comprehensive software solutions tailored to your business needs</p>
          
          <div className="services-cards">
            <article className="service-card">
              <h3>Custom Websites</h3>
              <p>We design and build websites that look great, are easy to use, and work on any device.</p>
              <div className="service-tags">
                <span>Custom Solutions</span>
                <span>24/7 Support</span>
              </div>
              <Link to="/contact" className="service-btn" aria-label="Learn more about custom websites">Learn More</Link>
            </article>
            
            <article className="service-card">
              <h3>Custom Web Applications</h3>
              <p>We create online tools to make your business run smoother and faster.</p>
              <div className="service-tags">
                <span>Custom Solutions</span>
                <span>24/7 Support</span>
              </div>
              <Link to="/contact" className="service-btn" aria-label="Learn more about custom web applications">Learn More</Link>
            </article>
            
            <article className="service-card">
              <h3>E-commerce Stores</h3>
              <p>Sell your products online with secure payments and simple checkout.</p>
              <div className="service-tags">
                <span>Custom Solutions</span>
                <span>24/7 Support</span>
              </div>
              <Link to="/contact" className="service-btn" aria-label="Learn more about e-commerce stores">Learn More</Link>
            </article>
            
            <article className="service-card">
              <h3>Brand Design & Graphics</h3>
              <p>Logos, colors, and visuals that make your business stand out.</p>
              <div className="service-tags">
                <span>Custom Solutions</span>
                <span>24/7 Support</span>
              </div>
              <Link to="/contact" className="service-btn" aria-label="Learn more about brand design and graphics">Learn More</Link>
            </article>
            
            <article className="service-card">
              <h3>Reporting & Analytics</h3>
              <p>Clear charts and reports so you can make smarter decisions with your data.</p>
              <div className="service-tags">
                <span>Custom Solutions</span>
                <span>24/7 Support</span>
              </div>
              <Link to="/contact" className="service-btn" aria-label="Learn more about reporting and analytics">Learn More</Link>
            </article>
            
            <article className="service-card">
              <h3>Google Ads</h3>
              <p>We help you to drive qualified traffic to your business. Our Google Ads service is a three months campaign including ongoing analysing, refactoring, testing and weekly reports to show growth and progress.</p>
              <div className="service-tags">
                <span>Custom Solutions</span>
                <span>24/7 Support</span>
              </div>
              <Link to="/contact" className="service-btn" aria-label="Learn more about Google Ads services">Learn More</Link>
            </article>
            
            <article className="service-card">
              <h3>Backup / Restore</h3>
              <p>SQL Server database backup and restore price is one of our services.</p>
              <div className="service-tags">
                <span>Custom Solutions</span>
                <span>24/7 Support</span>
              </div>
              <Link to="/contact" className="service-btn" aria-label="Learn more about backup and restore services">Learn More</Link>
            </article>
          </div>
        </div>
      </section>

      {/* Why Choose Our Services */}
      <section className="why-choose-services" aria-labelledby="why-choose-services-heading">
        <div className="container">
          <h2 id="why-choose-services-heading">Why Choose Our Services?</h2>
          <p>We don't just build software; we create solutions that transform your business.</p>
          
          <div className="why-choose-grid">
            <article className="why-feature">
              <h4>Expert Team</h4>
              <p>Experienced developers with proven track records</p>
            </article>
            
            <article className="why-feature">
              <h4>Fast Delivery</h4>
              <p>Agile development process for quick turnaround</p>
            </article>
            
            <article className="why-feature">
              <h4>Quality Assurance</h4>
              <p>Rigorous testing and quality control processes</p>
            </article>
            
            <article className="why-feature">
              <h4>Ongoing Support</h4>
              <p>24/7 support and maintenance services</p>
            </article>
          </div>
        </div>
      </section>

      {/* Client Stats */}
      <section className="client-stats" aria-labelledby="client-stats-heading">
        <div className="container">
          <h2 id="client-stats-heading" className="sr-only">Client Statistics</h2>
          <div className="client-stats-grid">
            <div className="client-stat">
              <h3>98% Client Satisfaction</h3>
            </div>
            <div className="client-stat">
              <h3>50+ Happy Clients</h3>
            </div>
            <div className="client-stat">
              <h3>24/7 Support Available</h3>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="final-cta" aria-labelledby="final-cta-heading">
        <div className="container">
          <h2 id="final-cta-heading">Ready to Start Your Project?</h2>
          <p>Let's discuss your requirements and create a custom solution for your business</p>
          <div className="cta-buttons">
            <Link to="/contact" className="btn btn-primary" aria-label="Get free quote">Get Free Quote</Link>
            <Link to="/contact" className="btn btn-secondary" aria-label="Schedule consultation">Schedule Consultation</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;