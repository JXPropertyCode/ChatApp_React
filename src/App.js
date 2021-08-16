// import { useState, useEffect } from "react";
import { useState, useEffect } from "react";

import useWebSocket, { ReadyState } from "react-use-websocket";
import "./components/messageBox.css";

function App() {
	// This can also be an async getter function. See notes below on Async Urls.
	const socketUrl = "ws://localhost:8000/echo";
	const { readyState } = useWebSocket(socketUrl);
	const [prepMessage, setPrepMessage] = useState("");
	const [messages, setMessages] = useState([]);
	const {
		sendMessage,
		// sendJsonMessage,
		// lastMessage,
		// lastJsonMessage,
		// readyState,
		// getWebSocket,
	} = useWebSocket(socketUrl, {
		// if successfully connected to the Express WebSocket
		onOpen: () => {
			console.log("Successfully Connected to Express WebSocket...");
		},
		onMessage: (e) => {
			// this prevents error: Unexpected token H in JSON at position 0
			// if (e.data === "Hi there, I am a WebSocket server") return
			console.log("Received from Server:", JSON.parse(e.data));
			setMessages((messages) => [...messages, JSON.parse(e.data)]);
		},
		// Will attempt to reconnect on all close events, such as server shutting down
		shouldReconnect: (closeEvent) => true,
	});

	const connectionStatus = {
		[ReadyState.CONNECTING]: "Connecting",
		[ReadyState.OPEN]: "Open",
		[ReadyState.CLOSING]: "Closing",
		[ReadyState.CLOSED]: "Closed",
		[ReadyState.UNINSTANTIATED]: "Uninstantiated",
	}[readyState];

	useEffect(() => {
		//console.log("Total Messages:", messages);
	}, []);

	const onFormSubmit = (e, prepMessage) => {
		// prevents refresh, if you have form and onSubmit
		// stops the browsers default behaviour
		e.preventDefault();
		// prevent whitespace messages
		let userText = prepMessage.replace(/^\s+$/g, "");
		if (userText.length === 0) {
			console.log("Empty String");
			setPrepMessage("");
			return;
		}

		if (connectionStatus === "Open") {
			console.log("Message Sent:", prepMessage);
			let date = new Date();
			let entireMessage = {
				dateSent: date.toString(),
				clientMessage: prepMessage.toString(),
			};

			console.log(
				"entireMessage Successfully Sent to Server:",
				entireMessage
			);
			sendMessage(JSON.stringify(entireMessage));

			// trying to receive message from server to put into messages
			// setMessages([...messages, entireMessage])
		} else {
			console.log("client.readyState isn't connected");
			let date = new Date();
			let entireMessage = {
				dateSent: date.toString(),
				clientMessage: prepMessage.toString(),
			};
			console.log("entireMessage NOT Sent to Server:", entireMessage);
		}
		setPrepMessage("");
	};

	return (
		<div>
			<div className="chatDisplay">
				{/* onFormSubmit() mechanism enables you to click the input box and pressing enter would trigger it only */}
				<div className="messageWindow">
					{messages.map((msg, i) => {
						return <p key={i}>{msg.clientMessage}</p>;
					})}
				</div>
				<form
					className="messageBox"
					onSubmit={(e) => onFormSubmit(e, prepMessage)}
				>
					<input
						className="inputBox"
						type="text"
						value={prepMessage}
						onChange={(e) => setPrepMessage(e.target.value)}
					/>
					<button type="submit">Send</button>
				</form>
			</div>
		</div>
	);
}

export default App;
