import React from 'react';
import './FilterListToggle.scss'

const FilterListToggle = ({options, value, selectToggle}) => {
    
    return (
        <div
            value={value}
            onChange={selectToggle}
            classname='lsContainer'>     
                {options.map(({label, id, value})=>
                <button 
                    classname='lsButton'
                    key={id}
                    value={value}>
                    {label}
                </button>)}                          
        </div>
    );
};

export default FilterListToggle;