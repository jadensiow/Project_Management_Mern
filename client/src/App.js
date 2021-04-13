import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";

// Routes
import Homepage from "./components/pages/Homepage";
import Dashboard from "./components/pages/Dashboard";

function App() {
  return (
    <div>
      <Router>
        <>
          <Switch>
            <Route exact path="/" component={Homepage} />
            <Route exact path="/dashboard" component={Dashboard} />
          </Switch>
        </>
      </Router>
    </div>
  );
}

export default App;
