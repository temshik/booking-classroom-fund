import React from 'react';
import { Link } from "react-router-dom";
import "./Navbar.scss"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUserCheck, faUserXmark} from "@fortawesome/free-solid-svg-icons";
import Sidebar from '../Sidebar/Sidebar';

export default class Navbar extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            authMode: this.props.authMode,   
            sidebar: false   
        };
        this.showSidebar=this.showSidebar.bind(this);
    }

    showSidebar(){
        if(this.state.sidebar === false)
        this.setState({sidebar:true});
        else
        this.setState({sidebar:false});
    }

render(){
    if(this.state.authMode){
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
        );}
    else{
    return (
        <div className='navbar'>
            <div className='navContainer'>
                <span className='logo'>Workspace booking</span>
                <div className='dropdown'>
                    <Link to='#' className='menu-bars'>
                        {!this.state.sidebar &&<FontAwesomeIcon onClick={this.showSidebar} style={{color:'white'}} icon={faUserCheck}/>}
                        {this.state.sidebar &&<FontAwesomeIcon onClick={this.showSidebar} style={{color:'white'}} icon={faUserXmark}/>}
                    </Link>
                    <Sidebar isSidebar={this.state.sidebar} />
                </div>


            </div>
        </div>
    );
    }
};
}

Navbar.defaultProps = {authMode: false}