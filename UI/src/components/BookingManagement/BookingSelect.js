import React from "react";
import { ScheduleComponent, Day, WorkWeek, Month, Agenda, Inject, ViewsDirective, ViewDirective, Resize, DragAndDrop} from '@syncfusion/ej2-react-schedule';
import {L10n, isNullOrUndefined, Internationalization} from '@syncfusion/ej2-base';
import UpdateBooking from "./UpdateBooking";
import Template from "./Template";
import HeaderTemplate from "./HeaderTemplate";
import ContentTemplate from "./ContentTemplate";
import FooterTemplate from "./FooterTemplate";
import './BookingSelect.scss'

L10n.load({
    'en-US':{
        'schedule':{
            'saveButton': 'save',
            'cancelButton': 'close',
            'deleteButton': 'remove',
            'newEvent': 'Create Booking',
            'editEvent': 'Update Booking',            
        }
    }
})

const BookingSelect = ({props, selectedDate}) => {
    let scheduleObj;
    let startObj;
    let endObj;
    let eventTypeObj;
    let titleObj;
    let notesObj;    
    const intl = new Internationalization();
    const workDays = [1, 2, 3, 4, 5, 6];

    function template(props) {
        return (<Template props={props}/>)
    }

    function editorTemplate(props) {
        return (<UpdateBooking props = {props} startObj={startObj}/>);        
    }

    function headerTemplate(props) {
        return (<HeaderTemplate 
            props={props}             
            intl={intl}
        />);
    }

    function contentTemplate(props) {
        return (<ContentTemplate 
            props={props}
            titleObj={titleObj} 
            notesObj={notesObj}
            eventTypeObj={eventTypeObj}
        />);
    }

    function footerTemplate(props) {
        return (<FooterTemplate 
            props={props} 
            scheduleObj={scheduleObj} 
            titleObj={titleObj} 
            notesObj={notesObj}
            eventTypeObj={eventTypeObj}
        />);
    }

    function onPopupOpen(args) {    
        if (args.target && !args.target.classList.contains('e-appointment') && !isNullOrUndefined(titleObj)) {
            titleObj.focusIn();
        }    
        if (args.type === 'Editor') {
            let subjectElement = args.element.querySelector('#Subject');
            if (subjectElement) {
                subjectElement.value = args.data.Subject || "";
            }
            let descriptionElement = args.element.querySelector('#Description');
            if (descriptionElement) {
                descriptionElement.value = args.data.Description || "";
            }
        }
        if (args.type === 'QuickInfo'){
            console.log('QuickInfo')
        }
        if (args.type === 'EditEventInfo'){
            console.log('EditEventInfo')
        }
        if (args.type === 'ViewEventInfo'){
            console.log('ViewEventInfo')
        }
        if (args.type === 'EventContainer'){
            console.log('EventContainer')
        }
        if (args.type === 'RecurrenceAlert'){
            console.log('RecurrenceAlert')
        }
        if (args.type === 'DeleteAlert'){
            console.log('DeleteAlert')
        }
        if (args.type === 'ValidationAlert'){
            console.log('ValidationAlert')
        }
        if (args.type === 'RecurrenceValidationAlert'){
            console.log('RecurrenceValidationAlert')
        }
    }

    function onPopupClose(args) {
        if (args.type === 'Editor' && !isNullOrUndefined(args.data)) {
            let subjectElement = args.element.querySelector('#Subject');
            if (subjectElement) {
                args.data.Subject = subjectElement.value;
            }
            let locationElement = args.element.querySelector('#Location');
            if (locationElement) {
                args.data.Location = locationElement.value;
            }
            let statusElement = args.element.querySelector('#EventType');
            if (statusElement) {
                args.data.EventType = statusElement.value;
            }
            // let startTimeElement = args.element.querySelector('#StartTime');
            // if (startTimeElement) {
            //     args.data.StartTime = startTimeElement.value;
            // }        
            // args.data.StartTime = startObj;       
            // args.data.EndTime = endObj;                     
            let descriptionElement = args.element.querySelector('#Description');
            if (descriptionElement) {
                args.data.Description = descriptionElement.value;
            }
        }
    }

    //сделать разными цветами лекции лабы и практики
    function applyCategoryColor(args, currentView) {
        let categoryColor = args.data.CategoryColor;
        if (!args.element || !categoryColor) {
            return;
        }
        if (currentView === 'Agenda') {
            args.element.firstChild.style.borderLeftColor = categoryColor;
        }
        else {
            args.element.style.backgroundColor = categoryColor;
        }
    }

    
    function onEventRendered(args) {
        console.log('Прогружает все элементы на стронице', args);
        applyCategoryColor(args, scheduleObj.currentView);
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
        console.log('action', args)
        // if (args.requestType === 'eventCreate' || args.requestType === 'eventChange') {
        //     let data = args.data instanceof Array ? args.data[0] : args.data;
        //     args.cancel = !scheduleObj.isSlotAvailable(data.StartTime, data.EndTime);
        // }        
    }        
    
    return (
    <div>
        {console.log('blocked1',props)}
        <ScheduleComponent 
        id="schedule" 
        cssClass='quick-info-template' 
        width='100%'
        currentView="WorkWeek"
        workDays={workDays}
        selectedDate={selectedDate} 
        allowResizing={false}
        //для учителей сделать
        //popupOpen={onPopupOpen}
        popupClose={onPopupClose}
        ref={schedule => scheduleObj = schedule}          
        editorTemplate={editorTemplate.bind(this)}
        actionBegin={onActionBegin.bind(this)} 
        //showQuickInfo={false} 
        quickInfoTemplates={{
                        header: headerTemplate.bind(this),
                        content: contentTemplate.bind(this),
                        footer: footerTemplate.bind(this)
                    }}
        eventRendered={onEventRendered.bind(this)}
        eventSettings={{ dataSource: props ,
                        enableTooltip: true,
                        tooltipTemplate: template.bind(this)}}>
            <ViewsDirective>
                <ViewDirective option='Day' startHour='08:00' endHour='21:05'/>                    
                <ViewDirective option='WorkWeek' startHour='08:00' endHour='21:05'/>
                <ViewDirective option='Month' showWeekend={true}/>
                <ViewDirective option='Agenda'/>
            </ViewsDirective>                
            <Inject services={[Day, WorkWeek, Month, Agenda]}/>
        </ScheduleComponent>
    </div>);
};

export default BookingSelect;