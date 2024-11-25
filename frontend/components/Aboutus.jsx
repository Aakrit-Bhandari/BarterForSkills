/* AboutUs.jsx */

import React from "react";
import "../src/About.css";
import image1 from '../public/Images/barter.png'

const AboutUs = () => {
  return (
    <div className="about-us">
      {/* Hero Section */}
      <section className="about-hero">
        <h1 className="hero-title">
          Empowering <span className="highlight">Freelancers</span> to Achieve Their Dreams
        </h1>
        <p className="hero-subtitle">
          We're building the bridge between talented professionals and businesses worldwide.
        </p>
      </section>

      {/* About Section */}
      <section className="about-details">
        <div className="about-container">
          <h2 className="section-title">Our Mission</h2>
          <p className="section-description">
            At <span className="highlight">Barter4Skills</span>, we strive to empower independent 
            professionals by connecting them with global opportunities. Our platform is built 
            to enable seamless collaboration, fair payments, and mutual growth.
          </p>
        </div>

        <div className="about-container">
          <h2 className="section-title">Our Story</h2>
          <p className="section-description">
            Founded in 2020, FreelanceHub was created by a group of passionate freelancers who 
            understood the challenges of the gig economy. Today, we are proud to serve a community 
            of 1M+ freelancers and businesses, revolutionizing the way work gets done.
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="about-stats">
        <div className="stat-item">
          <h3>1M+</h3>
          <p>Freelancers Registered</p>
        </div>
        <div className="stat-item">
          <h3>500K+</h3>
          <p>Projects Completed</p>
        </div>
        <div className="stat-item">
          <h3>4.9/5</h3>
          <p>Average Client Rating</p>
        </div>
      </section>

      {/* Team Section */}
      <section className="about-team">
        <h2 className="section-title">Meet Our Team</h2>
        <div className="team-members">
          <div className="team-member">
            <img src={image1} alt="Team Member" />
            <h3>Jane Doe</h3>
            <p>CEO & Founder</p>
          </div>
          <div className="team-member">
            <img src={image1} alt="Team Member" />
            <h3>John Smith</h3>
            <p>Head of Product</p>
          </div>
          <div className="team-member">
            <img src={image1} alt="Team Member" />
            <h3>Sarah Lee</h3>
            <p>Marketing Lead</p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="about-testimonials">
        <h2 className="section-title">What People Are Saying</h2>
        <div className="testimonials">
          <blockquote>
            <p>
              "FreelanceHub helped me land my dream project. The platform is easy to use and has 
              excellent client support!"
            </p>
            <footer>- Alex R., Freelancer</footer>
          </blockquote>
          <blockquote>
            <p>
              "Our team found the perfect developer in just a few days. Highly recommend 
              FreelanceHub for quick and reliable hires."
            </p>
            <footer>- Emily T., Business Owner</footer>
          </blockquote>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;