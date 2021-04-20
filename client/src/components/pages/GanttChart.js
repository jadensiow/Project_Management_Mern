import React, { useState } from "react";
import { Container } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import moment from "moment";
import ReactFC from "react-fusioncharts";
import FusionCharts from "fusioncharts";
import Gantt from "fusioncharts/fusioncharts.gantt";
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";
import Navbar from "../functions/Navbar";
import dataSource from "../ganttChart/GanttData";
import SelectShowChart from "../functions/SelectShowChart";

ReactFC.fcRoot(FusionCharts, Gantt, FusionTheme);

const GanttChart = ({ match }) => {
	const [selectedIndex, setSelectedIndex] = useState(1);
	const [open, setOpen] = useState(false);
	const history = useHistory();

	const list = useSelector((state) => state.board.board.listObjects);
	const card = useSelector((state) => state.board.board.cardObjects);


	const currentOpen = (bool) => {
		setOpen(bool);
	};
	let dateFormatter = (date) => {
		let d = date.getDate();
		let m = date.getMonth() + 1;
		let y = date.getFullYear();
		return "" + y + "/" + (m <= 9 ? "0" + m : m) + "/" + (d <= 9 ? "0" + d : d);
	};

	let showCard = [];
	const handleMenuItemClick = (event, index) => {
		setSelectedIndex(index);
		showCard = [];
		for (const elem of list) {
			if (elem._id === event.target.id) {
				for (const item of card) {
					if (elem.cards.includes(item._id)) {
						showCard.push(item);
					}
				}
			}
		}
		let endDate = new Date(
			Math.max.apply(
				null,
				showCard.map((card) => {
					return new Date(card.date.endDate);
				})
			)
		);

		// get earliest  date
		let newDate = new Date(
			Math.min.apply(
				null,
				showCard.map((card) => {
					return new Date(card.date.startDate);
				})
			)
		);

		let endDateformat = dateFormatter(endDate);
		let startDateFormat = dateFormatter(newDate);

		let startDateRange = (startDate, endDate) => {
			let start = startDate.split("/");
			let end = endDate.split("/");
			let startYear = parseInt(start[0]);
			let endYear = parseInt(end[0]);
			let dates = [];

			for (let i = startYear; i <= endYear; i++) {
				let endMonth = i != endYear ? 11 : parseInt(end[1]) - 1;
				let startMon = i === startYear ? parseInt(start[1]) - 1 : 0;
				for (
					let j = startMon;
					j <= endMonth;
					j = j > 12 ? j % 12 || 11 : j + 1
				) {
					let month = j + 1;
					let displayMonth = month < 10 ? "0" + month : month;
					dates.push([i, displayMonth, "01"].join("/"));
				}
			}
			return dates;
		};

		let startMonthDate = startDateRange(startDateFormat, endDateformat);

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
		let endMonthDate = lastDate(startMonthDate);

		// show each month in name e.g "Aug"
		let eachMonth = (startDate, endDate) => {
			let fromDate = moment(startDate, "YYYY/MM/DD");
			let toDate = moment(endDate, "YYYY/MM/DD");
			let monthData = [];

			while (toDate > fromDate || fromDate.format("M") === toDate.format("M")) {
				monthData.push(fromDate.format("MMMM"));
				fromDate.add(1, "month");
			}
			return monthData;
		};

		let eachMonthName = eachMonth(startDateFormat, endDateformat);

		dataSource.tasks.task = [];
		dataSource.processes.process = [];

		showCard.forEach((element) => {
			dataSource.tasks.task.push({
				start: dateFormatter(new Date(element.date.startDate)),
				end: dateFormatter(new Date(element.date.endDate)),
			});

			dataSource.processes.process.push({
				label: element.title,
			});
		});

		// push first categories
		for (let i = 0; i < startMonthDate.length; i++) {
			dataSource.categories[0].category.push({
				start: startMonthDate[i],
				end: endMonthDate[i],
				label: eachMonthName[i],
			});
		}

		// get all the start and end week date according to month
		let start = new Date(startDateFormat);
		let end = new Date(endDateformat);
		let sDate;
		let eDate;
		let startDateArr = [];
		let endDateArr = [];

		while (start <= end) {
			if (start.getDay() == 1 || (startDateArr.length == 0 && !sDate)) {
				sDate = new Date(start.getTime());
			}

			if ((sDate && start.getDay() == 0) || start.getTime() == end.getTime()) {
				eDate = new Date(start.getTime());
			}

			if (eDate && eDate) {
				let sDate2 = dateFormatter(sDate);
				let eDate2 = dateFormatter(eDate);

				startDateArr.push(sDate2);
				endDateArr.push(eDate2);
				sDate = undefined;
				eDate = undefined;
				sDate2 = undefined;
				eDate2 = undefined;
			}

			start.setDate(start.getDate() + 1);
		}

		// push final data up
		for (let i = 0; i < startDateArr.length; i++) {
			dataSource.categories[1].category.push({
				start: startDateArr[i],
				end: endDateArr[i],
			});
		}

		history.push(`/board/${match.params.id}/gantt_chart/${event.target.id}`);
		setOpen(false);
	};

	console.log("data", dataSource);
	// console.log(board.lists);
	// console.log(lists);

	// useEffect(() => {
	// 	dispatch(getBoard(match.params.id));
	// }, [dispatch, match.params.id]);

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
			<SelectShowChart
				list={list}
				selectedIndex={selectedIndex}
				handleMenuItemClick={handleMenuItemClick}
				open={open}
				setOpen={currentOpen}
			/>
		</Container>
	);
};

export default GanttChart;
