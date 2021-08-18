import { useState } from "react";

const LoginForm = ({ login, error }) => {
	const [details, setDetails] = useState({
		name: "",
		email: "",
		password: "",
	});

	const submitHandler = (e) => {
		// prevent re-renders
		e.preventDefault();
		console.log("e:", e);
		login(details);
	};

	const createAccount = () => {
		console.log("Confirm Create Account");
	};

	const [loginPage, setLoginPage] = useState(true);
	const [signupPage, setSignupPage] = useState(false);

	if (signupPage === true && loginPage === false) {
		return (
			<form onSubmit={createAccount}>
				<div className="form-inner">
					<h2>Sign Up</h2>
					<div className="form-group">
						<label htmlFor="email">Email:</label>
						<input
							type="email"
							name="email"
							id="email"
							onChange={(e) =>
								setDetails({
									...details,
									email: e.target.value,
								})
							}
							value={details.email}
						/>
					</div>
					<div className="form-group">
						<label htmlFor="password">Password:</label>
						<input
							type="password"
							name="password"
							id="password"
							onChange={(e) =>
							setDetails({
								...details,
								password: e.target.value,
							})
							}
							value={details.password}
						/>
					</div>
					<div className="form-group">
						<label htmlFor="password">Confirm Password:</label>
						<input
							type="password"
							name="password"
							id="password"
							// onChange={(e) =>
							// 	setDetails({
							// 		...details,
							// 		password: e.target.value,
							// 	})
							// }
							// value={details.password}
						/>
					</div>
					<input
						className="signupButton"
						type="button"
						value="Back to Login"
						onClick={() => {
							setLoginPage(true);
							setSignupPage(false);
						}}
					/>
					<input
						type="button"
						className="signupButton"
						onClick={() => console.log("Create Account")}
						value="Create Account"
					/>
				</div>
			</form>
		);
	}

	return (
		<form onSubmit={submitHandler}>
			<div className="form-inner">
				<h2>Login</h2>

				{error && (
					<div className="error">Login Details Do Not Match</div>
				)}

				{/* <div className="form-group">
					<label htmlFor="name">Name:</label>
					<input
						type="text"
						name="name"
						id="name"
						onChange={(e) =>
							setDetails({ ...details, name: e.target.value })
						}
						value={details.name}
					/>
				</div> */}
				<div className="form-group">
					<label htmlFor="email">Email:</label>
					<input
						type="email"
						name="email"
						id="email"
						onChange={(e) =>
							setDetails({ ...details, email: e.target.value })
						}
						value={details.email}
					/>
				</div>
				<div className="form-group">
					<label htmlFor="password">Password:</label>
					<input
						type="password"
						name="password"
						id="password"
						onChange={(e) =>
							setDetails({ ...details, password: e.target.value })
						}
						value={details.password}
					/>
				</div>
				<input type="submit" value="LOGIN" />
				<input
					type="button"
					className="signupButton"
					onClick={() => {
						setSignupPage(true);
						setLoginPage(false);
						setDetails({
							name: "",
							email: "",
							password: "",
						});
						console.log("Pressed Sign Up");
					}}
					value="SIGN UP"
				/>
			</div>
		</form>
	);
};

export default LoginForm;
