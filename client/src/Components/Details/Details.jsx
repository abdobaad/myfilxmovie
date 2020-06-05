import React from "react";
import SimilarMovies from "../../Utils/SimilarMovies/SimilarMovies";

import { connect } from "react-redux";
import { addToMyList } from "../../Actions/MoviesActions";
import Alert from "../../Utils/Alert/Alert";
import "./Details.scss";
import { useHistory } from "react-router-dom";
const backdrop_path_Pre = "https://image.tmdb.org/t/p/w1280";
const poster_path_Pre = "https://image.tmdb.org/t/p/w500";

const Details = (props) => {
  console.log(props.movies);

  const mymovie = {
    id: props.detail.id,
    homepage: props.detail.homepage,
    imdb_id: props.detail.imdb_id,
    title: props.detail.title,
    backdrop_path: props.detail.backdrop_path,
    poster_path: props.detail.poster_path,
    release_date: props.detail.release_date,
    vote_average: props.detail.vote_average,
    overview: props.detail.overview,
    genres: props.detail.genres,
    type: props.movies.type,
  };

  const addToFavorite = () => {
    props.dispatch(addToMyList(mymovie));
  };
  const showGenres = () =>
    props.detail
      ? props.detail.genres.map((genre) => (
          <span key={genre.id}>{genre.name}</span>
        ))
      : null;
  return (
    <div className="movie_detail-container">
      <div
        className="movie_backdrop"
        style={{
          backgroundImage: `url(${backdrop_path_Pre}${props.detail.backdrop_path})`,
          backgroundSize: "cover",
        }}
      />
      <div className="movie-info_container">
        <div className="movie-info">
          <div className="top">
            <div className="image-container">
              <div
                className="poster_img"
                style={{
                  backgroundImage: `url(${poster_path_Pre}${props.detail.poster_path})`,
                }}
              />
              <div className="btn addToMyList" onClick={() => addToFavorite()}>
                Add To My Favorite
              </div>
              {props.detail.homepage ? (
                <a target="blanc" href={props.detail.homepage}>
                  <div className="btn homePage ">Go To Home Page</div>
                </a>
              ) : null}
            </div>
            <div className="more-detail">
              <h2 className="movie-title">{props.detail.title}</h2>
              <div className="release_date-vote">
                <span className="release_date">
                  {props.detail.release_date.slice(0, 4)}
                </span>
                <h3>
                  {props.detail.vote_average}
                  <span> /10</span>{" "}
                </h3>
              </div>
              <div className="genres_list">{showGenres()} </div>
              <p className="movie-descreption">{props.detail.overview}</p>
            </div>
          </div>
          {props.movies.added ? (
            <Alert
              bottom={true}
              type={props.movies.added.addNewMovie ? "SUCCESS" : "REJECT"}
              message={props.movies.added.message}
            />
          ) : null}
          <div className="bottom movie_realted">
            <SimilarMovies movies={props.similar} />
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    movies: state.MoviesReducer,
  };
};

export default connect(mapStateToProps)(Details);
