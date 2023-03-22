import React, { useState, useEffect } from 'react';
import {useLocation} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsCategoryLoading, selectIsWorkspaceLoading, getCategory, selectCat, updatedCat, getWorkspacePaged, selectWorkspacePaged, selectTotalPages, updateCategory} from '../../redux/slice/catalogSlice';
import {GetUserRoleByEmail, selectRole, selectEmail} from '../../redux/slice/authSlice';
import Header from '../../components/Header/Header';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import FilterPanel from '../../components/FilterPanel/FilterPanel';
import SearchItem from '../../components/SearchItem/SearchItem';
import notFound from '../../images/NoResults.gif';
import ReactPaginate from 'react-paginate';
import { buildingOptions, colourOptions } from '../../docs/data.ts';
import {courseList} from "../../docs/fillterData";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowLeft, faArrowRight} from "@fortawesome/free-solid-svg-icons";
import Loader from '../../components/Loader/Loader';
import "./Catalog.scss"

const Catalog = () => {
    const [form, setForm] = useState( 
    {
        "campusNumber": 0,
        "workspaceNumber": 0,
        "categoryId": 0,
        "description": "string",
        "numberOfSeats": 0,
        "courseNumber": 0,
        "specialEquipment": true,
        "isAvailable": true
    });
    const location = useLocation();
    const dispatch = useDispatch();
    const stateEmail = useSelector(selectEmail);
    const role = useSelector(selectRole);
    const [userRole, setUserRole] = useState('Teacher');
    const email = (stateEmail !== null)? stateEmail : window.sessionStorage.getItem('email');
    const cat = useSelector(selectCat);
    const updateCat = useSelector(updatedCat);
    const workspacies = useSelector(selectWorkspacePaged);
    const pageCount = useSelector(selectTotalPages);
    const isCategoryLoading = useSelector(selectIsCategoryLoading);
    const isWorkspaceLoading = useSelector(selectIsWorkspaceLoading);
    const [loading, setLoading] = useState(false);
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
    
    const setField = (field, value) => {
        setForm({
          ...form,
          [field]: value
        })
    }

    const handlePageClick=(data)=>{        
        setCurrentPage(data.selected+1)
    }

    const handleSelectCategory=(value)=>{
        const newCategory = selectedCategory.map(category => {
            const {id, selected} = category;            
            if(id === value) {                             
                return{...category, selected: !category.selected};                                                          
            } else return category            
        })                      
        if (newCategory !== null)
        updateCategories(newCategory[value-1]);            
    }

    const handleRoomCapacity=(event)=>{
        setRoomCapacity(event.target.value);
    }

    const handleSelectCourse=(value)=>{
        const newSelectedCourse = selectedCourse.map(course => {
            if(course.id === value) {
                return {...course, selected: !course.selected}
            } else return course
        })
        setSelectedCourse(newSelectedCourse)
    }

    const handleChangeChecked=(id)=>{
        const selectedBuildingsList = selectedBuildings;
        const changeSelectedBuildings = selectedBuildingsList.map((item) =>
            item.id === id ? { ...item, checked: !item.checked} : item
        );

        setSelectedBuildings(changeSelectedBuildings);        
    }        

    const getWorkspacies = async () => {    
        if(window.localStorage.getItem('accessToken') !== null){                                                
            dispatch(getWorkspacePaged({PageSize,CurrentPage,SortOn,SortDirection, form}));
        }
    }

    const getCategories = () => {
        if(window.localStorage.getItem('accessToken') !== null){      
            dispatch(getCategory());       
        }
    }

    const getRole = () => {
        if(window.localStorage.getItem('accessToken') !== null){  
            dispatch(GetUserRoleByEmail(email))            
        }
    }

    const updateCategories = (item) => {
        if(window.localStorage.getItem('accessToken') !== null){
            dispatch(updateCategory(item));
        }
    }

    useEffect(() =>{    
        getRole();        
        getWorkspacies();
        getCategories();        
    }, [CurrentPage, SortDirection])

    useEffect(()=>{
        if(isCategoryLoading === false || isWorkspaceLoading === false)
            setTimeout(() => {setLoading(false)}, 500);
        else setLoading(true);
    },[isCategoryLoading,isWorkspaceLoading])

    useEffect(()=>{
        if(role !== null)
        setUserRole(role)
    },[role])

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
            //setField('description', inputSearch.toLocaleLowerCase());
        }

        //SelectedCategoty        
        const newSelectedCategory = selectedCategory
            .filter((item)=> item.selected)
            .map((item)=>item.id);        
        if(newSelectedCategory.length){
            updatedList = updatedList.filter((item) => newSelectedCategory.includes(item.categoryId));
            //setField('categoryId', item.categoryId)
        }
        

        //RoomCapacity
        const newselectedRoomCapacity = roomCapacity
        if(8<newselectedRoomCapacity<9999)
        {
            updatedList = updatedList.filter((item) => newselectedRoomCapacity <= (item.numberOfSeats));
            //setField('numberOfSeats', newselectedRoomCapacity)
        }

        //SelectedBuildings
        const selectedChecked = selectedBuildings
            .filter((item) => item.checked)
            .map((item)=>item.value);
        if(selectedChecked.length){
            updatedList = updatedList.filter((item) => selectedChecked.includes(item.campusNumber.toString()));
            //setField('campusNumber', item.campusNumber)
        }

        //SelectedCourse
        const newSelectedCourse = selectedCourse
            .filter((item) => item.selected)
            .map((item)=>item.name);
        if(newSelectedCourse.length){
            updatedList = updatedList.filter((item)=> newSelectedCourse.includes(item.courseNumber));
            //setField('courseNumber', item.courseNumber)
        }

        //Locked
        if(locked){
            updatedList = updatedList.filter((item)=> locked === (!item.isAvailable));
            //setField('isAvailable', locked)
        }      
        
        //SpecialEquipment
        if(equipment)
        {                                
            updatedList = updatedList.filter((item) => equipment === (item.specialEquipment))       
            //setField('specialEquipment', equipment)         
        }

        if(updatedList !== list){
            setList(updatedList);                   
            !updatedList.length ? setResultFound(false) : setResultFound(true);   
        }     
    }   

    return (        
        <div>    
            {loading && <Loader/>}                                
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
                            userRole={userRole}
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