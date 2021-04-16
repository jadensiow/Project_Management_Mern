import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useEffect } from "react";

// pages
import Main from "./components/pages/Main";
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";
import Dashboard from "./components/pages/Dashboard";
import Alert from "./components/functions/alert";
import Board from "./components/pages/Board";

// Token
import AuthToken from "./components/functions/AuthToken";
import { loadUser } from "./components/redux/action/auth";
// Redux
import { Provider } from "react-redux";
import store from "./components/redux/Store";
// check for token in local
if (localStorage.token) {
  AuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  // Store is to provide data to all level wrap in it
  return (
    <Provider store={store}>
      <Router>
        <>
          <Alert />
          <Switch>
            <Route exact path="/" component={Main} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/dashboard" component={Dashboard} />
            <Route exact path="/board/:id" component={Board} />
          </Switch>
        </>
      </Router>
    </Provider>
  );
};

export default App;
