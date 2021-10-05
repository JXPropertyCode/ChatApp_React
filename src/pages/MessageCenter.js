import { useHistory, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState, useEffect, useRef } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";
import MessageObject from "../model/MessageObject";
import { useDispatch } from "react-redux";

const MessageCenter = () => {
	const history = useHistory();
	const dispatch = useDispatch();

	const { sendMessage, lastMessage, readyState } = useWebSocket(
		"ws://localhost:8000/"
	);

	const validAccount = useSelector((state) => state.auth.accountVerified);
	const userEmail = useSelector((state) => state.auth.email);
	const userPass = useSelector((state) => state.auth.password);
	const username = useSelector((state) => state.auth.username);

	// const [prepMessage, setPrepMessage] = useState("");
	const prepMessage = useRef(null);

	// gets chatroom message from persist store
	const [messagelog, setMessagelog] = useState(
		useSelector((state) => state.chatroom.messages)
	);

	// gets the draft message
	let draftMessage = useSelector((state) => state.chatroom.draftMessage);
	const room_id = useSelector((state) => state.chatroom.room_id)

	// console.log("room_id:", room_id, typeof(room_id))

	// to detect when to scroll
	const messagesEndRef = useRef(null);

	const scrollToBottom = () => {
		// if the behavior is "smooth", it cannot catch up to fast messages
		messagesEndRef.current?.scrollIntoView({ behavior: "auto" });
	};

	// const [scrollPos, setScrollPos] = useState(0);
	const scrollRef = useRef(null);
	const [bottomOfPage, setBottomOfPage] = useState(false);

	const onScroll = (e) => {
		// detects if youre at the bottom of the page
		if (
			e.target.scrollHeight - e.target.scrollTop ===
			e.target.clientHeight
		) {
			console.log(
				"you're at the bottom of the page:",
				e.target.clientHeight
			);
			setBottomOfPage(true);
		} else {
			setBottomOfPage(false);
		}
	};

	useEffect(() => {
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

		// // this removes directly from the persist store. But alone, this won't remove the HTML
		// dispatch({ type: "chatroom/clearMessages" });

		// // this clears the messagelog so the UI would remove its HTML
		// setMessagelog([]);

		// dispatch to middleware
		dispatch({ type: "FETCH_MESSAGES" });

		// scrolls to the bottom of the messages when logging in
		scrollToBottom();

		// optional return function can be here to process a cleanup
	}, []);

	useEffect(() => {
		if (lastMessage !== null) {
			let convertData = JSON.parse(lastMessage.data);
			console.log("lastMessage:", convertData);
			setMessagelog([...messagelog, convertData]);
			dispatch({ type: "chatroom/sendMessages", payload: convertData });
		}
	}, [lastMessage]);

	useEffect(() => {
		if (bottomOfPage) {
			scrollToBottom();
		}
	}, [messagelog]);

	if (!validAccount) {
		// history.push("/login-form");
		return <Redirect to="/login-form" />;
	}

	const logoutButton = () => {
		history.push("/logout");
		// console.log("Pressed Logout");
	};

	const onFormSubmit = (e, message) => {
		e.preventDefault();

		const prepmessage = prepMessage.current;
		// the reason why they needed the ex. ['inputMessage'] is because useRef() is used on the form and this name of the input is nested.
		// therefore like a tree or node or nested object, you need to access it by its name
		const currentPrepMessageValue = prepmessage["inputMessage"].value;

		// prevent empty strings from being sent
		if (currentPrepMessageValue === "") {
			return;
		}

		draftMessage = "";
		dispatch({
			type: "chatroom/draftMessage",
			payload: "",
		});
		// console.log("DraftMessage is now empty")

		// console.log(
		// 	"prepmessage['inputMessage']:",
		// 	prepmessage["inputMessage"]
		// );
		// console.log(`${prepmessage["inputMessage"].value}`);

		// UNIX timestamp
		let timestamp = Math.floor(Date.now() / 1000);

		let convertData = new MessageObject(
			room_id,
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

	const resetMessages = (e) => {
		e.preventDefault();
		// this removes directly from the persist store. But alone, this won't remove the HTML
		dispatch({ type: "chatroom/clearMessages" });

		// this clears the messagelog so the UI would remove its HTML
		setMessagelog([]);
	};

	return (
		<div>
			<div>
				<h1>{username}'s Dashboard</h1>
				<button onClick={logoutButton}>Logout Button</button>
			</div>
			<div className="chatDisplay">
				{/* onFormSubmit() mechanism enables you to click the input box and pressing enter would trigger it only */}
				<div
					className="messageWindow"
					ref={scrollRef}
					onScroll={onScroll}
				>
					{messagelog.map((message, idx) => {
						// console.log("message:", message);
						if (message !== null) {
							if (message.email !== userEmail) {
								// console.log("Someone Else Said...");
								return (
									<p key={idx} style={{ textAlign: "left" }}>
										{message.clientMessage}
									</p>
								);
							} else {
								// console.log("You Said...");
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
				<form
					className="messageBox"
					onSubmit={(e) => {
						e.preventDefault();
						if (prepMessage !== "") onFormSubmit(e, prepMessage);
					}}
					ref={prepMessage}
				>
					<input
						className="messageInputBox"
						type="text"
						name={"inputMessage"}
						value={draftMessage}
						onChange={() => {
							dispatch({
								type: "chatroom/draftMessage",
								payload:
									prepMessage.current["inputMessage"].value,
							});
						}}
					/>
					<button className="chatSendButton" type="submit">
						Send
					</button>
					<button className="chatSendButton" onClick={resetMessages}>
						Clear
					</button>
				</form>
			</div>
		</div>
	);
};

export default MessageCenter;
