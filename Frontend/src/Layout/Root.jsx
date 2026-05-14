import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../Component/Navbar/Navbar';

const Root = () => {
    return (
        <div>
            <Navbar />
            <Outlet/>
            Root2
        </div>
    );
};

export default Root;