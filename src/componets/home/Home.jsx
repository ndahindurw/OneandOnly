import React from "react";
import "./home.css";
import { image0, image2, image3, image4, image5 } from "../images";
import Navbar from "../navigationBar/navbar";
import { Link } from "react-router-dom";

function Home({ image0 }) {
  return (
    <div className="content">
      <div className="landing-container">
        <Navbar />
        <div className="hero-section">
          <div className="image-container">
            <img src={image2} alt="Image 3" className="her0-image3" />
          </div>
          <div className="hero-word">
            <h1 className="hero-text"> Perfect Rooms To Book </h1>
            <h3 className="hero-text2">
              Use our combined search bar to easily find rooms based on your
              preferences,
              <br /> such as location, date, and room type.
            </h3>
          </div>
        </div>

        <div className="footers">
          <p>&copy; 2024 Room booking System. All Rights Reserved.</p>
        </div>
      </div>
    </div>
  );
}

export default Home;
