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
  GET_SIMILAR_TV,
  GET_TV_DETAILS,
  GET_ACTOR_DETAILS,
  ADD_TO_MY_LIST
} from "../Utils/Types";

export default (state = {}, action) => {
  const { type, payload } = action;
  switch (type) {
    case SEARCH_FOR_A_MOVIE:
      return { ...state, Search: action.search, ListSearch: payload };
      break;
    case REMOVE_SEARCH_LIST:
      return { ...state, Search: action.search, ListSearch: payload };
    case GET_TRENDING_MOVIES:
      return { ...state, TrendingMovies: payload };
      break;
    case GET_TOP_RATED_MOVIES:
      return { ...state, TopRatedMovies: payload };
      break;
    case GET_UP_COMING_MOVIES:
      return { ...state, UpComingMovies: payload };

    case GET_POPULAR_TV_SHOWS:
      return { ...state, PopularTvShows: payload };
      break;

    case GET_POPULAR_ACTORS:
      return { ...state, PopularActors: payload };
      break;
    case GET_MOVIE_DETAILS:
      return { ...state, type: "movie", MovieDetail: payload };
      break;
    case GET_TV_DETAILS:
      return { ...state, type: "tv", TVDetail: payload };
      break;
    case GET_SIMILAR_MOVIES:
      return { ...state, SimilarMovies: payload };
      break;
    case GET_SIMILAR_TV:
      return { ...state, SimilarTV: payload };
      break;

    case GET_ACTOR_DETAILS:
      return { ...state, type: "actor", ActorDetail: payload };
      break;
    case ADD_TO_MY_LIST:
      return { ...state, added: payload };
    default:
      return state;
      break;
  }
};
