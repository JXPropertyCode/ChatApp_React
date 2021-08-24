import "../index.css";
import "../components/messageBox.css";
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link,
	Redirect,
	useHistory
} from "react-router-dom";
// { setSignupPage, setLoginPage, setLoginStatus, setError }
const SignUpForm = () => {
	// const createAccount = (e) => {
	// 	console.log("Confirm Create Account");
	// 	e.preventDefault();
	// 	setSignupPage(true);
	// 	setLoginPage(false);
	// 	setLoginStatus(false);
	// 	setError(false);
	// };

	const history = useHistory()

    return (
		<div className="App">
			<form
			// onSubmit={createAccount}
			>
				<div className="form-inner">
					<h2>Sign Up</h2>
					<div className="form-group">
						<label htmlFor="name">Name:</label>
						<input type="text" name="name" id="name" />
					</div>
					<div className="form-group">
						<label htmlFor="email">Email:</label>
						<input type="email" name="email" id="email" />
					</div>
					<div className="form-group">
						<label htmlFor="password">Password:</label>
						<input type="password" name="password" id="password" />
					</div>
					<div className="form-group">
						<label htmlFor="password">Confirm Password:</label>
						<input type="password" name="password" id="password" />
					</div>
					<input
						type="submit"
						className="signupButton"
						// onClick={() => {
						// 	console.log("Create Account");
						// 	setSignupPage(true);
						// 	setLoginPage(false);
						// 	setLoginStatus(false);
						// }}
						value="Create Account"
					/>
					<input
						className="signupButton"
						type="button"
						value="Back to Login"
						onClick={() => {
							// setLoginPage(true);
							// setSignupPage(false);
							history.push('/LoginForm')
						}}
					/>
				</div>
			</form>
		</div>
	);
};

export default SignUpForm;
