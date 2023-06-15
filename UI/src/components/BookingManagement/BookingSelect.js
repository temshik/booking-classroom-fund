import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { ScheduleComponent, Day, WorkWeek, Month, Agenda, Inject, ViewsDirective, ViewDirective, ExcelExport, Print} from '@syncfusion/ej2-react-schedule';
import {Browser, L10n, isNullOrUndefined, Internationalization} from '@syncfusion/ej2-base';
import { Query, Predicate } from '@syncfusion/ej2-data';
import UpdateBooking from "./UpdateBooking";
import UpdateBookingByWorkspace from "./UpdateBookingByWorkspace";
import Template from "./Template";
import HeaderTemplate from "./HeaderTemplate";
import ContentTemplate from "./ContentTemplate";
import FooterTemplate from "./FooterTemplate";
import EventTemplate from "./EventTemplate";
import AgendaTemplate from "./AgendaTemplate";
import './BookingSelect.scss'
import PrintSchedule from "./PrintSchedule";
import { faTruckMedical } from "@fortawesome/free-solid-svg-icons";
import Configuration from "../../configurations/Configuration";
import utilsAxios from '../../utils/axios';
import ErrorHandler from "../../modules/ErrorHandler";
import Loader from '../../components/Loader/Loader';
import {createBooking, updateBooking, deleteBooking, 
        selectIsBookingLoading, selectIsBookingUpdated, selectIsBookingDeleted,
        selectCreatedBookings, selectUpdatedBookings} from '../../redux/slice/bookingSlice';
import WorkspaceHandler from "../../modules/WorkspaceHandler";

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

const ExcelJS = require('exceljs');
const errorHandler = new ErrorHandler();
const errorWorkspace = new WorkspaceHandler();
const Email_Regex = "(?:[a-zA-Z0-9]+\.)+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$";

