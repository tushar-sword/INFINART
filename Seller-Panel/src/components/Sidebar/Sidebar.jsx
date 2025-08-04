import React from 'react';
import { FiShoppingCart, FiBarChart2, FiUser, FiLogOut, FiHome } from 'react-icons/fi';
import { FaUserCircle } from 'react-icons/fa';
import './Sidebar.css';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div>
        <div className="sidebar-header">
          <FiHome size={20} />
          <h2>STORE NAME</h2>
        </div>

        <div className="sidebar-nav">
          <div className="nav-item">
            <FiBarChart2 size={18} />
            Statistics
          </div>
          <div className="nav-item">
            <FiShoppingCart size={18} />
            Orders
          </div>
          <div className="nav-item">
            <FiUser size={18} />
            Customers
          </div>
        </div>
      </div>

      <div className="sidebar-footer">
        <div className="user-info">
          <FaUserCircle size={28} />
          <div className="user-info-text">
            <strong>STORE NAME</strong>
            <br />
            <small>storename@example.com</small>
          </div>
        </div>
        <div className="sign-out-btn">
          <FiLogOut size={16} />
          Sign Out
        </div>
      </div>
    </div>
  );
};

export default Sidebar;