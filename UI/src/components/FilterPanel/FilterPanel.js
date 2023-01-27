import React from 'react';
import "./FilterPanel.scss"

const FilterPanel = ({value,changeInput}) => {
    return (         
        <div className='FilterPanel'>   
            <h1 className='lsTitle'>Options:</h1>                     
            <input 
                type="text" 
                placeholder=" Search..." 
                className="search" 
                value={value} 
                onChange={changeInput}
            />
            <div className='lsItem'>                            
                <label>Room Category</label>
            </div>                        
            <div className='lsItem'>  
            <label>Room Capacity                    
                <input type="number" min={8} style={{textAlign: 'right'}} className="lsItemInput" placeholder='8'/>
                </label>
            </div>
            <div className='lsItem'>  
                <label>Course number
                <input type="number" min={1} max={5} style={{textAlign: 'right'}} className="lsItemInput" placeholder='1'/>
                </label>
            </div>
            <div className='lsItem'>  
                <label>Building</label>
            </div> 
            <div className="checkbox-wrapper">
            <label>
                <input type="checkbox" />
                <span>{1}</span>
            </label>
            </div>  
            <h1 className='lsTitle' style={{marginTop: '15px'}}>Filter by:</h1> 
            <div className='lsItem'>  
                <label>Workstation (for IT suites)</label>
            </div>
            <div className='lsItem'>  
                <label>Locked
                <input type="checkbox" />
                </label>
            </div> 
            <div className='lsItem'>  
                <label>Layout</label>
            </div>
            <div className='lsItem'>  
                <label>Equipment</label>
            </div>                                                                    
        </div>
    );
};

export default FilterPanel;