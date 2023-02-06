import React, { useState } from 'react';
import {useLocation} from 'react-router-dom';
import Header from '../../components/Header/Header';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import FilterPanel from '../../components/FilterPanel/FilterPanel';
import SearchItem from '../../components/SearchItem/SearchItem';
import notFound from '../../images/no-result-found-1.webp';
import { buildingOptions, colourOptions } from '../../docs/data.ts';
import "./Catalog.scss"

const Catalog = () => {
    const location = useLocation();    
    const [faculty, setFaculty]= useState(location.state !== null ? location.state.value : '');
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedCourse, setSelectedCourse] = useState(null);      
    const [selectedBuildings, setSelectedBuildings] = useState(buildingOptions);

    const handleSelectCategory=(event, value)=>!value? null:setSelectedCategory(value);

    const handleSelectCourse=(event, value)=>!value? null:setSelectedCourse(value);     
    
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
                        setSelectedBuildings={setSelectedBuildings}
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