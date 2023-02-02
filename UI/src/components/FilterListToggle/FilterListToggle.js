import React, { useState } from 'react'
import './FilterListToggle.scss'

const FilterListToggle = ({options, value, selectToggle}) => {  
    const [select, setSelect] = useState(true);
    const [values, setValues] = useState([]);
    const item ={  
        fontsize: 18,   
        borderRadius: 5,
        padding: 10,
        backgroundColor: 'white',
        marginRight: 5,
        marginBottom: 5,
        border: 'none',    
    };
    const selected={
        fontsize: 18,   
        borderRadius: 5,
        padding: 10,
        backgroundColor: 'white',
        marginRight: 5,
        marginBottom: 5,
        border: '2px solid black',
    };

    function handleButton(button)
    {
        select ? setSelect(false) : setSelect(true);
        let tmp = values;
        if (values.includes(button)) {
            setValues(
                values.filter(el => el !== button)
            )
        } else {
            tmp.push(button);
            setValues(tmp);
        }
    }

    return ( 
        <div
            className='categoryContainer'       
            value={value}
            onChange={selectToggle}>  
            {options.map(bt =>
                <button                     
                    key={bt.id}
                    onClick={handleButton(bt.id)}
                    style={select? item : selected}
                    value={bt.value}>
                    {bt.label}
                </button>)
            }       
        </div>   
    );
};

export default FilterListToggle;