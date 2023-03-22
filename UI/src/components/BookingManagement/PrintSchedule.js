import { DatePickerComponent } from '@syncfusion/ej2-react-calendars';
import { ButtonComponent } from '@syncfusion/ej2-react-buttons';
import { CheckBoxComponent } from '@syncfusion/ej2-react-buttons';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import PropertyPane from './PropertyPane';

const PrintSchedule = ({scheduleObj}) => {
    const printHeightAndWidthData = ['auto', '100%', '500px'];
    let printWithOptionsObj;
    let heightObj;
    let widthObj;
    let selectedDateObj;

    function onPrintClick() {
        if (printWithOptionsObj.checked) {
            let printOptions = {
                height: heightObj.value,
                width: widthObj.value,
                selectedDate: selectedDateObj.value
            };
            scheduleObj.print(printOptions);
        }
        else {
            scheduleObj.print();
        }
    }

    function onChange(args) {
        let classList = ['.e-height-row', '.e-width-row', '.e-selected-date-row'];
        for (let i = 0; i < classList.length; i++) {
            let element = document.querySelector(classList[i]);
            if (args.checked) {
                element.classList.remove('e-hide-row');
            }
            else {
                element.classList.add('e-hide-row');
            }
        }
    }

    return (<div>
    <div>
    <PropertyPane title='Properties'>
    <table id='property' title='Properties' className='property-panel-table schedule-print-property-panel'>
      <tbody>
        <tr>
          <td style={{ height: '50px' }}>
            <div>
              <CheckBoxComponent labelPosition="Before" label="Print with options" ref={t => printWithOptionsObj = t} change={onChange.bind(this)}/>
            </div>
          </td>
        </tr>
        <tr className="e-height-row e-hide-row">
          <td>
            <div>
              <DropDownListComponent id="heightElement" placeholder="Height" floatLabelType="Always" ref={t => heightObj = t} value={'auto'} dataSource={printHeightAndWidthData}>
              </DropDownListComponent>
            </div>
          </td>
        </tr>
        <tr className="e-width-row e-hide-row">
          <td>
            <div>
              <DropDownListComponent id="widthElement" placeholder="Width" floatLabelType="Always" ref={t => widthObj = t} value={'auto'} dataSource={printHeightAndWidthData}>
              </DropDownListComponent>
            </div>
          </td>
        </tr>
        <tr className="e-selected-date-row e-hide-row">
          <td>
            <div>
              <DatePickerComponent id="selectedDateElement" placeholder="Selected date" floatLabelType="Always" ref={t => selectedDateObj = t} value={new Date(2021, 0, 10)}/>
            </div>
          </td>
        </tr>
        <tr>
          <td style={{ padding: '15px', textAlign: 'center' }}>
            <div>
              <ButtonComponent iconCss="e-icons e-print" cssClass="e-print-btn" onClick={onPrintClick.bind(this)}>Print</ButtonComponent>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </PropertyPane>
  </div></div>);
};

export default PrintSchedule;