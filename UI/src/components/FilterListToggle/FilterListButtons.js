import React from 'react'
import './FilterListButtons.scss'

const FilterListButtons = ({item, selectedValues, selectToggle, select}) =>
{      
    const {id, name}=item;

    const changeSelected=(value)=>{
        console.log("value", value, 'selectedValues', selectedValues);
        selectToggle(value);                
    }

    return (                                      
        <button                     
            key={id}
            onClick={() => changeSelected(id)}                    
            className = { select ? 'btSelected' : 'btItem'}
            value={name}>
            {name}
        </button>                       
    );
    
};

export default FilterListButtons;