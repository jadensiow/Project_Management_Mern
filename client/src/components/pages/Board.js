import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { getBoard, moveCard, moveList } from "../redux/action/board";
import { CircularProgress, Box, Button } from "@material-ui/core";
import { motion } from "framer-motion";
import { boardRouteTransition } from "../../animations/routeAnimations";

import BoardTitle from "../board/BoardTitle.js";
import List from "../list/List";
import CreateList from "../board/CreateList";
import Members from "../board/Members";
import Navbar from "../functions/Navbar";
import BackgroundButton from "../functions/BackgroundButton";

const Board = ({ match }) => {
	const board = useSelector((state) => state.board.board);
	const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
	const dispatch = useDispatch();
	let history = useHistory();
	useEffect(() => {
		return () => {
			console.log("component unmounted");
		};
	}, []);
	useEffect(() => {
		dispatch(getBoard(match.params.id));
	}, [dispatch, match.params.id]);

	if (!isAuthenticated) {
		return <Redirect to="/" />;
	}

	const onDragEnd = (result) => {
		const { source, destination, draggableId, type } = result;
		if (!destination) {
			return;
		}
		if (type === "card") {
			dispatch(
				moveCard(draggableId, {
					fromId: source.droppableId,
					toId: destination.droppableId,
					toIndex: destination.index,
				})
			);
		} else {
			dispatch(moveList(draggableId, { toIndex: destination.index }));
		}
	};
	const handleChat = () => {
		history.push(`/board/${match.params.id}/chat`);
	};
	const handleChart = () => {
		history.push(`/board/${board._id}/gantt_chart`);
	};
	if (!isAuthenticated) {
		return <Redirect to="/" />;
	}

	return !board ? (
		<>
			<Navbar />
			<Box className="board-loading">
				<CircularProgress />
			</Box>
		</>
	) : (
		<motion.div
			variants={boardRouteTransition}
			initial="hidden"
			animate="show"
			exit="exit"
			className="outer-div"
		>
			<div
				className="board-and-navbar"
				style={{
					backgroundImage:
						"url(" +
						(board.backgroundURL
							? board.backgroundURL
							: "https://source.unsplash.com/featured/?scenery,scenery,cities&auto=format&fit=crop&w=2689&q=80") +
						")",
				}}
			>
				<Navbar />
				<section className="board">
					<div className="listOfBtn">
						<BackgroundButton className="backgroundBtn" board={board} />
						<Button
							className="chat"
							variant="contained"
							onClick={handleChat}
							style={{ margin: "5px" }}
						>
							Chat Room
						</Button>
						<Button
							className="chart"
							variant="contained"
							onClick={handleChart}
							style={{ margin: "5px" }}
						>
							Gantt Chart
						</Button>
					</div>
					<div className="board-top">
						<div className="board-top-left">
							<BoardTitle board={board} />
							<Members />
						</div>
					</div>
					<DragDropContext onDragEnd={onDragEnd}>
						<Droppable
							droppableId="all-lists"
							direction="horizontal"
							type="list"
						>
							{(provided) => (
								<div
									className="lists"
									ref={provided.innerRef}
									{...provided.droppableProps}
								>
									{board.lists.map((listId, index) => (
										<List key={listId} listId={listId} index={index} />
									))}
									{provided.placeholder}
									<CreateList />
								</div>
							)}
						</Droppable>
					</DragDropContext>
				</section>
			</div>
		</motion.div>
	);
};

export default Board;
