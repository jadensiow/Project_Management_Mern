import React from "react";
import { useState } from "react";

import CloseIcon from "@material-ui/icons/Close";
import { DateRangePicker } from "react-date-range";
import { Button } from "@material-ui/core";
import { format } from "date-fns";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
const CalendarPopUp = (props) => {
	const [selectionRange, setSelectionRange] = useState({
		startDate: new Date(),
		endDate: new Date(),
		key: "selection",
	});

	const styles = {
		position: "fixed",
		top: "50%",
		left: "50%",
		transform: "translate(-50%, -50%)",
		zIndex: 100,
		padding: "3rem 4rem",
		backgroundColor: "white",
		borderRadius: "1rem",
		boxShadow: "0 0 20px black",
	};

	// https://www.npmjs.com/package/react-date-range
	const handleSelect = (ranges) => {
		setSelectionRange(ranges.selection);
	};

	const submitHandler = (e) => {
		e.preventDefault();
		props.startDateCard(selectionRange.startDate);
		props.endDateCard(selectionRange.endDate);
		props.setShowCalendar(false);
	};

	//
	console.log(selectionRange);

	return (
		<div style={styles}>
			<div
				style={{
					display: "flex",
					flexDirection: "coloum",
					justifyContent: "center",
					alignItems: "center",
				}}
			>
				<CloseIcon
					color="primary"
					style={{
						position: "absolute",
						top: "3%",
						right: "3%",
					}}
					onClick={() => props.setShowCalendar(false)}
					onMouseOver={(e) => (e.target.style.cursor = "pointer")}
				/>
				<DateRangePicker ranges={[selectionRange]} onChange={handleSelect} />{" "}
				<Button variant="contained" color="primary" onClick={submitHandler}>
					Submit
				</Button>
			</div>
		</div>
	);
};

export default CalendarPopUp;
