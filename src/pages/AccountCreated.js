import { useHistory, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

const AccountCreated = (props) => {
	const history = useHistory();
	// const validAccount = useSelector((state) => state.auth.accountVerified);

	// console.log("validAccount:", validAccount);
	// console.log("props.auth:", props.auth);

	// if you were not logged in, it wouldn't let you go there
	// so solve both issues, this is the solution
	if (props.auth === undefined) {
		console.log("props.auth === undefined");
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
