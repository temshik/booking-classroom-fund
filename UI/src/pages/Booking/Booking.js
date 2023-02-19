import React, { useEffect, useState } from "react";
import Header from '../../components/Header/Header';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import Moment from 'react-moment';
import moment from 'moment';
import Loader from '../../components/Loader/Loader';
import {bookingsList} from "../../docs/fillterData";
import BookingSelect from "../../components/BookingSelect/BookingSelect";
import { ScheduleComponent, Day, Week, WorkWeek, Month, Agenda, Inject } from '@syncfusion/ej2-react-schedule';
import './Booking.scss'

const Booking = () => {    
    const [blocked, setBlocked] = useState([]); 
    const [isLoading, setIsLoading] =useState(true);
    const data = [
        {
          Id: 1,
          Subject: 'Meeting',
          StartTime: new Date(2023, 1, 15, 10, 0),
          EndTime: new Date(2023, 1, 15, 12, 30),
        },
      ];
    useEffect(()=>{
        let newBlocked = [];
        bookingsList.forEach((item)=>{
            //var myDate = item.startBookingTime;
            //newBlocked.push(moment(myDate).format('MMM D YYYY, hh:00:ss a'))
            newBlocked.push(item.startBookingTime.toString());
            console.log('newBlocked',newBlocked)                       
        })
        setBlocked(newBlocked); 
        console.log('newBlocked',typeof newBlocked[0])
    },[])

    return(
        <div>
            {/* {isLoading && <Loader/>} */}
            {console.log('blocked1',blocked)}
            <Navbar/>
            <Header/>            
            {/* <BookingSelect 
                block={blocked}
            />             */}
            <ScheduleComponent
                selectedDate={new Date(2023, 1, 15)}
                eventSettings={{
                    dataSource: data,
                }}
                >
                <Inject services={[Day, Week, WorkWeek, Month, Agenda]} />
            </ScheduleComponent>
            <Footer/>
        </div>
    );
};

export default Booking;