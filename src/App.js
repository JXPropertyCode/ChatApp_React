import { useState, useEffect } from "react";
import "./components/messageBox.css";

var W3CWebSocket = require("websocket").w3cwebsocket;

var client = new W3CWebSocket("ws://localhost:8000/", "echo-protocol");

client.onerror = function () {
	console.log("Connection Error");
};

// sending random numbers to Express's websocket, then Express would output them
client.onopen = function () {
	console.log("WebSocket Client Connected");
	function sendNumber() {
		if (client.readyState === client.OPEN) {
			var number = Math.round(Math.random() * 0xffffff);
			client.send(number.toString());
			setTimeout(sendNumber, 1000);
		}
	}
	sendNumber();
};

client.onclose = function () {
	console.log("echo-protocol Client Closed");
};

client.onmessage = function (e) {
	if (typeof e.data === "string") {
		console.log("Received: '" + e.data + "'");
	}
};

function App() {
	const [message, setMessage] = useState("");

	const messageInput = (e) => {
		// e.target.value gets the entire input bar's values
		e.preventDefault();
		console.log("e.target.value:", e.target.value);
		setMessage(e.target.value);
	};

	const onFormSubmit = (message) => {

		let userText = message.replace(/^\s+|\s+$/g, '');
		// console.log("userText:", userText, userText.length)

		if (userText.length === 0) {
			console.log("Empty String")
			setMessage("");
			return
		}
		console.log("Message Sent:", message);
		setMessage("");
	};

	const onKeyDown = (e) => {
		if (e.code === "Enter" || e.code === "NumpadEnter") {
			// console.log("Enter Detected");
			onFormSubmit(e.target.value)
		}
	};

	useEffect(() => {
		window.addEventListener("keydown", onKeyDown);
		return () => {
			window.removeEventListener("keydown", onKeyDown);
		};
	}, []);

	return (
		<div>
			<div className="messageBox">
				<input
					type="text"
					value={message}
					onChange={(e) => messageInput(e)}
				/>
				<button type="submit" onClick={() => onFormSubmit(message)}>
					Send
				</button>
			</div>
		</div>
	);
}

export default App;
