import React from 'react';
import "./Navbar.scss"

const Navbar = () => {
    return (
        <div className='navbar'>
        <div className='navContainer'>
            <span className='logo'>Workspace booking</span>
            <div className='navItems'>
            <a href="/SignUp" rel="noopener noreferrer">
                <button className='navButton'>Sign Up</button>
            </a>
            <a href="/SignIn" rel="noopener noreferrer">
                <button className='navButton'>Sign In</button>                    
            </a>
            </div>
        </div>
    </div>
    );
};

export default Navbar;