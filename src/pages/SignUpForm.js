import { useState, useRef } from "react";
import "../index.css";
import "../components/messageBox.css";
import { useHistory, Redirect } from "react-router-dom";
import AccountObject from "../model/AccountObject";
import axios from "axios";
import { useSelector } from "react-redux";
import uuid from "react-native-uuid";

const SignUpForm = () => {
	const userName = useRef(null);
	const userEmail = useRef(null);
	const userPass = useRef(null);
	const userConPass = useRef(null);

	const history = useHistory();

	const validAccount = useSelector((state) => state.auth.accountVerified);

	const [credPassError, setCredPassError] = useState(false);
	const [credEmailError, setCredEmailError] = useState(false);

	if (validAccount) {
		return <Redirect to="/message-center" />;
	}

	const createAccount = (e) => {
		e.preventDefault();

		const creatingCred = {
			userID: uuid.v4(),
			username: userName.current.value,
			email: userEmail.current.value,
			password: userPass.current.value,
			confirmPassword: userConPass.current.value,
		};

		console.log("Creating Account using:", creatingCred);

		if (creatingCred.password === creatingCred.confirmPassword) {
			// UNIX timestamp
			let timestamp = Math.floor(Date.now() / 1000);

			let convertData = new AccountObject(
				creatingCred.userID,
				creatingCred.username,
				creatingCred.email,
				creatingCred.password,
				timestamp
			);

			axios
				.post("http://192.168.4.24:8000/signup", convertData)
				.then((res) => {
					if (res.data.validCred === "true") {
						console.log("Success! Account Created:", convertData);
						setCredEmailError(false);
						history.push({
							pathname: "/account-created",
							auth: true,
						});
					} else {
						console.log(
							"Error! Email Already Exists:",
							convertData.email
						);
						setCredEmailError(true);
					}
				})
				.catch((err) => {
					console.error(err);
				});
			setCredPassError(false);
		} else {
			setCredPassError(true);
		}
	};

	return (
		<div className="App">
			<form onSubmit={createAccount}>
				<div className="form-inner">
					<h2>Sign Up</h2>
					{credEmailError && <h4>Email Has Already Been Taken!</h4>}
					{credPassError && <h4>Your Passwords Do Not Match!</h4>}

					<div className="form-group">
						<label htmlFor="name">Name:</label>
						<input
							type="text"
							name="name"
							id="name"
							ref={userName}
							required
						/>
					</div>
					<div className="form-group">
						<label htmlFor="email">Email:</label>
						<input
							type="email"
							name="email"
							id="email"
							ref={userEmail}
							required
						/>
					</div>
					<div className="form-group">
						<label htmlFor="password">Password:</label>
						<input
							type="password"
							name="password"
							id="password"
							ref={userPass}
							required
						/>
					</div>
					<div className="form-group">
						<label htmlFor="password">Confirm Password:</label>
						<input
							type="password"
							name="password"
							id="confirmPassword"
							ref={userConPass}
							required
						/>
					</div>

					<input
						type="submit"
						className="signupButton"
						value="Create Account"
					/>
					<input
						className="signupButton"
						type="button"
						value="Back to Login"
						onClick={() => {
							console.log("Going back to login...");
							history.push("/login-form");
						}}
					/>
				</div>
			</form>
		</div>
	);
};

export default SignUpForm;
