import React from "react";
import SimilarMovies from "../../Utils/SimilarMovies/SimilarMovies";

const backdrop_path_Pre = "https://image.tmdb.org/t/p/w1280";
const poster_path_Pre = "https://image.tmdb.org/t/p/w500";

const TvDetails = (props) => {
  const { detail, similar } = props;
  const showGenres = () =>
    detail
      ? detail.genres.map((genre) => <span key={genre.id}>{genre.name}</span>)
      : null;
  return (
    <div className="movie_detail-container">
      <div
        className="movie_backdrop"
        style={{
          backgroundImage: `url(${backdrop_path_Pre}${detail.backdrop_path})`,
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
                  backgroundImage: `url(${poster_path_Pre}${detail.poster_path})`,
                }}
              />
              <div className="btn addToMyList">Add To My Favorite</div>
              <div className="btn homePage ">Go To Home Page</div>
            </div>
            <div className="more-detail">
              <h2 className="movie-title">{detail.title}</h2>
              <div className="release_date-vote">
                <span className="release_date">
                  {/* detail.release_date.slice(0, 4) */}
                </span>
                <h3>
                  {detail.vote_average}
                  <span> /10</span>{" "}
                </h3>
              </div>
              <div className="genres_list">{showGenres()} </div>
              <p className="movie-descreption">{detail.overview}</p>
            </div>
          </div>
          <div className="bottom movie_realted">
            <SimilarMovies movies={similar} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TvDetails;
