import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {useNavigate} from 'react-router-dom';
import Header from '../../components/Header/Header';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import Loader from '../../components/Loader/Loader';
import image1 from '../../images/noimage.png'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faLocationDot, faUsers, faChalkboardUser, faLock, faLockOpen} from "@fortawesome/free-solid-svg-icons";
import { selectIsCategoryLoading, selectIsWorkspaceLoading, getCategory, selectCat, getWorkspace, selectWorkspace, updateCategory} from '../../redux/slice/catalogSlice';
import {courseList, categoryList, dataList} from "../../docs/fillterData";

import "./Workspace.scss"

const Worksapce = () => {
    const {id} = useParams()
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const cat = useSelector(selectCat);
    const workspace = useSelector(selectWorkspace)
    const [item, setItem] = useState(null);
    const [category, setCategory] = useState([]);
    const isCategoryLoading = useSelector(selectIsCategoryLoading);
    const isWorkspaceLoading = useSelector(selectIsWorkspaceLoading);
    const [loading, setLoading] = useState(false);
    useEffect(()=>{        
        if(window.localStorage.getItem('accessToken') !== null){    
            dispatch(getCategory());  
            console.log('cat0', cat) 
            dispatch(getWorkspace({id})) 
            console.log('disp', workspace)
        }
    },[id])

    useEffect(()=>{
        if(cat !== null)                  
            setCategory(cat.data)                       
    },[cat])

    useEffect(()=>{
        if (workspace !== null)
            console.log('workspace1',workspace)
            setItem(workspace.data)
    },[workspace])
    
    useEffect(()=>{
        if(isCategoryLoading === false || isWorkspaceLoading === false)
            setTimeout(() => {setLoading(false)}, 500);
        else setLoading(true);
    },[isCategoryLoading,isWorkspaceLoading])

    const showMessage =()=>{  
        if(window.confirm('You will be redirected to update workspace page.'))
        navigate('/UpdateWorkspace', {state: {value:item}});
    }
  
    const handleEditChange = () => {      
      setTimeout(showMessage, 500);
    }

    const handleDeleteChange = () => {        
        //setTimeout(showMessage, 1000);
    }

    return (
        <div>
            {loading && <Loader/>} 
            <Navbar/>
            <Header/>
            <div className='workspaceContainer'>
                <div className='workspaceWrapper'>         
                    <div className='siPic'>           
                        <span className='workspaceTitle'>
                            <>Worksapce number: {item && item.workspaceNumber}</>
                        </span>                                            
                        <img src={image1} alt="" className='workspaceImage'/>                                                                       
                    </div>
                    <div className='siFunc'>
                        <span className='siLocation'>
                            <FontAwesomeIcon icon={faLocationDot}/>
                            <> The {item && item.campusNumber}-th building</>
                        </span>
                        <span className='siCapacity'>
                            <FontAwesomeIcon icon={faUsers}/>
                            <> Number of seats: {item && item.numberOfSeats}</>
                        </span>
                        <span className='siRoomType'>
                            <FontAwesomeIcon icon={faChalkboardUser}/>
                                <> Category:  {item && category.map(categor => {
                                    if(item.categoryId === categor.id) {
                                        return(categor.name)
                                    }
                                })}</>
                        </span>
                        <span className='siCourseNumber'>
                            {/* <FontAwesomeIcon icon={}/> */}
                                <>Better to use for № {item && item.courseNumber} course</>
                        </span>
                        <span className='siIsAvailable'>                        
                                {item && item.isAvailable ? 
                                (<div><FontAwesomeIcon icon={faLockOpen}/> Workspace can be booked</div>) : 
                                (<div><FontAwesomeIcon icon={faLock}/> Workspace is blocked</div>)}
                        </span> 
                        <div className='workspaceActions'>                        
                            <button className='siDetails'>Book</button>                        
                            <button className='siDetails'>TimeTable</button>
                            <button className='siDetails' onClick={handleEditChange}>Edit</button>
                            <button className='siDetails' onClick={handleDeleteChange} style={{backgroundColor:'#e74c3c'}}>Delete</button>
                            {item && item.isAvailable ? <button className='siDetails'>Lock</button> : <button className='siDetails'>UnLock</button>}
                        </div>                                        
                        <span className='siTextDesc'>
                            <h4>Description:</h4> {item && item.description}
                        </span>   
                    </div>                  
                </div>                                  
            </div>
            <Footer/>
        </div>
    );
};

export default Worksapce;