import React from 'react'
import './FilterListToggle.scss'

const FilterListToggle = ({options, value, selectToggle}) => {  
    return (        
            <div className='categoryContainer'
            value={value}
            onChange={selectToggle}>   
                {options.map(({label, id, value})=>
                    <button 
                        classname='categoryBut'
                        style={{fontsize: '18px'}}
                        key={id}
                        value={value}>
                        {label}
                    </button>)
                }         
            </div>        
    );
};

export default FilterListToggle;