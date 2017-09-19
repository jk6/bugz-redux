import React, { Component } from 'react';
import TicketEntry from './TicketEntry';

//const TicketHistoryDisplay = (props) => {   
class TicketHistoryDisplay extends Component {
    constructor (props){
        super (props);        
    }
    sendHandleTicketClick (ticket, app) {
        //this.props.handleTicketClick.bind(this, ticket, app);
        const { id, status, date, openedBy, issue } = ticket;
        const { appId } = this.props;

        this.props.selectTicket(id, appId, app, date, openedBy, issue, status);
        this.props.handleToggleShowTicketModal();
    };

    render (){
        const { apps, tickets, comments } = this.props;

        let ticketsDisplay = tickets.map((ticket, i) => {            
            let appName = apps.filter(app => app.id == ticket.appId)
                .map(app => app.name)[0];
    
            let openedBy = tickets.filter(ticket => ticket.id == this.props.ticket.id)
                .map(ticket => ticket.openedBy);
            
            //var boundClick = handleTicketClick.bind(this, ticket.id, app, openedBy);
    
            var boundClick = this.sendHandleTicketClick.bind(this, ticket, appName);
    
            let commentCount = comments.filter(comment => comment.ticketId == ticket.id).length;
    
            let totalLength = 65;
            let totalTextLength = Number(String(appName).length) + Number(String(ticket.issue.length));
            let availIssueLength = totalLength - Number(String(appName).length);
    
            let displayIssue = totalTextLength <= 65 ? ticket.issue : `${ticket.issue.substr(0, availIssueLength)}...`;
    
            let display = <TicketEntry 
                            key={i}
                            appName={appName}
                            commentCount={commentCount}
                            displayIssue={displayIssue}
                            />;      
    
            return <li 
                        key={i} 
                        className="list-group-item"
                        onClick={boundClick}
                    >
                    {display}
                    </li>;
            });            
            
            return (                           
                    <ul className="list-group" style={styles.tickets}>
                        {ticketsDisplay}                
                    </ul>                         
            );
    }
    
}

const styles = {
    tickets: {
        cursor: 'pointer'
      },
};

export default TicketHistoryDisplay;