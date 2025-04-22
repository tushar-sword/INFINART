import React from 'react';
import Navbar from '../src/components/Navbar/Navbar.jsx';
function Homepage() {
    return (
        <div>
            <Navbar></Navbar>
            <h1 style={{ color: 'teal', fontSize: '2rem', textAlign: 'center' }}>Welcome to the Homepage</h1>
            <p style={{ fontSize: '1rem', textAlign: 'center' }}>This is the content of the homepage.</p>
        </div>
    );
}

export default Homepage;