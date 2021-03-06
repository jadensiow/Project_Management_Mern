// Hooks and redux
import { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { login } from "../redux/action/auth";

// Aniamtion
import { motion } from "framer-motion";
import { loginRouteTransition } from "../../animations/routeAnimations";

// Material
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";

import "../styles/temp.css";

const Login = () => {
	useEffect(() => {
		document.title = "Login";
	}, []);

	const dispatch = useDispatch();
	const [formData, setFormData] = useState({
		email: "",
		password: "",
	});
	const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
	const { email, password } = formData;

	const onChange = (e) =>
		setFormData({ ...formData, [e.target.name]: e.target.value });

	const onSubmit = async (e) => {
		e.preventDefault();

		dispatch(login(email, password));
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
					<CssBaseline />
					<div>
						<div style={{ display: "flex", justifyContent: "center" }}>
							<Typography component="h1" variant="h4">
								Plan your projects
							</Typography>
						</div>
						<div
							style={{
								display: "flex",
								justifyContent: "center",
								marginBottom: 10,
							}}
						>
							<Typography component="h1" variant="h5">
								Sign in
							</Typography>
						</div>
						<form onSubmit={(e) => onSubmit(e)}>
							<TextField
								variant="outlined"
								margin="normal"
								required
								fullWidth
								label="Email Address"
								name="email"
								autoComplete="email"
								autoFocus
								value={email}
								onChange={(e) => onChange(e)}
							/>
							<TextField
								variant="outlined"
								margin="normal"
								required
								fullWidth
								name="password"
								label="Password"
								type="password"
								autoComplete="current-password"
								value={password}
								onChange={(e) => onChange(e)}
							/>
							{/* <motion.div
                className="animatable"
                whileHover={{
                  scale: 1.2,
                  transition: { duration: 0.3 },
                }}
                whileTap={{ scale: 0.9 }}
              > */}
							<Button
								type="submit"
								fullWidth
								variant="contained"
								color="primary"
							>
								Sign In
							</Button>
							{/* </motion.div> */}
							<Grid container justify="flex-end">
								<Grid item>
									<Link href="/register" variant="body2">
										Don't have an account? Sign Up
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

export default Login;
