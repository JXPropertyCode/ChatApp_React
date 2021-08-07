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
	return (
		<div>
			<form>
				<label className="messageBox">
					<input type="string" />
					<button>Send</button>
				</label>
			</form>
		</div>
	);
}

export default App;
