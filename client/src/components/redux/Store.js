import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import rootReducer from "./reducers/rootreducer";

const initialState = {};

// dev tools
// https://redux.js.org/recipes/configuring-your-store
//https://github.com/zalmoxisus/redux-devtools-extension

// added thunk so can delay dispatch of action until certain conddition met
const middleWare = [thunk];

const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleWare))
);

export default store;
