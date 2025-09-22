import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    project_type: '',
    message: ''
  });

  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    {
      id: 1,
      text: "Hello! 👋 Welcome to Kiatech Software. How can we help you today?",
      sender: "agent",
      timestamp: "Just now"
    }
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [selectedChatAction, setSelectedChatAction] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    // Let the form submit naturally to Formspree
    // The form will redirect to Formspree's success page
    // We'll handle the success message via Formspree's redirect
  };

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  const handleChatAction = (action) => {
    setSelectedChatAction(action);
    const responses = {
      'quote': "Great! I'd be happy to provide you with a quote. Could you tell me more about your project requirements?",
      'project': "Excellent! Let's discuss your project. What type of software solution are you looking for?",
      'technical': "I'm here to help with any technical questions. What would you like to know about our development process?"
    };
    
    const newMsg = {
      id: Date.now(),
      text: responses[action],
      sender: "agent",
      timestamp: "Just now"
    };
    
    setChatMessages(prev => [...prev, newMsg]);
  };

  const sendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim()) {
      const userMsg = {
        id: Date.now(),
        text: newMessage,
        sender: "user",
        timestamp: "Just now"
      };
      
      setChatMessages(prev => [...prev, userMsg]);
      setNewMessage('');
      
      // Simulate agent response
      setTimeout(() => {
        const agentMsg = {
          id: Date.now() + 1,
          text: "Thank you for your message! Our team will get back to you shortly. In the meantime, feel free to ask any questions.",
          sender: "agent",
          timestamp: "Just now"
        };
        setChatMessages(prev => [...prev, agentMsg]);
      }, 1000);
    }
  };

  return (
    <div className="contact">
      {/* Hero Section */}
      <section className="contact-hero" role="banner">
        <div className="container">
          <div className="hero-content">
            <h1>Ready to Transform Your Business?</h1>
            <p>Get a FREE consultation and discover how our custom software solutions can boost your productivity and growth.</p>
            <div className="support-badge">
              <span>24/7 Support Available</span>
            </div>
          </div>
        </div>
      </section>

      {/* Let's Start Your Project Section */}
      <section className="start-project" aria-labelledby="start-project-heading">
        <div className="container">
          <h2 id="start-project-heading">Let's Start Your Project</h2>
          <p>Connect with our expert team and get personalized solutions for your business needs.</p>
          
          <div className="contact-methods">
            <article className="contact-method">
              <div className="contact-icon">
                <i className="fas fa-envelope"></i>
              </div>
              <h3>Email Us</h3>
              <p className="contact-detail">info@kiatechsoftware.com</p>
              <p className="contact-note">We'll respond within 2 hours</p>
            </article>
            
            <article className="contact-method">
              <div className="contact-icon">
                <i className="fas fa-phone"></i>
              </div>
              <h3>Call Us</h3>
              <p className="contact-detail">+1 604 781 4912</p>
              <p className="contact-note">Mon-Fri 9AM-6PM PST</p>
            </article>
            
            <article className="contact-method">
              <div className="contact-icon">
                <i className="fas fa-comments"></i>
              </div>
              <h3>Live Chat</h3>
              <p className="contact-detail">Click to start chatting</p>
              <p className="contact-note">Instant response</p>
            </article>
          </div>
        </div>
      </section>

      {/* Why Choose Kiatech Section */}
      <section className="why-choose-kiatech" aria-labelledby="why-choose-heading">
        <div className="container">
          <h2 id="why-choose-heading">Why Choose Kiatech?</h2>
          <ul className="why-choose-list">
            <li>5+ Years of Experience</li>
            <li>Custom Solutions</li>
            <li>24/7 Support</li>
            <li>Money-Back Guarantee</li>
            <li>Free Consultation</li>
          </ul>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="testimonial" aria-labelledby="testimonial-heading">
        <div className="container">
          <h2 id="testimonial-heading" className="sr-only">Client Testimonial</h2>
          <blockquote className="testimonial-quote">
            "I had a great experience with this company recently. My company website was dated and didn't work properly. Farideh spent a lot of time on my new website designing to make sure everything is fine. I have found the service excellent. Highly recommend."
          </blockquote>
          <cite className="testimonial-author">
            <strong>Amir Behkish</strong> CEO, Royal Canyon
          </cite>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="contact-form-section" aria-labelledby="contact-form-heading">
        <div className="container">
          <h2 id="contact-form-heading">Get Your FREE Consultation</h2>
          <p>Fill out the form below and we'll get back to you within 2 hours with a personalized solution.</p>
          
          <form className="contact-form" onSubmit={handleSubmit} action="https://formspree.io/f/manpwbla" method="POST">
            <div className="form-group">
              <label htmlFor="fullName">Full Name *</label>
              <input
                type="text"
                id="fullName"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                aria-describedby="fullName-error"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="email">Email Address *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                aria-describedby="email-error"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="projectType">Project Type *</label>
              <select
                id="projectType"
                name="project_type"
                value={formData.project_type}
                onChange={handleInputChange}
                required
                aria-describedby="projectType-error"
              >
                <option value="">Select your project type</option>
                <option value="web-application">Web Application</option>
                <option value="mobile-app">Mobile App</option>
                <option value="ecommerce-website">E-commerce Website</option>
                <option value="custom-software">Custom Software</option>
                <option value="general-consultation">General Consultation</option>
                <option value="other">Other</option>
              </select>
            </div>
            
            <div className="form-group">
              <label htmlFor="projectDetails">Project Details *</label>
              <textarea
                id="projectDetails"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                required
                rows="5"
                placeholder="Please describe your project requirements..."
                aria-describedby="projectDetails-error"
              ></textarea>
            </div>
            
            <div className="form-privacy">
              <p>Your information is 100% secure and will never be shared</p>
            </div>
            
            <button type="submit" className="btn btn-primary form-submit">
              Get FREE Consultation
            </button>
          </form>
        </div>
      </section>

      {/* Ready to Get Started CTA */}
      <section className="ready-to-start" aria-labelledby="ready-to-start-heading">
        <div className="container">
          <h2 id="ready-to-start-heading">Ready to Get Started?</h2>
          <p>Join hundreds of satisfied clients who have transformed their businesses with our solutions.</p>
          <div className="cta-buttons">
            <Link to="/contact" className="btn btn-primary" aria-label="Start your project today">Start Your Project Today</Link>
            <button className="btn btn-secondary" onClick={toggleChat} aria-label="Start live chat">Live Chat</button>
          </div>
        </div>
      </section>

      {/* Live Chat Widget */}
      <section className="live-chat-widget" aria-labelledby="live-chat-heading">
        <div className="container">
          <h2 id="live-chat-heading" className="sr-only">Live Chat Support</h2>
          <div className="chat-widget">
            <div className="chat-header">
              <h3>Live Chat Support</h3>
              <div className="status-indicator">
                <span className="status-dot online"></span>
                <span>Online</span>
              </div>
              <button className="chat-toggle-btn" onClick={toggleChat} aria-label="Toggle chat">
                {isChatOpen ? '−' : '+'}
              </button>
            </div>
            
            {isChatOpen && (
              <div className="chat-content">
                <div className="chat-messages">
                  {chatMessages.map((message) => (
                    <div key={message.id} className={`message ${message.sender}`}>
                      <div className="message-bubble">
                        <p>{message.text}</p>
                        <span className="message-time">{message.timestamp}</span>
                      </div>
                    </div>
                  ))}
                </div>
                
                {!selectedChatAction && (
                  <div className="chat-actions">
                    <button 
                      className="chat-action-btn" 
                      onClick={() => handleChatAction('quote')}
                    >
                      Get Quote
                    </button>
                    <button 
                      className="chat-action-btn" 
                      onClick={() => handleChatAction('project')}
                    >
                      Discuss Project
                    </button>
                    <button 
                      className="chat-action-btn" 
                      onClick={() => handleChatAction('technical')}
                    >
                      Technical Help
                    </button>
                  </div>
                )}
                
                <form className="chat-input-form" onSubmit={sendMessage}>
                  <div className="chat-input-container">
                    <input
                      type="text"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      placeholder="Type your message..."
                      className="chat-input"
                    />
                    <button type="submit" className="chat-send-btn" aria-label="Send message">
                      <i className="fas fa-paper-plane"></i>
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;