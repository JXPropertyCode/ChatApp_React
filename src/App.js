import { useState } from "react";
import "./components/messageBox.css";

var W3CWebSocket = require("websocket").w3cwebsocket;

var client = new W3CWebSocket("ws://localhost:8000/", "echo-protocol");

client.onerror = function () {
	console.log("Connection Error");
};

// sending random numbers to Express's websocket, then Express would output them
client.onopen = function () {
	console.log("WebSocket Client Connected");
	// this is a setTimeout that constantly sends data to remind connection
	// function sendNumber() {
	// 	if (client.readyState === client.OPEN) {
	// 		// var number = Math.round(Math.random() * 0xffffff);
	// 		let date = new Date()
	// 		let entireMessage = {
	// 			"dateSent": date.toString(),
	// 			"clientMessage": "Still Connected"
	// 		}
	// 		console.log("interval entireMessage:", entireMessage)
	// 		client.send(JSON.stringify(entireMessage));
	// 		// client.send({clientMessage: entireMessage});
	// 		// client.send(new Date() + ": Still Connected");
	// 		setTimeout(sendNumber, 10000);
	// 	}
	// }
	// sendNumber();
};

client.onclose = function () {
	console.log("echo-protocol Client Closed");
};

client.onmessage = function (e) {
	// if (typeof e.data === "string") {
	// 	console.log("Received: '" + e.data + "'");
	// }
	console.log("Received: '" + e.data + "'");

};

function App() {
	const [message, setMessage] = useState("");

	const onFormSubmit = (e, message) => {
		// prevents refresh, if you have form and onSubmit
		// stops the browsers default behaviour
		e.preventDefault();

		// prevent whitespace messages
		let userText = message.replace(/^\s+$/g, "");
		if (userText.length === 0) {
			console.log("Empty String");
			setMessage("");
			return
		}

		if (client.readyState === client.OPEN) {
			console.log("Message Sent:", message);
			// client.send(new Date() + " " + message);

			let date = new Date()
			let entireMessage = {
				"dateSent": date.toString(),
				"clientMessage": message.toString()
			}

			console.log("entireMessage Successfully Sent:", entireMessage)
			client.send(JSON.stringify(entireMessage));
		} else {
			console.log("client.readyState isn't connected")
			let date = new Date()
			let entireMessage = {
				"dateSent": date.toString(),
				"clientMessage": message.toString()
			}
			console.log("entireMessage NOT Sent:", entireMessage)
		}
		setMessage("");
	};

	return (
		<div>
			{/* onFormSubmit() mechanism enables you to click the input box and pressing enter would trigger it only */}
			<form className="messageBox" onSubmit={(e) => onFormSubmit(e, message)}>
				<input
					type="text"
					value={message}
					onChange={(e) => setMessage(e.target.value)}
				/>
				<button type="submit">Send</button>
			</form>
		</div>
	);
}

export default App;
