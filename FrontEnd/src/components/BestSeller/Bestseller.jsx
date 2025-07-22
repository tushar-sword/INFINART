import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./Bestseller.css";

const bestSellers = [
  {
    storeName: "kartva",
    image: "https://images.pexels.com/photos/2119903/pexels-photo-2119903.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  },
  {
    storeName: "Dukaanzo",
    image: "https://images.pexels.com/photos/1020370/pexels-photo-1020370.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    storeName: "Light shop",
    image: "https://images.pexels.com/photos/164763/pexels-photo-164763.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  },
  {
    storeName: "Desihaat",
    image: "https://images.pexels.com/photos/2679323/pexels-photo-2679323.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  },
];

const BestSellers = () => {
  const containerRef = useRef(null);
  const navigate = useNavigate();

  const scroll = (direction) => {
    const { current } = containerRef;
    if (direction === "left") {
      current.scrollBy({ left: -300, behavior: "smooth" });
    } else {
      current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  const handleClick = (storeName) => {
    navigate(`/shops?store=${encodeURIComponent(storeName)}`);
    // navigate(`/products?store=${encodeURIComponent(storeName)}`);

  };

  return (
    <section className="best-sellers-section">
      <h2 className="section-title">The Best Sellers :</h2>
      <div className="slider-wrapper">
        <button className="arrow left" onClick={() => scroll("left")}>
          &#8249;
        </button>
        <div className="slider" ref={containerRef}>
          {bestSellers.map((item, index) => (
            <div className="seller-card" key={index} onClick={() => handleClick(item.storeName)}>
              <div className="image-wrapper">
                <img src={item.image} alt={item.storeName} />
                <div className="shop-details">
                  <p>{item.storeName}</p>
                  <span>Click for more info</span>
                </div>
              </div>
              <p>{item.storeName}</p>
            </div>
          ))}
        </div>
        <button className="arrow right" onClick={() => scroll("right")}>
          &#8250;
        </button>
      </div>
    </section>
  );
};

export default BestSellers;
