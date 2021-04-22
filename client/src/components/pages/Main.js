// Hooks and redux
import { Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";

// Material UI
import { Button } from "@material-ui/core";

const Main = () => {
	const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

	useEffect(() => {
		document.title = "Project Management";
	}, []);

	if (isAuthenticated) {
		return <Redirect to="/dashboard" />;
	}

	return (
		<section className="main">
			<nav className="top">
				<h2>Project Management</h2>
				<div>
					<Button
						variant="outlined"
						color="inherit"
						href="/login"
						style={{ marginRight: 10 }}
					>
						Login
					</Button>
					<Button variant="outlined" color="inherit" href="/register">
						Register
					</Button>
				</div>
			</nav>
			<div className="main-inner">
				<h1>Project Management</h1>
				<p>Manage your project better!</p>
				<div className="buttons">
					<Button variant="outlined" color="inherit" href="/register">
						Register
					</Button>
				</div>
			</div>
		</section>
	);
};

export default Main;
