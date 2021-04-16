import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import Navbar from "../functions/Navbar";
import CircularProgress from "@material-ui/core/CircularProgress";
import { getBoards } from "../redux/action/board";
import CreateBoard from "../board/CreateBoard";

const Dashboard = () => {
  useEffect(() => {
    document.title = "Summary";
  }, []);

  // to retrieve all the data from the redux store which is at the reducers
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const boards = useSelector((state) => state.board.boards);
  const loading = useSelector((state) => state.board.dashboardLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBoards());
  }, [dispatch]);

  // update boards from aciton/board to the data from monngodb. as may have multiple board

  if (!isAuthenticated) {
    return <Redirect to="/" />;
  }

  // after that map according to the board sleeected
  return (
    <div className="dashboard-and-navbar">
      <Navbar />
      <section className="dashboard">
        <h1>Welcome {user && user.name}</h1>
        <h2>Your Boards</h2>
        {loading && <CircularProgress className="dashboard-loading" />}
        <div className="boards">
          {boards.map((board) => (
            <Link
              key={board._id}
              to={`/board/${board._id}`}
              className="board-card"
            >
              {board.title}
            </Link>
          ))}
          <CreateBoard />
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
