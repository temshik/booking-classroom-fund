import React from 'react'
import './FilterListButtons.scss'

const FilterListButtons = ({item, selectedValues, selectToggle, select}) =>
{      
    const {id, value, label}=item;

    const changeSelected=(value)=>{
        selectToggle(value);        
        console.log("value", value, 'selectedValues', selectedValues, 'selectToggle ', selectToggle);
    }

    return (                                      
        <button                     
            key={id}
            onClick={() => changeSelected(id)}                    
            className = { select ? 'btSelected' : 'btItem'}
            value={value}>
            {label}
        </button>                            
    );
    
};

export default FilterListButtons;