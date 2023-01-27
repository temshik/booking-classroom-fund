import React from 'react';
import FilterListToggle from '../FilterListToggle/FilterListToggle';
import "./FilterPanel.scss"
import {categoryList, courseList} from '../../docs/fillterData'

const FilterPanel = ({value,changeInput, selectedCategory, selectedCourse, selectCategory, selectCourse}) => {
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
                <label>Course number
                <FilterListToggle options={courseList} value={selectedCourse} selectToggle={selectCourse}/>
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