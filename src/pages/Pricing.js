import React from 'react';
import { Link } from 'react-router-dom';
import './Pricing.css';

const Pricing = () => {
  const plans = [
    {
      name: "Basic Website",
      price: "$2,999",
      period: "one-time",
      description: "Perfect for small businesses and startups",
      features: [
        "Up to 5 pages",
        "Responsive design",
        "Contact form",
        "Basic SEO optimization",
        "1 month support",
        "Mobile-friendly",
        "SSL certificate",
        "Basic analytics"
      ],
      popular: false
    },
    {
      name: "Professional Website",
      price: "$4,999",
      period: "one-time",
      description: "Ideal for growing businesses",
      features: [
        "Up to 10 pages",
        "Custom design",
        "CMS integration",
        "Advanced SEO",
        "3 months support",
        "E-commerce ready",
        "Social media integration",
        "Advanced analytics",
        "Content management",
        "Blog functionality"
      ],
      popular: true
    },
    {
      name: "Online Store",
      price: "$7,999",
      period: "one-time",
      description: "Complete e-commerce solution",
      features: [
        "Unlimited pages",
        "Product catalog",
        "Shopping cart",
        "Payment processing",
        "6 months support",
        "Inventory management",
        "Order tracking",
        "Customer accounts",
        "Email marketing",
        "Advanced reporting",
        "Mobile app ready",
        "Multi-language support"
      ],
      popular: false
    }
  ];

  const additionalServices = [
    {
      name: "Brand Design Package",
      price: "$1,500",
      description: "Logo design, brand guidelines, and marketing materials"
    },
    {
      name: "SEO Optimization",
      price: "$500/month",
      description: "Ongoing search engine optimization and content marketing"
    },
    {
      name: "Google Ads Management",
      price: "$300/month",
      description: "Professional Google Ads campaign management and optimization"
    },
    {
      name: "Website Maintenance",
      price: "$200/month",
      description: "Regular updates, backups, security monitoring, and technical support"
    },
    {
      name: "Social Media Marketing",
      price: "$400/month",
      description: "Complete social media management and content creation"
    },
    {
      name: "Backup & Restore Service",
      price: "$100/month",
      description: "Automated daily backups and disaster recovery solutions"
    }
  ];

  return (
    <div className="pricing">
      {/* Hero Section */}
      <section className="pricing-hero">
        <div className="container">
          <h1>Pricing Plans</h1>
          <p>Transparent pricing for all your digital needs</p>
        </div>
      </section>

      {/* Main Plans */}
      <section className="main-plans section">
        <div className="container">
          <h2 className="section-title">Website Development Packages</h2>
          <p className="section-subtitle">
            Choose the perfect package for your business needs
          </p>
          
          <div className="plans-grid">
            {plans.map((plan, index) => (
              <div key={index} className={`plan-card ${plan.popular ? 'popular' : ''}`}>
                {plan.popular && <div className="popular-badge">Most Popular</div>}
                
                <div className="plan-header">
                  <h3>{plan.name}</h3>
                  <div className="plan-price">
                    <span className="price">{plan.price}</span>
                    <span className="period">{plan.period}</span>
                  </div>
                  <p className="plan-description">{plan.description}</p>
                </div>
                
                <ul className="plan-features">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex}>
                      <span className="checkmark">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
                
                <a href="/contact" className="plan-button">
                  Get Started
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Services */}
      <section className="additional-services section">
        <div className="container">
          <h2 className="section-title">Additional Services</h2>
          <p className="section-subtitle">
            Enhance your project with our additional services
          </p>
          
          <div className="services-grid">
            {additionalServices.map((service, index) => (
              <div key={index} className="service-card">
                <h3>{service.name}</h3>
                <div className="service-price">{service.price}</div>
                <p>{service.description}</p>
                <Link to="/contact" className="service-button">Learn More</Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="faq section">
        <div className="container">
          <h2 className="section-title">Frequently Asked Questions</h2>
          
          <div className="faq-list">
            <div className="faq-item">
              <h3>What's included in the support period?</h3>
              <p>Our support includes bug fixes, minor updates, and technical assistance. Major feature additions or design changes may incur additional costs.</p>
            </div>
            
            <div className="faq-item">
              <h3>Do you offer custom pricing for large projects?</h3>
              <p>Yes, we provide custom quotes for enterprise-level projects and complex requirements. Contact us for a personalized consultation.</p>
            </div>
            
            <div className="faq-item">
              <h3>What payment methods do you accept?</h3>
              <p>We accept all major credit cards, bank transfers, and PayPal. We also offer flexible payment plans for larger projects.</p>
            </div>
            
            <div className="faq-item">
              <h3>Can I upgrade my plan later?</h3>
              <p>Absolutely! You can upgrade your plan at any time. We'll prorate the difference and seamlessly transition your project.</p>
            </div>
            
            <div className="faq-item">
              <h3>Do you provide hosting services?</h3>
              <p>We can recommend reliable hosting providers and help you set up your hosting. We also offer managed hosting services for an additional fee.</p>
            </div>
            
            <div className="faq-item">
              <h3>What's your project timeline?</h3>
              <p>Project timelines vary based on complexity. Basic websites typically take 2-4 weeks, while e-commerce sites may take 6-8 weeks. We'll provide a detailed timeline during consultation.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta section">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Get Started?</h2>
            <p>Contact us for a free consultation and custom quote</p>
            <a href="/contact" className="btn">Get Free Quote</a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Pricing;
