import React from 'react';
import { Link } from "react-router-dom";
import "./SearchItem.scss"
import image1 from '../../images/noimage.png'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faLocationDot, faUsers, faChalkboardUser, faPersonDotsFromLine, faDisplay} from "@fortawesome/free-solid-svg-icons";

const SearchItem = ({item:{id,campusNumber, workspaceNumber,categoryId,description,numberOfSeats,courseNumber,isAvailable}, categories}) => {
    console.log('categorys ',categories)
    return (
       <div className='searchItem'>
            <img src={image1} alt='' className='siImg'/> 
            <div className='siDesc'>
                <Link to='/catalog/:{id}' className='siTitle'>Workspace number: {workspaceNumber}</Link>
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
                <span className='siTextDesc'>
                    Description: {description}
                </span>
            </div> 
            <div className='siMore'>
                <button className='siDetails'>Details</button>
                <button className='siDetails'>Book</button>
                <button className='siDetails'>TimeTable</button>
            </div>
       </div> 
    );
};

export default SearchItem;