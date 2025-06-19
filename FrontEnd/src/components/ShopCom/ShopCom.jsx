// src/components/ShopPage/ShopPage.jsx
import React from 'react';
import './ShopCom.css';

const shops = {
  bestSelling: [
    {
      name: 'Trendy Store',
      img: 'https://images.pexels.com/photos/1036857/pexels-photo-1036857.jpeg?auto=compress&cs=tinysrgb&w=200'
    },
    {
      name: 'Urban Deals',
      img: 'https://images.pexels.com/photos/209817/pexels-photo-209817.jpeg?auto=compress&cs=tinysrgb&w=200'
    },
    {
      name: 'Style Hub',
      img: 'https://images.pexels.com/photos/298863/pexels-photo-298863.jpeg?auto=compress&cs=tinysrgb&w=200'
    }
  ],
  delhi: [
    {
      name: 'Delhi Mart',
      img: 'https://images.pexels.com/photos/3735644/pexels-photo-3735644.jpeg?auto=compress&cs=tinysrgb&w=200'
    },
    {
      name: 'Capital Threads',
      img: 'https://images.pexels.com/photos/1666067/pexels-photo-1666067.jpeg?auto=compress&cs=tinysrgb&w=200'
    },
    {
      name: 'Red Fort Bazaar',
      img: 'https://images.pexels.com/photos/2698519/pexels-photo-2698519.jpeg?auto=compress&cs=tinysrgb&w=200'
    }
  ],
  mumbai: [
    {
      name: 'Mumbai Mall',
      img: 'https://images.pexels.com/photos/264636/pexels-photo-264636.jpeg?auto=compress&cs=tinysrgb&w=200'
    },
    {
      name: 'Chowpatty Crafts',
      img: 'https://images.pexels.com/photos/2387532/pexels-photo-2387532.jpeg?auto=compress&cs=tinysrgb&w=200'
    },
    {
      name: 'Bollywood Trends',
      img: 'https://images.pexels.com/photos/1701202/pexels-photo-1701202.jpeg?auto=compress&cs=tinysrgb&w=200'
    }
  ]
};


const ShopCom = () => {
  return (
    <div className="shop-container">
      <Section title="Best Selling Shops" items={shops.bestSelling} />
      <Section title="Delhi Based Shops" items={shops.delhi} />
      <Section title="Mumbai Based Shops" items={shops.mumbai} />
    </div>
  );
};

const Section = ({ title, items }) => (
  <div className="shop-section">
    <h2>{title}</h2>
    <div className="shop-cards">
      {items.map((shop, index) => (
        <div className="shop-card" key={index}>
          <img src={shop.img} alt={shop.name} />
          <p>{shop.name}</p>
        </div>
      ))}
    </div>
  </div>
);

export default ShopCom;
