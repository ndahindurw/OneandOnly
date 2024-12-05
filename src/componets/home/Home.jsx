import React from "react";
import "./home.css";
import { image7, landingimage } from "../images"; // Use appropriate imports
import Navbar from "../navigationBar/navbar";

function Home() {
  return (
    <div className="home-content">
      <div className="landing-container">
        <Navbar />
        <div className="hero-section">
          <div className="hero-background">
            <img src={landingimage} alt="Background" className="hero-image" />
            <div className="hero-overlay">
              <div className="hero-text">
                <h1>Perfect Rooms To Book</h1>
                <p>
                  Find your ideal room effortlessly with our advanced search
                  tools. Filter by location, date, and preferences to make your
                  stay perfect.
                </p>
                <button className="cta-button">Get Started</button>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="features-section">
          <h2>Why Choose Us?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <h3>Easy Booking</h3>
              <p>Book rooms seamlessly with our intuitive platform.</p>
            </div>
            <div className="feature-card">
              <h3>Flexible Options</h3>
              <p>Choose from a variety of room types to suit your needs.</p>
            </div>
            <div className="feature-card">
              <h3>Top Locations</h3>
              <p>Stay in prime locations across the globe.</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="footer">
          <p>&copy; 2024 Room Booking System. All Rights Reserved.</p>
          <div className="social-links">
            <a href="#facebook">Facebook</a>
            <a href="#twitter">Twitter</a>
            <a href="#instagram">Instagram</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
