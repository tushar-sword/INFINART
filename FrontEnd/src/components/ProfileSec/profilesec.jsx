import React from 'react';
import './profilesec.css';

const Profilesec = () => (
  <div className="profile-layout">
    <aside className="sidebar">
 
  <nav className="sidebar-nav" aria-label="Sidebar Navigation">
    <ul>
      <li className="active"><span>My Profile</span></li>
      <li><span>Orders</span></li>
      <li><span>Wishlist</span></li>
      <li><span>Addresses</span></li>
      <li><span>Payment Methods</span></li>
      <li><span>Reviews</span></li>
      <li><span>Coupons</span></li>
      <li><span>Settings</span></li>
    </ul>
  </nav>
  <footer className="sidebar-footer">
    <div className="user-mini">
      <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="User avatar" />
      <div>
        <span className="user-name">John Doe</span>
        <span className="user-email">john.doe@example.com</span>
      </div>
    </div>
  </footer>
</aside>

    <main className="profile-main">
      <header className="profile-header">
        <div>
          <h2>My Profile</h2>
          <span className="profile-role">Customer</span>
        </div>
        <div className="profile-meta">
          <span>Last login: 21 May 2025</span>
        </div>
      </header>
      <section className="profile-section profile-user">
        <img className="profile-avatar" src="https://randomuser.me/api/portraits/men/32.jpg" alt="avatar" />
        <div>
          <h3>John Doe</h3>
          <span>New York, USA</span>
          <span className="profile-email">john.doe@example.com</span>
        </div>
      </section>
      <section className="profile-section profile-info">
        <div className="profile-info-header">
          <h4>Personal Information</h4>
          <button className="edit-btn">Edit</button>
        </div>
        <div className="profile-info-grid">
          <div>
            <label>Full Name</label>
            <span>John Doe</span>
          </div>
          <div>
            <label>Email</label>
            <span>john.doe@example.com</span>
          </div>
          <div>
            <label>Phone</label>
            <span>+1 555 123 4567</span>
          </div>
          <div>
            <label>Joined</label>
            <span>March 2023</span>
          </div>
        </div>
      </section>
      <section className="profile-section profile-address">
        <div className="profile-info-header">
          <h4>Default Address</h4>
          <button className="edit-btn">Edit</button>
        </div>
        <div className="profile-info-grid">
          <div>
            <label>Country</label>
            <span>USA</span>
          </div>
          <div>
            <label>City</label>
            <span>New York</span>
          </div>
          <div>
            <label>Postal Code</label>
            <span>10001</span>
          </div>
        </div>
      </section>
      <section className="profile-section profile-stats">
        <div className="stat">
          <span className="stat-value">15</span>
          <span className="stat-label">Orders</span>
        </div>
        <div className="stat">
          <span className="stat-value">8</span>
          <span className="stat-label">Wishlist</span>
        </div>
        <div className="stat">
          <span className="stat-value">3</span>
          <span className="stat-label">Reviews</span>
        </div>
        <div className="stat">
          <span className="stat-value">2</span>
          <span className="stat-label">Coupons</span>
        </div>
      </section>
    </main>
  </div>
);

export default Profilesec;
