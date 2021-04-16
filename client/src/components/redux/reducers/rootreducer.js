import { combineReducers } from "redux";

import alert from "./alert";
import auth from "./auth";
import board from "./board";

// Combine all the redux reducer together which is the state
export default combineReducers({ alert, auth, board });
