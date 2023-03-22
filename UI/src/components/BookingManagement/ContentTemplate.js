import { TextBoxComponent } from '@syncfusion/ej2-react-inputs';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import UpdateBooking from './UpdateBooking';

const ContentTemplate = ({props, titleObj,notesObj,eventTypeObj}) => {
    return (<div className="quick-info-content">
    {props.elementType === 'cell' ?
    <div className="e-cell-content">
            {/* <div className="content-area">
                <TextBoxComponent id="title" ref={(textbox) => titleObj = textbox} placeholder="Title"/>
            </div>
            <div className="content-area">
                <DropDownListComponent id="eventType" ref={(ddl) => eventTypeObj = ddl} dataSource={[]} fields={{ text: "Name", value: "Id" }} placeholder="Choose Type" index={0} popupHeight="200px"/>
            </div>
            <div className="content-area">
                <TextBoxComponent id="notes" ref={(textbox) => notesObj = textbox} placeholder="Notes"/>
            </div> */}
            {/* <UpdateBooking props={props}/> */}
        </div>
    :
        <div className="event-content">
            <div className="meeting-subject-wrap">
                <label>First Name:</label>
                <span> {props.FirstName}</span>
            </div>
            <div className="meeting-subject-wrap">
                <label>Last Name:</label>
                <span> {props.LastName}</span>
            </div>
            <div className="meeting-subject-wrap">
                <label>User Name:</label>
                <span> {props.UserName}</span>
            </div>
            <div className="meeting-subject-wrap">
                <label>Email:</label>
                <span> {props.Subject}</span>
            </div>      
            <div className="meeting-subject-wrap">
                <label>Campus №</label>:
                <span> {props.CampusNumber}</span>
            </div>      
            <div className="meeting-subject-wrap">
                <label>Workspace №</label>:
                <span> {props.Location}</span>
            </div>            
            <div className="meeting-subject-wrap">
                <label>Group №</label>:
                <span> {props.Description}</span>
            </div>
            <div className="notes-wrap">
                <label>Number of week</label>:
                <span> {props.NumberOfWeek}</span>
            </div>
        </div>}
</div>);
};

export default ContentTemplate;