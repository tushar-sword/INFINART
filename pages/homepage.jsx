import React from 'react';
import Navbar from '../src/components/Navbar/Navbar.jsx';
import Herosection from '../src/components/Herosection/Herosection.jsx';
import Scrollsection from '../src/components/Scrollsection/Scrollsection.jsx';
import Footersec from '../src/components/Footersection/Footersection.jsx';
import Newsletter from '../src/components/NewsletterSection/Newsletter.jsx';
import Blogsection from '../src/components/Blogsection/Blogsection.jsx';
import SearchBar from '../src/components/SearchBar/searchbar.jsx';
function Homepage() {
    
    return (
        <div>
            <Navbar></Navbar>
            <SearchBar></SearchBar> 
            <Herosection></Herosection>
            {/* <Scrollsection></Scrollsection> */}
            <h1 style={{ color: 'teal', fontSize: '2rem', textAlign: 'center' }}>Welcome to the Homepage</h1>
            <p style={{ fontSize: '1rem', textAlign: 'center' }}>This is the content of the homepage.</p>
            <Blogsection></Blogsection>
            <Newsletter></Newsletter>
            <Footersec></Footersec>
            
        </div>
    );
}

export default Homepage;