import React from "react";
import "./ScrollSection.css";

const ScrollSection = () => {
  return (
    <div className="scroll-wrapper">
      <h6 className="scroll-heading">SHOP - SHOP - SHOP - SHOP - SHOP - SHOP - SHOP - SHOP - SHOP - SHOP - SHOP - SHOP - SHOP - SHOP - SHOP - SHOP - SHOP - SHOP - SHOP </h6>
      
      <div className="scroll-container">
        {[...Array(10)].map((_, i) => (
          <div className="scroll-item" key={i}>
            <div className="box"></div> 
      <p className="item-text">Birthday Gift</p> 
            </div>
        ))}
        
      </div>
    </div>
  );
};

export default ScrollSection;
