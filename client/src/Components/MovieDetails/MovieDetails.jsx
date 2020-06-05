import React, { useEffect } from "react";
import Layout from "../../HOC/Layout";
import { connect } from "react-redux";
import {
  getMovieDetail,
  getTvDetail,
  getSimilarTv,
  getSimilarMovies,
  getActorDetail,
} from "../../Actions/MoviesActions";
import SimilarMovies from "../../Utils/SimilarMovies/SimilarMovies";
import ActorDetail from "../ActorDetail/ActorDetail";
import Loading from "../../Utils/Loading/Loading";
import "./MovieDetails.scss";
import Details from "../Details/Details";
import TVDetail from "../TvDetails/TvDetails";

const backdrop_path_Pre = "https://image.tmdb.org/t/p/w1280";
const poster_path_Pre = "https://image.tmdb.org/t/p/w500";

const MovieDetails = (props) => {
  const id = props.match.params.id;
  let type = props.match.params.type;

  const showGenres = () =>
    props.movies.MovieDetail
      ? props.movies.MovieDetail.genres.map((genre) => (
          <span key={genre.id}>{genre.name}</span>
        ))
      : null;

  useEffect(() => {
    switch (type) {
      case "movie":
        props.dispatch(getMovieDetail(id));
        props.dispatch(getSimilarMovies(id));
        break;
      case "tv":
        props.dispatch(getTvDetail(id));
        props.dispatch(getSimilarTv(id));
        break;
      case "actor":
        props.dispatch(getActorDetail(id));
    }
  }, [id]);

  return (
    <Layout>
      {props.movies.MovieDetail && type === "movie" ? (
        <Details
          detail={props.movies.MovieDetail}
          similar={props.movies.SimilarMovies}
        />
      ) : props.movies.TVDetail && type === "tv" ? (
        <TVDetail
          detail={props.movies.TVDetail}
          similar={props.movies.SimilarTV}
        />
      ) : props.movies.ActorDetail && type === "actor" ? (
        <div className="actor_detail-container">
          <ActorDetail actor={props.movies.ActorDetail} />
        </div>
      ) : (
        <Loading />
      )}
    </Layout>
  );
};

const mapStateToProps = (state) => {
  return {
    movies: state.MoviesReducer,
  };
};

export default connect(mapStateToProps)(MovieDetails);
