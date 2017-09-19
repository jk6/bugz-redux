import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadFetchUser } from '../actions/user';
import { loadFetchApps, selectApp } from '../actions/apps';
import { loadFetchComments, createComment } from '../actions/comments';
import { toggleTicketModal } from '../actions/modals';
import { 
  loadFetchTickets, 
  createTicket, 
  selectTicket, 
  toggleTicketStatus,
  toggleSelectedTicketStatus
} from '../actions/tickets';

import cuid from 'cuid';
import fecha from 'fecha';
import NewBugForm from './NewBugForm';
import NewReplyForm from './NewReplyForm';
import TicketHistoryDisplay from './TicketHistoryDisplay';
import TicketDiscussion from './TicketDiscussion';
import TicketDiscussionModal from './TicketDiscussionModal';
import Footer from './Footer';

//import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/less/bootstrap.less';

// needed for IE
//require('jspolyfill-array.prototype.findIndex');
import { findIndex } from 'jspolyfill-array.prototype.findIndex';

class App extends Component {
  constructor (props){
    super (props);

    this.loadData = this.loadData.bind(this);    
    this.handleChange = this.handleChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleReply = this.handleReply.bind(this);    
    this.handleToggleTicketStatus = this.handleToggleTicketStatus.bind(this);
    this.handleToggleShowTicketModal = this.handleToggleShowTicketModal.bind(this);
  }

  loadData (){ 
    this.props.loadFetchUser('http://localhost:3001/user');
    this.props.loadFetchApps('http://localhost:3001/apps');
    this.props.loadFetchTickets('http://localhost:3001/tickets');
    this.props.loadFetchComments('http://localhost:3001/comments');
  }

  handleFormSubmit (issue){
    if (issue.trim() != ''){            
      let newIssue = Object.assign({}, {        
        id: cuid(),
        appId: this.props.app.selected,
        openedBy: this.props.user.name,
        date: fecha.format(new Date(), 'YYYY-MM-DD - hh:mm:ss'),
        issue, 
        status: 'open'      
      });

      this.props.createTicket(newIssue);      
    }
  }

  handleReply (comment){    
    if (comment.trim() != ''){
      let newComment = Object.assign({}, {      
        id: cuid(),
        ticketId: this.props.ticket.id,
        date: fecha.format(new Date(), 'YYYY-MM-DD - hh:mm'),
        user: this.props.user.name,
        imgUrl: this.props.user.imgUrl,
        //imgUrl: 'http://static.tvtropes.org/pmwiki/pub/images/dilbert17.jpg',
        comment      
      });

      this.props.createComment(newComment);      
    }    
  }

  handleChange (e){
    e.preventDefault();

    if (e.target.value != '-1'){      
      this.props.selectApp(e.target.value, true);
    }    
    else {
      this.props.selectApp('', false);
    }
    
    document.getElementById('issue').value = '';
  }

  handleToggleShowTicketModal (){    
    this.props.toggleTicketModal(!this.props.showTicketModal);
  }

  handleToggleTicketStatus (){
    const { tickets, ticket } = this.props;

    let newStatus = ticket.status == 'open' ? 'closed' : 'open';
    
    let idx = tickets.findIndex(ticket => ticket.id == this.props.ticket.id);    
    
    this.props.toggleTicketStatus(tickets, newStatus, idx);    
    this.props.toggleSelectedTicketStatus(ticket, newStatus);
  }
  
  componentDidMount (){
    this.loadData();
  }
  render() {    
    const { tickets, apps, comments, showTicketModal } = this.props;
    const { name, username, devMode } = this.props.user;
    const { appSelected, selected } = this.props.app;
    const { id, app, status, issue, date, openedBy } = this.props.ticket;    
    
    return (
      <div style={styles.app}>
        <div className="jumbotron" style={styles.jumbotron}>          
          <img src="../../images/bugz.jpg" className="img img-circle" style={styles.logo} alt="" />&nbsp;
          <h2 style={{color: 'white'}}>BugZ</h2>          
        </div>
        <div className="row">
          &nbsp;
        </div>
        <div className="container">        
          <br />                    
          <br />
          <div className="row">
            <div className="col-md-6">              
              <NewBugForm 
                apps={apps}
                appSelected={appSelected}                
                handleChange={this.handleChange} 
                handleFormSubmit={this.handleFormSubmit}
              />
            </div>
            <div className="col-md-6">
              <h4 className="text-muted">Recent Ticket History&nbsp;&nbsp;<i className="glyphicon glyphicon-tag"></i></h4>
              <hr />            
              <TicketHistoryDisplay
                handleTicketClick={this.handleTicketClick}
                selectTicket={this.props.selectTicket}
                handleToggleShowTicketModal={this.handleToggleShowTicketModal}
                tickets={tickets}
                ticket={this.props.ticket}
                comments={comments}
                apps={apps}
                appId={selected}
              />
            </div>            
          </div> 
        </div> 
        <br />
        <TicketDiscussionModal 
          show={showTicketModal}
          devMode={devMode}
          currentTicketId={id}
          handleToggleTicketStatus={this.handleToggleTicketStatus}
          selectedTicketStatus={status}
          handleReply={this.handleReply}          
          comments={comments}
          handleToggleShowTicketModal={this.handleToggleShowTicketModal}          
          app={app}   
          openedDate={date}       
          openedBy={openedBy}
          issue={issue}
        />                
        <Footer />
      </div>                
    );
  }
}

const styles = {
  jumbotron: {
    backgroundColor: '#333',
    textAlign: 'center'
  },
  app: {
    overflowX: 'hidden'
  },
  appText: {
    textAlign: 'center'
  },  
  tickets: {
    cursor: 'pointer'
  },  
  logo: {
    height: '120px',
    width: '120px'
  },
  textArea: {
    resize: 'none'
  },
  comments: {
    textAlign: 'left'
  }
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
    tickets: state.tickets,
    apps: state.apps,
    comments: state.comments,
    app: state.app,
    ticket: state.ticket,
    showTicketModal: state.showTicketModal
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadFetchApps: (url) => dispatch(loadFetchApps(url)),
    loadFetchUser: (url) => dispatch(loadFetchUser(url)),
    loadFetchTickets: (url) => dispatch(loadFetchTickets(url)),
    loadFetchComments: (url) => dispatch(loadFetchComments(url)),
    createTicket: (ticket) => dispatch(createTicket(ticket)),
    createComment: (comment) => dispatch(createComment(comment)),
    selectApp: (app, bool) => dispatch(selectApp(app, bool)),
    selectTicket: (id, appId, app, date, openedBy, issue, status) => {
      return dispatch(selectTicket(id, appId, app, date, openedBy, issue, status))
    },
    toggleTicketStatus: (tickets, newStatus, idx) => {
      return dispatch(toggleTicketStatus(tickets, newStatus, idx))
    },
    toggleSelectedTicketStatus: (ticket, newStatus) => {
      return dispatch(toggleSelectedTicketStatus(ticket, newStatus))
    },
    toggleTicketModal: (bool) => dispatch(toggleTicketModal(bool))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);