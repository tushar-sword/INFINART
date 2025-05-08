import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from '../pages/homepage';
import Productpage from '../pages/productpage';
import Loginpage from '../pages/Loginpage';
import Registerpage from '../pages/Registerpage';
import Contactpage from '../pages/contactpage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/products" element={<Productpage />} />
        <Route path="/login" element={<Loginpage />} />
        <Route path="/register" element={<Registerpage />} />
        <Route path="/contact" element={<Contactpage />} />
      
      </Routes>
    </Router>
  );
}

export default App;
