import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";
import MessageObject from "../model/MessageObject";

const MessageCenter = () => {
	const history = useHistory();
	const validAccount = useSelector((state) => state.auth.accountVerified);
	const userEmail = useSelector((state) => state.auth.email);
	const userPass = useSelector((state) => state.auth.password);
	const username = useSelector((state) => state.auth.username);

	const [prepMessage, setPrepMessage] = useState("");
	const [sendUserData, setSendUserData] = useState({
		timestamp: 0,
		username: username,
		clientMessage: "",
		email: userEmail,
		password: userPass,
	});

	const { sendMessage, lastMessage, readyState } = useWebSocket(
		"ws://localhost:8000/"
	);

	if (!validAccount) {
		history.push("/login-form");
	}

	const logoutButton = () => {
		history.push("/logout");
		// console.log("Pressed Logout");
	};

	const onFormSubmit = (e, message) => {
		e.preventDefault();

		// UNIX timestamp
		let timestamp = Math.floor(Date.now() / 1000);

		let convertData = new MessageObject(
			sendUserData.username,
			timestamp,
			prepMessage
		);

		console.log("Sending Message:", message);
		sendMessage(JSON.stringify(convertData));
		setPrepMessage("");
	};

	return (
		<div>
			<div>
				<h1>{username}'s Dashboard</h1>
				<button onClick={logoutButton}>Logout Button</button>
			</div>
			<div className="chatDisplay">
				{/* onFormSubmit() mechanism enables you to click the input box and pressing enter would trigger it only */}
				<div className="messageWindow">
					{/* {messages.map((msg, i) => {
						return <p key={i}>{msg.clientMessage}</p>;
					})} */}
				</div>
				<form
					className="messageBox"
					onSubmit={(e) => onFormSubmit(e, prepMessage)}
				>
					<input
						className="messageInputBox"
						type="text"
						value={prepMessage}
						onChange={(e) => {
							setPrepMessage(e.target.value);
						}}
					/>
					<button className="chatSendButton" type="submit">
						Send
					</button>
				</form>
			</div>
		</div>
	);
};

export default MessageCenter;
