import React, { useState, useEffect } from "react";

//connect with redux
import { connect } from "react-redux";

//react router
import { Link } from "react-router-dom";
//actions functions
import { searchForAmovie } from "../../../Actions/MoviesActions";

//sass file for header.jsx
import "./Header.scss";
import { logoutUser, ToogleToolBare } from "../../../Actions/UserActions";

const Header = (props) => {
  const [openSide, setOpenSide] = useState(false);

  const [movieToSeach, setMovieToSearch] = useState("");
  const SearchForAMovie = async (e) => {
    setMovieToSearch(e.target.value);
    let search = e.target.value;
    let page = 1;

    return search.trim() !== ""
      ? props.dispatch(searchForAmovie(search, page))
      : props.dispatch(searchForAmovie([], page));
  };

  const logout = async () => {
    const logout = await logoutUser();
    if (logout.payload.logout) {
      window.location.reload();
    }
  };

  const TogleSideBare = async () => {
    await props.dispatch(ToogleToolBare(!openSide));
    setOpenSide(!openSide);
  };

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/">
          <div className="logo">MyFilx</div>
        </Link>
        <div className="search">
          <input
            type="text"
            placeholder="Search For A Movie"
            onChange={(e) => SearchForAMovie(e)}
            name="search"
          />
        </div>

        <div className="user_log-sign">
          {!props.isAuth ? (
            <div className="log-sign--container">
              <Link to="/user/register">
                <div className="sign-in">Sign in</div>
              </Link>
              <Link to="/user/login">
                <div className="log-in">Login</div>
              </Link>
            </div>
          ) : props.isAuth ? (
            <div onClick={() => logout()} className="log-out--container">
              <Link to="/">
                <div className="log-out">Log Out</div>
              </Link>
            </div>
          ) : (
            <div className="log-sign--container">
              <Link to="/user/register">
                <div className="sign-in">Sign in</div>
              </Link>
              <Link to="/user/login">
                <div className="log-in">Login</div>
              </Link>
            </div>
          )}
        </div>
        <div className="tool-bar" onClick={() => TogleSideBare()}>
          <div className="line" />
        </div>
      </div>
    </header>
  );
};

const mapStateToProps = (state) => {
  return {
    movies: state.MoviesReducer,
    userData: state.UserReducer,
  };
};

export default connect(mapStateToProps)(Header);
