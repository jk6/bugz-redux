import React from "react";

const TicketDiscussion = ({ id, imgUrl, user, comment, date }) => {
  return (
    <li key={id} className="list-group-item" style={styles.comments}>
      <p>
        <img
          src={imgUrl}
          className="img img-circle"
          style={{ height: "40px", width: "40px" }}
        />
        &nbsp;
        <strong>{user}</strong>&nbsp;
        <span className="text-muted">{date}</span>&nbsp;
      </p>
      <p>
        <em>"{comment}"</em>"
      </p>
    </li>
  );
};

const styles = {
  comments: {
    textAlign: "left",
    borderColor: "#666",
    backgroundColor: "#333",
    color: "white",
  },
};

export default TicketDiscussion;
