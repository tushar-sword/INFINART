import React from 'react';
import Navbar from '../src/components/Navbar/Navbar';
import Dashboard from '../src/components/Dashboard/Dashboard';
import Sidebar from '../src/components/Sidebar/Sidebar';

function Mainpage() {
    return (
    <>
        <Navbar />
        <div style={{ display: 'flex' }}>
            <Sidebar />
            <Dashboard />
        </div>
    </>
    );
}

export default Mainpage;