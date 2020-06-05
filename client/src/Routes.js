import React from "react";
import { Route, Switch } from "react-router-dom";

///Components
import Home from "./Components/Home/Home";
import MovieDetails from "./Components/MovieDetails/MovieDetails";
import RegisterUser from "./Components/RegisterUser/RegisterUser";
import LoginUser from "./Components/LoginUser/LoginUser";
import DashBoard from "./Components/DashBoard/DashBoard";
import ScrollToTop from "./Utils/ScrollToTop/ScrollToTop";

const Routes = () => {
  return (
    <>
      <ScrollToTop />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/me/dashboard" component={DashBoard} />

        <Route exact path="/user/register" component={RegisterUser} />
        <Route exact path="/user/login" component={LoginUser} />
        <Route exact path="/details/:type/:id" component={MovieDetails} />
      </Switch>
    </>
  );
};

export default Routes;
