import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// pages
import Main from "./components/pages/Main";
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";

// Token
import AuthToken from "./components/functions/AuthToken";

// Redux

// check for token in local
if (localStorage.token) {
  AuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser()); // to trigger action => dispatch (Action) // no need use dispatch as loadUser is imported straight as a function
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
          </Switch>
        </>
      </Router>
    </Provider>
  );
};

export default App;
