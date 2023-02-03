import React from 'react';
import FilterListToggle from '../FilterListToggle/FilterListToggle';
import "./FilterPanel.scss"
import {categoryList, courseList} from '../../docs/fillterData'
import FilterListBuilding from '../FilterListBuilding/FilterListBuilding';

const FilterPanel = ({value,changeInput, selectedCategory, selectedCourse, selectCategory, selectCourse, faculty}) => {
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
                <FilterListToggle options={categoryList} value={selectedCategory} selectToggle={selectCategory}/>
            </div>                        
            <div className='lsItem'>  
            <label>Room Capacity                    
                <input type="number" min={8} style={{textAlign: 'right'}} className="lsItemInput" placeholder='8'/>
                </label>
            </div>
            <div className='lsItem'>  
                <label>Course Number:
                    <FilterListToggle options={courseList} value={selectedCourse} selectToggle={selectCourse}/>
                </label>
            </div>
            <div className='lsItem'>  
                <label>Buildings used by {faculty}:</label>
                <FilterListBuilding faculty={faculty}/>
            </div>             
            <h1 className='lsTitle' style={{marginTop: '15px'}}>Filter by:</h1> 
            <div className='lsItem'>  
                <label>Equipment (for IT suites)
                <input type="checkbox" />
                </label>
            </div>
            <div className='lsItem'>  
                <label>Locked
                <input type="checkbox" />
                </label>
            </div>                                                                    
        </div>
    );
};

export default FilterPanel;