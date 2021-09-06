import { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";

const LoginForm = () => {
	// usually this should be stored in a server/DB
	// const adminUser = {
	// 	email: "admin@admin.com",
	// 	password: "123",
	// };

	const dispatch = useDispatch();

	const history = useHistory();

	const [invalidCred, setInvalidCred] = useState(false);

	const [inputCred, setInputCred] = useState({
		email: "",
		password: "",
	});

	const login = (inputCred) => {
		// console.log("Pressed Log In using Cred:", inputCred);

		axios
			.post("http://192.168.4.24:8000/login-validation", inputCred)
			.then((res) => {
				if (res.data.validCred === "true") {
					// console.log("Success! Account Found:", inputCred);
					setInvalidCred(false);

					dispatch({ type: "auth/login", payload: inputCred });
					// dispatch({ type: "auth/outputData" });

					history.push("/login-success");
				} else {
					// console.log("Error! Account Doesn't Exist...");
					setInvalidCred(true);
				}
			})
			.catch((err) => {
				console.error(err);
			});
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
						<div className="invalidCred">
							Login Details Do Not Match
						</div>
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
							history.push("/signup-form");
						}}
						value="SIGN UP"
					/>
				</div>
			</form>
		</div>
	);
};

export default LoginForm;
