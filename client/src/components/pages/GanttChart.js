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
const moment = require("moment");
ReactFC.fcRoot(FusionCharts, Gantt, FusionTheme);

const GanttChart = ({ match }) => {
	const [selectChart, setSelectChart] = useState("");
	const board = useSelector((state) => state.board.board);
	const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
	const dispatch = useDispatch();

	console.log(board);
	console.log(board.cardObjects);
	// if (!isAuthenticated) {
	// 	return <Redirect to="/" />;
	// }

	let oldDate = new Date(
		Math.max.apply(
			null,
			board.cardObjects.map(function (e) {
				return new Date(e.date.endDate);
			})
		)
	);

	console.log("old", oldDate);
	let newDate = new Date(
		Math.min.apply(
			null,
			board.cardObjects.map(function (e) {
				return new Date(e.date.startDate);
			})
		)
	);

	console.log("new", newDate);

	// convert (april 28 2021) format to (2021/ 04/ 28)
	let dateToYMD = (date) => {
		let d = date.getDate();
		let m = date.getMonth() + 1;
		let y = date.getFullYear();
		return "" + y + "/" + (m <= 9 ? "0" + m : m) + "/" + (d <= 9 ? "0" + d : d);
	};
	let oldDateFormat = dateToYMD(oldDate);
	let earlyDateFormat = dateToYMD(newDate);
	console.log(oldDate);
	console.log(oldDateFormat);
	let startDateRange = (startDate, endDate) => {
		let start = startDate.split("/");
		let end = endDate.split("/");
		let startYear = parseInt(start[0]);
		let endYear = parseInt(end[0]);
		let dates = [];

		for (let i = startYear; i <= endYear; i++) {
			let endMonth = i != endYear ? 11 : parseInt(end[1]) - 1;
			let startMon = i === startYear ? parseInt(start[1]) - 1 : 0;
			for (let j = startMon; j <= endMonth; j = j > 12 ? j % 12 || 11 : j + 1) {
				let month = j + 1;
				let displayMonth = month < 10 ? "0" + month : month;
				dates.push([i, displayMonth, "01"].join("/"));
			}
		}
		return dates;
	};
	let newDateFormat2 = startDateRange(earlyDateFormat, oldDateFormat);

	let lastDate = (date) => {
		let arr = [];

		for (let i = 0; i < date.length; i++) {
			let check = moment(date[i], "YYYY/MM/DD")
				.endOf("month")
				.format("YYYY/MM/DD");
			arr.push(check);
		}
		return arr;
	};
	let oldDateFormat2 = lastDate(newDateFormat2);

	let eachMonth = (startDate, endDate) => {
		var fromDate = moment(startDate, "YYYY/MM/DD");
		var toDate = moment(endDate, "YYYY/MM/DD");
		var monthData = [];

		while (toDate > fromDate || fromDate.format("M") === toDate.format("M")) {
			monthData.push(fromDate.format("MMMM"));
			fromDate.add(1, "month");
		}
		return monthData;
	};

	let monthName = eachMonth(earlyDateFormat, oldDateFormat);
	console.log(monthName);

	board.cardObjects.map((d) => {
		testData.tasks.task.push({
			start: d.date ? d.date.startDate.slice(0, 10).replaceAll("-", "/") : "",
			end: d.date ? d.date.endDate : "",
		});
		testData.processes.process.push({ label: d.title });
	});

	for (let i = 0; i < newDateFormat2.length; i++) {
		testData.categories[0].category.push({
			start: newDateFormat2[i],
			end: oldDateFormat2[i],
			label: monthName[i],
		});
	}

	let start = new Date(earlyDateFormat);
	let end = new Date(oldDateFormat);
	var sDate;
	var eDate;
	var dateArr = [];
	var startDateArr = [];
	var endDateArr = [];

	while (start <= end) {
		if (start.getDay() == 1 || (startDateArr.length == 0 && !sDate)) {
			sDate = new Date(start.getTime());
		}

		if ((sDate && start.getDay() == 0) || start.getTime() == end.getTime()) {
			eDate = new Date(start.getTime());
		}

		if (eDate && eDate) {
			let sDate2 = dateToYMD(sDate);
			let eDate2 = dateToYMD(eDate);

			startDateArr.push(sDate2);
			endDateArr.push(eDate2);
			sDate = undefined;
			eDate = undefined;
			sDate2 = undefined;
			eDate2 = undefined;
		}

		start.setDate(start.getDate() + 1);
	}

	console.log(startDateArr);
	console.log(endDateArr);

	for (let i = 0; i < startDateArr.length; i++) {
		testData.categories[1].category.push({
			start: startDateArr[i],
			end: endDateArr[i],
		});
	}
	console.log(testData);
	return (
		<Container>
			<Navbar />

			<ReactFC
				type="gantt"
				width="1500"
				height="1000"
				dataFormat="JSON"
				dataSource={testData}
			/>
			<SelectShowChart />
		</Container>
	);
};

export default GanttChart;
