import { Route, Switch, useLocation } from "react-router-dom";
import { useEffect } from "react";

// pages
import Main from "./components/pages/Main";
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";
import Dashboard from "./components/pages/Dashboard";
import Alert from "./components/functions/alert";
import Board from "./components/pages/Board";
import Chat from "./components/pages/Chat";
import GanttChart from "./components/pages/GanttChart";

// Token
import AuthToken from "./components/functions/AuthToken";
import { loadUser } from "./components/redux/action/auth";

import store from "./components/redux/Store";

import "./App.css";
import { AnimatePresence } from "framer-motion";

// check for token in local
if (localStorage.token) {
  AuthToken(localStorage.token);
}

const App = () => {
  const location = useLocation();

  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  // https://github.com/framer/motion/issues/650
  return (
    <>
      <Alert />
      <AnimatePresence>
        <Switch location={location} key={location.pathname}>
          <Route exact path="/" component={Main} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/dashboard" component={Dashboard} />
          <Route exact path="/board/:id" component={Board} />
          <Route exact path="/board/:id/chat" component={Chat} />
          <Route exact path="/board/:id/gantt_chart" component={GanttChart} />
          <Route
            exact
            path="/board/:id/gantt_chart/:id"
            component={GanttChart}
          />
        </Switch>
      </AnimatePresence>
    </>
  );
};

export default App;
