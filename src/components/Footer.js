import React from "react";

const Footer = () => {
  return (
    <div className="row">
      <div style={styles.footer}>
        <small>
          <span className="text-muted">&nbsp;</span>
        </small>
      </div>
    </div>
  );
};

const styles = {
  footer: {
    backgroundColor: "#333",
    marginBottom: 0,
    height: "300px",
    position: "auto",
  },
};

export default Footer;
