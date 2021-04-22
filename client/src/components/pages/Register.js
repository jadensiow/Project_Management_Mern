// Hooks and redux
import { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { setAlert } from "../redux/action/alert";
import { register } from "../redux/action/auth";
import { useSelector, useDispatch } from "react-redux";

// Animation
import { motion } from "framer-motion";
import { loginRouteTransition } from "../../animations/routeAnimations";

// Material UI
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import CssBaseline from "@material-ui/core/CssBaseline";

// Components
import "../styles/temp.css";

const Register = () => {
	useEffect(() => {
		document.title = "Registration";
	}, []);

	const [registration, setRegistration] = useState({
		FullName: "",
		email: "",
		password: "",
		cfmPassword: "",
	});

	const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
	const dispatch = useDispatch();
	const { name, email, password, cfmPassword } = registration;

	const onChange = (e) =>
		setRegistration({ ...registration, [e.target.name]: e.target.value });

	const onSubmit = async (e) => {
		e.preventDefault();
		if (password !== cfmPassword) {
			dispatch(setAlert("Passwords do not match", "error"));
		} else {
			dispatch(register({ name, email, password }));
		}
	};

	if (isAuthenticated) {
		return <Redirect to="/dashboard" />;
	}

	return (
		<motion.div
			variants={loginRouteTransition}
			initial="hidden"
			animate="show"
			exit="exit"
			className="outer-div"
		>
			<div
				style={{
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					height: "80%",
				}}
			>
				<Container component="main" maxWidth="xs">
					<div>
						<div style={{ display: "flex", justifyContent: "center" }}>
							<Typography component="h1" variant="h4">
								Project Management
							</Typography>
						</div>

						<div style={{ display: "flex", justifyContent: "center" }}>
							<Typography component="h1" variant="h5">
								Sign up
							</Typography>
						</div>

						<form onSubmit={(e) => onSubmit(e)}>
							<Grid container spacing={2}>
								<Grid item xs={12}>
									<TextField
										autoComplete="name"
										name="name"
										variant="outlined"
										required
										fullWidth
										label="Your Name"
										autoFocus
										value={name}
										onChange={(e) => onChange(e)}
										style={{ marginTop: 20 }}
									/>
								</Grid>
								<Grid item xs={12}>
									<TextField
										variant="outlined"
										required
										fullWidth
										label="Email Address"
										name="email"
										autoComplete="email"
										value={email}
										onChange={(e) => onChange(e)}
									/>
								</Grid>
								<Grid item xs={12}>
									<TextField
										variant="outlined"
										required
										fullWidth
										name="password"
										label="Password"
										type="password"
										value={password}
										onChange={(e) => onChange(e)}
									/>
								</Grid>
								<Grid item xs={12}>
									<TextField
										variant="outlined"
										required
										fullWidth
										name="cfmPassword"
										label="Confirm Password"
										type="password"
										value={cfmPassword}
										onChange={(e) => onChange(e)}
									/>
								</Grid>
							</Grid>
							<Button
								type="submit"
								fullWidth
								variant="contained"
								color="primary"
								style={{ marginTop: 10 }}
							>
								Register
							</Button>
							<Grid container justify="flex-end">
								<Grid item>
									<Link href="/login" variant="body2">
										Already have an account? Sign in
									</Link>
								</Grid>
							</Grid>
						</form>
					</div>
				</Container>
			</div>
		</motion.div>
	);
};

export default Register;
