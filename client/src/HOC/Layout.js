import React, { useEffect } from "react";
import Header from "../Components/Header_Footer/Header/Header";
import Footer from "../Components/Header_Footer/Footer/Footer";
import { auth } from "../Actions/UserActions";
import { connect } from "react-redux";
import UserSide from "../Components/UserSide/UserSide";
import Loading from "../Utils/Loading/Loading";
import "./Layout.scss";
import MoviesSearchList from "../Components/MoviesSearchList/MoviesSearchList";
import NavigationBar from "../Components/NavigationBar/NavigationBar";
const Layout = (props) => {
  useEffect(() => {
    const fetchData = async () => {
      await props.dispatch(auth());
    };

    fetchData();
  }, []);

  // console.log(props);

  return (
    <div>
      <Header
        isAuth={
          props.UserData.isAuth
            ? props.UserData.isAuth.isAuth
              ? true
              : false
            : false
        }
      />
      {props.openSideBare ? (
        <NavigationBar
          /*  closeAndGoto={(link) => gotoLink(link)} */
          user={props.userAuth}
        />
      ) : null}
      <div className="container">
        <div
          style={
            props.UserData.isAuth
              ? props.UserData.isAuth.isAuth
                ? { width: "94%", marginLeft: "6%" }
                : { width: "100%", marginLeft: "0" }
              : null
          }
          className="back"
        >
          {props.movie ? (
            props.movie.Search && props.movie.Search !== "" ? (
              <MoviesSearchList listmovies={props.movie.ListSearch} />
            ) : (
              props.children
            )
          ) : (
            <Loading />
          )}
        </div>
        {props.UserData.isAuth ? (
          props.UserData.isAuth.isAuth ? (
            <UserSide data={props.UserData.isAuth} />
          ) : null
        ) : null}
      </div>
      <Footer />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    UserData: state.UserReducer,
    movie: state.MoviesReducer,
  };
};

export default connect(mapStateToProps)(Layout);
