import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState, useEffect, useRef } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";
import MessageObject from "../model/MessageObject";
import { useDispatch } from "react-redux";

const MessageCenter = () => {
	const history = useHistory();
	const dispatch = useDispatch();

	const { sendMessage, lastMessage, readyState } = useWebSocket(
		"ws://localhost:8000/"
	);

	const validAccount = useSelector((state) => state.auth.accountVerified);
	const userEmail = useSelector((state) => state.auth.email);
	const userPass = useSelector((state) => state.auth.password);
	const username = useSelector((state) => state.auth.username);

	// const [prepMessage, setPrepMessage] = useState("");
	const prepMessage = useRef(null);

	// gets chatroom message from persist store
	const [messagelog, setMessagelog] = useState(
		useSelector((state) => state.chatroom.messages)
	);

	useEffect(() => {
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

		// basically same as lastmessage?
		// client.onmessage = function (e) {
		// 	e.preventDefault();
		// 	console.log("Received from Server:", JSON.parse(e.data));
		// };
		// setMessagelog(previousMessagelog)
	}, []);

	useEffect(() => {
		if (lastMessage !== null) {
			let convertData = JSON.parse(lastMessage.data);
			console.log("lastMessage:", convertData)
			// setRenderMessages(true)
			setMessagelog([...messagelog, convertData]);
			dispatch({ type: "chatroom/sendMessages", payload: convertData });
		}
	}, [lastMessage]);

	if (!validAccount) {
		history.push("/login-form");
	}

	const logoutButton = () => {
		history.push("/logout");
		// console.log("Pressed Logout");
	};

	const onFormSubmit = (e, message) => {
		e.preventDefault();

		const prepmessage = prepMessage.current
		console.log(`${prepmessage['inputMessage'].value}`)
		const currentPrepMessageValue = prepmessage['inputMessage'].value

		// UNIX timestamp
		let timestamp = Math.floor(Date.now() / 1000);

		let convertData = new MessageObject(
			username,
			userEmail,
			userPass,
			timestamp,
			currentPrepMessageValue
		);

		console.log("Data Sent to Server:", convertData);
		sendMessage(JSON.stringify(convertData));
		prepmessage['inputMessage'].value = ""
	
	};

	const resetMessages = (e) => {
		e.preventDefault();
		// this removes directly from the persist store. But alone, this won't remove the HTML
		dispatch({ type: "chatroom/clearMessages" });

		// this clears the messagelog so the UI would remove its HTML
		setMessagelog([]);
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
						if (message !== null) {
							if (message.email !== userEmail) {
								console.log("Someone Else Said...");
								return <p key={idx}>{message.clientMessage}</p>;
							} else {
								console.log("You Said...");
								return (
									<p key={idx} style={{ textAlign: "right" }}>
										{message.clientMessage}
									</p>
								);
							}
						}
						return null;
					})}
				</div>
				<form
					className="messageBox"
					onSubmit={(e) => {
						e.preventDefault();
						if (prepMessage !== "") onFormSubmit(e, prepMessage);
						// if (prepMessage.current !== "") onFormSubmit(e, prepMessage.current);

					}}
					ref={prepMessage}

				>
					<input
						className="messageInputBox"
						type="text"
						name={"inputMessage"}
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
