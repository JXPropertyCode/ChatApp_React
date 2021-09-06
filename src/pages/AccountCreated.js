import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

const AccountCreated = () => {
	const history = useHistory();
	const validAccount = useSelector((state) => state.auth.accountVerified);

	if (!validAccount) {
		history.push("/login-form");
	}

	setTimeout(() => history.push("/login-form"), 4000);
	return (
		<div>
			<h1>Account has been created successfully!</h1>
			<h3>Redirecting to Login Page...</h3>
		</div>
	);
};

export default AccountCreated;