const BookingSelect = ({props, bookValue, role, selectedDate, selectData}) => {
    let scheduleObj = useRef(null);
    let startObj;
    let endObj;
    let eventTypeObj;
    let titleObj;
    let notesObj;   
    let profilePopup;
    const intl = new Internationalization();
    const workDays = [1, 2, 3, 4, 5, 6];
    const dispatch = useDispatch();     
    const isBookingUpdated = useSelector(selectIsBookingUpdated);
    const isBookingLoading = useSelector(selectIsBookingLoading);
    const isBookingDeleted = useSelector(selectIsBookingDeleted);
    const updaedBooking = useSelector(selectUpdatedBookings);
    const creactedBooking = useSelector(selectCreatedBookings);
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        if(isBookingDeleted === false || isBookingLoading === false || isBookingUpdated === false)
            setTimeout(() => {setLoading(false)}, 500);
        else setLoading(true);
    },[isBookingUpdated, isBookingLoading, isBookingDeleted])

    useEffect(()=>{
        if(updaedBooking !== null || creactedBooking !== null)
            selectData();            
    },[updaedBooking, creactedBooking])

    function template(props) {
        return (<Template props={props}/>)
    }

    function editorTemplate(props) {
        if (bookValue.id !== null) {
            return (<UpdateBookingByWorkspace props = {props} value={bookValue} startObj={startObj}/>);        
        }
        else
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
    

    function onPopupOpen(args) {    
        if (role==='Teacher'){
            args.cancel = true;
        }
        if (args.target && !args.target.classList.contains('e-appointment') && !isNullOrUndefined(titleObj)) {
            titleObj.focusIn();
        }    
        if (args.type === 'Editor') {                                 
            if (!isNullOrUndefined(document.getElementById("Subject_Error"))) {
                document.getElementById("Subject_Error").style.display = "none";
                document.getElementById("Subject_Error").style.left = "351px";
            }
            let subjectElement = args.element.querySelector('.e-schedule-form');
            let subjectValidator = subjectElement.ej2_instances[0];
            subjectValidator.addRules('Subject', { required: true,
                regex: [Email_Regex, 'Should be a valid email address.'] });     
            //-------------------------------------------------------------------
            if (!isNullOrUndefined(document.getElementById("CampusNumber_Error"))) {
                document.getElementById("CampusNumber_Error").style.display = "none";
                document.getElementById("CampusNumber_Error").style.left = "351px";
            }
            let campusNumberElement = args.element.querySelector('.e-schedule-form');
            let campusNumberValidator = campusNumberElement.ej2_instances[0];
            campusNumberValidator.addRules('CampusNumber', { required: true, min: 1, max: 20});
            //-------------------------------------------------------------------
            if (!isNullOrUndefined(document.getElementById("Location_Error"))) {
                document.getElementById("Location_Error").style.display = "none";
                document.getElementById("Location_Error").style.left = "351px";
            }
            let locationElement = args.element.querySelector('.e-schedule-form');
            let locationValidator = locationElement.ej2_instances[0];
            locationValidator.addRules('Location', { required: true, min: 1, max: 999});
            //-------------------------------------------------------------------
            if (!isNullOrUndefined(document.getElementById("Description_Error"))) {
                document.getElementById("Description_Error").style.display = "none";
                document.getElementById("Description_Error").style.left = "351px";
            }
            let descriptionElement = args.element.querySelector('.e-schedule-form');
            let descriptionValidator = descriptionElement.ej2_instances[0];
            descriptionValidator.addRules('Description', { required: true, minLength: 8, maxLength: 8, min: 1});
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
        applyCategoryColor(args, scheduleObj.currentView);             
    }

    function onActionBegin(args) {    
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
        if (args.requestType === 'eventRemove') {            
            var id;     
            args.data.forEach(element => {
                id = element.Id          
            }); 
            dispatch(deleteBooking(id))                                                 
        }           
    }     

    function onPrintClick() {
        scheduleObj.current.print();
    }

    function onExportClick(props) {        
        const exportFields = [         
            { name: 'FirstName', text: 'First Name' },
            { name: 'LastName', text: 'Last Name' },
            { name: 'UserName', text: 'User Name' },   
            { name: 'Subject', text: 'Email' },
            { name: 'StartTime', text: 'Start' },
            { name: 'EndTime', text: 'End' },
            { name: 'CampusNumber', text: 'Campus number' },
            { name: 'Location', text: 'Workspace number' },
            { name: 'Description', text: 'Group number' },
            { name: 'NumberOfWeek', text: 'Week number' },
        ];        

        const exportValues = { fileName: "Timetable", fieldsInfo: exportFields };
        scheduleObj.current.exportToExcel(exportValues);
        // const workbook = new ExcelJS.Workbook();
        // const sheet = workbook.addWorksheet("My Sheet");
        // //sheet.properties.defaultRowHeight = 80;

        // sheet.columns = [
        //     {
        //         header: "Id",
        //         key: 'id',
        //         width: 10
        //     },
        //     {
        //         header: "Subject",
        //         key: 'subject',
        //         width: 10
        //     },
        // ];

        // sheet.addRow({
        //     id: exportValues.Id,
        //     subject: exportValues.Subject
        // })

        // workbook.xlsx.writeBuffer().then(data => {
        //     const blob = new Blob([data], {
        //         type: "application/vnd.openxmlformats-officedocument.spreadsheet.sheet",
        //     });
        //     const url = window.URL.createObjectURL(blob);
        //     const anchor = document.createElement('a');
        //     anchor.href = url;
        //     anchor.download = 'download.xlsx';
        //     anchor.click();
        //     window.URL.revokeObjectURL(url);
        // })
    }

    function onActionComplete(args) {        
        if (args.requestType === 'eventCreated') {             
            getAxiosData(args).then((items)=>{                
                dispatch(createBooking(items))  
            })                                     
            //window.location.reload();  
        }       
        if (args.requestType === 'eventChanged') {            
            getAxiosData(args).then((items)=>{                
                dispatch(updateBooking(items))  
            })                                     
            //window.location.reload();
        }                    
    }

    async function getAxiosData (args) {     
        var item;     
        args.data.forEach(element => {
            item = element          
        });   
        const data = { email: item.Subject}
        const result = {
            id: args.requestType === 'eventCreated' ? 0 : item.Id,
            userId: 0,
            workspaceId: 0,
            isWorkspaceAvailable: true,
            dayOfWeek: +item.EventType,
            startBookingTime: item.StartTime,
            groupNumber: item.Description
        }           
           
        await utilsAxios.post(Configuration.GetUserByEmail, data).then((data)=>
            result.userId=data.data.id,
            await utilsAxios.get(Configuration.GetWorkspaceByLocation+`/${item.CampusNumber}`+`/${item.Location}`).then((el)=>
                result.workspaceId = el.data.id
            ).catch(errorWorkspace.httpErrorHandler)                 
        ).catch(errorHandler.httpErrorHandler)     
        
        return result
    }

    return (<div>     
        {loading && <Loader/>}             
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
            ref={scheduleObj}          
            editorTemplate={editorTemplate.bind(this)}
            actionBegin={onActionBegin.bind(this)} 
            eventRendered={onEventRendered.bind(this)}
            actionComplete={onActionComplete.bind(this)}
            //showQuickInfo={false} 
            quickInfoTemplates={{ header: headerTemplate.bind(this),
                                  content: contentTemplate.bind(this),
                                  footer: footerTemplate.bind(this)}}    
            eventSettings={{ dataSource: props,
                             enableTooltip: true,
                             tooltipTemplate: template.bind(this)}}>
            <ViewsDirective>
                <ViewDirective option={Browser.isDevice ? 'Day' : 'WorkWeek'} eventTemplate={eventTemplate.bind(this)} startHour='08:00' endHour='21:05'/>
                <ViewDirective option='Month' showWeekend={true}/>
                <ViewDirective option='Agenda' eventTemplate={agendaTemplate.bind(this)}/>
            </ViewsDirective>            
            <Inject services={[Day, WorkWeek, Month, Agenda, ExcelExport, Print]}/>
        </ScheduleComponent>         
    </div>);
};

export default BookingSelect;