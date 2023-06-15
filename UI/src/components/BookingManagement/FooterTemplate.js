import { ButtonComponent } from '@syncfusion/ej2-react-buttons';
import {isNullOrUndefined, closest} from '@syncfusion/ej2-base';

const FooterTemplate = ({props,scheduleObj,titleObj,notesObj,eventTypeObj}) => {
    function buttonClickActions(e) {
        const quickPopup = closest(e.target, '.e-quick-popup-wrapper');
        const getSlotData = () => {
            const addObj = {};
            addObj.Id = scheduleObj.current.getEventMaxID();
            addObj.Subject = isNullOrUndefined(titleObj) ? 'Add title' : titleObj;
            addObj.StartTime = new Date(scheduleObj.current.activeCellsData.startTime);
            addObj.EndTime = new Date(scheduleObj.current.activeCellsData.endTime);
            addObj.IsAllDay = scheduleObj.current.activeCellsData.isAllDay;
            addObj.Description = isNullOrUndefined(notesObj) ? 'Add notes' : notesObj;
            addObj.RoomId = eventTypeObj;
            return addObj;
        };
        if (e.target.id === 'add') {
            const addObj = getSlotData();
            scheduleObj.current.addEvent(addObj);
        }
        else if (e.target.id === 'delete') {
            const eventDetails = scheduleObj.current.activeEventData.event;
            let currentAction = 'Delete';
            if (eventDetails.RecurrenceRule) {
                currentAction = 'DeleteSeries';
            }
            scheduleObj.current.deleteEvent(eventDetails, currentAction);
        }
        else {
            const isCellPopup = quickPopup.firstElementChild.classList.contains('e-cell-popup');
            const eventDetails = isCellPopup ? getSlotData() : 
                scheduleObj.current.activeEventData.event;
            let currentAction = isCellPopup ? 'Add' : 'Save';
            if (eventDetails.RecurrenceRule) {
                currentAction = 'EditSeries';
            }
            scheduleObj.current.openEditor(eventDetails, currentAction, true);            
        }
        scheduleObj.current.closeQuickInfoPopup();
    }

    return (<div className="quick-info-footer">
                {props.elementType == "cell" ?
                <div className="cell-footer">
                        <ButtonComponent id="more-details" cssClass='e-flat' content="Add" onClick={buttonClickActions.bind(this)}/>
                        {/* <ButtonComponent id="add" cssClass='e-flat' content="Add" isPrimary={true} onClick={buttonClickActions.bind(this)}/> */}
                    </div>
                :
                    <div className="event-footer">
                        <ButtonComponent id="delete" cssClass='e-flat' content="Delete" isPrimary={true} onClick={buttonClickActions.bind(this)}/>
                        <ButtonComponent id="more-details" cssClass='e-flat' content="Edit" onClick={buttonClickActions.bind(this)}/>
                    </div>}
            </div>);
};

export default FooterTemplate;