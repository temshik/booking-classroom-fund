import React, {useEffect, useState} from "react";
import { useDispatch, useSelector } from 'react-redux';
import {selectIsCategoryLoading, selectIsWorkspaceLoading,
        getCategory, getWorkspace,
        selectCat, selectWorkspace} from '../../redux/slice/catalogSlice';
import {selectBookings, getBookingsByUser} from '../../redux/slice/bookingSlice';
import Header from '../../components/Header/Header';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import Loader from '../../components/Loader/Loader';
import BookingSelect from '../../components/BookingManagement/BookingSelect'
//import {bookingsList} from "../../docs/fillterData";
import './Booking.scss'

const Booking = () => {  
    const dispatch = useDispatch();  
    const cat = useSelector(selectCat);
    const workspace = useSelector(selectWorkspace);
    const bookings = useSelector(selectBookings);
    const isCategoryLoading = useSelector(selectIsCategoryLoading);
    const isWorkspaceLoading = useSelector(selectIsWorkspaceLoading);
    const [blocked, setBlocked] = useState([]); 
    const [selectedCategory, setSelectedCategory] = useState([]);
    const [selectedWorkspace, setSelectedWorkspace] = useState([]);
    const [element, setElement] = useState();
    const [currentDay, setCurrentDay] = useState(new Date());
    const [isLoading, setIsLoading] = useState(true);
    
    useEffect(()=>{
        getBookings();
        getCategories();
    },[]);

    useEffect(()=>{
        if(bookings !== null)
        prepareData(bookings);
    },[bookings])

    // useEffect(()=>{
    //     if(blocked !== null)
    //     {
            
    //     }
    // },[blocked])

    const getBookings = async () => {
        if(window.localStorage.getItem('accessToken') !== null){                                                    
            dispatch(getBookingsByUser(1));
        }
    }

    const getWorkspacies = async (id) => {    
        if(window.localStorage.getItem('accessToken') !== null){                                                    
            dispatch(getWorkspace(id));
        }
    }

    const getCategories = () => {
        if(window.localStorage.getItem('accessToken') !== null){  
            dispatch(getCategory());       
        }
    }

    function prepareData(bookingsList){
        const sessionStart = new Date(2023,1,1);
        const sessionEnd = new Date(2023,5,30);
        const weeksBetwee = weeksBetween(sessionStart, sessionEnd);
        const weeksRepeatNumber = weeksBetwee/2;        
        
        let newBlocked = bookingsList.map((item)=>{
            console.log('item', item);            
            getWorkspacies(item.workspaceId);
            console.log('workspace',workspace)
            let startDate = (new Date(item.startBookingTime));
            let day = startDate;
            if(item.dayOfWeek === 1){                                
                day = getMonday(sessionStart);        
            }
            else if(item.dayOfWeek === 2){                
                day = getMonday(addHours(sessionStart,168));   
            }

            while(getDayOfWeek(day)!==getDayOfWeek(startDate)){
                day=addHours(day,24);
            }

            const hours = startDate.getHours()
            const minutes = startDate.getMinutes()
            day.setHours(hours);
            day.setMinutes(minutes);            
            return {
                Id: item.id,
                Subject: item.userId,
                Location: `${item.workspaceId}`,
                Description: `${item.groupNumber}`,
                StartTime: new Date(day),
                EndTime: addHours(addMinutes(new Date(day),30), 1),
                RecurrenceRule: `FREQ=WEEKLY;INTERVAL=2;COUNT=${weeksRepeatNumber}`,
                NumberOfWeek: `${item.dayOfWeek}`,
                //для учителей сделать//IsReadonly: true,
                IsBlock: !(item.isWorkspaceAvailable),                                                                                                   
                IsAllDay: false,                                                    
            }
        })
        console.log('newBlocked', newBlocked)
        setBlocked(newBlocked);
    }

    function addHours(date, hours) {
        date.setTime(date.getTime() + hours * 60 * 60 * 1000);
        return date;
    }

    function addMinutes(date, minutes) {
        return new Date(date.getTime() + minutes*60000);
    }

    function weeksBetween(d1, d2) {
        return Math.round((d2 - d1) / (7 * 24 * 60 * 60 * 1000));
    }

    function getDayOfWeek(date) {
        const dayOfWeek = new Date(date).getDay();    
        return isNaN(dayOfWeek) ? null : 
          ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][dayOfWeek];
      }

    const getMonday=(d)=>{
        d = new Date(d);
        var day = d.getDay(),
            diff = d.getDate() - day + (day == 0 ? -6:1); // adjust when day is sunday
        return new Date(d.setDate(diff));
    }
    return(
        <div>
            {/* {isLoading && <Loader/>} */}            
            <Navbar/>
            <Header/>    
            <BookingSelect props={blocked} selectedDate={getMonday(currentDay)}/>
            <Footer/>
        </div>
    );
};

export default Booking;