import React from 'react';
import './SubMenu.scss'
import SubSubMenu from "../SubSubMenu/SubSubMenu";
import Menu from "../Menu/Menu";
import {faAngleUp} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const SubMenu = ({list}) => {
    return (
        <ul className='sub-menu'>
            {list.map(list => {
                // return <div className='sub-menu_block'>
                return (<li key={list.url}>                    
                        <span className='sub-menu__link'><FontAwesomeIcon className='sub-menu__icon' icon={faAngleUp}/> {list.title}</span>
                        {list.submenu && <SubSubMenu list={list.submenu} />}
                    </li>)
                // </div>
            })}
        </ul>
    );
};

export default SubMenu;