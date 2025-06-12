import React, { useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { products } from '../../../../data/mockData';
import { Star, Heart, ShoppingCart, Plus, Minus } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '../../../../ui/Button';

import Navbar from '../../../Navbar/Navbar';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from "../../../../ui/dialog";
import './ProductDetails.css';

import { addToCart } from '../../../../Redux/cartSlice';
import { toggleFavorite } from '../../../../Redux/favoritesSlice';

const ProductDetails = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const favorites = useSelector((state) => state.favorites.items);
  const cart = useSelector((state) => state.cart.cartItems); // Added for debugging or display
  const product = products.find(p => p.id === Number(productId));

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  const [showZoom, setShowZoom] = useState(false);
  const [showBuyNowDialog, setShowBuyNowDialog] = useState(false);

  const imageRef = useRef(null);

  if (!product) {
    return (
      <div className="product-details__not-found">
        <h2>Product Not Found</h2>
        <p>The product you are looking for does not exist.</p>
        <Button onClick={() => navigate('/products')}>Return to Shop</Button>
      </div>
    );
  }

  const handleImageHover = (e) => {
    if (!imageRef.current) return;
    const { left, top, width, height } = imageRef.current.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomPosition({ x, y });
    setShowZoom(true);
  };

  const handleImageLeave = () => {
    setShowZoom(false);
  };

  const handleQuantityChange = (change) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && newQuantity <= 10) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    dispatch(addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      quantity
    }));
    toast.success(`${quantity} x ${product.name} added to cart!`);
  };

  const handleBuyNow = () => {
    setShowBuyNowDialog(true);
  };

  const handleFavoriteToggle = () => {
    dispatch(toggleFavorite(product.id));
    const isFavorite = favorites.includes(product.id);
    if (isFavorite) {
      toast.success(`${product.name} removed from favorites`);
    } else {
      toast.success(`${product.name} added to favorites`);
    }
  };

  const isFavorite = favorites.includes(product.id);

  const discountAmount = product.originalPrice
    ? (product.originalPrice - product.price).toFixed(2)
    : '0.00';

  const renderRating = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating - fullStars >= 0.5;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<Star key={i} className="star filled" size={18} />);
      } else if (i === fullStars && hasHalfStar) {
        stars.push(
          <div key={i} className="star-container">
            <Star className="star empty" size={18} />
            <div className="star-half">
              <Star className="star filled" size={18} />
            </div>
          </div>
        );
      } else {
        stars.push(<Star key={i} className="star empty" size={18} />);
      }
    }

    return (
      <div className="rating">
        {stars}
        <span className="rating-value">{rating.toFixed(1)}</span>
      </div>
    );
  };

  return (
    <>
    <Navbar />
    <div className="product-details__container">
      <div className="product-details__content">
        {/* Thumbnails */}
        <div className="product-details__thumbnails">
          {product.images.map((image, index) => (
            <div
              key={index}
              className={`thumbnail ${selectedImageIndex === index ? 'active' : ''}`}
              onClick={() => setSelectedImageIndex(index)}
            >
              <img src={image} alt={`${product.name} thumbnail ${index + 1}`} />
            </div>
          ))}
        </div>

        {/* Main Image */}
        <div
          className="product-details__main-image"
          onMouseMove={handleImageHover}
          onMouseLeave={handleImageLeave}
          ref={imageRef}
        >
          <div className="main-image-container">
            <img src={product.images[selectedImageIndex]} alt={product.name} />
            <button
              onClick={handleFavoriteToggle}
              className={`favorite-btn ${isFavorite ? 'active' : ''}`}
            >
              <Heart size={20} fill={isFavorite ? "currentColor" : "none"} />
            </button>
          </div>

          {showZoom && (
            <div
              className="zoom-image"
              style={{
                backgroundImage: `url(${product.images[selectedImageIndex]})`,
                backgroundPosition: `${zoomPosition.x}% ${zoomPosition.y}%`,
              }}
            />
          )}
        </div>

        {/* Product Details */}
        <div className={`product-details__info ${showZoom ? 'dimmed' : ''}`}>
          <h1>{product.name}</h1>
          {renderRating(product.rating)}
          <div className="price">
            <span className="current-price">Rs. {product.price.toFixed(2)}</span>
            {product.originalPrice && (
              <>
                <span className="original-price">Rs. {product.originalPrice.toFixed(2)}</span>
                <span className="discount">-Rs. {discountAmount}</span>
              </>
            )}
          </div>

          {product.discountPercentage && (
            <div className="discount-badge">
              {product.discountPercentage}% OFF
            </div>
          )}

          <div className="description">
            <h3>Description</h3>
            <p>{product.description}</p>
          </div>

          <div className={`stock ${product.inStock ? 'in-stock' : 'out-of-stock'}`}>
            {product.inStock ? 'In Stock' : 'Out of Stock'}
          </div>

          <div className="quantity">
            <h3>Quantity</h3>
            <div className="quantity-controls">
              <button onClick={() => handleQuantityChange(-1)} disabled={quantity <= 1}>
                <Minus size={16} />
              </button>
              <span>{quantity}</span>
              <button onClick={() => handleQuantityChange(1)} disabled={quantity >= 10}>
                <Plus size={16} />
              </button>
            </div>
          </div>

          <div className="actions">
            <Button onClick={handleAddToCart} disabled={!product.inStock}>
              <ShoppingCart size={18} />
              <span>Add to Cart</span>
            </Button>
            <Button onClick={handleBuyNow} disabled={!product.inStock}>
              <span>Buy Now</span>
            </Button>
          </div>

          {product.tags && (
            <div className="tags">
              <h3>Tags:</h3>
              <div className="tag-list">
                {product.tags.map((tag, index) => (
                  <span key={index} className="tag">{tag}</span>
                ))}
              </div>
            </div>
          )}

          <div className="category">
            <h3>Category:</h3>
            <div className="category-path">
              <span>{product.category}</span>
              <span>›</span>
              <span>{product.subcategory}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Buy Now Dialog */}
      <Dialog open={showBuyNowDialog} onOpenChange={setShowBuyNowDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Complete Your Purchase</DialogTitle>
            <DialogDescription>
              Please provide your shipping details to complete this purchase.
            </DialogDescription>
          </DialogHeader>

          <div className="buy-now-form">
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input id="name" placeholder="John Doe" />
            </div>
            <div className="form-group">
              <label htmlFor="address">Address</label>
              <textarea id="address" placeholder="123 Main Street" rows={3} />
            </div>
            <div className="form-group">
              <label htmlFor="phone">Phone</label>
              <input id="phone" placeholder="+91 1234567890" />
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setShowBuyNowDialog(false)}>
              Cancel
            </Button>
            <Button
              type="submit"
              onClick={() => {
                toast.success("Order placed successfully!");
                setShowBuyNowDialog(false);
              }}
            >
              Confirm Order
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
    </>
  );
};

export default ProductDetails;
