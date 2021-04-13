import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import { getBoards } from "../../actions/board";
import CreateBoard from "../other/CreateBoard";
import Navbar from "../other/Navbar";
import CircularProgress from "@material-ui/core/CircularProgress";

const Dashboard = () => {
  return (
    <div className="dashboard-and-navbar">
      <Navbar />
      <section className="dashboard">
        <h2>User Projects</h2>
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
