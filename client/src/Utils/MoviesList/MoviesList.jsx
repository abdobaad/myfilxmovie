import React from "react";
import Card from "../Card/Card";

import "./MoviesList.scss";

const MoviesList = ({ movies, type, ...props }) => {
  return (
    <div className="list-container">
      {movies ? (
        <div className="list">
          {movies.map((card, i) => (
            <Card key={i} type={type} {...props} movieDetail={card} />
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default MoviesList;
