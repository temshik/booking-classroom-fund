import React from 'react';
import './SubMenu.scss'
import SubSubMenu from "../SubSubMenu/SubSubMenu";
import {faAngleUp} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const SubMenu = ({list}) => {
    return (
        <ul className='sub-menu'>
            {list.map(list => {
                // return <div className='sub-menu_block'>
                return (<li key={list.url}>                    
                        <a className='sub-menu__link' href={list.url}><FontAwesomeIcon className='sub-menu__icon' icon={faAngleUp}/> {list.title}</a>
                        {list.submenu && <SubSubMenu list={list.submenu} />}
                    </li>)
                // </div>
            })}
        </ul>
    );
};

export default SubMenu;