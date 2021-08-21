import React from "react";

const TicketEntry = (props) => {
  const { appName, commentCount, displayIssue } = props;

  return (
    <div>
      <span>
        <span className="pull-left">
          <strong>{appName}</strong> -&nbsp;
          <em>{displayIssue}</em>
        </span>
        &nbsp;
        <span className="pull-right">
          <i className="glyphicon glyphicon-comment"></i>&nbsp;
          {commentCount}
        </span>
      </span>
    </div>
  );
};

export default TicketEntry;
