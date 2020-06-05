import React from "react";

import "./UserSide.scss";
import { Link } from "react-router-dom";

const UserSide = props => {
  return (
    <div className="userSide_container">
      <Link to="/me/dashboard">
        <div className="user-detail">
          <div className="avatar">
            <img alt="avatar" src={props.data.avatar} />
          </div>
        </div>
      </Link>
    </div>
  );
};

export default UserSide;
