import { useState, useRef } from "react";
import "../index.css";
import "../components/messageBox.css";
import { useHistory } from "react-router-dom";
import AccountObject from "../model/AccountObject";
import axios from "axios";
import { useSelector } from "react-redux";

const SignUpForm = () => {
	// track the user input
	// const [creatingCred, setCreatingCred] = useState({
	// 	username: "",
	// 	email: "",
	// 	password: "",
	// 	confirmPassword: "",
	// });

	// const creatingCred = {
	// 	username: "",
	// 	email: "",
	// 	password: "",
	// 	confirmPassword: "",
	// };

	const userName = useRef(null);
	const userEmail = useRef(null);
	const userPass = useRef(null);
	const userConPass = useRef(null);

	// const creatingCred = {
	// 	username: userName.current.value,
	// 	email: userEmail.current.value,
	// 	password: userPass.current.value,
	// 	confirmPassword: userConPass.current.value,
	// };

	const history = useHistory();

	const validAccount = useSelector((state) => state.auth.accountVerified);

	// const [accountCreated, setAccountCreated] = useState(false);
	const [credPassError, setCredPassError] = useState(false);
	const [credEmailError, setCredEmailError] = useState(false);

	if (validAccount) {
		history.push("/message-center");
	}

	const createAccount = (e) => {
		e.preventDefault();

		// console.log(userName.current.value, userEmail.current.value, userPass.current.value, userConPass.current.value);
		const creatingCred = {
			username: userName.current.value,
			email: userEmail.current.value,
			password: userPass.current.value,
			confirmPassword: userConPass.current.value,
		};

		console.log("Creating Account using:", creatingCred);

		// return;
		if (creatingCred.password === creatingCred.confirmPassword) {
			// UNIX timestamp
			let timestamp = Math.floor(Date.now() / 1000);

			let convertData = new AccountObject(
				creatingCred.username,
				creatingCred.email,
				creatingCred.password,
				timestamp
			);

			// console.log("Requested Account Cred:", convertData);

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
						// setAccountCreated(true);
					} else {
						console.log(
							"Error! Email Already Exists:",
							convertData.email
						);
						setCredEmailError(true);
						// setAccountCreated(false);
					}
				})
				.catch((err) => {
					console.error(err);
				});
			setCredPassError(false);
		} else {
			// console.log("Create Account NOT Confirmed: Password Error");
			setCredPassError(true);
		}
	};

	// console.log("Re-rendering...");

	return (
		<div className="App">
			<form onSubmit={createAccount}>
				<div className="form-inner">
					<h2>Sign Up</h2>
					{credEmailError && <h4>Email Has Already Been Taken!</h4>}
					{credPassError && <h4>Your Passwords Do Not Match!</h4>}

					{/* {accountCreated && <h4>Account Created!</h4>} */}

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
						// onClick={(e) => {
						// 	const creatingCred = {
						// 		username: userName.current.value,
						// 		email: userEmail.current.value,
						// 		password: userPass.current.value,
						// 		confirmPassword: userConPass.current.value,
						// 	};
						// 	createAccount(e, creatingCred);
						// }}
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
