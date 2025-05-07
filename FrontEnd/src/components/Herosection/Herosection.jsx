import React from "react";
import {useState, useEffect} from "react";
import "./HeroSection.css";


const HeroSection = () => {

  const largeBannerImages=[
     "https://images.unsplash.com/photo-1561715276-a2d087060f1d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    'https://plus.unsplash.com/premium_photo-1677995700941-100976883af7?q=80&w=2123&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1541574823565-f1d660886187?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  ];

  const smallBannerImages=[
    'https://images.unsplash.com/photo-1555041469-a586c61ea9bc',
    'https://images.unsplash.com/photo-1503602642458-232111445657?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'

  ];

  const [currentLargeImage, setCurrentLargeImage] = useState(0);
  const [currentSmallImage, setCurrentSmallImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentLargeImage((prev) => (prev + 1) % largeBannerImages.length);
      setCurrentSmallImage((prev) => (prev + 1) % smallBannerImages.length);
    }, 4500); // Change image every 3 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  },[]);
  return (
    <div className="hero-container">
      <div className="banner large-banner"
       style={{
        backgroundImage: `url(${largeBannerImages[currentLargeImage]})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        // transition: "background-image 0.5s ",
      }}>

        <h2>Explore Unique Gifts</h2>
        <p>Find the perfect present for every occasion.</p>
      </div>
      <div className="banner small-banner"
      style={{
        backgroundImage: `url(${smallBannerImages[currentSmallImage]})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        // transition: "background-image 0.5s ease-in-out",
      }}>
        <h3>New Arrivals</h3>
        <p>Fresh decor pieces just for you!</p>
      </div>
    </div>
  );
};

export default HeroSection;
