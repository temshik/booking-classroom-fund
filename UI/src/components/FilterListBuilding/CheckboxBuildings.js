import React from "react";

const CheckboxBuildings=({buildingOption, changeChecked})=>
{    
    const {id, value, checked}= buildingOption;    
    return (                         
        <div className='buildingOptions'>
            <div className='optionsItem'>           
                <li className="menu-items" key={id}>
                    <a href={`/Geolocation/:${value}`}>{value} </a>                                                                                                       
                    <input 
                        key={id}
                        type="checkbox"                                                                
                        checked={checked}
                        onClick={()=> changeChecked(id)}                              
                        />                                                                                                                                                                                                                             
                </li>                    
            </div>
        </div>                      
    );
    
}

export default CheckboxBuildings;