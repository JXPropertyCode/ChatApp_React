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
			{/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
			<Switch>
				<Route exact path="/loginform" component={LoginForm} />
				<Route exact path="/signupform" component={SignUpForm} />
				<Route exact path="/messagecenter" component={MessageCenter} />
			
				{/* always put the default '/' path to the end or else it would access it first thing */}
				<Route exact path="/" component={LoginForm} />
				{/* If no address matches, it will default to 404 error */}
				<Route exact path="*" component={<h3>404 - Not found</h3>} />
			</Switch>
		</Router>
	);
}
