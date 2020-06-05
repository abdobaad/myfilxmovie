import React from "react";

import MoviesList from "../../Utils/MoviesList/MoviesList";

import "./MoviesComponent.scss";

const TrendingMovies = ({ movies, listTitle, listIcon, type, titlecolor }) => {
  return (
    <div className="list_movies">
      <div className="list_movies-title">
        <img src={listIcon} />
        <h1 style={titlecolor ? { color: `${titlecolor}` } : {}}>
          {listTitle}
        </h1>
      </div>

      <MoviesList movies={movies} type={type} />
    </div>
  );
};

export default TrendingMovies;
