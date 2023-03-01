import React, { useState } from 'react';
import CreateBooking from './CreateBooking'
import BookingSelector from 'react-booking-selector'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faXmark} from "@fortawesome/free-solid-svg-icons";
import './BookingSelect.scss'

const BookingSelect = ({block}) => {
    const date = [
        '2023-02-15T12:00:04.256Z', 'Feb 16 2023, 03:00:04 pm']
    const [schedule, setSchedule] = useState([]);
    const [currentDay, setCurrentDay] = useState(new Date());
    const [blocked, setBlocked] = useState(block); 
    const [open, setOpen] = useState(false);

    const handleChange = (newSchedule) => {
        setSchedule( newSchedule );
        console.log('schedule',schedule);
        console.log('blocked', blocked)
        setOpen(true);
    }

    const getMonday=(d)=>{
        d = new Date(d);
        var day = d.getDay(),
            diff = d.getDate() - day + (day == 0 ? -6:1); // adjust when day is sunday
        return new Date(d.setDate(diff));
    }

    return ( 
        <div className="bookingSelector">   
            {console.log('block',block)}
            {open && <div className='changeBooking'>                 
                <div className='changeBookingWrapper'>                                                                                                           
                    <CreateBooking schedule = {schedule}/>
                </div>
                <FontAwesomeIcon icon={faXmark} className='close' onClick={()=>setOpen(false)}/>                 
            </div>}   
            <div className={open ? 'marginCreateContainer': ''}>
                <BookingSelector 
                    selectedColor= 'rgba(89, 154, 242, 1)'
                    unselectedColor= '#dbedff'
                    hoveredColor= 'rgba(162, 198, 248, 1)'
                    blockedColor= 'rgba(79, 79, 79, 1)'
                    //selectionScheme = 'square'                        
                    dateFormat = 'D'
                    margin={3}                                         
                    selection={schedule}
                    blocked={blocked}
                    startDate = {getMonday(currentDay)}
                    numDays={6}
                    minTime={8}
                    maxTime={22}
                    onChange={handleChange}
                    //renderDateCell
                />              
            </div>
    </div>    
    );
};

export default BookingSelect;