import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
  import './Header.css'
const Header = () => {
    return (
        <div className='header'>
             <div className='header-Name'>
            <a class="logo" to="#">SMART VALLEY</a>
             </div>
             
            <nav className='header-item'>
                <Link to="/home">Home</Link>
                <Link to="/orders">Orders</Link>
                <Link to="/admin">Admin</Link>
                <Link to="/cart/:id">Cart</Link>
                <Link to="/deals">Deals</Link>
                
              
                <Link className='btnStyle' to="/login">login</Link>
            
            </nav>
        </div>
    );
};

export default Header;