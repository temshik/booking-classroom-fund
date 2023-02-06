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
import {courseList, categoryList} from "../../docs/fillterData";

const Catalog = () => {
    const location = useLocation();    
    const [faculty, setFaculty]= useState(location.state !== null ? location.state.value : '');
    const [selectedCategory, setSelectedCategory] = useState(categoryList);
    const [selectedCourse, setSelectedCourse] = useState(courseList);
    const [selectedBuildings, setSelectedBuildings] = useState(buildingOptions);

    const handleSelectCategory=(value)=>{
        console.log('Catalog SC value ', value)
        console.log('Catalog SC ', selectedCategory)
        const newSelectedCategory = selectedCategory.map(category => {
            if(category.id === value) {
                return {...category, selected: !category.selected}
            } else return category
        })
        setSelectedCategory(newSelectedCategory)
        console.log('Catalog SC RETURN', selectedCourse)
    }

    const handleSelectCourse=(value)=>{
        console.log('Catalog SC value ', value)
        console.log('Catalog SC ', selectedCourse)
        const newSelectedCourse = selectedCourse.map(course => {
            if(course.value === value) {
                return {...course, selected: !course.selected}
            } else return course
        })
        setSelectedCourse(newSelectedCourse)
        console.log('Catalog SC RETURN', selectedCourse)
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
                        selectedCourse = {selectedCourse}
                        selectedBuildings={selectedBuildings}                        
                        selectCategory={handleSelectCategory}
                        selectCourse={handleSelectCourse}    
                        changeChecked={handleChangeChecked}                                                              
                    />
                    </div>
                    <div className='listResult'>
                    <SearchItem/>
                    <SearchItem/>       
                    <SearchItem/>              
                    </div>
                    {/* <img src={notFound} alt=''/> */}
                </div>
            </div>
            <Footer/>
        </div>
    );
};

export default Catalog;