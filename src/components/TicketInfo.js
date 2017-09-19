import React from 'react'

const TicketInfo = (props) => {    
    const sendHandleToggleTicketStatus = (e) => {
        e.preventDefault();

        props.handleToggleTicketStatus();        
    };
    
    const { currentTicketId, openedBy, openedDate, app, devMode, issue, selectedTicketStatus } = props;

    return (
        <div>
            <h4><span className="text-muted">Ticket# {currentTicketId}</span></h4>
            <h4><span className="text-muted">Opened By:</span> {openedBy}</h4>
            <h4><span className="text-muted">Opened Date:</span> {openedDate}</h4>
            <h4><span className="text-muted">App:</span> {app}</h4>
            <h4><span className="text-muted">Status:</span> {selectedTicketStatus}</h4>
            <hr style={styles.hrColor} />
            <h4><span className="text-muted">Issue:</span></h4>
            <p>{issue}</p>
            <hr style={styles.hrColor} />
            {devMode &&
                <button
                    className="btn btn-default"
                    style={styles.button}
                    onClick={sendHandleToggleTicketStatus}
                >
                {selectedTicketStatus == 'open' ? 'Close Issue' : 'Reopen Issue'}
            </button>}
        </div>
    );
};

const styles = {
    button: {
        backgroundColor: '#333',
        borderColor: '#666',
        color: 'white'
    },
    hrColor: {
        borderColor: '#666'
    }
};

export default TicketInfo;