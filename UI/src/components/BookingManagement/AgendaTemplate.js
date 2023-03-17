const AgendaTemplate = ({props,intl}) => {

    function getTimeString(value) {
        return intl.formatDate(value, { skeleton: 'Hm' });
    }

    return (<div><div className="subject ">{props.FirstName} {props.LastName}</div>
    {(props.Description !== null && props.Description !== undefined && props.Description !== "") ?
              <div className="group">{props.Description}</div> : ""}
    <div className="location">{getTimeString(props.StartTime)}
      {(props.Location !== null && props.Location !== undefined && props.Location !== "") ? ", Workspace: " + props.Location + " Campus: "+props.CampusNumber : "" }</div></div>);
};
  
export default AgendaTemplate;