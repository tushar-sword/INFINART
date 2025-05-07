import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="navbar-logo">Infinart</div>

            <ul className="navbar-links">
        <li><a href="/">Home</a></li>
        <li><a href="/products">Products</a></li>
        <li><a href="/shops">Shops</a></li>
        <li><a href="/Blog">Blog</a></li>
        <li><a href="/contact">Contact Us</a></li>

      </ul>

      <Link to={"/login"} className='login_button'>Sign in</Link>
        </nav>
    );
};

export default Navbar;