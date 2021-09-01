import { useHistory } from "react-router-dom";

const AccountCreated = () => {
	const history = useHistory();

	setTimeout(() => history.push("/login-form"), 4000);
	return (
		<div>
			<h1>Account has been created successfully!</h1>
			<h3>Redirecting to Login Page...</h3>
		</div>
	);
};

export default AccountCreated;
