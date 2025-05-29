import React from 'react';
import Navbar from '../src/components/Navbar/Navbar.jsx';
import ContactUs from '../src/components/ContactUs/Contactus.jsx';
import Contactheader from '../src/components/ContactUs/ContactHeader.jsx';

function Contactpage() {
    
    return (
        <div>
            <Navbar></Navbar>
            <Contactheader/>
            <ContactUs/>
            
            
        </div>
    );
}

export default Contactpage;