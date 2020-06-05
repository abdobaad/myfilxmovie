import { combineReducers } from "redux";

import UserReducer from "./UserReducer";
import MoviesReducer from "./MoviesReducer";
const Reducer = combineReducers({
  UserReducer,
  MoviesReducer,
});

export default Reducer;
