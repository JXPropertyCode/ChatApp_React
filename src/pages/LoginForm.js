import { useState, useRef } from "react";
import { useHistory, Redirect } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

const LoginForm = () => {
	
	const validAccount = useSelector((state) => state.auth.accountVerified);

	const dispatch = useDispatch();

	const history = useHistory();

	const [invalidCred, setInvalidCred] = useState(false);

	const emailCred = useRef(null);
	const passCred = useRef(null);

	const login = (inputCred) => {

		axios
			.post("http://192.168.4.24:8000/login-validation", inputCred)
			.then((res) => {
				if (res.data.validCred === "true") {
					// console.log("Success! Account Found:", inputCred);

					console.log("res.data:", res.data)
					// I added a new key and value to teh inputcred, the username is from the database and inserted to the inputCred so the Store has the username of the user
					inputCred.username = res.data.username;
					inputCred.userID = res.data.userID
					inputCred.chatrooms = [...res.data.chatrooms]

					console.log("Success! Account Found:", inputCred);

					console.log(
						"res.data.username found in database:",
						res.data.username
					);

					console.log("Transferring Data onto Auth Store:", res.data)

					setInvalidCred(false);
					dispatch({ type: "auth/login", payload: inputCred });
					history.push("/login-success");
				} else {
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
		const inputCred = {
			email: emailCred.current.value,
			password: passCred.current.value,
		};

		// doesn't need ex. emailCred.current['email'].value to access the value since its useRef() is not nested on a Form like MessageCenter's prepmessage
		console.log("inputCred to Login:", inputCred);

		login(inputCred);
	};

	if (validAccount) {
		return <Redirect to="/message-center" />;
	}

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
							ref={emailCred}
							required
						/>
					</div>
					<div className="form-group">
						<label htmlFor="password">Password:</label>
						<input
							type="password"
							name="password"
							id="password"
							ref={passCred}
							required
						/>
					</div>

					{/* Log In Button */}
					<input type="submit" value="LOGIN" />
					<input
						type="button"
						className="signupButton"
						onClick={() => {
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
