import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const Logout = () => {
	const history = useHistory();
	const validAccount = useSelector((state) => state.auth.accountVerified);

	console.log("validAccount:", validAccount)

	if (!validAccount) {
		history.push("/login-form");
	}

	const dispatch = useDispatch();

	// dispatch({ type: "auth/logout" });

	setTimeout(() => {
		dispatch({ type: "auth/logout" });
		history.push("/login-form");
	}, 3000);

	return (
		<div>
			<h1>Logging Out</h1>
			<h3>Redirecting to Login Page...</h3>
		</div>
	);
};

export default Logout;
