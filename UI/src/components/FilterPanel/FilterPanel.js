import React from 'react';
import FilterListToggle from '../FilterListToggle/FilterListToggle';
import FilterListButtons from '../FilterListToggle/FilterListButtons';
import FilterListBuilding from '../FilterListBuilding/FilterListBuilding';
import CheckboxBuildings from '../FilterListBuilding/CheckboxBuildings';
import {categoryList, courseList} from '../../docs/fillterData'
import "./FilterPanel.scss"

const FilterPanel = ({
    value, 
    changeInput, 
    selectedCategory, 
    selectedCourse, 
    selectedBuildings,    
    selectCategory, 
    selectCourse,
    changeChecked,
    faculty}) => {       
    return (         
        <div className='FilterPanel'>   
            {console.log("Filter course", selectedCourse)}
            {console.log("Filter category", selectedCategory)}
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
                {/* <FilterListToggle options={categoryList} value={selectedCategory} selectToggle={selectCategory}/> */}
                <div className='categoryContainer'>     
                    {selectedCategory.map((category)=> <FilterListButtons item={category} selectedValues={selectedCategory} selectToggle={selectCategory} select={category.selected}/>)}
                </div>
            </div>                        
            <div className='lsItem'>  
            <label>Room Capacity                    
                <input type="number" min={8} style={{textAlign: 'right'}} className="lsItemInput" placeholder='8'/>
                </label>
            </div>
            <div className='lsItem'>  
                <label>Course Number:
                <div className='categoryContainer'>
                    {selectedCourse.map((course)=> <FilterListButtons item={course} selectedValues={selectedCourse} selectToggle={selectCourse} select={course.selected}/>)}
                    {/* <FilterListButtons options={courseList} selectedValues={selectedCourse} selectToggle={selectCourse}/> */}
                </div>
                </label>
            </div>
            <div className='lsItem'>  
                <label>Buildings used by {faculty}:</label>
                {/* <FilterListBuilding faculty={faculty}/>    */}     
                {selectedBuildings.map((buildingOption) => 
                <CheckboxBuildings 
                    buildingOption = {buildingOption}
                    changeChecked={changeChecked}
                />)}                                             
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