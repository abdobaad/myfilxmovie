import React, { useEffect } from "react";

import { connect } from "react-redux";

import MoviesComponent from "../../Components/MoviesComponent/MoviesComponent";

const SimilarMovies = (props) => {
  return props.movies.SimilarMovies ? (
    props.movies.SimilarMovies.length > 0 ? (
      <MoviesComponent
        movies={props.movies.SimilarMovies}
        type={"movie"}
        listTitle="Similar Movies"
        titlecolor={"#fff"}
        //listIcon={PopularIcon}
      />
    ) : null
  ) : props.movies.SimilarTV ? (
    <MoviesComponent
      movies={props.movies.SimilarTV}
      type={"TV"}
      listTitle="Similar TV SHOWS"
      titlecolor={"#fff"}
      //listIcon={PopularIcon}
    />
  ) : null;
};

const mapStateToProps = (state) => {
  return {
    movies: state.MoviesReducer,
  };
};

export default connect(mapStateToProps)(SimilarMovies);
