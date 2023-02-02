import React from 'react'
import './FilterListToggle.scss'

const FilterListToggle = ({options, value, selectToggle}) => {  
    const makeStyle ={        
        fontsize: '18px',   
        borderRadius: '5px',
        padding: '10px',
        backgroundColor: 'white',
        border: 'none',
    };
    return ( 
        <div className='category'>
            <div
                className='categoryContainer'       
                value={value}
                onChange={selectToggle}>  
                {options.map(({label, id, value})=>
                    <button 
                        style={makeStyle}
                        key={id}
                        value={value}>
                        {label}
                    </button>)
                }       
            </div>   
        </div>     
    );
};

export default FilterListToggle;