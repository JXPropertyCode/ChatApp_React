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

// const [messages, setMessages] = useState([])

client.onmessage = function (e) {
	// if (typeof e.data === "string") {
	// 	console.log("Received: '" + e.data + "'");
	// }

	// the e.data comes in a object format but in a string, so need to convert it to JSON
	let dataReceived = JSON.parse(e.data)
	console.log("dataReceived from Server:", dataReceived)
	console.log("Message Received from Server: '" + dataReceived.clientMessage + "'");
	// setMessages([...messages, dataReceived.clientMessage])
};

// useEffect(() => {
// 	console.log("messages:", messages)
// }, [messages])

function App() {

	const [sendMessage, setSendMessage] = useState("")

	const onFormSubmit = (e, sendMessage) => {
		// prevents refresh, if you have form and onSubmit
		// stops the browsers default behaviour
		e.preventDefault();

		// prevent whitespace messages
		let userText = sendMessage.replace(/^\s+$/g, "");
		if (userText.length === 0) {
			console.log("Empty String");
			setSendMessage("");
			return;
		}

		if (client.readyState === client.OPEN) {
			console.log("Message Sent:", sendMessage);
			let date = new Date();
			let entireMessage = {
				dateSent: date.toString(),
				clientMessage: sendMessage.toString(),
			};

			console.log("entireMessage Successfully Sent to Server:", entireMessage);
			client.send(JSON.stringify(entireMessage));
		} else {
			console.log("client.readyState isn't connected");
			let date = new Date();
			let entireMessage = {
				dateSent: date.toString(),
				clientMessage: sendMessage.toString(),
			};
			console.log("entireMessage NOT Sent to Server:", entireMessage);
		}
		setSendMessage("");
	};

	return (
		<div>
			<div className="chatDisplay">
				{/* onFormSubmit() mechanism enables you to click the input box and pressing enter would trigger it only */}
				<div className="messageWindow"></div>
				<form
					className="messageBox"
					onSubmit={(e) => onFormSubmit(e, sendMessage)}
				>
					<input
						className="inputBox"
						type="text"
						value={sendMessage}
						onChange={(e) => setSendMessage(e.target.value)}
					/>
					<button type="submit">Send</button>
				</form>
			</div>
		</div>
	);
}

export default App;
