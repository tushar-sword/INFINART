// src/pages/Productpage.jsx or wherever your route is
import React from 'react';
import styled from 'styled-components';
import Navbar from '../src/components/Navbar/Navbar.jsx';
import ProductCard from '../src/components/Product/productcard/productcard.jsx';
import { ShopProvider } from '../src/components/Product/context/ShopContext.jsx';
import products from '../src/data/product.json'; // adjust path if needed

const ProductList = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 0.5rem;
  row-gap: -0px; 
  padding: 2rem;
  margin: 0 auto;
  max-width: 1200px;
`;

function Productpage() {
  return (
    <div>
      <Navbar />
      <ShopProvider>
        <ProductList>
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </ProductList>
      </ShopProvider>
    </div>
  );
}

export default Productpage;
