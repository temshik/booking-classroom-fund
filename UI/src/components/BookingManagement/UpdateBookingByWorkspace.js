import { DateTimePickerComponent } from '@syncfusion/ej2-react-calendars';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';

const UpdateBookingByWorkspace = ({props, value, startObj}) => {

  return ((props !== undefined) ? <table className="custom-event-editor" style={{ width: '100%' }} cellPadding={5}><tbody>
  <tr><td className="e-textlabel">User email</td><td colSpan={4}>
    <input 
        id="Subject" 
        className="e-field e-input" 
        type="email" 
        defaultValue={props.Subject === 'Add title' ? null : props.Subject}                        
        name="Subject" 
        style={{ width: '100%' }}
    />
  </td></tr>
  <tr><td className="e-textlabel">Campus number</td><td colSpan={4}>
    <input 
        id="CampusNumber" 
        className="e-field e-input" 
        type="number"         
        defaultValue={props.CampusNumber? props.CampusNumber : value.campusNumber || null} 
        name="CampusNumber" 
        min={1}
        style={{ width: '100%' }}
    />
  </td></tr>
  <tr><td className="e-textlabel">Workspace number</td><td colSpan={4}>
    <input 
        id="Location" 
        className="e-field e-input" 
        type="number"         
        defaultValue={props.Location? props.Location : value.workspaceNumber || null} 
        name="Location" 
        min={1}
        style={{ width: '100%' }}
    />
  </td></tr>
  <tr><td className="e-textlabel">Number of week</td><td colSpan={4}>
    <DropDownListComponent 
        id="EventType"
        data-name='EventType'        
        className="e-field"
        placeholder={'Select number of week'}
        value = {props.NumberOfWeek || ''}                       
        style={{ width: '100%' }}
        dataSource={['1', '2']}>
    </DropDownListComponent>
  </td></tr>
  <tr><td className="e-textlabel">Start</td><td colSpan={4}>
    <DateTimePickerComponent
        id="StartTime"
        format='dd/MM/yy hh:mm a'
        data-name="StartTime"
        //ref={(date) => { startObj = date; }}
        required
        value={new Date(props.startTime || props.StartTime)}
        className="e-field"></DateTimePickerComponent>
  </td></tr> 
  <tr><td className="e-textlabel">Group number</td><td colSpan={4}>
    <input 
        id="Description" 
        className="e-field e-input" 
        type="number"                
        defaultValue={props.Description || null}         
        name="Description" 
        min={1}
        style={{ width: '100%' }}
    />
  </td></tr></tbody></table> : <div></div>);
};

export default UpdateBookingByWorkspace;