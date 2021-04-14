import { combineReducers } from "redux";

import auth from "./auth";

// Combine all the redux reducer together which is the state
export default combineReducers({ auth });
