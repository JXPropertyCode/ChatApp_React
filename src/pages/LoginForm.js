import { render } from "@testing-library/react";
import { useState } from "react";
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link,
	Redirect,
	useHistory
} from "react-router-dom";
import MessageCenter from "./MessageCenter";

//  { login, error, setError, setLoginPage, setSignupPage }
const LoginForm = () => {
	// usually this should be stored in a server/DB
	const adminUser = {
		email: "admin@admin.com",
		password: "123",
	};

	const history = useHistory()

	const [invalidCred, setInvalidCred] = useState(false)

	const [inputCred, setInputCred] = useState({
		email: "",
		password: "",
	});

	const login = (inputCred) => {
		console.log("Pressed Log In using Cred:", inputCred);
		if (
			inputCred.email === adminUser.email &&
			inputCred.password === adminUser.password
		) {
			console.log("Logged In");
			setInvalidCred(false)
			history.push('/MessageCenter')
		} else {
			console.log("Login Details Do Not Match");
			setInvalidCred(true)
		}
	};

	const submitHandler = (e) => {
		// prevent re-renders
		e.preventDefault();
		login(inputCred);
	};

	return (
		<div className="App">
			<form onSubmit={submitHandler}>
				<div className="form-inner">
					<h2>Login</h2>

					{invalidCred && (
						<div className="error">Login Details Do Not Match</div>
					)}

					<div className="form-group">
						<label htmlFor="email">Email:</label>
						<input
							type="email"
							name="email"
							id="email"
							onChange={(e) => {
								setInputCred({
									...inputCred,
									email: e.target.value,
								});
								console.log("Typing Email:", e.target.value);
							}}
							value={inputCred.email}
						/>
					</div>
					<div className="form-group">
						<label htmlFor="password">Password:</label>
						<input
							type="password"
							name="password"
							id="password"
							onChange={(e) => {
								setInputCred({
									...inputCred,
									password: e.target.value,
								});
								console.log("Typing Password:", e.target.value);
							}}
							value={inputCred.password}
						/>
					</div>

					{/* Log In Button */}
					<input type="submit" value="LOGIN" />
					<input
						type="button"
						className="signupButton"
						onClick={() => {
							setInputCred({
								email: "",
								password: "",
							});
							history.push('/SignUpForm')
						}}
						value="SIGN UP"
					/>
				</div>
			</form>
		</div>
	);
};

export default LoginForm;
