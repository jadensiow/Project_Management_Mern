import React, { useEffect, useState } from "react";
import { Container } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import ReactFC from "react-fusioncharts";
import FusionCharts from "fusioncharts";
import Gantt from "fusioncharts/fusioncharts.gantt";
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";
import Navbar from "../functions/Navbar";
import { getBoard } from "../../components/redux/action/board";
import dataSource from "../ganttChart/GanttData";
import SelectShowChart from "../ganttChart/SelectShowChart";

ReactFC.fcRoot(FusionCharts, Gantt, FusionTheme);

const GanttChart = ({ match }) => {
  const [selectChart, setSelectChart] = useState("");
  const board = useSelector((state) => state.board.board);
  const list = useSelector((state) => state.board.lists);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();

  // if (!isAuthenticated) {
  // 	return <Redirect to="/" />;
  // }

  return (
    <Container>
      <Navbar />

      <ReactFC
        type="gantt"
        width="1500"
        height="1000"
        dataFormat="JSON"
        dataSource={dataSource}
      />
      <SelectShowChart />
    </Container>
  );
};

export default GanttChart;
