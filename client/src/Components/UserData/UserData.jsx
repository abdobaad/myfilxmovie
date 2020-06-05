import React from "react";

import "./UserData.scss";
import Card from "../../Utils/Card/Card";

const UserData = props => {
  console.log(props);

  return (
    <div className="user-data_container">
      <h1>My Account</h1>
      <div className="data-container">
        <div className="image-container">
          <img alt="avatar" src={props.Data.avatar} />
        </div>
        <div className="info-container">
          <div className="name">
            {props.Data.firstname} {props.Data.lastname}
          </div>
          <div className="email">{props.Data.email}</div>
        </div>
      </div>

      {props.Data.moviesList.length !== 0 ? (
        <div className="favorite-container">
          <h1>My Favorite</h1>
          <div className="movies-list_favorite">
            {props.Data.moviesList.map((item, i) => {
              return <Card type={"movie"} key={i} movieDetail={item} />;
            })}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default UserData;
