import { Redirect, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState, useEffect, useRef } from "react";
import useWebSocket from "react-use-websocket";
import MessageObject from "../model/MessageObject";
import axios from "axios";
import "../components/messageBox.css";

const ChatroomMessages = () => {
	const location = useLocation();
	console.log("location.pathname:", location.pathname);

	const pathname = location.pathname.replace("/message-center/", "");
	console.log("pathname:", pathname);


	const { sendMessage, lastMessage } = useWebSocket(
		`ws://localhost:8000/${pathname}`
	);

	const validAccount = useSelector((state) => state.auth.accountVerified);
	const userEmail = useSelector((state) => state.auth.email);
	const userPass = useSelector((state) => state.auth.password);
	const username = useSelector((state) => state.auth.username);
	const userID = useSelector((state) => state.auth.userID);
	const prepMessage = useRef(null);
	const [messagelog, setMessagelog] = useState([]);

	const [isScrollActive, setIsScrollActive] = useState(true);


	const getMessagelog = () => {
		axios
			.get(`${process.env.REACT_APP_GET_API_KEY}messages`)
			.then((res) => {
				let currentChatroomMessages = [];
				for (let i = 0; i < res.data.length; i++) {
					if (res.data[i].roomID === pathname) {
						currentChatroomMessages.push(res.data[i]);
					}
				}
				console.log(
					"currentChatroomMessages:",
					currentChatroomMessages
				);
				setMessagelog([...currentChatroomMessages]);
				return currentChatroomMessages;
			})
			.catch((err) => {
				console.error(err);
			});

	};

	useEffect(() => {
		var W3CWebSocket = require("websocket").w3cwebsocket;

		var client = new W3CWebSocket(
			`ws://localhost:8000/${pathname}`,
			"echo-protocol"
		);

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

		console.log("UseEffect...");
		getMessagelog();
		// optional return function can be here to process a cleanup
	}, []);

	console.log("Current Message Log:", messagelog);

	// to detect when to scroll
	const messagesEndRef = useRef(null);

	const scrollToBottom = () => {
		// if the behavior is "smooth", it cannot catch up to fast messages
		messagesEndRef.current?.scrollIntoView({ behavior: "auto" });
	};

	const scrollRef = useRef(null);

	const onScroll = (e) => {
		// detects if youre at the bottom of the page
		e.preventDefault()
		if (
			e.target.scrollHeight - e.target.scrollTop ===
			e.target.clientHeight
		) {
			console.log("Bottom of the page");
			setIsScrollActive(true)
		} else {
			console.log("NOT bottom of the page");
			setIsScrollActive(false)
		}
	};

	useEffect(() => {
		console.log("scrollRef.current.scrollHeight:", scrollRef.current.scrollHeight)
		console.log("scrollRef.current.scrollTop:", scrollRef.current.scrollTop)
		console.log("scrollRef.current.clientHeight:", scrollRef.current.clientHeight)
		if (isScrollActive) {
			scrollToBottom()
		}
	}, [messagelog, lastMessage])


	useEffect(() => {
		if (lastMessage !== null) {
			let convertData = JSON.parse(lastMessage.data);
			console.log("lastMessage:", convertData);
			// when getting new messages just update the state
			setMessagelog([...messagelog, convertData]);
		}
	}, [lastMessage]);

	if (!validAccount) {
		return <Redirect to="/login-form" />;
	}

	const onFormSubmit = (e) => {
		e.preventDefault();
		const prepmessage = prepMessage.current;
		// the reason why they needed the ex. ['inputMessage'] is because useRef() is used on the form and this name of the input is nested.
		// therefore like a tree or node or nested object, you need to access it by its name
		const currentPrepMessageValue = prepmessage["inputMessage"].value;

		// prevent empty strings from being sent
		if (currentPrepMessageValue === "") {
			return;
		}

		// UNIX timestamp
		let timestamp = Math.floor(Date.now() / 1000);

		let convertData = new MessageObject(
			pathname,
			userID,
			username,
			userEmail,
			userPass,
			timestamp,
			currentPrepMessageValue
		);

		console.log("Data Sent to Server:", convertData);
		sendMessage(JSON.stringify(convertData));
		prepmessage["inputMessage"].value = "";
	};

	return (
		<div
			className="messageWindow"
			ref={scrollRef}
			onScroll={(e) => onScroll(e)}
		>

			<div>
				{messagelog.map((message, idx) => {
					if (message !== null) {
						// this is needed due to the bug in which messages show for other rooms
						if (message.email !== userEmail) {
							return (
								<p key={idx} style={{ textAlign: "left" }}>
									{message.username}: {message.clientMessage}
								</p>
							);
						} else {
							return (
								<p key={idx} style={{ textAlign: "right" }}>
									{message.clientMessage}

								</p>
							);
						}
					}
					return null;
				})}
				<div ref={messagesEndRef} />
			</div>
			<div>
				<form
					className="messageBox"
					onSubmit={(e) => {
						e.preventDefault();
						if (prepMessage !== "") {
							onFormSubmit(e)

						}
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
				</form>
			</div>
		</div>
	);
};

export default ChatroomMessages;
