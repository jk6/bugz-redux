import React from "react";

const TicketInfo = ({
  id,
  app,
  issue,
  date,
  status,
  openedBy,
  devMode,
  handleToggleTicketStatus,
}) => {
  const sendHandleToggleTicketStatus = (e) => {
    e.preventDefault();

    handleToggleTicketStatus();
  };

  return (
    <div>
      <h4>
        <span className="text-muted">Ticket# {id}</span>
      </h4>
      <h4>
        <span className="text-muted">Opened By:</span> {openedBy}
      </h4>
      <h4>
        <span className="text-muted">Opened Date:</span> {date}
      </h4>
      <h4>
        <span className="text-muted">App:</span> {app}
      </h4>
      <h4>
        <span className="text-muted">Status:</span> {status}
      </h4>
      <hr style={styles.hrColor} />
      <h4>
        <span className="text-muted">Issue:</span>
      </h4>
      <p>{issue}</p>
      <hr style={styles.hrColor} />
      {devMode && (
        <button
          className="btn btn-default"
          style={styles.button}
          onClick={sendHandleToggleTicketStatus}
        >
          {status == "open" ? "Close Issue" : "Reopen Issue"}
        </button>
      )}
    </div>
  );
};

const styles = {
  button: {
    backgroundColor: "#333",
    borderColor: "#666",
    color: "white",
  },
  hrColor: {
    borderColor: "#666",
  },
};

export default TicketInfo;
