const Template = ({props}) => {
    return (<div className="tooltip-wrap">        
        <div className="content-area">
            <div className="event-name">Email: {props.Subject}</div>
            <div className="event-name">Workspace: {props.Location}</div>
            <div className="event-name">GroupNumber: {props.Description}</div>
        {(props.NumberOfWeek !== null && props.NumberOfWeek !== undefined) ?
         <div className="NumberOfWeek">Number of week: {props.NumberOfWeek}</div> : ''}
        <div className="time">From&nbsp;:&nbsp;{props.StartTime.toLocaleString()}</div>
        <div className="time">To&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;{props.EndTime.toLocaleString()}</div>
      </div></div>);
};

export default Template;