import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState, useCallback, useMemo, useRef } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";
import MessageObject from "../model/MessageObject";
import { useDispatch } from "react-redux";

const MessageCenter = () => {
	const history = useHistory();
	const dispatch = useDispatch();
	// const messagelog = useState([]);
	// const messageHistory = useRef([]);

	const { sendMessage, lastMessage, readyState } = useWebSocket(
		"ws://localhost:8000/"
	);

	const validAccount = useSelector((state) => state.auth.accountVerified);
	const userEmail = useSelector((state) => state.auth.email);
	const userPass = useSelector((state) => state.auth.password);
	const username = useSelector((state) => state.auth.username);

	const [prepMessage, setPrepMessage] = useState("");

	const [messagelog, setMessagelog] = useState([]);

	var W3CWebSocket = require("websocket").w3cwebsocket;

	var client = new W3CWebSocket("ws://localhost:8000/", "echo-protocol");

	client.onerror = function () {
		console.log("Connection Error");
	};

	// sending random numbers to Express's websocket, then Express would output them
	// this is optional for testing purposes
	client.onopen = function () {
		console.log("WebSocket Client Connected");
		// function sendNumber() {
		// 	// this is while the connection is open, it will continually keep sending messages
		// 	// to visualize the flow
		// 	if (client.readyState === client.OPEN) {

		// 		var number = Math.round(Math.random() * 0xffffff);
		// 		let sendInitialData = {
		// 			dateSent: new Date(),
		// 			clientMessage: number.toString()
		// 		}
		// 		// client.send(number.toString());
		// 		client.send(JSON.stringify(sendInitialData))
		// 		setTimeout(sendNumber, 10000);
		// 	}
		// }
		// sendNumber();
	};

	client.onclose = function () {
		console.log("echo-protocol Client Closed");
	};

	client.onmessage = function (e) {
		e.preventDefault();

		if (typeof e.data === "string") {
			console.log("Received from Server:", JSON.parse(e.data));
			// setMessagelog([...messagelog, JSON.parse(e.data)])
		}
	};

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
			userEmail,
			userPass,
			username,
			timestamp,
			prepMessage
		);

		console.log("Data Sent to Server:", convertData);
		// dispatch({ type: "chatroom/sendMessages", payload: convertData });

		sendMessage(JSON.stringify(convertData));
		setPrepMessage("");
	};

	const resetMessages = (e) => {
		e.preventDefault();
		dispatch({ type: "chatroom/clearMessages" });
		// messageHistory.current = [null];
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
					{messagelog.map((message, idx) => {
						// console.log("message:", message);
						if (
							message != null &&
							typeof message.data === "string"
						) {
							return (
								<p key={idx}>
									{JSON.parse(message.data).clientMessage}
								</p>
							);
						}
					})}
				</div>
				<form
					className="messageBox"
					onSubmit={(e) => {
						if (prepMessage !== "") onFormSubmit(e, prepMessage);
					}}
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
					<button className="chatSendButton" onClick={resetMessages}>
						Clear
					</button>
				</form>
			</div>
		</div>
	);
};

export default MessageCenter;
