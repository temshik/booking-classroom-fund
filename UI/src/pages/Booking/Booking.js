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
import utilsAxios from '../../utils/axios';
import axios from 'axios';
import Configuration from "../../configurations/Configuration";
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
    const bookings = useSelector(selectBookings);
    const isCategoryLoading = useSelector(selectIsCategoryLoading);
    const isWorkspaceLoading = useSelector(selectIsWorkspaceLoading);    
    const [selectedCategory, setSelectedCategory] = useState([]);
    const [element, setElement] = useState([]);
    const [currentDay, setCurrentDay] = useState(new Date());
    const [loading, setLoading] = useState(false);
    const stateEmail = useSelector(selectEmail)
    const email = (stateEmail!==null)? stateEmail : window.sessionStorage.getItem('email');
    
    useEffect(()=>{        
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
        if(isCategoryLoading === false || isWorkspaceLoading === false)
            setTimeout(() => {setLoading(false)}, 500);
        else setLoading(true);
    },[isCategoryLoading,isWorkspaceLoading])

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

    function prepareData(bookingsList) {
        const sessionStart = new Date(2023,1,1);
        const sessionEnd = new Date(2023,5,30);
        const weeksBetwee = weeksBetween(sessionStart, sessionEnd);
        const weeksRepeatNumber = weeksBetwee/2;     
        const uniqueUserId = [];
        const uniqueWorkspaceid = [];   
        
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
                FirstName: null,
                LastName: null,
                UserName: null,
                Location: `${item.workspaceId}`,
                CampusNumber: null,
                CategoryId: null,
                Description: `${item.groupNumber}`,
                StartTime: new Date(day),
                EndTime: addHours(addMinutes(new Date(day),30), 1),
                RecurrenceRule: `FREQ=WEEKLY;INTERVAL=2;COUNT=${weeksRepeatNumber}`,
                NumberOfWeek: `${item.dayOfWeek}`,                
                //для учителей сделать//IsReadonly: true,
                IsBlock: !(item.isWorkspaceAvailable),                                                                                                   
                IsAllDay: false,                                                    
            }})

            const selectedUsers = uniqueUserId.filter((value, index, array) => array.indexOf(value) === index);
            const selectedWorkspace = uniqueWorkspaceid.filter((value, index, array) => array.indexOf(value) === index);

            getInfoForExtendedRecord(selectedUsers, selectedWorkspace, newBlocked); 
        }
    }   

    const getInfoForExtendedRecord = (selectedUsers, selectedWorkspace, newBlocked) =>{
        if (window.localStorage.getItem('accessToken') !== null){
            var usersEndpoints=[];
            selectedUsers.map((id)=>{
                usersEndpoints.push(Configuration.GetUser+`/${id}`);
            })

            var workspaciesEndpoints=[];
            selectedWorkspace.map((id)=>{
                workspaciesEndpoints.push(Configuration.GetWorkspace+`/${id}`);
            })

            getAxiosData(usersEndpoints, workspaciesEndpoints).then((items)=>{                              
                if(newBlocked !== null)
                {                  
                    newBlocked.map(item=>{                        
                        items[0].map((value)=>{                            
                            if(item.Subject === ''+value.id){                                
                                item.Subject = value.email;
                                item.FirstName = value.firstName;
                                item.LastName = value.lastName;
                                item.UserName = value.userName;
                            } else return item
                        })    
                        items[1].map((value)=>{
                            console.log('value',value.campusNumber,'/',value.workspaceNumber)
                            console.log('value',value.id, '',item.Location)
                            if(item.Location === ''+value.id){
                                console.log('v')
                                item.CampusNumber = `${value.campusNumber}`;
                                item.Location = `${value.workspaceNumber}`;    
                                item.CategoryId = `${value.categoryId}`;                 
                            }
                        })       
                    })       
                    console.log('edit',newBlocked);
                    setElement(newBlocked);
                }
            })                        
        }
    }

    async function getAxiosData (usersEndpoints, workspaciesEndpoints) {
        const getUsersEndpoints = usersEndpoints.map((endpoint) => utilsAxios.get(endpoint));
        const getWorkspaciesEndpoints = workspaciesEndpoints.map((endpoint) => utilsAxios.get(endpoint));
        var all = [[],[]];        

        await Promise.allSettled(getUsersEndpoints).then( 
            axios.spread((...allData) => {
                (allData.forEach((item)=>{                    
                    all[0].push(item.value.data)
                }))                                                             
            }),
            await Promise.allSettled(getWorkspaciesEndpoints).then(
                axios.spread((...allData) => {
                    (allData.forEach((item)=>{                       
                        all[1].push(item.value.data)
                    }))                                                             
                }),
            ),          
        );          

        return all;
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
            diff = d.getDate() - day + (day === 0 ? -6:1); // adjust when day is sunday
        return new Date(d.setDate(diff));
    }
    return(
        <div>
            {loading && <Loader/>}           
            <Navbar/>
            <Header/>    
            <BookingSelect props={element} selectedDate={getMonday(currentDay)}/>
            <Footer/>
        </div>
    );
};

export default Booking;