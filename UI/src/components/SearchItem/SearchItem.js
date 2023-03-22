import React from 'react';
import { Link, useNavigate } from "react-router-dom";
import "./SearchItem.scss"
import image1 from '../../images/noimage.png'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faLocationDot, faUsers, faChalkboardUser, faPersonDotsFromLine, faDisplay} from "@fortawesome/free-solid-svg-icons";

const SearchItem = ({item, userRole, categories}) => {
    const navigate = useNavigate();
    const {id,campusNumber, workspaceNumber,categoryId,description,numberOfSeats,courseNumber,isAvailable}=item

    const truncate=(str)=>{
        return str.length > 20 ? str.substring(0, 100) + "..." : str;
    }

    const timeTableMessage = () => {
        if(window.confirm('You will be redirected to booking page.'))
        navigate('/Booking', {state: {value:item}});
    }

    const handleTimeTableChange = () => {
        setTimeout(timeTableMessage, 500);
    }


    return (
       <div className='searchItem'>
            <img src={image1} alt='' className='siImg'/> 
            <div className='siDesc'>
                <Link to={`/catalog/${id}`} className='siTitle'>Workspace number: {workspaceNumber}</Link>
                <span className='siLocation'>
                    <FontAwesomeIcon icon={faLocationDot}/>
                    <> The {campusNumber}-th building</>
                </span>
                <span className='siCapacity'>
                <FontAwesomeIcon icon={faUsers}/>
                    <> {numberOfSeats}</>
                </span>
                <span className='siRoomType'>
                <FontAwesomeIcon icon={faChalkboardUser}/>
                    <> {categories.map(category => {
                        if(categoryId === category.id) {
                            return category.name
                        }
                    })}</>
                </span>
                <span style={{maxLength:12}} className='siTextDesc'>
                    Description: {truncate(description)}
                </span>
            </div> 
            <div className='siMore'>
                <button className='siDetails'><Link to={{pathname:`/catalog/${id}`}} style={{color:'black', textDecoration: 'none'}}>Details</Link></button>
                <button className='siDetails' disabled={userRole ==='Teacher'} onClick={handleTimeTableChange}>Book</button>
                <button className='siDetails' onClick={handleTimeTableChange}>TimeTable</button>
            </div>
       </div> 
    );
};

export default SearchItem;