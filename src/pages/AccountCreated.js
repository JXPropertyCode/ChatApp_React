import { useHistory, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

const AccountCreated = (props) => {
	const history = useHistory();
	const validAccount = useSelector((state) => state.auth.accountVerified);

	console.log("validAccount:", validAccount);
	console.log("props.auth:", props.auth);

	// if the account is already valid, then don't let it have access
	// if (!validAccount) {
	// 	console.log("!validAccount")
	// 	history.push("/login-form");
	// }

	// props.auth is from signupform, it is to say that it went through the sign up form. its default value is true
	// if not valid account and not gone through sign up, then push back to login
	// if (validAccount && props.auth === undefined) {
	// 	console.log("validAccount && props.auth === undefined")
	// 	// history.push("/login-form");
	// 	return <Redirect to="/login-form" />;
	// }

	// previously the above, when you are logged in, you can still access the page
	// if you were not logged in, it wouldn't let you go there
	// so solve both issues, this is the solution
	if (props.auth === undefined) {
		console.log("validAccount && props.auth === undefined");
		// history.push("/login-form");
		return <Redirect to="/login-form" />;
	}

	setTimeout(() => history.push("/login-form"), 3000);
	return (
		<div>
			<h1>Account has been created successfully!</h1>
			<h3>Redirecting to Login Page...</h3>
		</div>
	);
};

export default AccountCreated;
