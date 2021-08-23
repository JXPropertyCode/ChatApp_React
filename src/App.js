import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";
import "./components/messageBox.css";
import LoginForm from "./pages/LoginForm";
import "./index.css";
import SignUpForm from "./pages/SignUpForm";
import MessageCenter from "./pages/MessageCenter";


export default function App() {
	return (
		<Router>
			<div>
				{/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
				<Switch>
					<Route path="/LoginForm">
						<LoginForm />
					</Route>
					<Route path="/SignUpForm">
						<SignUpForm />
					</Route>
					<Route path="/MessageCenter">
						<MessageCenter />
					</Route>
					{/* always put the default '/' path to the end or else it would access it first thing */}
					<Route path="/">
						<LoginForm />
					</Route>
				</Switch>
			</div>
		</Router>
	);
}