import React from "react";
import { connect } from "react-redux";
import { useEffect } from "react";
import { auth } from "../Actions/UserActions";

export const AuthCheck = (TheComponent, reqAuth) => {
  const AuthCheck = props => {
    useEffect(() => {
      const fetchData = async () => {
        const user = await props.dispatch(auth());

        //   console.log(props);

        if (!user) {
          if (reqAuth) {
            props.history.push("/user/login");
          }
        } else {
          if (reqAuth === false) {
            props.history.push("/me/dashboard");
          }
        }

        /* const userData = await user.payload;
        if(userData.isAuth) */
      };

      fetchData();
    }, []);

    return <TheComponent />;
  };

  const mapStateToProps = state => {
    return {
      userData: state.UserReducer
    };
  };

  return connect(mapStateToProps)(AuthCheck);
};
