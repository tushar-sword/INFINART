import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Heart, Star } from "lucide-react";
import RatingStars from "../../../../Product/RatingStars/RatingStars.jsx";
import { addToCart } from "../../../../../Redux/cartSlice.js"; // ✅ adjust path if needed
import "./ProductCard.css";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const [isHovering, setIsHovering] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    let interval;
    if (isHovering && product.images.length > 1) {
      interval = setInterval(() => {
        setCurrentImageIndex((prev) => (prev + 1) % product.images.length);
      }, 2000);
    }
    return () => clearInterval(interval);
  }, [isHovering, product.images.length]);

  const calculateDiscount = (actual, striked) => {
    if (!actual || !striked || striked <= actual) return 0;
    return Math.round(((striked - actual) / striked) * 100);
  };

  const discount = calculateDiscount(product.price, product.originalPrice);
  // Helper function to generate URL slugs
  
  const slugify = (str) => str.toLowerCase().replace(/[\s&]+/g, "-");

  const categorySlug = product.category
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "");

  const subcategorySlug = product.subcategory
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "");

      const productNameSlug = product.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "");

 

  const handleAddToCart = (e) => {
  e.preventDefault();
  e.stopPropagation();

  dispatch(addToCart({
    id: product.id,
    name: product.name,
    price: product.price,
    image: product.images[0], // or fallback to a placeholder
  }));
};

  return (
    <Link
    
      to={`/${categorySlug}/${subcategorySlug}/${productNameSlug}`}
      className="product-card"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => {
        setIsHovering(false);
        setCurrentImageIndex(0);
      }}
    >
      {discount > 0 && <div className="discount-badge1">{discount}% OFF</div>}

      <button
        className={`favorite-btn ${isHovering ? "visible" : "hidden"}`}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          alert("Favorite functionality is disabled in this version.");
        }}
      >
        <Heart size={20} fill="none" />
      </button>

      <div className="image-container">
        <img
          src={product.images[currentImageIndex]}
          alt={product.name}
          className="product-image"
          loading="lazy"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "/placeholder.jpg";
          }}
        />
      </div>

      <div className="product-info">
        <h3 className="title">{product.name}</h3>
        <div className="rating">
          <RatingStars rating={product.rating} />
        </div>
        <div className="price-stock">
          <div className="price">
            <span className="actual">₹{product.price}</span>
            {product.originalPrice && (
              <span className="striked">₹{product.originalPrice}</span>
            )}
          </div>
          <span className={`stock ${product.inStock ? "in-stock" : "out-of-stock"}`}>
            {product.inStock ? "In Stock" : "Out of Stock"}
          </span>
        </div>
      </div>

      <div className={`add-to-cart ${isHovering ? "visible" : ""}`}>
        <button disabled={!product.inStock} onClick={handleAddToCart}>
          <span>Add to Cart</span>
        </button>
      </div>
    </Link>
  );
};

export default ProductCard;