import React from 'react';
import FilterListToggle from '../FilterListToggle/FilterListToggle';
import FilterListButtons from '../FilterListToggle/FilterListButtons';
import FilterListBuilding from '../FilterListBuilding/FilterListBuilding';
import CheckboxBuildings from '../FilterListBuilding/CheckboxBuildings';
import "./FilterPanel.scss"

const FilterPanel = ({
    value, 
    changeInput, 
    selectedCategory, 
    selectedRoomCapacity,
    selectRoomCapacity,
    selectedCourse, 
    selectedBuildings, 
    locked,
    equipment,
    setLocked,
    setEquipment,   
    selectCategory, 
    selectCourse,
    changeChecked,    
    faculty}) => {       
    return (         
        <div className='FilterPanel'>   
            {console.log("Filter course", selectedCourse)}
            {console.log("Filter category", selectedCategory)}
            <h1 className='lsTitle'>Filter by:</h1>                                 
            <input 
                type="text" 
                placeholder="Search..." 
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
                    <input type="number" min={8} max={9999} style={{textAlign: 'right'}} className="lsItemInput" value={selectedRoomCapacity} onChange={selectRoomCapacity}/>
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
            <div className='lsItem'>  
                <label>Special Workspace Equipment (for IT suites)
                <input 
                    type="checkbox"
                    checked={equipment}
                    onClick={()=> setEquipment(!equipment)} 
                />
                </label>
            </div>                               
            <div className='lsItem'>  
                <label>Locked
                <input 
                    type="checkbox" 
                    checked={locked}
                    onClick={()=> setLocked(!locked)}
                />
                </label>
            </div>                                                                    
        </div>
    );
};

export default FilterPanel;