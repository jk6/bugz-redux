import React, { Component } from "react";
import { connect } from "react-redux";
import cuid from "cuid";
import fecha from "fecha";
import { toggleTicketModal } from "../actions/modals";
import {
  toggleTicketStatus,
  toggleSelectedTicketStatus,
} from "../actions/tickets";
import { createComment } from "../actions/comments";
import Modal from "react-bootstrap/lib/Modal";
import TicketInfo from "./TicketInfo";
import NewReplyForm from "./NewReplyForm";
import TicketDiscussion from "./TicketDiscussion";

class TicketDiscussionModal extends Component {
  constructor(props) {
    super(props);

    this.handleToggleShowTicketModal =
      this.handleToggleShowTicketModal.bind(this);
    this.handleToggleTicketStatus = this.handleToggleTicketStatus.bind(this);
    this.handleReply = this.handleReply.bind(this);
  }

  handleToggleShowTicketModal(e) {
    e.preventDefault();

    this.props.toggleTicketModal(!this.props.showTicketModal);
  }

  handleToggleTicketStatus() {
    const { tickets, ticket } = this.props;
    let newStatus = ticket.status == "open" ? "closed" : "open";
    let idx = tickets.findIndex((ticket) => ticket.id == this.props.ticket.id);

    this.props.toggleTicketStatus(tickets, newStatus, idx);
    this.props.toggleSelectedTicketStatus(ticket, newStatus);
  }

  handleReply(comment) {
    if (comment.trim() != "") {
      let newComment = {
        id: cuid(),
        ticketId: this.props.ticket.id,
        date: fecha.format(new Date(), "YYYY-MM-DD - hh:mm"),
        user: this.props.user.name,
        imgUrl: this.props.user.imgUrl,
        comment,
      };

      this.props.createComment(newComment);
    }
  }

  render() {
    const { showTicketModal, comments, ticket } = this.props;

    const { devMode } = this.props.user;

    let conversationDisplay = comments
      .filter((comment, i) => comment.ticketId == ticket.id)
      .map((comment, i) => <TicketDiscussion key={i} {...comment} />);

    return (
      <Modal show={showTicketModal} onHide={this.close}>
        <Modal.Header style={styles.header}>
          <Modal.Title>
            <i className="glyphicon glyphicon-file"></i>
            Ticket # {ticket.id}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={styles.modalBodyStyle}>
          {ticket.id != "" && (
            <div className="row">
              <div className="col-md-2">&nbsp;</div>
              <div className="col-md-8">
                <TicketInfo
                  devMode={devMode}
                  {...ticket}
                  handleToggleTicketStatus={this.handleToggleTicketStatus}
                />
              </div>
              <div className="col-md-4">&nbsp;</div>
            </div>
          )}
          <br />
          {ticket.id != "" && ticket.status != "closed" && (
            <div className="row">
              <div className="col-md-10 col-md-offset-1">
                <NewReplyForm handleReply={this.handleReply} />
                <hr style={styles.hrColor} />
              </div>
            </div>
          )}
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
              onClick={this.handleToggleShowTicketModal}
            >
              Close
            </button>
          </span>
        </Modal.Footer>
      </Modal>
    );
  }
}

const styles = {
  header: {
    backgroundColor: "#333",
    borderColor: "#666",
    color: "white",
  },
  modalBodyStyle: {
    overflowX: "hidden",
    backgroundColor: "#333",
    color: "white",
  },
  button: {
    backgroundColor: "#333",
    borderColor: "#666",
    color: "white",
  },
  hrColor: {
    borderColor: "#666",
  },
};

const mapStateToProps = (state) => {
  return {
    showTicketModal: state.showTicketModal,
    user: state.user,
    tickets: state.tickets,
    comments: state.comments,
    app: state.app,
    ticket: state.ticket,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    toggleTicketModal: (bool) => dispatch(toggleTicketModal(bool)),
    toggleTicketStatus: (tickets, newStatus, idx) => {
      return dispatch(toggleTicketStatus(tickets, newStatus, idx));
    },
    toggleSelectedTicketStatus: (ticket, newStatus) => {
      return dispatch(toggleSelectedTicketStatus(ticket, newStatus));
    },
    createComment: (comment) => dispatch(createComment(comment)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TicketDiscussionModal);
