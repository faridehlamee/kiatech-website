import React from 'react';
import { Link } from 'react-router-dom';
import './About.css';

const About = () => {
  return (
    <div className="about">
      {/* Hero Section */}
      <section className="about-hero" role="banner">
        <div className="container">
          <div className="hero-content">
            <h1>About Kiatech Software</h1>
            <h2>Transforming Ideas into Digital Solutions</h2>
            <p>We are a passionate team of software developers, designers, and innovators dedicated to creating custom solutions that drive business growth and success.</p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="about-stats" aria-labelledby="about-stats-heading">
        <div className="container">
          <h2 id="about-stats-heading" className="sr-only">Our Achievements</h2>
          <div className="stats-grid">
            <div className="stat-item">
              <h3>5+ Years Experience</h3>
            </div>
            <div className="stat-item">
              <h3>100+ Projects Delivered</h3>
            </div>
            <div className="stat-item">
              <h3>24/7 Support</h3>
            </div>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="about-services" aria-labelledby="about-services-heading">
        <div className="container">
          <h2 id="about-services-heading" className="sr-only">Our Core Services</h2>
          <div className="services-grid">
            <div className="service-item">
              <h3>Custom Web Development</h3>
            </div>
            <div className="service-item">
              <h3>UI/UX Design</h3>
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

      {/* Mission & Vision */}
      <section className="mission-vision" aria-labelledby="mission-vision-heading">
        <div className="container">
          <h2 id="mission-vision-heading" className="sr-only">Our Mission and Vision</h2>
          <div className="mission-vision-grid">
            <article className="mission-card">
              <h3>Our Mission</h3>
              <p>To empower businesses with cutting-edge software solutions that streamline operations, enhance productivity, and drive sustainable growth in the digital age.</p>
            </article>
            
            <article className="vision-card">
              <h3>Our Vision</h3>
              <p>To be the leading software development company that transforms innovative ideas into powerful digital solutions, making technology accessible and beneficial for all.</p>
            </article>
          </div>
        </div>
      </section>

      {/* Why Choose Kiatech */}
      <section className="why-choose-about" aria-labelledby="why-choose-about-heading">
        <div className="container">
          <h2 id="why-choose-about-heading">Why Choose Kiatech?</h2>
          <p>We deliver exceptional results through our proven approach and commitment to excellence</p>
          
          <div className="why-choose-grid">
            <article className="why-feature">
              <h4>Fast & SEO-Ready</h4>
              <p>Your site is built for speed and search visibility from day one</p>
            </article>
            
            <article className="why-feature">
              <h4>Beautiful Design</h4>
              <p>Stunning, on-brand designs tailored to your style and audience</p>
            </article>
            
            <article className="why-feature">
              <h4>Lightning Fast</h4>
              <p>Optimized performance ensures your site loads in milliseconds</p>
            </article>
            
            <article className="why-feature">
              <h4>Secure & Supported</h4>
              <p>Free SSL plus 90 days of comprehensive support included</p>
            </article>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="core-values" aria-labelledby="core-values-heading">
        <div className="container">
          <h2 id="core-values-heading">Our Core Values</h2>
          
          <div className="values-grid">
            <article className="value-card">
              <h3>Passion</h3>
              <p>We love what we do and it shows in our work</p>
            </article>
            
            <article className="value-card">
              <h3>Excellence</h3>
              <p>We strive for perfection in every project</p>
            </article>
            
            <article className="value-card">
              <h3>Collaboration</h3>
              <p>We work closely with our clients as partners</p>
            </article>
            
            <article className="value-card">
              <h3>Innovation</h3>
              <p>We embrace new technologies and creative solutions</p>
            </article>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="about-cta" aria-labelledby="about-cta-heading">
        <div className="container">
          <h2 id="about-cta-heading">Ready to Work With Us?</h2>
          <p>Let's discuss your project and bring your ideas to life</p>
          <div className="cta-buttons">
            <Link to="/contact" className="btn btn-primary" aria-label="Start your project">Start Your Project</Link>
            <Link to="/contact" className="btn btn-secondary" aria-label="Get free consultation">Get Free Consultation</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;