import React, { useState } from 'react';
import './Portfolio.css';

const Portfolio = () => {
  const [activeFilter, setActiveFilter] = useState('all');

  const projects = [
    {
      id: 1,
      title: "E-commerce Platform",
      category: "ecommerce",
      description: "A comprehensive online store with payment processing, inventory management, and customer accounts.",
      image: "🛒",
      technologies: ["React", "Node.js", "MongoDB", "Stripe"],
      link: "#"
    },
    {
      id: 2,
      title: "Corporate Website",
      category: "web",
      description: "Modern corporate website with CMS integration and responsive design.",
      image: "🌐",
      technologies: ["React", "Next.js", "Contentful", "Tailwind CSS"],
      link: "#"
    },
    {
      id: 3,
      title: "Mobile App Dashboard",
      category: "mobile",
      description: "Cross-platform mobile app with real-time analytics and user management.",
      image: "📱",
      technologies: ["React Native", "Firebase", "Redux", "TypeScript"],
      link: "#"
    },
    {
      id: 4,
      title: "SaaS Application",
      category: "saas",
      description: "Software as a Service platform with subscription management and multi-tenancy.",
      image: "☁️",
      technologies: ["Vue.js", "Python", "PostgreSQL", "AWS"],
      link: "#"
    },
    {
      id: 5,
      title: "Restaurant Website",
      category: "web",
      description: "Restaurant website with online ordering, menu management, and reservation system.",
      image: "🍽️",
      technologies: ["WordPress", "PHP", "MySQL", "WooCommerce"],
      link: "#"
    },
    {
      id: 6,
      title: "Healthcare Portal",
      category: "web",
      description: "Patient portal with appointment booking, medical records, and telemedicine features.",
      image: "🏥",
      technologies: ["Angular", "Node.js", "MongoDB", "WebRTC"],
      link: "#"
    }
  ];

  const categories = [
    { id: 'all', name: 'All Projects' },
    { id: 'web', name: 'Web Development' },
    { id: 'ecommerce', name: 'E-commerce' },
    { id: 'mobile', name: 'Mobile Apps' },
    { id: 'saas', name: 'SaaS Applications' }
  ];

  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : projects.filter(project => project.category === activeFilter);

  return (
    <div className="portfolio">
      {/* Hero Section */}
      <section className="portfolio-hero">
        <div className="container">
          <h1>Our Portfolio</h1>
          <p>Showcasing our best work and successful projects</p>
        </div>
      </section>

      {/* Filter Section */}
      <section className="portfolio-filter section">
        <div className="container">
          <div className="filter-buttons">
            {categories.map(category => (
              <button
                key={category.id}
                className={`filter-btn ${activeFilter === category.id ? 'active' : ''}`}
                onClick={() => setActiveFilter(category.id)}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="projects-grid section">
        <div className="container">
          <div className="projects-list">
            {filteredProjects.map(project => (
              <div key={project.id} className="project-card">
                <div className="project-image">
                  <div className="placeholder-image">
                    {project.image}
                  </div>
                </div>
                <div className="project-content">
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <div className="project-technologies">
                    {project.technologies.map((tech, index) => (
                      <span key={index} className="tech-tag">{tech}</span>
                    ))}
                  </div>
                  <a href={project.link} className="project-link">View Project →</a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Client Testimonials */}
      <section className="testimonials section">
        <div className="container">
          <h2 className="section-title">What Our Clients Say</h2>
          <p className="section-subtitle">
            Don't just take our word for it - hear from our satisfied clients
          </p>
          
          <div className="testimonials-grid">
            <div className="testimonial">
              <div className="testimonial-content">
                <p>"Kiatech Software delivered an exceptional e-commerce platform that exceeded our expectations. Their attention to detail and technical expertise is outstanding."</p>
              </div>
              <div className="testimonial-author">
                <div className="author-info">
                  <h4>Sarah Johnson</h4>
                  <p>CEO, TechStart Inc.</p>
                </div>
              </div>
            </div>
            
            <div className="testimonial">
              <div className="testimonial-content">
                <p>"The team at Kiatech Software transformed our online presence. Our website now generates 300% more leads than before."</p>
              </div>
              <div className="testimonial-author">
                <div className="author-info">
                  <h4>Mike Chen</h4>
                  <p>Marketing Director, GrowthCo</p>
                </div>
              </div>
            </div>
            
            <div className="testimonial">
              <div className="testimonial-content">
                <p>"Professional, reliable, and innovative. Kiatech Software is our go-to partner for all digital solutions."</p>
              </div>
              <div className="testimonial-author">
                <div className="author-info">
                  <h4>Emily Davis</h4>
                  <p>Founder, Creative Agency</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta section">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Start Your Project?</h2>
            <p>Let's create something amazing together</p>
            <a href="/contact" className="btn">Start Your Project</a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Portfolio;
