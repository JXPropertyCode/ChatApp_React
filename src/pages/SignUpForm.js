import { useState } from "react";
import "../index.css";
import "../components/messageBox.css";
import { useHistory } from "react-router-dom";
import AccountObject from "../model/AccountObject";
import axios from "axios";

const SignUpForm = () => {
	// track the user input
	const [creatingCred, setCreatingCred] = useState({
		username: "",
		email: "",
		password: "",
		confirmPassword: "",
	});

	const history = useHistory();

	// const [accountCreated, setAccountCreated] = useState(false);
	const [credPassError, setCredPassError] = useState(false);
	const [credEmailError, setCredEmailError] = useState(false);

	const createAccount = (e) => {
		e.preventDefault();

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
						// console.log("Success! Account Created:", convertData);
						setCredEmailError(false);
						history.push("/account-created");
						// setAccountCreated(true);
					} else {
						// console.log(
						// 	"Error! Email Already Exists:",
						// 	convertData.email
						// );
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
							onChange={(e) => {
								setCreatingCred({
									...creatingCred,
									username: e.target.value,
								});
								console.log("Typing Username:", e.target.value);
							}}
							value={creatingCred.username}
							required
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
							required
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
							required
						/>
					</div>
					<div className="form-group">
						<label htmlFor="password">Confirm Password:</label>
						<input
							type="password"
							name="password"
							id="confirmPassword"
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
							required
						/>
					</div>

					<input
						type="submit"
						className="signupButton"
						onClick={() => createAccount}
						value="Create Account"
					/>
					<input
						className="signupButton"
						type="button"
						value="Back to Login"
						onClick={() => {
							// console.log("Going back to login...");
							setCreatingCred({
								username: "",
								email: "",
								password: "",
								confirmPassword: "",
							});
							history.push("/login-form");
						}}
					/>
				</div>
			</form>
		</div>
	);
};

export default SignUpForm;
