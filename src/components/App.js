import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadFetchUser } from '../actions/user';
import { loadFetchApps } from '../actions/apps';
import { loadFetchComments } from '../actions/comments';
import { loadFetchTickets } from '../actions/tickets';
import NewBugForm from './NewBugForm';
import NewReplyForm from './NewReplyForm';
import TicketHistoryDisplay from './TicketHistoryDisplay';
import TicketDiscussion from './TicketDiscussion';
import TicketDiscussionModal from './TicketDiscussionModal';
import Footer from './Footer';

//import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/less/bootstrap.less';

class App extends Component {
  constructor (props){
    super (props);

    this.loadData = this.loadData.bind(this);                        
  }

  loadData (){ 
    this.props.loadFetchUser('http://localhost:3001/user');
    this.props.loadFetchApps('http://localhost:3001/apps');
    this.props.loadFetchTickets('http://localhost:3001/tickets');
    this.props.loadFetchComments('http://localhost:3001/comments');
  }

  componentDidMount (){
    this.loadData();
  }
  render() {          
    //const { name, username /*, devMode*/ } = this.props.user;    
    
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
              <NewBugForm />
            </div>
            <div className="col-md-6">
              <h4 className="text-muted">
                Recent Ticket History&nbsp;&nbsp;
                <i className="glyphicon glyphicon-tag"></i>
              </h4>
              <hr />            
              <TicketHistoryDisplay />
            </div>            
          </div> 
        </div> 
        <br />
        <TicketDiscussionModal />                
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
  logo: {
    height: '120px',
    width: '120px'
  }  
};

const mapStateToProps = (state) => {
  /*return {
    user: state.user    
  };*/
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadFetchApps: (url) => dispatch(loadFetchApps(url)),
    loadFetchUser: (url) => dispatch(loadFetchUser(url)),
    loadFetchTickets: (url) => dispatch(loadFetchTickets(url)),
    loadFetchComments: (url) => dispatch(loadFetchComments(url))         
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);