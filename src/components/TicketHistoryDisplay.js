import React, { Component } from 'react';
import { connect } from 'react-redux';
import { toggleTicketModal } from '../actions/modals';
import { selectTicket } from '../actions/tickets';
import TicketEntry from './TicketEntry';

//const TicketHistoryDisplay = (props) => {   
class TicketHistoryDisplay extends Component {
    constructor (props){
        super (props);     
        
        this.handleToggleShowTicketModal = this.handleToggleShowTicketModal.bind(this);
    }

    handleToggleShowTicketModal (){    
        this.props.toggleTicketModal(!this.props.showTicketModal);
    }
    handleTicketClick (ticket, appName) {        
        const { id, status, date, openedBy, issue } = ticket;
        const { appSelected, selected } = this.props.app;

        this.props.selectTicket(id, selected, appName, date, openedBy, issue, status);
        this.handleToggleShowTicketModal();
    };

    render (){
        const { apps, tickets, comments } = this.props;        

        let ticketsDisplay = tickets.map((ticket, i) => {            
            let appName = apps.filter(app => app.id == ticket.appId)
                .map(app => app.name)[0];
    
            let openedBy = tickets.filter(ticket => ticket.id == this.props.ticket.id)
                .map(ticket => ticket.openedBy);                        
    
            var boundClick = this.handleTicketClick.bind(this, ticket, appName);
    
            let commentCount = comments.filter(comment => comment.ticketId == ticket.id).length;
    
            const totalLength = 65;
            let totalTextLength = Number(String(appName).length) + Number(String(ticket.issue.length));
            let availIssueLength = totalLength - Number(String(appName).length);
    
            let displayIssue = totalTextLength <= totalLength ? ticket.issue : `${ticket.issue.substr(0, availIssueLength)}...`;
    
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

const mapStateToProps = (state) => {
    return {
        showTicketModal: state.showTicketModal,
        comments: state.comments,
        tickets: state.tickets,
        apps: state.apps,
        ticket: state.ticket,
        app: state.app
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        toggleTicketModal: (bool) => dispatch(toggleTicketModal(bool)),
        selectTicket: (id, appId, app, date, openedBy, issue, status) => {
            return dispatch(selectTicket(id, appId, app, date, openedBy, issue, status))
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TicketHistoryDisplay);