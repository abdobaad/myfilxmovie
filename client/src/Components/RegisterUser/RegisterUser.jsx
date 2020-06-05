import React, { useState, useEffect } from "react";

import Layout from "../../HOC/Layout";

import { validateData } from "../../Utils/validation/validation";

import { Link } from "react-router-dom";

import "./RegisterUser.scss";
import { connect } from "react-redux";
import { registerUser } from "../../Actions/UserActions";
import Alert from "../../Utils/Alert/Alert";
const RegisterUser = props => {
  const [alert, setAlert] = useState({
    type: "",
    message: ""
  });
  const [registered, setRegistered] = useState(false);
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const handleChange = e => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    });
  };

  const SubmitForm = async e => {
    e.preventDefault();

    const validData = await validateData(user, "REGISTER");

    if (validData[0]) {
      return setAlert({
        type: "REJECT",
        message: validData[1]
      });
    }

    const newUser = await {
      firstname: user.firstName,
      lastname: user.lastName,
      email: user.email,
      password: user.password
    };

    const register = await props.dispatch(registerUser(newUser));

    if (register.payload.isRegistered) {
      setTimeout(() => {
        props.history.push("/user/login");
      }, 3000);
    }

    return register.payload.isRegistered
      ? setAlert({
          type: "SUCCESS",
          message: "Congratulation, you're registered please wait..."
        })
      : setAlert({
          type: "REJECT",
          message: register.payload.message
        });
  };
  return (
    <Layout>
      <div className="register_container">
        {alert.message.length !== 0 ? (
          <Alert type={alert.type} message={alert.message} />
        ) : null}
        <div className="form_container">
          <form onSubmit={e => SubmitForm(e)}>
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              onChange={e => handleChange(e)}
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              onChange={e => handleChange(e)}
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              onChange={e => handleChange(e)}
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={e => handleChange(e)}
            />
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm your Password"
              onChange={e => handleChange(e)}
            />
            <p>
              Already Have an account ?<Link to="/user/login">Login</Link>
            </p>
            <button type="submit">Create An Account</button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

const mapStateToProps = state => {
  return {
    UserData: state.UserReducer
  };
};

export default connect(mapStateToProps)(RegisterUser);
