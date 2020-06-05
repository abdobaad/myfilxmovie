import React from "react";
import "./Card.scss";

import { useHistory } from "react-router-dom";
import imageNotAvailable from "../../Resources/images/image-not-available.png";
import { deletSearchComponent } from "../../Actions/MoviesActions";

import { connect } from "react-redux";

const poster_path_Pre = "https://image.tmdb.org/t/p/w500";

const Card = (props) => {
  let history = useHistory();
  const { movieDetail, type } = props;
  let image = movieDetail.poster_path || movieDetail.profile_path;

  let id = movieDetail.id;

  const getItemDetails = async (id, data) => {
    props.dispatch(deletSearchComponent());
    if (data !== undefined) {
      return history.push(`/details/${data}/${id}`);
    } else {
      return history.push(`/details/movie/${id}`);
    }
  };

  return (
    <div className="card" onClick={() => getItemDetails(id, type)}>
      {image ? (
        <div
          className={`card-container`}
          onClick={() => getItemDetails(id, type)}
          style={{
            backgroundImage: `url(${poster_path_Pre + image})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }}
        />
      ) : (
        <div
          className={`card-container `}
          onClick={() => getItemDetails(id, type)}
        >
          <img style={{ height: "100%" }} src={imageNotAvailable} />
        </div>
      )}
      <div className="card-hover">
        <div className="movie-title">
          {movieDetail.title || movieDetail.original_name || movieDetail.name}
        </div>
        <button className="detail" onClick={() => getItemDetails(id, type)}>
          More
        </button>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    movies: state.MoviesReducer,
  };
};

export default connect(mapStateToProps)(Card);
