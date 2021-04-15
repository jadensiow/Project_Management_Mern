import {
  REGISTER_COMPLETE,
  REGISTER_FAIL,
  LOGIN_COMPLETE,
  LOGIN_FAIL,
  AUTH_FAIL,
  LOAD_USER,
  LOGOUT,
} from "../action/types";

const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: null,
  loading: true,
  user: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  // For redux isAuthenticated pattern
  // https://auth0.com/blog/secure-your-react-and-redux-app-with-jwt-authentication/

  switch (type) {
    case REGISTER_FAIL:
    case AUTH_FAIL:
    case LOGIN_FAIL:
    case LOGOUT:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
      };
    case LOAD_USER:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: payload,
      };
    case REGISTER_COMPLETE:
    case LOGIN_COMPLETE:
      localStorage.setItem("token", payload.token);
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false,
      };

    default:
      return state;
  }
}
