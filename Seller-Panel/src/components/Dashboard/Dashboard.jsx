import React from "react";
import { FaRupeeSign, FaBox, FaShoppingCart, FaUsers } from "react-icons/fa"; // example icons from react-icons
import "./Dashboard.css";

const cards = [
  {
    label: "Total Revenue",
    value: "₹12,450.5",
    trend: "+12.5%",
    subtext: "from last month",
    icon: <FaRupeeSign />,          // rupee icon
  },
  {
    label: "Total Orders",
    value: "87",
    trend: "+8.3%",
    subtext: "from last month",
    icon: <FaShoppingCart />,       // shopping cart icon
  },
  {
    label: "Total Products",
    value: "24",
    trend: "+2.1%",
    subtext: "from last month",
    icon: <FaBox />,                // box icon
  },
  {
    label: "Total Customers",
    value: "156",
    trend: "+15.7%",
    subtext: "from last month",
    icon: <FaUsers />,              // users icon
  },
];

function Dashboard() {
  return (
    <div className="dashboard-background">
      <div className="dashboard-overview-content">
        <h2>Dashboard Overview</h2>
        <p className="dashboard-overview-desc">
          Welcome back! Here's what's happening with your store today.
        </p>
        <div className="dashboard-cards-row">
          {cards.map((card) => (
            <div className="dashboard-card-box" key={card.label}>
              <div className="dashboard-card-icon">{card.icon}</div>
              <div className="dashboard-card-label">{card.label}</div>
              <div className="dashboard-card-value">{card.value}</div>
              <div className="dashboard-card-trend">
                <span className="dashboard-card-trend-up">{card.trend}</span>
                <span className="dashboard-card-trend-desc"> {card.subtext}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;