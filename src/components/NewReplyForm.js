import React, { Component } from "react";

class NewReplyForm extends Component {
  constructor(props) {
    super(props);

    this.sendHandleReply = this.sendHandleReply.bind(this);
  }

  sendHandleReply(e) {
    e.preventDefault();

    let newReply = this.reply.value;

    this.props.handleReply(newReply);

    document.getElementById("reply").value = "";
  }

  render() {
    return (
      <div>
        <form>
          <h4 className="text-muted">
            Add a Reply&nbsp;&nbsp;
            <i className="glyphicon glyphicon-comment"></i>
          </h4>
          <br />
          <textarea
            id="reply"
            className="form-control"
            placeholder="reply..."
            ref={(text) => (this.reply = text)}
            style={styles.textArea}
            width="200"
            rows="5"
          />
          <br />
          <button
            className="btn btn-primary"
            style={styles.button}
            onClick={this.sendHandleReply}
          >
            Reply
          </button>
        </form>
      </div>
    );
  }
}

const styles = {
  textArea: {
    resize: "none",
  },
  button: {
    backgroundColor: "#333",
    borderColor: "#666",
    color: "white",
  },
};

export default NewReplyForm;
