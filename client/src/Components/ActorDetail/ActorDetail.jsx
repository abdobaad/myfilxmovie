import React from "react";

import "./ActorDetail.scss";

const ActorDetail = ({ actor }) => {
  return (
    <div className="actor-container">
      <div className="actor-name">{actor.name}</div>
      <div className="actor-image">
        <img src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`} />
      </div>

      <div className="actor-known_as">
        <div className="title">Known As</div>
        <div className="list">
          {actor.also_known_as.map((name, i) => (
            <span key={i}>{name}</span>
          ))}
        </div>
      </div>
      <div className="actor-gender">
        <div className="title">Gender</div>
        <span>{actor.gender === 1 ? "Female" : "Male"}</span>
      </div>
      <div className="actor-birth">
        <div className="title">Birth</div>
        <span className="date">{actor.birthday}</span>
        <span className="place"> {actor.place_of_birth}</span>
      </div>
      <div className="actor-biography">
        <div className="title">Biography</div>
        <div className="biography">{actor.biography}s</div>
      </div>
    </div>
  );
};

export default ActorDetail;
