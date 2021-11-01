import React, { Component } from "react";
import { connect } from "react-redux";
import { createTicket } from "./tickets/ticketsActions";
import { selectApp } from "../actions/apps";
import fecha from "fecha";
import cuid from "cuid";

class NewBugForm extends Component {
  constructor(props) {
    super(props);

    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    e.preventDefault();

    if (e.target.value != "-1") {
      this.props.selectApp(e.target.value, true);
    } else {
      this.props.selectApp("", false);
    }

    document.getElementById("issue").value = "";
  }

  handleFormSubmit(e) {
    e.preventDefault();

    let issue = this.issue.value;

    if (issue.trim() != "") {
      let newIssue = {
        id: cuid(),
        appId: this.props.app.selected,
        openedBy: this.props.user.name,
        date: fecha.format(new Date(), "YYYY-MM-DD - hh:mm:ss"),
        issue,
        status: "open",
      };

      this.props.createTicket(newIssue);

      document.getElementById("issue").value = "";
    }
  }

  render() {
    const { apps } = this.props;
    const { appSelected } = this.props.app;

    let appsSelectDisplay = apps.map((app) => {
      return (
        <option key={app.id} value={app.id}>
          {app.name}
        </option>
      );
    });

    return (
      <div>
        <form>
          <h4 className="text-muted">
            Submit new bug ticket&nbsp;&nbsp;
            <i className="glyphicon glyphicon-tag"></i>
          </h4>
          <hr />
          <div className="row">
            <div className="col-md-offset-2">
              <select className="form-control" onChange={this.handleChange}>
                <option value="-1">Select an App</option>
                {appsSelectDisplay}
              </select>
              <br />
              <textarea
                id="issue"
                className="form-control"
                placeholder="Issue..."
                ref={(text) => (this.issue = text)}
                disabled={!appSelected}
                style={styles.textArea}
                width="200"
                rows="5"
              />
              <br />
              <button
                className="btn btn-primary"
                style={styles.button}
                disabled={!appSelected}
                onClick={this.handleFormSubmit}
              >
                Submit
              </button>
            </div>
          </div>
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
    color: "white",
  },
};

const mapStateToProps = (state) => {
  return {
    apps: state.apps,
    user: state.user,
    app: state.app,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createTicket: (ticket) => dispatch(createTicket(ticket)),
    selectApp: (app, bool) => dispatch(selectApp(app, bool)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NewBugForm);
