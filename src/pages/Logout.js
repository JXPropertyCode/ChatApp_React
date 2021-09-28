import { useHistory, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const Logout = () => {
	// const history = useHistory();
	const validAccount = useSelector((state) => state.auth.accountVerified);

	const dispatch = useDispatch();

	console.log("validAccount:", validAccount);

	if (!validAccount) {
		// history.push("/login-form");
		return <Redirect to="/login-form" />;
	}

	// dispatch({ type: "auth/logout" });
	if (validAccount === true) {
		setTimeout(() => {
			dispatch({ type: "auth/logout" });
			// history.push("/login-form");
			return <Redirect to="/login-form" />;
		}, 3000);
	}

	return (
		<div>
			<h1>Logging Out</h1>
			<h3>Redirecting to Login Page...</h3>
		</div>
	);
};

export default Logout;
