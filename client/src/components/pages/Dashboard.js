// Hooks and redux
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, Link } from "react-router-dom";

// Animation
import { dashboardRouteTransition } from "../../animations/routeAnimations";
import { motion } from "framer-motion";

// Libraries
import { CircularProgress, Box } from "@material-ui/core";

// Components
import Navbar from "../functions/Navbar";
import { getBoards } from "../redux/action/board";
import CreateBoard from "../board/CreateBoard";

const Dashboard = () => {
	useEffect(() => {
		document.title = "Projects";
	}, []);

	// useEffect(() => {
	//   return () => {
	//     console.log("component unmounted");
	//   };
	// }, []);

	const { user, isAuthenticated } = useSelector((state) => state.auth);
	const boards = useSelector((state) => state.board.boards);
	const loading = useSelector((state) => state.board.dashboardLoading);
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getBoards());
	}, [dispatch]);

	if (!isAuthenticated) {
		return <Redirect to="/" />;
	}

	return !boards ? (
		<>
			<Navbar />
			<Box className="board-loading">
				<CircularProgress />
			</Box>
		</>
	) : (
		<motion.div
			variants={dashboardRouteTransition}
			initial="hidden"
			animate="show"
			exit="exit"
			className="outer-div"
		>
			<div className="dashboard-and-navbar">
				<Navbar />

				<section className="dashboard">
					<h1>Welcome {user && user.name}</h1>
					<h2>Your Projects</h2>
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
		</motion.div>
	);
};

export default Dashboard;
