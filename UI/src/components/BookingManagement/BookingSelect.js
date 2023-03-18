import React from "react";
import { ScheduleComponent, Day, WorkWeek, Month, Agenda, Inject, ViewsDirective, ViewDirective, ResourceDirective, ResourcesDirective} from '@syncfusion/ej2-react-schedule';
import {Browser, L10n, isNullOrUndefined, Internationalization} from '@syncfusion/ej2-base';
import { Query, Predicate } from '@syncfusion/ej2-data';
import UpdateBooking from "./UpdateBooking";
import Template from "./Template";
import HeaderTemplate from "./HeaderTemplate";
import ContentTemplate from "./ContentTemplate";
import FooterTemplate from "./FooterTemplate";
import EventTemplate from "./EventTemplate";
import AgendaTemplate from "./AgendaTemplate";
import './BookingSelect.scss'
import PrintSchedule from "./PrintSchedule";
import { faTruckMedical } from "@fortawesome/free-solid-svg-icons";

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

const Email_Regex = "(?:[a-zA-Z0-9]+\.)+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$";

const BookingSelect = ({props, selectedDate}) => {
    let scheduleObj;
    let startObj;
    let endObj;
    let eventTypeObj;
    let titleObj;
    let notesObj;   
    let profilePopup;
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

    function eventTemplate(props) {
        return (<EventTemplate
            props={props}             
            intl={intl}
        />);
    }    

    function agendaTemplate(props) {
        return (<AgendaTemplate
            props={props}
            intl={intl}
        />);
    }
    
    function onSelect(args) {
        if (!isNullOrUndefined(document.getElementById("EventType_Error"))) {
            document.getElementById("EventType_Error").style.display = "none";
        }
    }

    function onPopupOpen(args) {    
        if (args.target && !args.target.classList.contains('e-appointment') && !isNullOrUndefined(titleObj)) {
            titleObj.focusIn();
        }    
        if (args.type === 'Editor') {
            // let subjectElement = args.element.querySelector('#Subject');
            // if (subjectElement) {
            //     subjectElement.value = args.data.Subject || "";
            // }
            // let descriptionElement = args.element.querySelector('#Description');
            // if (descriptionElement) {
            //     descriptionElement.value = args.data.Description || "";
            // }                       
            if (!isNullOrUndefined(document.getElementById("Subject_Error"))) {
                document.getElementById("Subject_Error").style.display = "none";
                document.getElementById("Subject_Error").style.left = "351px";
            }
            let subjectElement = args.element.querySelector('.e-schedule-form');
            let subjectValidator = subjectElement.ej2_instances[0];
            subjectValidator.addRules('Subject', { required: true,
                regex: [Email_Regex, 'Should be a valid email address.'] });     
            
            if (!isNullOrUndefined(document.getElementById("Description_Error"))) {
                document.getElementById("Description_Error").style.display = "none";
                document.getElementById("Description_Error").style.left = "351px";
            }
            let descriptionElement = args.element.querySelector('.e-schedule-form');
            let descriptionValidator = descriptionElement.ej2_instances[0];
            descriptionValidator.addRules('Description', { required: true, minLength: 8, maxLength: 8, min: 1});

            if (!isNullOrUndefined(document.getElementById("EventType_Error"))) {
                document.getElementById("EventType_Error").style.display = "none";
                document.getElementById("EventType_Error").style.left = "351px";
            }
            let eventTypeElement = args.element.querySelector('.e-schedule-form');
            let eventTypeValidator = eventTypeElement.ej2_instances[0];
            eventTypeValidator.addRules('EventType', { required: true, min: 1, max: 2});
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
    
    function applyCategoryColor(args, currentView) {
        switch (args.data.CategoryId) {
            case '1':
                args.element.style.backgroundColor = '#3f51b5'; 
                if (scheduleObj.currentView === 'Agenda') {
                    args.element.firstChild.style.borderLeftColor = args.element.style.backgroundColor;
                }               
                break;
            case '2':
                args.element.style.backgroundColor = '#F57F17';  
                if (scheduleObj.currentView === 'Agenda') {
                    args.element.firstChild.style.borderLeftColor = args.element.style.backgroundColor;
                }                   
                break;
            case '3':
                args.element.style.backgroundColor = '#8e24aa';
                if (scheduleObj.currentView === 'Agenda') {
                    args.element.firstChild.style.borderLeftColor = args.element.style.backgroundColor;
                }     
                break;
            default:
                args.element.style.backgroundColor = '#7fa900';
                break;
        }
    }

    
    function onEventRendered(args) {
        console.log('Прогружает все элементы на стронице', args);
        applyCategoryColor(args, scheduleObj.currentView);      
        console.log({args})
    }

    function onActionBegin(args) {
        console.log('action', args)
        if (args.requestType === 'toolbarItemRendering') {            
            let exportItem = {
                align: 'Center', showTextOn: 'Both', prefixIcon: 'e-icons e-export-excel',
                text: 'Excel Export', cssClass: 'e-excel-export', click: onExportClick.bind(this)
            };
            let printItem = {
                align: 'Center', showTextOn: 'Both', prefixIcon: 'e-icons e-print',
                text: 'Print', cssClass: 'e-print-btn', click: onPrintClick.bind(this)
            };
            args.items.push(exportItem);
            args.items.push(printItem)            
            
        }
        // if (args.requestType === 'eventCreate' || args.requestType === 'eventChange') {
        //     let data = args.data instanceof Array ? args.data[0] : args.data;
        //     args.cancel = !scheduleObj.isSlotAvailable(data.StartTime, data.EndTime);
        // }        
    }     

    function onPrintClick() {
        
    }

    function onExportClick() {
        const exportFields = [
            { name: 'Id', text: 'Id' },
            { name: 'Subject', text: 'Summary' },
            { name: 'StartTime', text: 'Start Date' },
            { name: 'EndTime', text: 'End Date' },
            { name: 'Location', text: 'Place' }
        ];
        const exportValues = { fieldsInfo: exportFields };
        scheduleObj.exportToExcel(exportValues);
    }

    function onActionComplete(args) {
        if (args.requestType === 'eventCreated' || args.requestType === 'eventChanged' || args.requestType === 'eventRemoved') {
            console.log('dev', args)
        }                       
    }

    return (<div>                  
        <ScheduleComponent 
            id="schedule" 
            cssClass='quick-info-template' 
            width='100%'
            currentView="WorkWeek"
            workDays={workDays}
            selectedDate={selectedDate} 
            allowResizing={false}
            //для учителей сделать
            popupOpen={onPopupOpen}
            //popupClose={onPopupClose}
            ref={schedule => scheduleObj = schedule}          
            editorTemplate={editorTemplate.bind(this)}
            actionBegin={onActionBegin.bind(this)} 
            eventRendered={onEventRendered.bind(this)}
            actionComplete={onActionComplete.bind(this)}
            //showQuickInfo={false} 
            quickInfoTemplates={{ header: headerTemplate.bind(this),
                                  content: contentTemplate.bind(this),
                                  footer: footerTemplate.bind(this)}}    
            eventSettings={{ dataSource: props ,
                             enableTooltip: true,
                             tooltipTemplate: template.bind(this)}}>
            <ViewsDirective>
                <ViewDirective option={Browser.isDevice ? 'Day' : 'WorkWeek'} eventTemplate={eventTemplate.bind(this)} startHour='08:00' endHour='21:05'/>
                <ViewDirective option='Month' showWeekend={true}/>
                <ViewDirective option='Agenda' eventTemplate={agendaTemplate.bind(this)}/>
            </ViewsDirective>            
            <Inject services={[Day, WorkWeek, Month, Agenda]}/>
        </ScheduleComponent>         
    </div>);
};

export default BookingSelect;