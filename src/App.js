import { useState } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";
import "./components/messageBox.css";

function App() {
	// This can also be an async getter function. See notes below on Async Urls.
	const socketUrl = "ws://localhost:8000/";

	const { readyState } = useWebSocket(socketUrl);

	const {
		sendMessage,
		// sendJsonMessage,
		// lastMessage,
		// lastJsonMessage,
		// readyState,
		// getWebSocket,
	} = useWebSocket(socketUrl, {
		// if successfully connected to the Express WebSocket
		onOpen: () =>
			console.log("Successfully Connected to Express WebSocket..."),
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

	const [prepMessage, setPrepMessage] = useState("")
	// const [sendMessage, setSendMessage] = useState("");

	const [messages, setMessages] = useState([]);

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
			// client.send(JSON.stringify(entireMessage));
			sendMessage(JSON.stringify(entireMessage))
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
				<div className="messageWindow"></div>
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
