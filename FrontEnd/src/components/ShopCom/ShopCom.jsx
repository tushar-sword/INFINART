import React from 'react';
import { Link } from 'react-router-dom';
import './ShopCom.css';

const ShopComp = ({ shop }) => {
  return (
    <Link to={`/shops/${shop.id}`} className="shop-item">
      <div className="shop-image-container">
        <img
          src={shop.image}
          alt={shop.name}
          className="shop-image"
        />
      </div>
      <h2 className="shop-name">{shop.name}</h2>
    </Link>
  );
};

export default ShopComp;
