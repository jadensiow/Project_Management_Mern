import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "@material-ui/core";

import { logout } from "../redux/action/auth";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import HomeRoundedIcon from "@material-ui/icons/HomeRounded";

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	menuButton: {
		marginRight: theme.spacing(2),
	},
	title: {
		flexGrow: 1,
	},
	navbar: {
		backgroundColor: "#88E9B8",
	},
	hyperlink: {
		color: "white",
		"&:hover": {
			boxShadow: "0 0 0 10px #83E0B1",
		},
		borderRadius: "10px",
	},
}));

const Navbar = () => {
	const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
	const dispatch = useDispatch();
	const classes = useStyles();

	if (!isAuthenticated) {
		return "";
	}

	return (
		<div className={classes.root}>
			<AppBar className={classes.navbar} position="static">
				<Toolbar>
					<IconButton
						edge="start"
						className={classes.menuButton}
						color="inherit"
						aria-label="menu"
						href="/dashboard"
					>
						<HomeRoundedIcon fontSize="large" />
					</IconButton>{" "}
					<Typography variant="h4" className={classes.title}>
						<Link href="/" className={classes.hyperlink} underline="none">
							Project Management
						</Link>
					</Typography>
					{isAuthenticated ? (
						<Button
							color="inherit"
							href="/"
							onClick={() => dispatch(logout())}
							size="default"
							variant="outlined"
						>
							<Typography variant="h6">Logout</Typography>
						</Button>
					) : (
						<Button
							color="inherit"
							href="/login"
							size="default"
							variant="outlined"
						>
							<Typography variant="h6">Login</Typography>
						</Button>
					)}
				</Toolbar>
			</AppBar>
		</div>
	);
};

export default Navbar;

// const Navbar = () => {

// 	return (
// 		<div className={classes.root}>
// 			<AppBar position="static">
// 				<Toolbar>
// 					<IconButton
// 						edge="start"
// 						className={classes.menuButton}
// 						color="inherit"
// 						aria-label="menu"
// 						href="/dashboard"
// 					>
// 						<HomeRoundedIcon />
// 					</IconButton>
// 					<Typography variant="h6" className={classes.title}>
// 						Project Management
// 					</Typography>
// 					<Button color="inherit" href="/login">
// 						Login
// 					</Button>
// 				</Toolbar>
// 			</AppBar>
// 		</div>
// 	);
// };
