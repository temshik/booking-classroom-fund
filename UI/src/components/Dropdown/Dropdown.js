import MenuItems from '../MenuItems/MenuItems';
import './Dropdown.scss';

const Dropdown = ({ submenus, dropdown, depthLevel }) => {
    depthLevel = depthLevel + 1;
    const dropdownClass = depthLevel > 1 && dropdown ? "" : "dropdowm-active";
    //const dropdownClass = depthLevel > 1 ? "dropdown-submenu" : "";
    return (
      <ul className={dropdownClass}>
      {/* <ul className={`dropdown ${dropdownClass} ${dropdown ? "show" : ""}`}> */}
        {submenus.map((submenu, index) => (
            <MenuItems items={submenu} key={index} depthLevel={depthLevel} />
        ))}
      </ul>
    );
  };
  
  export default Dropdown;