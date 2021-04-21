import React, { useState } from "react";
import { Button } from "@material-ui/core";
import { randImgBoard } from "../redux/action/board";
import { useDispatch } from "react-redux";
import axios from "axios";

const BackgroundButton = ({ board }) => {
	const [randImg, setRandImg] = useState("");
	const dispatch = useDispatch();

	const randButton = async (e) => {
		e.preventDefault();
		const { REACT_APP_UNSPLASH_KEY } = process.env;

		const randURL = `https://api.unsplash.com/photos/random?client_id=${REACT_APP_UNSPLASH_KEY}&query=scenery&count=1&auto=format&q=80`;
		axios.get(randURL).then((res) => {
			setRandImg(res.data[0].urls.full);
			dispatch(randImgBoard(board._id, { randImg }));
		});
	};

	return (
		<div style={{ display: "flex" }}>
			<Button
				variant="contained"
				onClick={(e) => randButton(e)}
				style={{ justifyContent: "flex-start", margin: "5px" }}
			>
				Random Background
			</Button>
		</div>
	);
};

export default BackgroundButton;
