import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from '../pages/homepage';
import Productpage from '../pages/productpage';
import Loginpage from '../pages/Loginpage';
import Registerpage from '../pages/Registerpage';
import Contactpage from '../pages/contactpage';

import Blog from "../pages/blogpage.jsx";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/products" element={<Productpage />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/login" element={<Loginpage />} />
        <Route path="/register" element={<Registerpage />} />
        <Route path="/contact" element={<Contactpage />} />
        {/* <Route path="/blog" element={<Blog />} /> */}
        {/* Add more routes as needed */}
      
      </Routes>
    </Router>
  );
}

export default App;
