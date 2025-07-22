import React, { useState, useRef, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "../../../../Redux/productSlice";
import { Star, Heart, ShoppingCart, Plus, Minus, ChevronLeft, ChevronRight } from "lucide-react";
import { toast } from "sonner";
import { Button } from "../../../../ui/Button";
import RatingStars from "../../RatingStars/RatingStars.jsx";
import { motion, AnimatePresence } from "framer-motion";
import Breadcrumb from "../ShopM/Breadcrumb/Breadcrumb.jsx";
import Navbar from "../../../Navbar/Navbar";
import Footersec from "../../../Footersection/Footersection.jsx";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../../../../ui/dialog";
import "./ProductDetails.css";
import { addToCart } from "../../../../Redux/cartSlice";
import { toggleFavorite } from "../../../../Redux/favoritesSlice";

export const slugify = (str) =>
  str.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

const ProductDetails = () => {
  const { category, subcategory, productName } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { products: allProducts, loading } = useSelector((state) => state.products);
  const favorites = useSelector((state) => state.favorites.items);
  const cart = useSelector((state) => state.cart.cartItems);

  useEffect(() => {
    if (allProducts.length === 0) {
      dispatch(fetchProducts());
    }
  }, [dispatch, allProducts.length]);

  const product = allProducts.find(
    (p) =>
      slugify(p.category) === category &&
      slugify(p.subcategory) === subcategory &&
      slugify(p.name) === productName
  );

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  const [showZoom, setShowZoom] = useState(false);
  const [showBuyNowDialog, setShowBuyNowDialog] = useState(false);
  const [pincode, setPincode] = useState("");

  const imageRef = useRef(null);

  const handleNextImage = () => {
    setSelectedImageIndex((prevIndex) => (prevIndex + 1) % product.images.length);
  };

  const handlePrevImage = () => {
    setSelectedImageIndex(
      (prevIndex) => (prevIndex - 1 + product.images.length) % product.images.length
    );
  };

  const handleImageHover = (e) => {
    if (e.target.closest(".carousel-button")) {
      setShowZoom(false);
      return;
    }
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
    dispatch(
      addToCart({
        id: product._id || product.id,
        name: product.name,
        price: product.price,
        image: product.images[0],
        quantity,
      })
    );
    toast.success(`${quantity} x ${product.name} added to cart!`);
  };

  const handleBuyNow = () => {
    setShowBuyNowDialog(true);
  };

  const handleFavoriteToggle = () => {
    dispatch(toggleFavorite(product._id || product.id));
    const isFavorite = favorites.includes(product.name);
    toast.success(
      `${product.name} ${isFavorite ? "removed from" : "added to"} favorites`
    );
  };

  const isFavorite = favorites.includes(product.name);

  const discount =
    product?.originalPrice && product.price < product.originalPrice
      ? Math.round(
          ((product.originalPrice - product.price) / product.originalPrice) * 100
        )
      : 0;

  const getBreadcrumbItems = () => {
    if (!product) return [];
    const items = [{ label: "Products", href: "/products" }];
    const categorySlug = slugify(product.category);
    const subcategorySlug = slugify(product.subcategory);

    if (product.category) {
      items.push({ label: product.category, href: `/${categorySlug}` });
    }
    if (product.subcategory) {
      items.push({ label: product.subcategory, href: `/${categorySlug}/${subcategorySlug}` });
    }
    items.push({ label: product.name, href: "" });
    return items;
  };

  if (loading || allProducts.length === 0) {
    return <div className="loading-message">Loading product...</div>;
  }

  if (!product) {
    return (
      <>
        <Navbar />
        <div className="not-found-container">
          <h2 className="not-found-title">Product Not Found</h2>
          <p className="not-found-message">
            The product you are looking for does not exist.
          </p>
          <Button className="back-to-shop-btn" onClick={() => navigate("/shop")}>
            Return to Shop
          </Button>
        </div>
        <Footersec />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <Breadcrumb items={getBreadcrumbItems()} />

      <div className="product-detail-container">
        <div className="product-detail-content">
          <div className="thumbnail-column">
            <div className="thumbnail-container">
              {product.images.map((image, index) => (
                <div
                  key={index}
                  className={`thumbnail-item ${
                    selectedImageIndex === index
                      ? "selected-thumbnail"
                      : "dimmed-thumbnail"
                  }`}
                  onClick={() => setSelectedImageIndex(index)}
                >
                  <img
                    src={image}
                    alt={`${product.name} thumbnail ${index + 1}`}
                    className="thumbnail-image"
                  />
                </div>
              ))}
            </div>
          </div>

          <div
            className="main-image-container"
            onMouseMove={handleImageHover}
            onMouseLeave={handleImageLeave}
            ref={imageRef}
          >
            {product.images.length > 1 && (
              <button
                className="carousel-button left"
                onClick={handlePrevImage}
                aria-label="Previous image"
              >
                <ChevronLeft size={24} />
              </button>
            )}

            <div className="main-image-wrapper">
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedImageIndex}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.3 }}
                  className="image-animation-container"
                >
                  <img
                    src={product.images[selectedImageIndex]}
                    alt={product.name}
                    className="main-product-image"
                  />
                </motion.div>
              </AnimatePresence>

              <button
                onClick={handleFavoriteToggle}
                className={`favorite-button ${
                  isFavorite ? "favorite-active" : ""
                }`}
                aria-label={
                  isFavorite ? "Remove from favorites" : "Add to favorites"
                }
              >
                <Heart
                  size={20}
                  fill={isFavorite ? "currentColor" : "none"}
                />
              </button>
            </div>

            {product.images.length > 1 && (
              <button
                className="carousel-button right"
                onClick={handleNextImage}
                aria-label="Next image"
              >
                <ChevronRight size={24} />
              </button>
            )}

            {showZoom && (
              <div className="zoom-overlay">
                <div
                  className="zoom-content"
                  style={{
                    backgroundImage: `url(${product.images[selectedImageIndex]})`,
                    backgroundPosition: `${zoomPosition.x}% ${zoomPosition.y}%`,
                  }}
                />
              </div>
            )}
          </div>

          <div className={`product-details ${showZoom ? "details-dimmed" : ""}`}>
            <h1 className="product-title">{product.name}</h1>

            <div className="rating-container">
              <RatingStars rating={product.rating} />
            </div>

            <div className="price-container">
              <div className="price-wrapper">
                <span className="current-price">₹{product.price}</span>
                {product.originalPrice && (
                  <span className="original-price">₹{product.originalPrice}</span>
                )}
                {discount > 0 && (
                  <span className="discount-text">{discount}% off</span>
                )}
              </div>
            </div>

            <div className="description-container">
              <h3 className="section-title">Description</h3>
              <p className="product-description">{product.description}</p>
            </div>

            <div className="stock-status">
              <span
                className={`stock-badge ${
                  product.inStock ? "in-stock" : "out-of-stock"
                }`}
              >
                {product.inStock ? "In Stock" : "Out of Stock"}
              </span>
            </div>

            <div className="quantity-section">
              <span className="quantity-label">Quantity:</span>
              <div className="quantity-selector">
                <button
                  onClick={() => handleQuantityChange(-1)}
                  disabled={quantity <= 1}
                  className="quantity-btn"
                >
                  <Minus size={16} />
                </button>
                <span className="quantity-value">{quantity}</span>
                <button
                  onClick={() => handleQuantityChange(1)}
                  disabled={quantity >= 10}
                  className="quantity-btn"
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>

            <div className="pincode-section">
              <div className="pincode-checker">
                <input
                  type="text"
                  placeholder="Enter pincode"
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                  className="pincode-input"
                  maxLength={6}
                />
                <button className="check-btn">Check</button>
              </div>
            </div>

            <div className="action-buttons">
              <Button
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className="add-to-cart-btn"
              >
                <ShoppingCart size={18} />
                <span>Add to Cart</span>
              </Button>

              <Button
                onClick={handleBuyNow}
                disabled={!product.inStock}
                className="buy-now-btn"
              >
                <span>Buy Now</span>
              </Button>
            </div>

            {product.tags && product.tags.length > 0 && (
              <div className="tags-container">
                {product.tags.map((tag) => (
                  <span key={tag} className="product-tag">
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {showBuyNowDialog && (
        <Dialog open={showBuyNowDialog} onOpenChange={setShowBuyNowDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Confirm Purchase</DialogTitle>
              <DialogDescription>
                Buy {quantity} × {product.name} for ₹{(product.price * quantity).toFixed(2)}?
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowBuyNowDialog(false)}>
                Cancel
              </Button>
              <Button
                onClick={() => {
                  handleAddToCart();
                  navigate("/checkout");
                }}
              >
                Proceed to Checkout
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
      <Footersec />
    </>
  );
};

export default ProductDetails;