import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import {useDispatch} from 'react-redux';
import {REMOVE_ACTIVE_USER, REFRESH_ACCESS_TOKEN} from '../../redux/slice/authSlice'
import "./Sidebar.scss"

const Sidebar = ({ isSidebar }) => {    
    const [signOut, setSignOut] = useState(false);
    const dispatch = useDispatch();

    useEffect(()=>{
        if(signOut){
            dispatch(REMOVE_ACTIVE_USER());          
            window.location.reload();  
        }
    },[signOut])

    const refresh=()=>{
        dispatch(REFRESH_ACCESS_TOKEN());
    }

    return (                
        <div className={`menu ${isSidebar ? 'menu-active' : ''}`}>
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
            <div className="nav-item">
                    <div style={{border: 'none'}} className="nav-item-link" onClick={()=>refresh()}>
                            <span>Refresh</span>
                    </div>
            </div>
            <div className="nav-item">
                    <div style={{border: 'none'}} className="nav-item-link" onClick={()=>setSignOut(true)}>
                            <span>Sign Out</span>
                    </div>
            </div>
        </div>            
    );
};

export default Sidebar;