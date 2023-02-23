import React, { useState, useEffect } from 'react';
import {useLocation} from 'react-router-dom';
import { useSelector } from 'react-redux';
import {selectIsLoggedIn, selectAccessToken} from '../../redux/slice/authSlice'
import Header from '../../components/Header/Header';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import FilterPanel from '../../components/FilterPanel/FilterPanel';
import SearchItem from '../../components/SearchItem/SearchItem';
import notFound from '../../images/NoResults.gif';
import CatalogServices from '../../services/CatalogServices';
import ReactPaginate from 'react-paginate';
import { buildingOptions, colourOptions } from '../../docs/data.ts';
import {courseList, categoryList, dataList} from "../../docs/fillterData";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowLeft, faArrowRight} from "@fortawesome/free-solid-svg-icons";
import "./Catalog.scss"

const catalogService = new CatalogServices();

const Catalog = () => {
    const location = useLocation();    
    const [faculty, setFaculty] = useState(location.state !== null ? location.state.value : '');   
    const [pageCount, setPageCount] = useState(15);//   
    const [PageSize, setPageSize] = useState(1);
    const [CurrentPage, setCurrentPage] = useState(1);
    const [SortOn, setSortOn] = useState("Id");
    const [SortDirection, setSortDirection] = useState("ASC");
    const [inputSearch, setInputSearch] = useState('');
    const [selectedCategory, setSelectedCategory] = useState([]);//
    const [selectedCourse, setSelectedCourse] = useState(courseList);
    const [selectedBuildings, setSelectedBuildings] = useState(buildingOptions);
    const [locked, setLocked] = useState(false);
    const [equipment, setEquipment] = useState(false);
    const [roomCapacity, setRoomCapacity] = useState(8);
    const [list, setList] = useState([]);//
    const [workspacies, setWorkspacies] = useState([]);
    const [resultFound, setResultFound] = useState(true);


    const handlePageClick=(data)=>{
        console.log(data.selected+1);
        setCurrentPage(data.selected+1)
        getWorkspacies();
        getCategories();
    }

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

    useEffect(() =>{
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
        getWorkspacies();
        getCategories();        
    }, [CurrentPage])

    const getWorkspacies = async () => {    
        if(window.localStorage.getItem('accessToken') !== null)                                                  
        await catalogService.GetWorkspaciesPaged(PageSize,CurrentPage,SortOn,SortDirection).then(({data})=>{      
            console.log('data.workspaceDTOs',data.workspaceDTOs);     
            console.log('data',data.workspaceDTOs);   
            setWorkspacies(data.workspaceDTOs)        
            setList(workspacies);
            setPageCount(data.totalPages);                    
        }).catch((error)=>{
        if (error.response.data.message === "TokenExpiredError") {
            console.log('logout');
        }
        else
            console.log(error);
        });        
    }

    const getCategories = async () => {
        if(window.localStorage.getItem('accessToken') !== null)
        await catalogService.GetCategories().then(({data})=>{               
            console.log("Categories",data);
            setSelectedCategory(data);

        }).catch((error)=>{
            if (error.response.data.message === "TokenExpiredError") {
                console.log('logout');
            }
            else
            console.log(error);
        });           
    }

    useEffect(()=>{
        if (list !== null)
        applyFilters();  
        console.log('[eq',list)      
    },[selectedBuildings, selectedCourse, selectedCategory, roomCapacity, locked, equipment, inputSearch])

    const applyFilters=()=>{          
        //getWorkspacies();
        let updatedList = workspacies;

        //InputSearch
        if(inputSearch){
            updatedList=updatedList.filter((item)=>
                item.description.toLowerCase().search(inputSearch.toLocaleLowerCase().trim())!==-1);
        }

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
            console.log('selectedChecked',selectedChecked)
            updatedList = updatedList.filter((item) => selectedChecked.includes(item.campusNumber.toString()));
        }

        //SelectedCourse
        const newSelectedCourse = selectedCourse
            .filter((item) => item.selected)
            .map((item)=>item.name);
        if(newSelectedCourse.length){
            updatedList = updatedList.filter((item)=> newSelectedCourse.includes(item.courseNumber));
        }

        //Locked
        if(locked){
            updatedList = updatedList.filter((item)=> locked === (!item.isAvailable));
        }      
        
        //SpecialEquipment
        if(equipment)
        {                                
            updatedList = updatedList.filter((item) => equipment === (item.specialEquipment))                
        }

        if(updatedList !== list){
            setList(updatedList);                   
            !updatedList.length ? setResultFound(false) : setResultFound(true);   
        }     
    }   

    return (        
        <div>              
            <Navbar/>
            <Header/>
            <div className='listContainer'>
                <div className='listWrapper'>                    
                    <div className='listSearch'>   
                        <FilterPanel   
                        value={inputSearch}
                        changeInput={e=>setInputSearch(e.target.value)}      
                        faculty={faculty}                
                        selectedCategory={selectedCategory}
                        selectedRoomCapacity={roomCapacity}
                        selectedCourse = {selectedCourse}
                        selectedBuildings={selectedBuildings}   
                        locked = {locked}
                        equipment = {equipment}
                        setLocked = {setLocked}
                        setEquipment = {setEquipment}                     
                        selectCategory={handleSelectCategory}
                        selectRoomCapacity={handleRoomCapacity}
                        selectCourse={handleSelectCourse}    
                        changeChecked={handleChangeChecked}                                                              
                    />
                    </div>
                    {resultFound ? <div className='listResult'>
                        {list.map(item=><SearchItem 
                            key={item.id} 
                            item={item}
                            list={list}  
                            categories={categoryList}/>
                            )}                                              
                    </div> : <div className='listResult'> <img src={notFound} alt=''/> </div>}
                </div>
            </div>
            <ReactPaginate
                previousLabel={<FontAwesomeIcon icon={faArrowLeft}/>}
                nextLabel={<FontAwesomeIcon icon={faArrowRight}/>}
                breakLabel={'...'}
                pageCount={pageCount}
                marginPagesDisplayed={1}
                pageRangeDisplayed={5}
                onPageChange={handlePageClick}
                renderOnZeroPageCount={null}
                containerClassName={'pagination justify-content-center'}
                pageClassName={'page-item'}
                pageLinkClassName={'page-link'}
                previousClassName={'page-item'}
                previousLinkClassName={'page-link'}
                nextClassName={'page-item'}
                nextLinkClassName={'page-link'}
                brakClassName={'page-item'}
                breakLinkClassName={'page-link'}
                activeClassName={'active'}                                
            />
            <Footer/>
        </div>
    );
};

export default Catalog;