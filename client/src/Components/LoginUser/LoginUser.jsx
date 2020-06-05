import React, { useState } from "react";
import Layout from "../../HOC/Layout";

import { Link } from "react-router-dom";
import { connect } from "react-redux";
import "./LoginUser.scss";

import { validateData } from "../../Utils/validation/validation";
import { loginUser } from "../../Actions/UserActions";
import Alert from "../../Utils/Alert/Alert";
const LoginUser = (props) => {
  const [alert, setAlert] = useState({
    type: "",
    message: "",
  });
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const HandleInputChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const SubmitForm = async (e) => {
    e.preventDefault();

    const dataError = await validateData(user, "LOGIN");

    if (dataError[0]) {
      return setAlert({ type: "REJECT", message: dataError[1] });
    }
    const userData = await props.dispatch(loginUser(user));

    if (!userData.payload.Login) {
      return setAlert({ type: "REJECT", message: userData.payload.message });
    }

    setAlert({
      type: "SUCCESS",
      message: "Congratulation, please wait...",
    });
    setTimeout(() => {
      props.history.push("/me/dashboard");
    }, 2000);
  };

  return (
    <Layout>
      <div className="register_container">
        {alert.message.length !== 0 ? (
          <Alert type={alert.type} message={alert.message} />
        ) : null}
        <div className="form_container">
          <div className="auth_user">
            <div className="email-container">
              Email: <span>auth@auth.io</span>
            </div>
            <div className="password-container">
              Password: <span>auth//123</span>
            </div>
          </div>
          <form onSubmit={(e) => SubmitForm(e)}>
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              onChange={(e) => HandleInputChange(e)}
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={(e) => HandleInputChange(e)}
            />

            <p>
              I dont have an account ?<Link to="/user/register">Register</Link>
            </p>
            <button type="submit">Login</button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

const mapStateToProps = (state) => {
  return {
    userData: state.userReducer,
  };
};

export default connect(mapStateToProps)(LoginUser);
