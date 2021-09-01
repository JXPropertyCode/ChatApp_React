import { useHistory } from "react-router-dom";

const LoginSuccess = () => {
	const history = useHistory();

	setTimeout(() => history.push("/message-center"), 4000);
	return (
		<div>
			<h1>Login Successful!</h1>
			<h3>Redirecting to Message Center...</h3>
		</div>
	);
};

export default LoginSuccess