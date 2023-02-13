import React, { useState } from "react";
import Header from '../../components/Header/Header';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import BookingSelector from 'react-booking-selector'

const Booking = () => {
    const [schedule, setSchedule] = useState(['2023-01-05T12:21:04.256Z']);
    const [blocked, setBlocked] = useState([
        'Wed Feb 15 2023 10:00:00 GMT-0700 (Pacific Daylight Time)',
        'Thu Feb 16 2023 10:00:00 GMT-0700 (Pacific Daylight Time)',
        'Fri Feb 17 2023 10:00:00 GMT-0700 (Pacific Daylight Time)']); 
    const [currentDay, setCurrentDay] = useState(new Date());

    const handleChange = (newSchedule) => {
        setSchedule( newSchedule );
        console.log('schedule',schedule);
        console.log('blocked', blocked)
    }

    const getMonday=(d)=>{
        d = new Date(d);
        var day = d.getDay(),
            diff = d.getDate() - day + (day == 0 ? -6:1); // adjust when day is sunday
        return new Date(d.setDate(diff));
      }

    return(
        <div>
            <Navbar/>
            <Header/>
            <div className="bookingSelector">
                <BookingSelector 
                        selectedColor= 'rgba(89, 154, 242, 1)'
                        unselectedColor= '#dbedff'
                        hoveredColor= 'rgba(162, 198, 248, 1)'
                        blockedColor= 'rgba(79, 79, 79, 1)'
                        selectionScheme = 'linear'                        
                        dateFormat = 'D'
                        margin={3}                                         
                        selection={schedule}
                        blocked={blocked}
                        startDate = {getMonday(currentDay)}
                        numDays={6}
                        minTime={8}
                        maxTime={22}
                        onChange={()=>handleChange}
                    />
            </div>
            <Footer/>
        </div>
    );
};

export default Booking;