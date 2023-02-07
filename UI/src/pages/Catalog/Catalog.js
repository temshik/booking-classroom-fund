import React, { useState, useEffect } from 'react';
import {useLocation} from 'react-router-dom';
import Header from '../../components/Header/Header';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import FilterPanel from '../../components/FilterPanel/FilterPanel';
import SearchItem from '../../components/SearchItem/SearchItem';
import notFound from '../../images/no-result-found-1.webp';
import { buildingOptions, colourOptions } from '../../docs/data.ts';
import "./Catalog.scss"
import {courseList, categoryList, dataList} from "../../docs/fillterData";

const Catalog = () => {
    const location = useLocation();    
    const [faculty, setFaculty]= useState(location.state !== null ? location.state.value : '');
    const [selectedCategory, setSelectedCategory] = useState(categoryList);
    const [selectedCourse, setSelectedCourse] = useState(courseList);
    const [selectedBuildings, setSelectedBuildings] = useState(buildingOptions);
    const [roomCapacity, setRoomCapacity] = useState(8);
    const [list, setList] = useState(dataList);

    const handleSelectCategory=(value)=>{
        console.log('Catalog SCategory value ', value)
        console.log('Catalog SCategory ', selectedCategory)
        const newSelectedCategory = selectedCategory.map(category => {
            if(category.id === value) {
                return {...category, selected: !category.selected}
            } else return category
        })
        setSelectedCategory(newSelectedCategory)
        console.log('Catalog SCategory RETURN', selectedCourse)
    }

    const handleRoomCapacity=(event)=>{
        console.log('handleRoomCapacity',event.target.value);
        setRoomCapacity(event.target.value);
    }

    const handleSelectCourse=(value)=>{
        console.log('Catalog SCourse value ', value)
        console.log('Catalog SCourse ', selectedCourse)
        const newSelectedCourse = selectedCourse.map(course => {
            if(course.id === value) {
                return {...course, selected: !course.selected}
            } else return course
        })
        setSelectedCourse(newSelectedCourse)
        console.log('Catalog SCourse RETURN', selectedCourse)
    }

    const handleChangeChecked=(id)=>{
        console.log(id);
        const selectedBuildingsList = selectedBuildings;
        const changeSelectedBuildings = selectedBuildingsList.map((item) =>
            item.id === id ? { ...item, checked: !item.checked} : item
        );

        setSelectedBuildings(changeSelectedBuildings);        
    }        

    useEffect(()=>{
        if(faculty !== '')
        {
           colourOptions.forEach(({label, usedBuildings, value}) => {
                if(value === faculty) {
                    const newSelectedBuildings = selectedBuildings.map((select) => {
                        if(usedBuildings.includes(select.value)) return {...select, checked: true}
                        return select
                    })
                    setSelectedBuildings(newSelectedBuildings)
                }
           })

        }
    }, [])

    useEffect(()=>{
        applyFilters();
    },[selectedBuildings, selectedCourse, selectedCategory, roomCapacity])

    const applyFilters=()=>{
        let updatedList = dataList;

        //SelectedCategoty
        const newSelectedCategory = selectedCategory
            .filter((item)=> item.selected)
            .map((item)=>item.id);
        if(newSelectedCategory.length){
            updatedList = updatedList.filter((item) => newSelectedCategory.includes(item.categoryId));
        }

        //RoomCapacity
        const newselectedRoomCapacity = roomCapacity
            if(8<newselectedRoomCapacity<9999)
            {
                updatedList = updatedList.filter((item) => newselectedRoomCapacity <= (item.numberOfSeats));
            }

        //SelectedBuildings
        const selectedChecked = selectedBuildings
            .filter((item) => item.checked)
            .map((item)=>item.value);
        if(selectedChecked.length){
            updatedList = updatedList.filter((item) => selectedChecked.includes(item.campusNumber.toString()));
        }

        //SelectedCourse
        const newSelectedCourse = selectedCourse
            .filter((item) => item.selected)
            .map((item)=>item.name);
        if(newSelectedCourse.length){
            updatedList = updatedList.filter((item)=> newSelectedCourse.includes(item.courseNumber));
        }

        // selectedCourse.map((selectedTrue)=>{            
        //     if(selectedTrue.selected === true){
        //         console.log('selectedTrue',selectedTrue);
        //         updatedList = updatedList.filter((item)=> parseInt(item.courseNumber) === parseInt(selectedTrue.name));
        //         console.log('updatedList 2',updatedList);
        //     }
        // })
        setList(updatedList);        
    }   

    return (        
        <div>              
            <Navbar/>
            <Header/>
            <div className='listContainer'>
                <div className='listWrapper'>                    
                    <div className='listSearch'>   
                        <FilterPanel         
                        faculty={faculty}                
                        selectedCategory={selectedCategory}
                        selectedRoomCapacity={roomCapacity}
                        selectedCourse = {selectedCourse}
                        selectedBuildings={selectedBuildings}                        
                        selectCategory={handleSelectCategory}
                        selectRoomCapacity={handleRoomCapacity}
                        selectCourse={handleSelectCourse}    
                        changeChecked={handleChangeChecked}                                                              
                    />
                    </div>
                    <div className='listResult'>
                        {list.map(item=><SearchItem 
                            key={item.id} 
                            item={item}  
                            categories={categoryList}                           
                            />)}                                              
                    </div>
                    {/* <img src={notFound} alt=''/> */}
                </div>
            </div>
            <Footer/>
        </div>
    );
};

export default Catalog;