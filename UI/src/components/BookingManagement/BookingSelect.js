import React, { useEffect, useState } from "react";
import {bookingsList} from "../../docs/fillterData";
import { ScheduleComponent, Day, WorkWeek, Month, Agenda, Inject, ViewsDirective, ViewDirective, Resize, DragAndDrop} from '@syncfusion/ej2-react-schedule';
import {L10n} from '@syncfusion/ej2-base';
import UpdateBooking from "./UpdateBooking";
import './BookingSelect.scss'

L10n.load({
    'en-US':{
        'schedule':{
            'saveButton': 'save',
            'cancelButton': 'close',
            'deleteButton': 'remove',
            'newEvent': 'Create Booking',
            'editEvent': 'Update Booking'
        }
    }
})

const BookingSelect = () => {
    let scheduleObj;
    const workDays = [1, 2, 3, 4, 5, 6];
    const [blocked, setBlocked] = useState([]); 
    const [currentDay, setCurrentDay] = useState(new Date());
    const [isLoading, setIsLoading] = useState(true);

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
                Id: item.id,
                User: `${item.userId}`,
                Workspace: `${item.workspaceId}`,
                GroupNumber: `${item.groupNumber}`,
                StartTime: new Date(day),
                EndTime: addHours(addMinutes(new Date(day),30), 1),
                RecurrenceRule: `FREQ=WEEKLY;INTERVAL=2;COUNT=${weeksRepeatNumber}`,
                NumberOfWeek: `${item.dayOfWeek}`,
                //для учителей сделать//IsReadonly: true,
                IsBlock: !(item.isWorkspaceAvailable),                     
            }
        })
        console.log('newBlocked ',newBlocked)
        setBlocked(newBlocked);
    },[]);

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

    function editorTemplate(props) {
        return (<UpdateBooking props = {props}/>);
    }

    function onPopupOpen(args) {
        args.cancel = true;
    }

    //сделать разными цветами лекции лабы и практики
    function onEventRendered(args) {
        console.log('ПИзда')
        switch (args.data.EventType) {
            case '1':
                args.element.style.backgroundColor = '#F57F17';
                break;
            case '2':
                args.element.style.backgroundColor = '#7fa900';
                break;
            case '3':
                args.element.style.backgroundColor = '#8e24aa';
                break;
        }
        console.log({args})
    }
    function onActionBegin(args) {
        console.log('ХУЙ', args)
        // if (args.requestType === 'eventCreate' || args.requestType === 'eventChange') {
        //     let data = args.data instanceof Array ? args.data[0] : args.data;
        //     args.cancel = !scheduleObj.isSlotAvailable(data.StartTime, data.EndTime);
        // }
    }

    return(        
    <div>
        {console.log('blocked1',blocked)}     
        <ScheduleComponent
            width='100%'
            currentView="WorkWeek"
            workDays={workDays}
            selectedDate={getMonday(currentDay)}
            editorTemplate={editorTemplate.bind(this)} 
            //для учителей сделать//popupOpen={onPopupOpen}
            ref={schedule => scheduleObj = schedule}
            ctionBegin={onActionBegin.bind(this)}
            // showQuickInfo={false}
            eventRendered={onEventRendered.bind(this)}
            eventSettings={{
                dataSource: blocked,
                fields: {
                    id: 'Id',
                    subject: { name: 'User'},
                    location: { name: 'Workspace'},
                    numberOfWeek: {name: 'NumberOfWeek'},
                    startTime: { name: 'StartTime'},
                    endTime: { name: 'EndTime'},
                    description: {name: 'GroupNumber'},
                    recurrenceRule: {name: 'RecurrenceRule'}
                }      
            }}>
            <ViewsDirective>
                <ViewDirective option='Day' startHour='08:00' endHour='21:05'/>                    
                <ViewDirective option='WorkWeek' startHour='08:00' endHour='21:05'/>
                <ViewDirective option='Month' showWeekend={true}/>
                <ViewDirective option='Agenda'/>
            </ViewsDirective>                
            <Inject services={[Day, WorkWeek, Month, Agenda, Resize, DragAndDrop]} />
        </ScheduleComponent>
    </div>
    )
};

export default BookingSelect;