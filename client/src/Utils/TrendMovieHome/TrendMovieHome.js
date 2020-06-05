import React from "react";

//
import "./TrendMovieHome.scss";
import { useHistory } from "react-router-dom";
//import MovieDetails from "../../Components/MovieDetails/MovieDetails";
//original

const backdrop_path_Pre = "https://image.tmdb.org/t/p/w1280";

const TrendMovieHome = props => {
  let history = useHistory();
  console.log(props);

  const { id, vote_average, title, release_date, backdrop_path } = props.movie;

  const MovieDetails = () => {
    history.push("/details/movie/" + id);
  };
  return (
    <div
      className="movie-popular"
      style={{
        background: `
        linear-gradient(
          rgba(255, 71, 71, 0.233),
          rgba(255, 71, 71, 0.233)
        ),
        
        url(${backdrop_path_Pre}${backdrop_path}) no-repeat`,
        backgroundSize: "cover"
      }}
    >
      <div className="popular_details">
        <div className="popular_details-title">{title}</div>
        <div className="popular_details-rate">
          <span> {vote_average}</span>
        </div>
        <div className="popular_details-date">{release_date}</div>

        {/*  <div>genres</div> */}

        <button onClick={() => MovieDetails()}>Detail</button>
      </div>
    </div>
  );
};

export default TrendMovieHome;
