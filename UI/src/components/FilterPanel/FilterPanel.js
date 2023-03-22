import React, { useState } from 'react';
import FilterListButtons from '../FilterListToggle/FilterListButtons';
import CheckboxBuildings from '../FilterListBuilding/CheckboxBuildings';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlusSquare, faMinusSquare} from "@fortawesome/free-solid-svg-icons";
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
        
    const [openBuildingOptions, setOpenBuildingOptions] = useState(faculty ? true: false);

    return (         
        <div className='FilterPanel'>   
            <h1 className='lsTitle'>Filter by:</h1>                                 
            <input 
                type="text" 
                placeholder="Search in description ..." 
                className="search" 
                value={value} 
                onChange={changeInput}
            />
            <div className='lsItem'>                            
                <label>Room Category</label>
                {/* <FilterListToggle options={categoryList} value={selectedCategory} selectToggle={selectCategory}/> */}
                <div className='categoryContainer'>     
                    {selectedCategory && selectedCategory.map((category) => 
                        <FilterListButtons key={category.id} item={category} selectedValues={selectedCategory} selectToggle={selectCategory} select={category.selected}/>                                               
                   )}
                </div>
            </div>                                    
            <div className='lsItem'>  
                <label>Room Capacity                    
                    <input type="number" min={1} max={9999} style={{textAlign: 'right'}} className="lsItemInput" value={selectedRoomCapacity} onChange={selectRoomCapacity}/>
                </label>
            </div>
            <div className='lsItem'>  
                <label>Course Number:
                <div className='categoryContainer'>
                    {selectedCourse.map((course)=> 
                        <FilterListButtons key={course.id} item={course} selectedValues={selectedCourse} selectToggle={selectCourse} select={course.selected}/>                        
                    )}                    
                    {/* <FilterListButtons options={courseList} selectedValues={selectedCourse} selectToggle={selectCourse}/> */}
                </div>
                </label>
            </div>
            <div className='lsItem'>  
                <span className='drop' onClick={()=>setOpenBuildingOptions(!openBuildingOptions)}>Buildings used by {faculty}: <FontAwesomeIcon icon={openBuildingOptions? faMinusSquare : faPlusSquare}/></span>
                {/* <FilterListBuilding faculty={faculty}/>    */}     
                {openBuildingOptions && selectedBuildings.map((buildingOption) => 
                <CheckboxBuildings 
                    key = {buildingOption.id}
                    buildingOption = {buildingOption}
                    changeChecked={changeChecked}
                />)}                                             
            </div>      
            <div className='lsItem'>  
                <label>Special Workspace Equipment (for IT suites)
                <input 
                    type="checkbox"
                    defaultChecked={equipment}
                    onChange={()=> setEquipment(!equipment)} 
                />
                </label>
            </div>                               
            <div className='lsItem'>  
                <label>Locked
                <input 
                    type="checkbox" 
                    defaultChecked={locked}
                    onChange={()=> setLocked(!locked)}
                />
                </label>
            </div>                                                                    
        </div>
    );
};

export default FilterPanel;