import React from "react";

import "./Alert.scss";

const Alert = ({ type, message, bottom }) => {
  switch (type) {
    case "SUCCESS":
      return (
        <div className={`alert success_alert ${bottom ? "bottom" : ""}`}>
          {message}
        </div>
      );
      break;
    case "REJECT":
      return (
        <div className={`alert reject_alert ${bottom ? "bottom" : ""}`}>
          {message}
        </div>
      );
  }
};

export default Alert;
