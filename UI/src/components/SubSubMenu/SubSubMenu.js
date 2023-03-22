import React from 'react';
import './SubSubMenu.scss'

const SubSubMenu = ({list}) => {
    return (
        <ul className='sub-sub-menu'>
            {list.map(list => {
                return <li key={list.url}>
                    <a className='sub-sub-menu__link' href={list.url}>{list.title}</a>
                </li>
            })}
        </ul>
    );
};

export default SubSubMenu;