import React, {useEffect, useState} from "react";
import {useLocation} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {selectIsCategoryLoading, selectIsWorkspaceLoading,
        getCategory, getWorkspace,
        selectCat, selectWorkspace} from '../../redux/slice/catalogSlice';
import {selectBookings, getBookingsByUser, getBookingsByWorkspace} from '../../redux/slice/bookingSlice';
import {selectIsLoggedIn, selectEmail} from '../../redux/slice/authSlice'
import Header from '../../components/Header/Header';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import Loader from '../../components/Loader/Loader';
import BookingSelect from '../../components/BookingManagement/BookingSelect'
import AuthServices from '../../services/AuthServices';
import axios from '../../utils/axios';
import Configuration from "../../configurations/Configuration";
//import {bookingsList} from "../../docs/fillterData";
import './Booking.scss'

const authSevice = new AuthServices();

const Booking = () => {  
    const location = useLocation(); 
    const item = {   
        "id": null,     
        "campusNumber": null,
        "workspaceNumber": null,
        "categoryId": null,
        "description": null,
        "numberOfSeats": null,
        "courseNumber": null,
        "specialEquipment": false,
        "isAvailable": true
    }
    const [form, setForm] = useState(location.state !== null ? location.state.value : item); 
    const dispatch = useDispatch();  
    const cat = useSelector(selectCat);
    const workspace = useSelector(selectWorkspace);
    const bookings = useSelector(selectBookings);
    const isCategoryLoading = useSelector(selectIsCategoryLoading);
    const isWorkspaceLoading = useSelector(selectIsWorkspaceLoading);
    const [blocked, setBlocked] = useState([]); 
    const [selectedCategory, setSelectedCategory] = useState([]);
    const [selectedWorkspace, setSelectedWorkspace] = useState([]);
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [element, setElement] = useState([]);
    const [currentDay, setCurrentDay] = useState(new Date());
    const [isLoading, setIsLoading] = useState(true);
    const stateEmail = useSelector(selectEmail)
    const email = (stateEmail!==null)? stateEmail : window.sessionStorage.getItem('email');
    const [user, setUser] = useState(null);
    
    useEffect(()=>{
        console.log('form', form);
        if(email !== null)
        {
            authSevice.GetUserByEmail({email: email}).then((data) =>{
                if(data.status === 200){
                    getBookings(data.data.id);
                }                
            }).catch((error)=>{
                console.log(error);
            })
        }            
        getCategories();
    },[]);

    useEffect(()=>{
        if(bookings !== null)
        prepareData(bookings.data);
    },[bookings])

    useEffect(()=>{
        if(blocked !== null)
        {   console.log('bloc',blocked);    
            getInfoForExtendedRecord(selectedUsers,selectedWorkspace);    
        }
    },[blocked])

    useEffect(()=>{console.table(selectedUsers)},[selectedUsers])

    const getBookings = (id) => {
        if(window.localStorage.getItem('accessToken') !== null){   
            if(location.state !== null){
                dispatch(getBookingsByWorkspace(form.id));
            }
            else{                                                 
                dispatch(getBookingsByUser({id}));
            }
        }
    }

    const getCategories = () => {
        if(window.localStorage.getItem('accessToken') !== null){  
            dispatch(getCategory());       
        }
    }

    const getInfoForExtendedRecord = async() =>{
        if (window.localStorage.getItem('accessToken') !== null){
            var users=[];
            selectedUsers.map((id)=>{
                users.push(axios.get(Configuration.GetUser+`/${id}`));
            })

            console.log('users',users)
            
            var workspacies=[];
            selectedWorkspace.map((id)=>{
                workspacies.push(axios.get(Configuration.GetWorkspace+`/${id}`));
            })

            console.log('workspacies',workspacies)
            // await Promise.allSettled([users, workspacies]).then((res) => {
            //     setSelectedWorkspace(res[1].value)                      
            // })      

            currentloginid(users, workspacies);

            // const newBlockedByUser = blocked.map((item)=>{
            //     console.log('item',item);
            //     usersList.map((value)=>{
            //         console.log('value',value)
            //         if(item.Subject === value.id){
            //             return{...item, Subject: value.email}
            //         } else return item
            //     })
            // }) 
        }
    }

    async function currentloginid(users, workspacies) {
        return await Promise.all([users, workspacies])
          .then(function(response) {
            return JSON.stringify(response);
          })
          .then(function(data) {
            var userid = JSON.parse(data);
            console.log(userid);
            return userid;
          })
      }

    function prepareData(bookingsList){
        const sessionStart = new Date(2023,1,1);
        const sessionEnd = new Date(2023,5,30);
        const weeksBetwee = weeksBetween(sessionStart, sessionEnd);
        const weeksRepeatNumber = weeksBetwee/2;     
        let uniqueUserId = [];
        let uniqueWorkspaceid = [];   
        
        if(bookingsList){
        let newBlocked = bookingsList.map((item)=>{ 
            uniqueUserId.push(item.userId);
            uniqueWorkspaceid.push(item.workspaceId);
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
                Subject: `${item.userId}`,
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
        setSelectedUsers(uniqueUserId.filter((value, index, array) => array.indexOf(value) === index));
        setSelectedWorkspace(uniqueWorkspaceid.filter((value, index, array) => array.indexOf(value) === index));
        

        console.log('newBlocked', newBlocked)
        setBlocked(newBlocked);
        }
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
            <BookingSelect props={element} selectedDate={getMonday(currentDay)}/>
            <Footer/>
        </div>
    );
};

export default Booking;