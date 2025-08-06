import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from '../pages/homepage';
import Productpage from '../pages/productpage';
import Loginpage from '../pages/Loginpage';
import Registerpage from '../pages/Registerpage';
import Contactpage from '../pages/contactpage';
import Blog from '../pages/blogpage';
import Profile from '../pages/profilepage';
import Cartpage from '../pages/cartpage';
import ShopPage from '../pages/shoppage'
import ProductDetails from "./components/Product/Testing/ProductDetails/ProductDetails.jsx";
import ScrollToTop from './components/ScrollToTop.jsx'; 
import SellerHandler from '../src/components/SellerPages/Handler.jsx';
import BlogDetails from './components/Blog/BlogDetails/BlogDetails.jsx';
import ShopDetails from './components/ShopDetails/ShopDetails.jsx';
import Address from './components/Address/Address.jsx';

function App() {
  return (
    <Router>
       <ScrollToTop/>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/products" element={<Productpage />} />
        <Route path="/login" element={<Loginpage />} />
        <Route path="/register" element={<Registerpage />} />
        <Route path="/contact" element={<Contactpage />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/cart" element={<Cartpage />} />
        <Route path="/seller" element={<SellerHandler />} />
        <Route path="/sale" element={<Productpage />} />
        <Route path="/profile/addresses" element={<Address />} />
          {/* <Route path="/sale" element={<SalePage />} /> */}

          <Route path="/blogs/:id" element={<BlogDetails />} />



        <Route path="/:category" element={<Productpage />} />
        <Route path="/:category/:subcategory" element={<Productpage />} />
     <Route path="/:category/:subcategory/:productName" element={<ProductDetails />} />


        <Route path="/shops" element={<ShopPage/>} />
        <Route path="/shop-products" element={<ShopDetails/>} />
        {/* Add more routes as needed */}
      
      </Routes>
    </Router>
  );
}

export default App;



