import React from "react";
import "./Cart.css";

const cartItems = [
  {
    id: 1,
    brand: "Painting",
    name: "Night moutain painting",
    price: 2249,
    mrp: 4499,
    discount: 2250,
    coupon: 300,
    qty: 1,
    size: 10,
    image: "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80",
    status: "Size not available",
    selected: true,
  },
];

export default function Cart() {
  return (
    <div className="bag-page">
      <div className="bag-main">
        {/* Step Navigation */}
        <nav className="bag-steps">
          <span className="active">BAG</span>
          <span>ADDRESS</span>
          <span>PAYMENT</span>
        </nav>

        <div className="bag-content">
          {/* Left: Cart and Offers */}
          <div className="bag-left">
            {/* Delivery Address */}
            <div className="bag-address">
              <span>
                Deliver to: <b>Tushar , 132103</b> Noida sec 44
              </span>
              <button className="bag-btn-outline">Change Address</button>
            </div>
            {/* Offers */}
            <div className="bag-offers">
              <div className="bag-offer-title">Available Offers</div>
              <ul>
                <li>
                  7.5% Instant Discount up to ₹750 on every spend with InfinArt Kotak Credit Card. TCA
                </li>
              </ul>
              <button className="bag-link-btn">Show More</button>
            </div>
            {/* Stock Status */}
            <div className="bag-status-warning">
              <span>Item(s) out of stock.</span>
              <button className="bag-link-btn">View</button>
            </div>
            {/* Banner */}
            <div className="bag-banner">
              <span>🎟️ 24 Hr VIP EARLY ACCESS</span>
              <button className="bag-btn-dark">Add for ₹49</button>
            </div>
            {/* Cart Items */}
            <div className="bag-selection">
              <span>
                <input type="checkbox" checked readOnly /> 1/1 ITEMS SELECTED
              </span>
              <button className="bag-link-btn">REMOVE</button>
              <button className="bag-link-btn">MOVE TO WISHLIST</button>
            </div>
            <div className="bag-list">
              {cartItems.map((item) => (
                <div className="bag-item" key={item.id}>
                  <input type="checkbox" checked={item.selected} readOnly />
                  <img src={item.image} alt={item.name} className="bag-img" />
                  <div className="bag-info">
                    <div className="bag-brand">{item.brand}</div>
                    <div className="bag-name">{item.name}</div>
                    <div className="bag-meta">
                      <span className="bag-size">Size: {item.size}</span>
                      <span className="bag-status">{item.status}</span>
                    </div>
                    <div className="bag-price-row">
                      <span className="bag-price">₹{item.price}</span>
                      <span className="bag-mrp">₹{item.mrp}</span>
                      <span className="bag-discount">{Math.round((item.discount / item.mrp) * 100)}% OFF</span>
                    </div>
                    <div className="bag-coupon">Coupon Discount: ₹{item.coupon}</div>
                    <div className="bag-actions">
                      <button className="bag-link-btn">REMOVE</button>
                      <button className="bag-link-btn">MOVE TO WISHLIST</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Summary */}
          <aside className="bag-summary">
            {/* Coupon */}
            <div className="bag-summary-section">
              <div className="bag-summary-row">
                <span>1 Coupon applied</span>
                <button className="bag-link-btn">EDIT</button>
              </div>
              <div className="bag-summary-note">You saved additional ₹300</div>
            </div>
            {/* Gifting */}
            <div className="bag-summary-section bag-gift">
              <div className="bag-summary-row">
                <span>Buying for a loved one?</span>
                <button className="bag-btn-outline">Add Gift Package</button>
              </div>
              <div className="bag-summary-note">
                Gift Packaging and personalised message on card, Only for ₹35
              </div>
            </div>
            {/* Donate */}
            <div className="bag-summary-section">
              <div className="bag-summary-row">
                <span>Donate and make a difference</span>
              </div>
              <div className="bag-donate-options">
                {[20, 50, 100].map((amt) => (
                  <button key={amt} className="bag-donate-btn">₹{amt}</button>
                ))}
              </div>
            </div>
            {/* Price Details */}
            <div className="bag-summary-section">
              <div className="bag-summary-title">PRICE DETAILS (1 Item)</div>
              <div className="bag-summary-row">
                <span>Total MRP</span>
                <span>₹4,499</span>
              </div>
              <div className="bag-summary-row">
                <span>Discount on MRP</span>
                <span className="bag-discount">-₹2,250</span>
              </div>
              <div className="bag-summary-row">
                <span>Coupon Discount</span>
                <span className="bag-discount">-₹300</span>
              </div>
              <div className="bag-summary-row">
                <span>Platform Fee</span>
                <span>₹20</span>
              </div>
              <div className="bag-summary-row">
                <span>Shipping Fee</span>
                <span style={{ color: "#22e6d0" }}>FREE</span>
              </div>
              <div className="bag-summary-row bag-summary-total">
                <span>Total Amount</span>
                <span>₹2,249</span>
              </div>
              <button className="checkout-btn">PLACE ORDER</button>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}