import React from 'react';
import ShopComp from '../src/components/ShopCom/ShopCom';
import Navbar from '../src/components/Navbar/Navbar';

const shops = [
  {
    id: 1,
    name: 'Tech Store',
    image: 'https://plus.unsplash.com/premium_photo-1675615649456-5c0a8b0ad0ac?q=80&w=2016&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 2,
    name: 'Book Haven',
    image: 'https://source.unsplash.com/200x200/?books,store',
  },
  {
    id: 3,
    name: 'Fashion Hub',
    image: 'https://source.unsplash.com/200x200/?fashion,store',
  },
  {
    id: 4,
    name: 'Home Decor',
    image: 'https://source.unsplash.com/200x200/?home,decor,store',
  },
  {
    id: 5,
    name: 'Grocery Mart',
    image: 'https://source.unsplash.com/200x200/?grocery,store',
  },
];

const ShopPage = () => {
  return (
    <div>
        <Navbar/>
      <h1>Our Shops</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', justifyContent: 'center' }}>
        {shops.map((shop) => (
          <ShopComp key={shop.id} shop={shop} />
        ))}
      </div>
    </div>
  );
};

export default ShopPage;
