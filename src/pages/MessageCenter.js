import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

const MessageCenter = () => {
	// const [state, dispatch] = useReducer((reducer), initialState, init)
	// email -> reducer.authSlice.email

	const history = useHistory();
	const validAccount = useSelector((state) => state.auth.accountVerified);

	if (!validAccount) {
		history.push("/login-form");
	}
	console.log("Welcome to Message Center");

	const logoutButton = () => {
		history.push("/logout");
		console.log("Pressed Logout");
	};

	// {/* <div className="chatDisplay">
	// 				{/* onFormSubmit() mechanism enables you to click the input box and pressing enter would trigger it only */}
	// 				<div className="messageWindow">
	// 					{/* {messages.map((msg, i) => {
	// 						return <p key={i}>{msg.clientMessage}</p>;
	// 					})} */}
	// 				</div>
	// 				<form
	// 					className="messageBox"
	// 					// onSubmit={(e) => onFormSubmit(e, prepMessage)}
	// 				>
	// 					<input
	// 						className="messageInputBox"
	// 						type="text"
	// 						// value={prepMessage}
	// 						// onChange={(e) => setPrepMessage(e.target.value)}
	// 					/>
	// 					<button className="chatSendButton" type="submit">
	// 						Send
	// 					</button>
	// 				</form>
	// 			</div>  */}

	// if email == "" {
	// redicrect -> home page / login
	// }

	return (
		<div>
			<h1>This is Message Center</h1>
			<button onClick={logoutButton}>Logout Button</button>
		</div>
	);
};

export default MessageCenter;
