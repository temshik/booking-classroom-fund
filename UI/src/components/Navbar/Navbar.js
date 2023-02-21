import React, {useState} from 'react';
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';
import {selectIsLoggedIn, selectEmail} from '../../redux/slice/authSlice'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUserCheck, faUserXmark} from "@fortawesome/free-solid-svg-icons";
import Sidebar from '../Sidebar/Sidebar';
import "./Navbar.scss"

const Navbar = () => {
    const [sidebar, setSidebar] = useState(false);
    const email = window.sessionStorage.getItem('email');    
    const isLoggedIn = useSelector(selectIsLoggedIn)

    const showSidebar=()=>{
        if(sidebar === false)
        setSidebar(true);
        else
        setSidebar(false);
    }
    
    if(email !== null)
        return(
            <div className='navbar'>
                <div className='navContainer'>
                    <span className='logo'>Workspace booking</span>
                    <div className='dropdown'>
                        <>{email}</>
                        <Link to='#' className='menu-bars'>
                            {!sidebar &&<FontAwesomeIcon onClick={showSidebar} style={{color:'white'}} icon={faUserCheck}/>}
                            {sidebar &&<FontAwesomeIcon onClick={showSidebar} style={{color:'white'}} icon={faUserXmark}/>}
                        </Link>
                        <Sidebar isSidebar={sidebar} />
                    </div>


                </div>
            </div>
        )        
    else
        return(
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
        )        
};

export default Navbar;