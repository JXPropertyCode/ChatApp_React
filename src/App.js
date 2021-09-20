import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
// import { useState, useEffect } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";
import "./components/messageBox.css";
import LoginForm from "./pages/LoginForm";
import "./index.css";
import SignUpForm from "./pages/SignUpForm";
import MessageCenter from "./pages/MessageCenter";
import AccountCreated from "./pages/AccountCreated";
import LoginSuccess from "./pages/LoginSuccess";
import Logout from "./pages/Logout";
import Error from "./pages/Error";

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
	}
};

export default function App() {
	return (
		<Router>
			{/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
			<Switch>
				<Route exact path="/login-form" component={LoginForm} />
				<Route exact path="/signup-form" component={SignUpForm} />
				{/* auth these login before letting access */}
				<Route exact path="/message-center" component={MessageCenter} />
				<Route
					exact
					path="/account-created"
					component={AccountCreated}
				/>
				<Route exact path="/login-success" component={LoginSuccess} />
				<Route exact path="/logout" component={Logout} />
				{/* always put the default '/' path to the end or else it would access it first thing */}
				<Route exact path="/" component={LoginForm} />
				{/* If no address matches, it will default to 404 error */}
				<Route exact path="*" component={Error} />
			</Switch>
		</Router>
	);
}
