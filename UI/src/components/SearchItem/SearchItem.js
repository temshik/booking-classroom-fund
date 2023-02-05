import React from 'react';
import { Link } from "react-router-dom";
import "./SearchItem.scss"
import image1 from '../../images/noimage.png'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faLocationDot, faUsers, faChalkboardUser, faPersonDotsFromLine, faDisplay} from "@fortawesome/free-solid-svg-icons";

const SearchItem = () => {
    return (
       <div className='searchItem'>
            <img src={image1} alt='' className='siImg'/> 
            <div className='siDesc'>
                <Link to='/catalog/:id' className='siTitle'>FITR Lecture Room</Link>
                <span className='siLocation'>
                    <FontAwesomeIcon icon={faLocationDot}/>
                    <> The 11th building</>
                </span>
                <span className='siCapacity'>
                <FontAwesomeIcon icon={faUsers}/>
                    <> 120</>
                </span>
                <span className='siRoomType'>
                <FontAwesomeIcon icon={faChalkboardUser}/>
                    <> Lecture</>
                </span>
                <span className='siTextDesc'>
                    Description: 
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