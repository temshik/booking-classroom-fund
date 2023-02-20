import React, { useEffect, useState } from "react";
import Header from '../../components/Header/Header';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import Loader from '../../components/Loader/Loader';
import {bookingsList} from "../../docs/fillterData";
import BookingSelect from "../../components/BookingSelect/BookingSelect";
import { ScheduleComponent, Day, Week, WorkWeek, Month, Agenda, Inject, ViewsDirective, ViewDirective } from '@syncfusion/ej2-react-schedule';
import './Booking.scss'

const Booking = () => {    
    const [blocked, setBlocked] = useState([]); 
    const [currentDay, setCurrentDay] = useState(new Date());
    const [isLoading, setIsLoading] =useState(true);
    useEffect(()=>{
        const sessionStart = new Date(2023,1,1);
        const sessionEnd = new Date(2023,5,30);
        const weeksBetwee = weeksBetween(sessionStart, sessionEnd);
        const weeksRepeatNumber = weeksBetwee/2;

        let newBlocked = bookingsList.map((item)=>{
            let startDate = (new Date(item.startBookingTime));
            console.log("startDate",startDate)
            let day = startDate;
            console.log('sessionStart',sessionStart)
            if(item.dayOfWeek === 1){                                
                day = getMonday(sessionStart);   
                console.log('day1',day);          
            }
            else if(item.dayOfWeek === 2){                
                day = getMonday(addHours(sessionStart,168));   
                console.log('day2',day);
            }

            console.log('day0',day);
            console.log('dayofweek needed',getDayOfWeek(startDate))
            while(getDayOfWeek(day)!==getDayOfWeek(startDate)){
                console.log('day w',day)
                day=addHours(day,24);
            }
            console.log('day a',day)

            //setStartDate(day);
            //console.log('startdate',startDate);
            
            // const year = startDate.getFullYear()
            // const month = startDate.getMonth()
            // const date = startDate.getDate()
            const hours = startDate.getHours()
            const minutes = startDate.getMinutes()
            day.setHours(hours);
            day.setMinutes(minutes);
            return {
                id: item.id,
                Subject: `User: ${item.userId} Workspace: ${item.workspaceId} GroupNumber: ${item.groupNumber}`,
                StartTime: new Date(day),
                EndTime: addHours(addMinutes(new Date(day),30), 1),
                RecurrenceRule: `FREQ=WEEKLY;INTERVAL=2;COUNT=${weeksRepeatNumber}`
            }
        })
        console.log('newBlocked ',newBlocked)
        setBlocked(newBlocked);
    },[])

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
            {console.log('blocked1',blocked)}
            <Navbar/>
            <Header/>            
            {/* <BookingSelect 
                block={blocked}
            />             */}
            <ScheduleComponent
                width='100%'
                currentView="Week"
                selectedDate={getMonday(currentDay)}
                eventSettings={{
                    dataSource: blocked,
                }}>
                <ViewsDirective>
                    <ViewDirective option='Day' startHour='08:00' endHour='21:05'/>                    
                    <ViewDirective option='Week' startHour='08:00' endHour='21:05'/>
                    <ViewDirective option='Month' showWeekend={true}/>
                </ViewsDirective>                
                <Inject services={[Day, Week, WorkWeek, Month, Agenda]} />
            </ScheduleComponent>
            <Footer/>
        </div>
    );
};

export default Booking;