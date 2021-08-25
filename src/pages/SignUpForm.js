import { useState } from "react";
import "../index.css";
import "../components/messageBox.css";
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link,
	Redirect,
	useHistory,
} from "react-router-dom";

const SignUpForm = () => {
	// track the user input
	const [creatingCred, setCreatingCred] = useState({
		name: "",
		email: "",
		password: "",
		confirmPassword: "",
	});

	const createAccount = (e) => {
		if (creatingCred.password === creatingCred.confirmPassword) {
			console.log("Creating Account Confirmed");
		}

		e.preventDefault();
	};

	const history = useHistory();

	return (
		<div className="App">
			<form onSubmit={createAccount}>
				<div className="form-inner">
					<h2>Sign Up</h2>
					<div className="form-group">
						<label htmlFor="name">Name:</label>
						<input
							type="text"
							name="name"
							id="name"
							onChange={(e) => {
								setCreatingCred({
									...creatingCred,
									name: e.target.value,
								});
								console.log("Typing Name:", e.target.value);
							}}
							value={creatingCred.name}
						/>
					</div>
					<div className="form-group">
						<label htmlFor="email">Email:</label>
						<input
							type="email"
							name="email"
							id="email"
							onChange={(e) => {
								setCreatingCred({
									...creatingCred,
									email: e.target.value,
								});
								console.log("Typing Email:", e.target.value);
							}}
							value={creatingCred.email}
						/>
					</div>
					<div className="form-group">
						<label htmlFor="password">Password:</label>
						<input
							type="password"
							name="password"
							id="password"
							onChange={(e) => {
								setCreatingCred({
									...creatingCred,
									password: e.target.value,
								});
								console.log("Typing Password:", e.target.value);
							}}
							value={creatingCred.password}
						/>
					</div>
					<div className="form-group">
						<label htmlFor="password">Confirm Password:</label>
						<input
							type="password"
							name="password"
							id="password"
							onChange={(e) => {
								setCreatingCred({
									...creatingCred,
									confirmPassword: e.target.value,
								});
								console.log(
									"Typing confirmPassword:",
									e.target.value
								);
							}}
							value={creatingCred.confirmPassword}
						/>
					</div>
					<input
						type="submit"
						className="signupButton"
						onClick={() => {
							console.log("Create Account using:", creatingCred);
						}}
						value="Create Account"
					/>
					<input
						className="signupButton"
						type="button"
						value="Back to Login"
						onClick={() => {
							console.log("Going back to login...");
							setCreatingCred({
								name: "",
								email: "",
								password: "",
								confirmPassword: "",
							});
							history.push("/LoginForm");
						}}
					/>
				</div>
			</form>
		</div>
	);
};

export default SignUpForm;
