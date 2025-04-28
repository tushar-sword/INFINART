import React from "react";
import "./HeroSection.css";

const HeroSection = () => {
  return (
    <div className="hero-container">
      <div className="banner large-banner">
        <h2>Explore Unique Gifts</h2>
        <p>Find the perfect present for every occasion.</p>
      </div>
      <div className="banner small-banner">
        <h3>New Arrivals</h3>
        <p>Fresh decor pieces just for you!</p>
      </div>
    </div>
  );
};

export default HeroSection;
