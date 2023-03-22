import Dropdown from '../Dropdown/Dropdown';
import React, {useState} from "react";
import { NavLink } from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAngleUp, faAngleDown} from "@fortawesome/free-solid-svg-icons";
import './MenuItems.scss'

const MenuItems = ({ items, depthLevel }) => {
const [buttonActive, setButtonActive] = useState(false);
  return (
    <div className='headerList' style={items.backstyle}> 
      {items.submenu ? (
        <>
            <button 
                type="button" 
                aria-expanded={buttonActive ? "true" : "false"}
                style = {items.style}
                className={(buttonActive ? 'headerButton--active' : 'headerButton')}
                onClick={()=> setButtonActive(!buttonActive)}
            >
            {buttonActive ? <><FontAwesomeIcon icon={faAngleUp}/> {items.title}</>:
                            <><FontAwesomeIcon icon={faAngleDown}/> {items.title}</>}         
          </button>          
          {buttonActive && <Dropdown submenus={items.submenu} dropdown={buttonActive} depthLevel={depthLevel}/>}
        </>
      ) : (
        <NavLink to={items.url}
            style={items.style} 
            className={({isActive})=>(isActive ? "headerListItem--active" : "headerListItem")}>
            {items.title}
        </NavLink>
      )}
    </div>
  );
};

export default MenuItems;