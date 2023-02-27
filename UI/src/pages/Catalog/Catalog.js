import React, { useState, useEffect } from 'react';
import {useLocation} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getCategory, selectCat, updatedCat, getWorkspacePaged, selectWorkspacePaged, selectTotalPages, updateCategory} from '../../redux/slice/catalogSlice';
import Header from '../../components/Header/Header';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import FilterPanel from '../../components/FilterPanel/FilterPanel';
import SearchItem from '../../components/SearchItem/SearchItem';
import notFound from '../../images/NoResults.gif';
import ReactPaginate from 'react-paginate';
import { buildingOptions, colourOptions } from '../../docs/data.ts';
import {courseList, categoryList, dataList} from "../../docs/fillterData";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowLeft, faArrowRight} from "@fortawesome/free-solid-svg-icons";
import "./Catalog.scss"

const Catalog = () => {
    const location = useLocation();    
    const dispatch = useDispatch();
    const cat = useSelector(selectCat);
    const updateCat = useSelector(updatedCat);
    const workspacies = useSelector(selectWorkspacePaged);
    const pageCount = useSelector(selectTotalPages);
    const [faculty, setFaculty] = useState(location.state !== null ? location.state.value : '');   
    const [PageSize, setPageSize] = useState(2);
    const [CurrentPage, setCurrentPage] = useState(1);
    const [SortOn, setSortOn] = useState("categoryId");
    const [SortDirection, setSortDirection] = useState("ASC");
    const [inputSearch, setInputSearch] = useState('');
    const [selectedCategory, setSelectedCategory] = useState([]);//
    const [selectedCourse, setSelectedCourse] = useState(courseList);
    const [selectedBuildings, setSelectedBuildings] = useState(buildingOptions);
    const [locked, setLocked] = useState(false);
    const [equipment, setEquipment] = useState(false);
    const [roomCapacity, setRoomCapacity] = useState(8);
    const [list, setList] = useState([]);//
    const [resultFound, setResultFound] = useState(true);


    const handlePageClick=(data)=>{
        console.log(data.selected+1);
        setCurrentPage(data.selected+1)
    }

    const handleSelectCategory=(value)=>{
        console.log('Catalog SCategory value ', value)
        console.log('Catalog SCategory ', selectedCategory)
        const newCategory = selectedCategory.map(category => {
            const {id, selected} = category;            
            if(id === value) {
                console.log('aa',id);                              
                return{...category, selected: !category.selected};                                                          
            } else return category            
        })                      
        if (newCategory !== null)
        updateCategories(newCategory[value-1]);            
        //getCategories();
        //setSelectedCategory(newCategory);
        console.log('Catalog SCategory RETURN', selectedCategory)
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

    const getWorkspacies = async () => {    
        if(window.localStorage.getItem('accessToken') !== null){                                            
        // await catalogService.GetWorkspaciesPaged(PageSize,CurrentPage,SortOn,SortDirection).then(({data})=>{      
        //     console.log('data.workspaceDTOs',data.workspaceDTOs);     
        //     console.log('data',data.workspaceDTOs);   
        //     setWorkspacies(data.workspaceDTOs)        
        //     setList(workspacies);
        //     setPageCount(data.totalPages);                    
        // }).catch((error)=>{
        // if (error.response.data.message === "TokenExpiredError") {
        //     console.log('logout');
        // }
        // else
        //     console.log(error);
        // });        
        dispatch(getWorkspacePaged({PageSize,CurrentPage,SortOn,SortDirection}));
        console.log('disp', workspacies)
        }
    }

    const getCategories = () => {
        if(window.localStorage.getItem('accessToken') !== null){
        // await catalogService.GetCategories().then(({data})=>{               
        //     console.log("Categories",data);
        //     setSelectedCategory(data);

        // }).catch((error)=>{
        //     if (error.response.data.message === "TokenExpiredError") {
        //         console.log('logout');
        //     }
        //     else
        //     console.log(error);
        // });         
        dispatch(getCategory());  
        console.log('cat0', cat)        
        }
    }

    const updateCategories = (item) => {
        if(window.localStorage.getItem('accessToken') !== null){
        // await catalogService.UpdateCategory(item).then(({data})=>{               
        //     console.log("Categories",data);
        //     //setSelectedCategory(data);

        // }).catch((error)=>{
        //     if (error.response.data.message === "TokenExpiredError") {
        //         console.log('logout');
        //     }
        //     else
        //     console.log(error);
        // });
        dispatch(updateCategory(item));
        console.log('cat1',cat);
        }
    }

    useEffect(() =>{             
        getWorkspacies();
        getCategories();        
    }, [CurrentPage, SortDirection])

    useEffect(()=>{
        if(cat !== null)                  
            setSelectedCategory(cat.data)                       
    },[cat])
    
    useEffect(()=>{
        getCategories();
    },[updateCat])

    useEffect(()=>{
        if (workspacies !== null)
            setList(workspacies)
    },[workspacies])

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
        getWorkspacies();
        getCategories();
    },[])

    useEffect(()=>{
        if (list !== undefined &&
            selectedCategory !== undefined &&
            workspacies !== undefined)
        applyFilters();  
         
    },[selectedBuildings, selectedCourse, selectedCategory, roomCapacity, locked, equipment, inputSearch])

    const applyFilters=()=>{                  
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
            {console.log('cat', cat)}                    
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
                        {list && list.map(item=><SearchItem 
                            key={item.id} 
                            item={item}
                            list={list}  
                            categories={selectedCategory}/>
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