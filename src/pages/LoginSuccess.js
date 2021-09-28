import { useHistory, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

const LoginSuccess = () => {
	const history = useHistory();
	const validAccount = useSelector((state) => state.auth.accountVerified);
	const username = useSelector((state) => state.auth.username);

	if (!validAccount) {
		// history.push("/login-form");
		return <Redirect to="/login-form" />;
	}

	setTimeout(() => history.push("/message-center"), 3000);

	return (
		<div>
			<h1>Login Successful!</h1>
			<h3>Welcome {username}!</h3>
			<h3>Redirecting to Message Center...</h3>
		</div>
	);
};

export default LoginSuccess;
