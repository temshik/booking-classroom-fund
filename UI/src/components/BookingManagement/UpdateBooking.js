import { DateTimePickerComponent } from '@syncfusion/ej2-react-calendars';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';

const UpdateBooking = ({props}) => {
    
    return ((props !== undefined) ? <table className="custom-event-editor" style={{ width: '100%' }} cellPadding={5}><tbody>
  <tr>{console.log('props',{props})}<td className="e-textlabel">User email</td><td colSpan={4}>
    <input 
        id="Subject" 
        className="e-field e-input" 
        type="number" 
        onChange={console.log("[eq")} 
        defaultValue={props.User || null} 
        required 
        name="Subject" 
        style={{ width: '100%' }}
    />
  </td></tr>
  <tr><td className="e-textlabel">Workspace number</td><td colSpan={4}>
    <input 
        id="Location" 
        className="e-field e-input" 
        type="number" 
        onChange={console.log("[eq")} 
        defaultValue={props.Workspace || 1} 
        required 
        min={1} 
        max={999} 
        name="Location" 
        style={{ width: '100%' }}
    />
  </td></tr>
  <tr><td className="e-textlabel">Number of week</td><td colSpan={4}>
    <DropDownListComponent 
        id="EventType"
        placeholder='Choose number of week'
        data-name='EventType'
        className="e-field"
        value = {props.NumberOfWeek || null}
        required
        style={{ width: '100%' }}
        dataSource={['1', '2']}>
    </DropDownListComponent>
  </td></tr>
  <tr><td className="e-textlabel">Start</td><td colSpan={4}>
    <DateTimePickerComponent
        id="StartTime"
        format='dd/MM/yy hh:mm a'
        data-name="StartTime"
        required
        value={new Date(props.startTime || props.StartTime)}
        className="e-field"></DateTimePickerComponent>
  </td></tr> 
  <tr><td className="e-textlabel">Group number</td><td colSpan={4}>
  <input 
        id="Description" 
        className="e-field e-input" 
        type="number" 
        onChange={console.log("[eq")} 
        defaultValue={props.GroupNumber || null} 
        required 
        minLength={8} 
        maxLength={8} 
        name="Description" 
        style={{ width: '100%' }}
  />
  </td></tr></tbody></table> : <div></div>);
};

export default UpdateBooking;