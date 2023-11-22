import React from "react";
import "./home.css";
import image0 from "../../assets/RRAImage.jpg";
import image2 from "../../assets/extendRoom3.jpg";
import image3 from "../../assets/extendRoom4.jpg";
import image4 from "../../assets/extendRoom2.jpg";
import image5 from "../../assets/meeting rooms.jpg";
import Navbar from "../navigationBar/navbar";

function Home() {
    return (
        <div className="content">
            <div className="landing-container">
                
                <Navbar image0={image0}/>
                <div className="hero-section">
                    <h1 className="hero-text"> some Perfect Room </h1>
                    <h3 className="hero-text2">
                        Use our combined search bar to easily find rooms based on your
                        preferences,
                        <br /> such as location, date, and room type.
                    </h3>

                    <div className="search-bar">
                        <input
                            type="text"
                            placeholder="Type Here...."
                            className="search-input"
                        />
                        <button className="search-button">Search Room</button>
                    </div>

                    <div className="image-container">
                        <img src={image3} alt="Image 3" className="her0-image3" />
                    </div>
                </div>

                <div className="features-section">
                    <div className="feature">
                        <img src={image4} alt="image 1" />
                        <h2>Feature 1 Title</h2>
                        <p>Feature 1 description goes here.</p>
                    </div>
                    <div className="feature">
                        <img src={image5} alt="image 2" />
                        <h2>Feature 2 Title</h2>
                        <p>Feature 2 description goes here.</p>
                    </div>
                    <div className="feature">
                        <img src={image2} alt="image 3" />
                        <h2>Feature 3 Title</h2>
                        <p>Feature 3 description goes here.</p>
                    </div>
                </div>

                <div className="booking-section">
                    <div className="booking-text">
                        <div className="title">Looking For a Room to Book ? </div>
                        <button className="book-now-button">Book Now</button>
                    </div>
                </div>

                <div className="footers">
                    <p>&copy; 2023 Rwanda Revenue Authority. All Rights Reserved.</p>
                </div>
            </div>
        </div>
    );
}

export default Home;