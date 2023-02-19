import React, {useEffect, useState} from 'react';
import {useParams, Link} from 'react-router-dom';
import Header from '../../components/Header/Header';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import image1 from '../../images/noimage.png'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faLocationDot, faUsers, faChalkboardUser, faLock, faLockOpen} from "@fortawesome/free-solid-svg-icons";
import {courseList, categoryList, dataList} from "../../docs/fillterData";
import "./Workspace.scss"

const Worksapce = () => {
    const {id} = useParams()
    const [item, setItem] = useState([]);
    const [category, setCategory] = useState();
    const [isAvailable, setAvailable] = useState(true);
    useEffect(()=>{
        let updatedItem = dataList;
        updatedItem = updatedItem.filter((item)=> item.id.toString() === id);
        setItem(updatedItem);  

        updatedItem.filter(element => { 
            categoryList.map(category => {
                if(element.categoryId === category.id) {
                    setCategory(category.name)
            }})}) 
        
        updatedItem.map((element) => { setAvailable(element.isAvailable)})
    },[id])

    return (
        <div>
            <Navbar/>
            <Header/>
            <div className='workspaceContainer'>
                <div className='workspaceWrapper'>         
                    <div className='siPic'>           
                        <span className='workspaceTitle'>
                            <>Workspacae number: {item.map(element => {
                                    return element.workspaceNumber
                            })}</>
                        </span>                                            
                        <img src={image1} alt="" className='workspaceImage'/>                                                                       
                    </div>
                    <div className='siFunc'>
                        <span className='siLocation'>
                            <FontAwesomeIcon icon={faLocationDot}/>
                            <> The {item.map(element => {
                                return element.campusNumber
                        })}-th building</>
                        </span>
                        <span className='siCapacity'>
                            <FontAwesomeIcon icon={faUsers}/>
                            <> Number of seats: {item.map(element => {
                                return element.numberOfSeats
                        })}</>
                        </span>
                        <span className='siRoomType'>
                            <FontAwesomeIcon icon={faChalkboardUser}/>
                                <> Category:  {category}</>
                        </span>
                        <span className='siCourseNumber'>
                            {/* <FontAwesomeIcon icon={}/> */}
                                <>Better to use for № {item.map(element => {
                                    return element.courseNumber
                            })} course</>
                        </span>
                        <span className='siIsAvailable'>                        
                                {isAvailable ? 
                                (<div><FontAwesomeIcon icon={faLockOpen}/> Workspace can be booked</div>) : 
                                (<div><FontAwesomeIcon icon={faLock}/> Workspace is blocked</div>)}
                        </span> 
                        <div className='workspaceActions'>                        
                            <button className='siDetails'>Book</button>                        
                            <button className='siDetails'>TimeTable</button>
                            {isAvailable ? <button className='siDetails'>Lock</button> : <button className='siDetails'>UnLock</button>}
                        </div>                                        
                        <span className='siTextDesc'>
                            <h4>Description:</h4> {item.map(element => {
                                return element.description
                        })}
                        </span>   
                    </div>                  
                </div>                                  
            </div>
            <Footer/>
        </div>
    );
};

export default Worksapce;