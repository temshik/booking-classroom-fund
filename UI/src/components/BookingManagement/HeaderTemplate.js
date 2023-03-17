const HeaderTemplate = ({props,intl}) => {
    function getHeaderStyles(data) {
        if (data.elementType === 'cell') {
            return { alignItems: 'center', color: 'black' };
        }
        else {            
            return { background: '#008a5e' };
        }
    }

    function getHeaderTitle(data) {
        return (data.elementType === 'cell') ? 'Create Booking' : 'Booking Details';
    }

    function getHeaderDetails(data) {
        return intl.formatDate(data.StartTime, { type: 'date', skeleton: 'full' }) + ' (' +
            intl.formatDate(data.StartTime, { skeleton: 'hm' }) + ' - ' +
            intl.formatDate(data.EndTime, { skeleton: 'hm' }) + ')';
    }

    return (
    <div className="quick-info-header">
        <div className="quick-info-header-content" style={getHeaderStyles(props)}>
            <div className="quick-info-title">{getHeaderTitle(props)}</div>
            <div className="duration-text">{getHeaderDetails(props)}</div>
        </div>
    </div>);
};

export default HeaderTemplate;