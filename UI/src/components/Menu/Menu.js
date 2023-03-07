import React from 'react';
import './Menu.scss'
import {listItems} from "../MenuItems/ListItems";
import SubMenu from "../SubMenu/SubMenu";
import {faAngleDown} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const Menu = () => {
    console.log('url ',window.location.pathname)
    return (
        <nav className={'menus'}>
            <ul className={'menu__list'}>
                {listItems.map(item => {
                    return <li key={item.url} className={item.url === window.location.pathname ? 'menu__item' : ''}>
                        {/*<FontAwesomeIcon className='menu__icon' icon={faAngleDown}/>*/}
                        <a className={'menu__link'} href={item.url}>{item.title}</a>
                        {item.submenu && <SubMenu list={item.submenu} />}
                    </li>
                })}
            </ul>
        </nav>
    );
};

export default Menu;