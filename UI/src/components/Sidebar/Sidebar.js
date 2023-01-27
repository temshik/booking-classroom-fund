import React from 'react';
import { Link } from "react-router-dom";
import "./Sidebar.scss"

const Sidebar = ({ isSidebar }) => {
    return (        
        <>
            <ul className={`menu ${isSidebar ? 'menu-active' : ''}`}>
                <li className="nav-item">
                        <Link className="nav-item-link" to="/table">
                             Edit Account
                        </Link>
                </li>
                <li className="nav-item">
                        <Link className="nav-item-link" to="/profile">
                             Delete Account
                        </Link>
                </li>
                <li className="nav-item">
                        <Link className="nav-item-link" to="/profile">
                             <span>Update Password</span>
                        </Link>
                </li>
                <li className="nav-item">
                        <Link className="nav-item-link" to="/" >
                             <span>Sign Out</span>
                        </Link>
                </li>
            </ul>    
        </>
    );
};

export default Sidebar;