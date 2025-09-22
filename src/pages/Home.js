import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero" role="banner">
        <div className="container">
          <div className="hero-content">
            <h1>Transform Your Business with Custom Software Solutions</h1>
            <p>We build powerful, scalable web applications that drive growth, efficiency, and success for businesses of all sizes.</p>
            <div className="hero-buttons">
              <Link to="/contact" className="btn btn-primary" aria-label="Get free consultation">Get FREE Consultation</Link>
              <Link to="/contact" className="btn btn-secondary" aria-label="Watch our work portfolio">Watch Our Work</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats" aria-labelledby="stats-heading">
        <div className="container">
          <h2 id="stats-heading" className="sr-only">Our Achievements</h2>
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
      <section className="services-overview" aria-labelledby="services-overview-heading">
        <div className="container">
          <h2 id="services-overview-heading" className="sr-only">Our Services Overview</h2>
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
            <div className="service-item">
              <h3>UI/UX Design</h3>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="why-choose" aria-labelledby="why-choose-heading">
        <div className="container">
          <h2 id="why-choose-heading">Why Choose Kiatech Software?</h2>
          <p>We deliver exceptional results through cutting-edge technology and expert development</p>
          
          <div className="features-grid">
            <article className="feature-card">
              <h3>Website & Web App Design</h3>
              <p>Custom, responsive websites and web applications built with modern technologies and best practices.</p>
            </article>
            
            <article className="feature-card">
              <h3>Support & Maintenance</h3>
              <p>24/7 technical support and ongoing maintenance to keep your systems running smoothly.</p>
            </article>
            
            <article className="feature-card">
              <h3>Advanced Reporting</h3>
              <p>Comprehensive reporting solutions that provide insights and analytics for better decision making.</p>
            </article>
            
            <article className="feature-card">
              <h3>SEO & Optimization</h3>
              <p>Search engine optimization and performance tuning to maximize your online visibility and speed.</p>
            </article>
          </div>
        </div>
      </section>

      {/* Why Choose Our Development Team */}
      <section className="development-team" aria-labelledby="development-team-heading">
        <div className="container">
          <h2 id="development-team-heading">Why Choose Our Development Team?</h2>
          <p>We build custom, data-driven web applications and automated reporting solutions to help businesses make smarter and faster decisions.</p>
          
          <div className="team-features">
            <div className="team-feature">
              <h4>SEO-Ready & Fast</h4>
              <p>Your site is built for speed and search visibility with optimized performance.</p>
            </div>
            
            <div className="team-feature">
              <h4>Beautiful Design</h4>
              <p>Stunning, on-brand designs tailored to your style and audience preferences.</p>
            </div>
            
            <div className="team-feature">
              <h4>Lightning Fast</h4>
              <p>Optimized for speed with quick loading times and smooth user experience.</p>
            </div>
            
            <div className="team-feature">
              <h4>Secure & Supported</h4>
              <p>Free SSL plus 90 days of comprehensive support and maintenance included.</p>
            </div>
            
            <div className="team-feature">
              <h4>Expert Development</h4>
              <p>Professional software development with modern technologies</p>
            </div>
            
            <div className="team-feature">
              <h4>Business Growth</h4>
              <p>Solutions designed to drive your business forward</p>
            </div>
            
            <div className="team-feature">
              <h4>Quality Assurance</h4>
              <p>Thorough testing and quality control processes</p>
            </div>
            
            <div className="team-feature">
              <h4>24/7 Support</h4>
              <p>Round-the-clock technical support and maintenance</p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Services */}
      <section className="our-services" aria-labelledby="our-services-heading">
        <div className="container">
          <h2 id="our-services-heading">Our Services</h2>
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

      {/* Portfolio Section */}
      <section className="portfolio-section section-padding" aria-labelledby="portfolio-heading">
        <div className="container">
          <h2 id="portfolio-heading" className="section-title">Our Portfolio</h2>
          <p className="section-subtitle">Some of the amazing projects we've had the honor of creating for our clients</p>
          <div className="portfolio-grid">
            <article className="portfolio-item">
              <div className="portfolio-image">
                <img src="https://via.placeholder.com/400x300?text=I+Care+Beauty+Clinic" alt="I Care Beauty Clinic - Professional beauty clinic website with modern design and booking system" />
                <div className="portfolio-overlay">
                  <button className="portfolio-btn" aria-label="View I Care Beauty Clinic project">View Project</button>
                </div>
              </div>
              <div className="portfolio-content">
                <h3>I Care Beauty Clinic</h3>
                <p>Professional beauty clinic website with modern design and booking system</p>
                <span className="portfolio-tag">Website Development</span>
              </div>
            </article>
            
            <article className="portfolio-item">
              <div className="portfolio-image">
                <img src="https://via.placeholder.com/400x300?text=Royal+Canyon" alt="Royal Canyon - Elegant business website with responsive design and SEO optimization" />
                <div className="portfolio-overlay">
                  <button className="portfolio-btn" aria-label="View Royal Canyon project">View Project</button>
                </div>
              </div>
              <div className="portfolio-content">
                <h3>Royal Canyon</h3>
                <p>Elegant business website with responsive design and SEO optimization</p>
                <span className="portfolio-tag">Web Design</span>
              </div>
            </article>
            
            <article className="portfolio-item">
              <div className="portfolio-image">
                <img src="https://via.placeholder.com/400x300?text=Dara+Insured+Financial+Services" alt="Dara Insured Financial Services - Financial services website with secure client portal and document management" />
                <div className="portfolio-overlay">
                  <button className="portfolio-btn" aria-label="View Dara Insured Financial Services project">View Project</button>
                </div>
              </div>
              <div className="portfolio-content">
                <h3>Dara Insured Financial Services</h3>
                <p>Financial services website with secure client portal and document management</p>
                <span className="portfolio-tag">Custom Development</span>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="pricing-section section-padding bg-light" aria-labelledby="pricing-heading">
        <div className="container">
          <h2 id="pricing-heading" className="section-title">Flexible Pricing Options</h2>
          <p className="section-subtitle">Choose the perfect plan that fits your business needs and budget. We offer transparent pricing with no hidden fees.</p>
          <div className="pricing-grid">
            <div className="pricing-card">
              <h3>Basic Website</h3>
              <ul>
                <li>1-3 pages</li>
                <li>Responsive design</li>
                <li>Contact form</li>
                <li>Basic SEO</li>
                <li>3 months free support</li>
              </ul>
              <p className="price">$499</p>
              <p className="support">3 months free support</p>
              <button className="btn btn-primary" aria-label="Get started with basic website">Get Started</button>
            </div>
            <div className="pricing-card popular">
              <h3>Professional Website</h3>
              <ul>
                <li>5-7 pages</li>
                <li>Advanced SEO</li>
                <li>Responsive design</li>
                <li>Content management</li>
                <li>3 months free support</li>
              </ul>
              <p className="price">$799</p>
              <p className="support">3 months free support</p>
              <button className="btn btn-primary" aria-label="Get started with professional website">Get Started</button>
            </div>
            <div className="pricing-card">
              <h3>E-commerce Store</h3>
              <ul>
                <li>Add e-commerce functionality</li>
                <li>Payment gateway integration</li>
                <li>Product management</li>
                <li>Order tracking</li>
                <li>3 months free support</li>
              </ul>
              <p className="price">$999</p>
              <p className="support">3 months free support</p>
              <button className="btn btn-primary" aria-label="Get started with e-commerce store">Get Started</button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta" aria-labelledby="cta-heading">
        <div className="container">
          <h2 id="cta-heading">Ready to Start Your Project?</h2>
          <p>Transform your business with our custom software solutions. Get a FREE consultation today!</p>
          <div className="cta-buttons">
            <Link to="/contact" className="btn btn-primary" aria-label="Get free consultation">Get FREE Consultation</Link>
            <Link to="/contact" className="btn btn-secondary" aria-label="Start your project">Start Your Project</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;