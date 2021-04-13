import { Button } from "@material-ui/core";

const Homepage = () => {
  return (
    <section className="landing">
      <nav className="top">
        <h2>Project Management</h2>
        <div>
          <Button color="inherit" href="/login">
            Login
          </Button>
          <Button variant="contained" href="/register">
            Sign Up
          </Button>
        </div>
      </nav>
      <div className="landing-inner">
        <h1>Join us now</h1>
        <p>Improve your project planning with us</p>
        <div className="buttons">
          <Button variant="outlined" color="inherit" href="/register">
            Sign Up
          </Button>{" "}
          <Button variant="outlined" color="inherit" href="/Login">
            Sign Up
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Homepage;
