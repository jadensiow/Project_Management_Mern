// Material UI
import { Button } from "@material-ui/core";

// React
import { Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";
const Main = () => {
  // data retrieve from the overall state which is the store and data are updated over at reducer // which is like maping of state to props ==> Refer to reducers/index
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  // Tab title
  useEffect(() => {
    document.title = "Project Management";
  }, []);

  // if contain token will go straight to dashboard as it is a record of like login before
  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <section className="landing">
      <nav className="top">
        <h2>Project Management</h2>
        <div>
          <Button color="inherit" href="/login">
            Login
          </Button>
          <Button variant="contained" href="/register">
            Register
          </Button>
        </div>
      </nav>
      <div className="landing-inner">
        <h1>Project Management</h1>
        <p>Manage your project better!</p>
        <div className="buttons">
          <Button variant="outlined" color="inherit" href="/register">
            Register
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Main;
