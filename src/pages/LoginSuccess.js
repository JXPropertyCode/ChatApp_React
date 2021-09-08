import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

const LoginSuccess = () => {
	const history = useHistory();
	const validAccount = useSelector((state) => state.auth.accountVerified);

	if (!validAccount) {
		history.push("/login-form");
	}

	setTimeout(() => history.push("/message-center"), 3000);

	return (
		<div>
			<h1>Login Successful!</h1>
			<h3>Redirecting to Message Center...</h3>
		</div>
	);
};

export default LoginSuccess