import axios from "axios";
import {
  LOGIN_USER,
  REGISTER_USER,
  AUTH_USER,
  LOGOUT_USER,
  TOOGLE_TOOL_BARE,
} from "../Utils/Types";

export const loginUser = async (user) => {
  console.log(user);
  const isLogin = await axios.post("/api/users/login", user);

  return {
    type: LOGIN_USER,
    payload: isLogin.data,
  };
};

export const registerUser = async (user) => {
  const register = await axios.post("/api/users/register", user);
  console.log(register);

  return {
    type: REGISTER_USER,
    payload: register.data,
  };
};

export const auth = async () => {
  const authentication = await axios.get("/api/users/auth");

  return {
    type: AUTH_USER,
    payload: authentication.data,
  };
};

export const logoutUser = async () => {
  const request = await axios.get("/api/users/logout");

  return {
    type: LOGOUT_USER,
    payload: request.data,
  };
};

export const ToogleToolBare = async (open) => {
  return {
    type: TOOGLE_TOOL_BARE,
    payload: open,
  };
};
