import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Routes from "./Routes";

/// ROUTER DOM
//containe the app with browserRoutes
import { BrowserRouter } from "react-router-dom";

//REACT REDUX
import Reducer from "./reducers/Reducer";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import { default as ReduxThunk } from "redux-thunk";
import promiseMiddleware from "redux-promise";

//create store and apply the promise and thunk middlewares
const storewithMiddleware = applyMiddleware(
  ReduxThunk,
  promiseMiddleware
)(createStore);

ReactDOM.render(
  //redux containe all the application
  //store => reducer and redux extention
  <Provider
    store={storewithMiddleware(
      Reducer,
      window.__REDUX_DEVTOOLS_EXTENSION__ &&
        window.__REDUX_DEVTOOLS_EXTENSION__()
    )}
  >
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
