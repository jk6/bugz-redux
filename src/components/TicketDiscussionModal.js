import React, { Component } from 'react';
import Modal from 'react-bootstrap/lib/Modal';
import TicketInfo from './TicketInfo';
import NewReplyForm from './NewReplyForm';
import TicketDiscussion from './TicketDiscussion';

class TicketDiscussionModal extends Component {
    constructor (props){
        super (props);

        this.sendHandleToggleShowTicketModal = this.sendHandleToggleShowTicketModal.bind(this);        
    }

    sendHandleToggleShowTicketModal (e){
        e.preventDefault();

        this.props.handleToggleShowTicketModal();
    }

    render () {
        const { 
            show,
            devMode,
            currentTicketId,
            handleToggleTicketStatus,
            selectedTicketStatus,
            handleReply,            
            comments,               
            app, 
            openedDate,
            openedBy,        
            issue
        } = this.props;        

        let conversationDisplay = comments.filter((comment, i) => comment.ticketId == currentTicketId)
            .map((comment, i) => {
                return <TicketDiscussion 
                            key={i}
                            id={comment.id}
                            imgUrl={comment.imgUrl}
                            user={comment.user}
                            comment={comment.comment}
                            date={comment.date}
                        />;
            });

        return (
            <Modal show={show} onHide={this.close}>
                <Modal.Header style={styles.header}>
                    <Modal.Title>
                        <i className="glyphicon glyphicon-file"></i>
                        Ticket # {currentTicketId}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body style={styles.modalBodyStyle}>
                    {currentTicketId != '' && 
                    <div className="row">
                        <div className="col-md-2">
                            &nbsp;
                        </div>          
                        <div className="col-md-8">                               
                            <TicketInfo 
                                currentTicketId={currentTicketId}
                                openedBy={openedBy}
                                openedDate={openedDate}
                                app={app}
                                issue={issue}
                                devMode={devMode}
                                selectedTicketStatus={selectedTicketStatus}
                                handleToggleTicketStatus={this.props.handleToggleTicketStatus}
                            />                                               
                        </div>
                        <div className="col-md-4">
                            &nbsp;
                        </div>
                    </div>}          
                    <br />
                    {currentTicketId != '' && selectedTicketStatus != 'closed' &&
                        <div className="row">
                            <div className="col-md-10 col-md-offset-1">                 
                                <NewReplyForm 
                                    handleReply={this.props.handleReply}
                                />
                                <hr style={styles.hrColor} />
                            </div>          
                        </div>}
                    <div className="row">
                        <div className="col-md-10 col-md-offset-1">
                            <h4 className="text-muted">Discussion</h4>
                            <ul className="list-group">              
                                <br />
                                {conversationDisplay}            
                            </ul>          
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer style={styles.header}>
                    <span>                                                
                        <button
                            className="btn btn-default"  
                            style={styles.button} 
                            onClick={this.sendHandleToggleShowTicketModal}
                        >
                            Close
                        </button>
                    </span>                    
                </Modal.Footer>                
            </Modal>
        );
    }
};

const styles = {
    header: {
        backgroundColor: '#333',
        borderColor: '#666',
        color: 'white'
    },
    modalBodyStyle: {
        overflowX: 'hidden',
        backgroundColor: '#333',
        color: 'white'
    },    
    button: {
        backgroundColor: '#333',
        borderColor: '#666',
        color: 'white'
    },
    hrColor: {
        borderColor: '#666'
    }
};

export default TicketDiscussionModal;