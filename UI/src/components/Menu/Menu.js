import React from 'react';
import { NavLink } from "react-router-dom";
import './Menu.scss'
import {listItems} from "../MenuItems/ListItems";
import SubMenu from "../SubMenu/SubMenu";
import {faAngleUp,faAngleDown} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const Menu = () => {
    return (
        <div className={'menus'}>
            <ul className={'menu__list'}>
                {listItems.map(item => {
                    return <li key={item.url} className={item.url === window.location.pathname ? 'menu__item' : ''}>
                        {item.submenu ? (
                        <>
                            <button 
                                type="button" 
                                style = {item.style}                                
                            >
                            {<><FontAwesomeIcon icon={faAngleDown}/> {item.title}</>}         
                        </button>          
                        {item.submenu && <SubMenu list={item.submenu} />}
                        </>
                    ) : (
                        <NavLink to={item.url} style={item.style}>
                            {item.title}
                        </NavLink>
                    )}
                    </li>
                })}
            </ul>
        </div>
    );
};

export default Menu;