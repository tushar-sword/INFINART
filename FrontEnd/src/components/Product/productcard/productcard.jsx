import React, { useState } from "react";
import { useShop } from "../context/ShopContext.jsx";
import RatingStars from "../RatingStars/RatingStars.jsx";
import { Heart } from "lucide-react";
import "./ProductCard.css";

const ProductCard = ({ product }) => {
  const { addToCart, toggleFavorite, isInCart, isFavorite } = useShop();
  const [isHovering, setIsHovering] = useState(false);

  const image = product.image || "/placeholder.jpg";

  const handleMouseEnter = () => setIsHovering(true);
  const handleMouseLeave = () => setIsHovering(false);

  // Calculate discount percentage
  const calculateDiscount = (actual, striked) => {
    if (!actual || !striked || striked <= actual) return 0;
    return Math.round(((striked - actual) / striked) * 100);
  };

  const discount = calculateDiscount(product.price.actual, product.price.striked);

  return (
    <div
      className="product-card"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {discount > 0 && <div className="discount-badge">{discount}% OFF</div>}

      <button
        className={`favorite-btn ${isHovering ? "visible" : "hidden"} ${isFavorite(product.id) ? "active" : ""}`}
        onClick={(e) => {
          e.stopPropagation();
          toggleFavorite(product);
        }}
      >
        <Heart size={20} fill={isFavorite(product.id) ? "currentColor" : "none"} />
      </button>

      <div className="image-container">
        <img
          src={image}
          alt={product.title}
          className="product-image"
          loading="lazy"
        />
      </div>

      <div className="product-info">
        <h3 className="title">{product.title}</h3>
        <div className="rating">
          <RatingStars rating={product.rating} />
        </div>
        <div className="price-stock">
          <div className="price">
            <span className="actual">₹{product.price.actual}</span>
            <span className="striked">₹{product.price.striked}</span>
          </div>
          <span className={`stock ${product.inStock ? "in-stock" : "out-of-stock"}`}>
            {product.inStock ? "In Stock" : "Out of Stock"}
          </span>
        </div>
      </div>

      <div className={`add-to-cart ${isHovering ? "visible" : ""}`}>
        <button
          disabled={!product.inStock || isInCart(product.id)}
          onClick={() => product.inStock && addToCart(product)}
        >
          {isInCart(product.id) ? "Added to Cart" : "Add to Cart"}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
