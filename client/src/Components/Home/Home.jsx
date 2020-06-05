import React, { useState, useEffect } from "react";
import Layout from "../../HOC/Layout";

import { connect } from "react-redux";

import {
  getTrendingMovies,
  getTopRatedMovies,
  getUpComingMovies,
  getPopularTvShows,
  getPopularActors,
  searchForAmovie,
} from "../../Actions/MoviesActions";

import TrendMovieHome from "../../Utils/TrendMovieHome/TrendMovieHome";
import MoviesComponent from "../MoviesComponent/MoviesComponent";
import MoviesSearchList from "../MoviesSearchList/MoviesSearchList";

import PopularIcon from "../../Resources/icons/popular.svg";
import PopularAllTimeIcon from "../../Resources/icons/fire.svg";
import Loading from "../../Utils/Loading/Loading";

const Home = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  // console.log("porps:", props.trendMovies.ListSearch);

  useEffect(() => {
    const fetch = async () => {
      await props.dispatch(getTrendingMovies());
      await props.dispatch(getTopRatedMovies());
      await props.dispatch(getUpComingMovies());
      await props.dispatch(getPopularTvShows());
      await props.dispatch(getPopularActors());

      setIsLoading(false);
    };

    fetch();
  }, []);

  return (
    <Layout>
      {!isLoading ? (
        <>
          {props.trendMovies.ListSearch &&
          props.trendMovies.ListSearch.length >= 0 ? (
            <MoviesSearchList movies={props.trendMovies.ListSearch} />
          ) : (
            <div style={{ paddingBottom: "5rem" }}>
              <TrendMovieHome movie={props.trendMovies.TrendingMovies[0]} />
              <MoviesComponent
                movies={props.trendMovies.TrendingMovies}
                type={"movie"}
                listTitle="Trending"
                listIcon={PopularIcon}
              />
              <MoviesComponent
                movies={props.trendMovies.TopRatedMovies}
                type={"movie"}
                listTitle="Top Rated All Time"
                listIcon={PopularAllTimeIcon}
              />

              <MoviesComponent
                movies={props.trendMovies.UpComingMovies}
                type={"movie"}
                listTitle="Up Coming"
                listIcon={PopularAllTimeIcon}
              />
              <MoviesComponent
                movies={props.trendMovies.PopularTvShows}
                type={"tv"}
                listTitle="Popular Tv Shows"
                listIcon={PopularAllTimeIcon}
              />

              <MoviesComponent
                movies={props.trendMovies.PopularActors}
                type={"actor"}
                listTitle="Popular Actors"
                listIcon={PopularAllTimeIcon}
              />
            </div>
          )}
        </>
      ) : (
        <Loading />
      )}
    </Layout>
  );
};

const mapStateToProps = (state) => {
  return {
    //trendMovie: state.MoviesReducer,
    trendMovies: state.MoviesReducer,
  };
};

export default connect(mapStateToProps)(Home);
