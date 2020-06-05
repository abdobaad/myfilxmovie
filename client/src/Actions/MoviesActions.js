import axios from "axios";
import {
  GET_TRENDING_MOVIES,
  REMOVE_SEARCH_LIST,
  GET_TOP_RATED_MOVIES,
  GET_UP_COMING_MOVIES,
  GET_POPULAR_TV_SHOWS,
  GET_POPULAR_ACTORS,
  SEARCH_FOR_A_MOVIE,
  GET_MOVIE_DETAILS,
  GET_SIMILAR_MOVIES,
  GET_TV_DETAILS,
  GET_SIMILAR_TV,
  GET_ACTOR_DETAILS,
  ADD_TO_MY_LIST,
} from "../Utils/Types";

const MyApiKey = "bc66d8edb2b9ddf927db8ffe37ba32b1";

const trendingMovies = `https://api.themoviedb.org/3/trending/movie/day?api_key=${MyApiKey}`;
const topRatedMovies = `https://api.themoviedb.org/3/movie/top_rated?api_key=${MyApiKey}&language=en-US&page=1`;
const UpComingMovies = `https://api.themoviedb.org/3/movie/upcoming?api_key=${MyApiKey}&language=en-US&page=1`;

const PopularTvShows = `https://api.themoviedb.org/3/tv/popular?api_key=${MyApiKey}&language=en-US&page=1`;
const PopularActors = `https://api.themoviedb.org/3/person/popular?api_key=${MyApiKey}&language=en-US&page=1`;

export const searchForAmovie = async (movies, page) => {
  const Search = await `https://api.themoviedb.org/3/search/movie?api_key=${MyApiKey}&language=en-US&query=${movies}&page=${page}&include_adult=false`;

  const request = await axios.get(Search);

  const moviesList = await request.data.results;

  /*  if (moviesList.length !== 0) { */
  return {
    type: SEARCH_FOR_A_MOVIE,
    search: movies,
    payload: moviesList,
  };
};

export const getTrendingMovies = async () => {
  const request = await axios.get(trendingMovies);
  const movie = await request.data.results;

  return {
    type: GET_TRENDING_MOVIES,
    payload: movie,
  };
};

export const getTopRatedMovies = async () => {
  const request = await axios.get(topRatedMovies);
  const movies = await request.data.results;

  return {
    type: GET_TOP_RATED_MOVIES,
    payload: movies,
  };
};

export const getUpComingMovies = async () => {
  const request = await axios.get(UpComingMovies);
  const movies = await request.data.results;

  return {
    type: GET_UP_COMING_MOVIES,
    payload: movies,
  };
};

export const getPopularTvShows = async () => {
  const request = await axios.get(PopularTvShows);
  const tvShows = await request.data.results;

  return {
    type: GET_POPULAR_TV_SHOWS,
    payload: tvShows,
  };
};

export const getPopularActors = async () => {
  const request = await axios.get(PopularActors);
  const Actors = await request.data.results;

  return {
    type: GET_POPULAR_ACTORS,
    payload: Actors,
  };
};

export const getMovieDetail = async (id) => {
  const url1 = await `https://api.themoviedb.org/3/movie/${id}/external_ids?api_key=${MyApiKey}`;
  const ext_id = await axios.get(url1);

  const newId = await ext_id.data.imdb_id;

  const url2 = await `https://api.themoviedb.org/3/movie/${newId}?api_key=${MyApiKey}&language=en-US`;

  const data = await axios.get(url2);

  return {
    type: GET_MOVIE_DETAILS,

    payload: data.data,
  };
};

export const getTvDetail = async (id) => {
  /*  const url1 = await `https://api.themoviedb.org/3/tv/${id}/external_ids?api_key=${MyApiKey}`;
  const ext_id = await axios.get(url1);

  const newId = await ext_id.data.imdb_id; */

  const url = `https://api.themoviedb.org/3/tv/${id}?api_key=${MyApiKey}&language=en-US`;

  // const url2 = await `https://api.themoviedb.org/3/tv/${newId}?api_key=${MyApiKey}&language=en-US`;

  const data = await axios.get(url);

  return {
    type: GET_TV_DETAILS,
    payload: data.data,
  };
};

export const getSimilarMovies = async (id) => {
  const urlSimilar = await `https://api.themoviedb.org/3/movie/${id}/similar?api_key=${MyApiKey}&language=en-US&page=1`;
  const request = await axios(urlSimilar);

  return {
    type: GET_SIMILAR_MOVIES,
    payload: request.data.results,
  };
};

export const getSimilarTv = async (id) => {
  const urlSimilar = await `https://api.themoviedb.org/3/tv/${id}/similar?api_key=${MyApiKey}&language=en-US&page=1`;
  const request = await axios(urlSimilar);

  return {
    type: GET_SIMILAR_TV,
    payload: request.data.results,
  };
};

export const getActorDetail = async (id) => {
  const url = `https://api.themoviedb.org/3/person/${id}?api_key=${MyApiKey}&language=en-US`;

  const request = await axios.get(url);

  return {
    type: GET_ACTOR_DETAILS,

    payload: request.data,
  };
};

export const deletSearchComponent = async () => {
  return {
    type: REMOVE_SEARCH_LIST,
    Search: "",
    payload: null,
  };
};

export const addToMyList = async (data) => {
  const add = await axios.post("/api/movies/favoritemovie", await data);
  console.log(add);

  return {
    type: ADD_TO_MY_LIST,
    payload: add.data,
  };
};
