import React from 'react';
import { NavLink } from "react-router-dom";
import Faculty  from '../Select/Faculty'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBuildingColumns, faBookOpen, faList, faEllipsisH} from "@fortawesome/free-solid-svg-icons";
import "./Header.scss"


export default class Header extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            homeMode: this.props.homeMode,      
        };
    }
       
render(){    
    return (        
        <div className='header'>                             
            <div className={this.state.homeMode ? "headerContainer homeMode" : "headerContainer"}>
                <div className='headerList'>
                    <NavLink to="/" end                                                 
                        activeClassName="headerListItem--active"
                        className="headerListItem">                        
                            <FontAwesomeIcon icon={faBuildingColumns} />
                            Home                
                    </NavLink>
                    <NavLink to='/Catalog' 
                        activeClassName="headerListItem--active"
                        className='headerListItem'>                                            
                        <FontAwesomeIcon icon={faList}/> 
                        Catalog                                      
                    </NavLink> 
                    <NavLink to='/Booking'  
                        activeClassName="headerListItem--active"
                        className='headerListItem'>
                        <FontAwesomeIcon icon={faBookOpen} />
                        Booking
                    </NavLink> 
                    <NavLink to='/About'
                        activeClassName="headerListItem--active"
                        className='headerListItem'>
                        <FontAwesomeIcon icon={faEllipsisH} />
                        About
                    </NavLink> 
                </div>
                {this.state.homeMode && 
                    <div>
                        <h1 className='headerTitle'>Belarusian National Technical University</h1>
                        <p className='headerDesc'>
                            We are the Leader of technical education in Belarus. Since 1920, we have been providing modern education and training highly qualified specialists
                        </p>
                        <Faculty/>           
                    </div>
                }
            </div>
        </div>
    );
};
}

Header.defaultProps = {homeMode: false};
