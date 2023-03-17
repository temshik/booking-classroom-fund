const EventTemplate = ({props,intl}) => {
    function getTimeString(value) {
        return intl.formatDate(value, { skeleton: 'hm' });
    }

    return (<div className="template-wrap" style={{ background: props.SecondaryColor }}>
      <div className="subject" style={{ background: props.PrimaryColor }}>{props.LastName} {props.FirstName}</div>      
      <div className="time" style={{ background: props.PrimaryColor }}>
        Time: {getTimeString(props.StartTime)} - {getTimeString(props.EndTime)}</div> 
        <div className="event-description">Campus: {props.CampusNumber} Workspace: {props.Location}</div>     
      <div className="event-description">Group: {props.Description}</div>
      <div className="footer" style={{ background: props.PrimaryColor }}></div></div>);
};

export default EventTemplate;