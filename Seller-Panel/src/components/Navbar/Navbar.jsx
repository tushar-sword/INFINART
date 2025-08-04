import React from 'react';
import './Navbar.css';
import { FaUserCircle } from 'react-icons/fa';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <span className="logo">Aestheticommerce</span>
      </div>
      <ul className="navbar-links">
        <li><a href="/dashboard">Dashboard</a></li>
        <li><a href="#">Products</a></li>
        <li><a href="#">Shop</a></li>
        <li><a href="#">Blogs</a></li>
        <li><a href="#">Contact</a></li>
      </ul>
      <a href="/profile" className="navbar-profile" aria-label="Profile">
        <FaUserCircle size={28} />
      </a>
    </nav>
  );
};

export default Navbar;