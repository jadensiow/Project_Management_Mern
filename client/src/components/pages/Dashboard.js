import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, Link } from "react-router-dom";

import CircularProgress from "@material-ui/core/CircularProgress";

const Dashboard = () => {
  // to retrieve all the data from the redux store which is at the reducers
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  // update boards from aciton/board to the data from monngodb. as may have multiple board

  useEffect(() => {
    document.title = "Your Boards | TrelloClone";
  }, []);

  if (!isAuthenticated) {
    return <Redirect to="/" />;
  }

  // after that map according to the board sleeected
  return (
    <div className="dashboard-and-navbar">
      <section className="dashboard">
        <h1>Welcome {user && user.name}</h1>
        <h2>Your Boards</h2>
      </section>
    </div>
  );
};

export default Dashboard;
