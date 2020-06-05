import {
  REGISTER_USER,
  LOGIN_USER,
  AUTH_USER,
  LOGOUT_USER,
  TOOGLE_TOOL_BARE,
} from "../Utils/Types";

export default (state = {}, action) => {
  const { payload, type } = action;
  switch (type) {
    case REGISTER_USER:
      return { ...state, Register: payload };
      break;
    case LOGIN_USER:
      return { ...state, Login: payload };
      break;
    case AUTH_USER:
      return { ...state, isAuth: payload };
      break;

    case LOGOUT_USER:
      return { ...state, isLogout: payload };
      break;

    case TOOGLE_TOOL_BARE:
      return { ...state, openSideBare: payload };
      break;

    default:
      return state;
  }
};
