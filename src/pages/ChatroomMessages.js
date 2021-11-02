import { Redirect, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState, useEffect, useRef } from "react";
import useWebSocket from "react-use-websocket";
import MessageObject from "../model/MessageObject";
import { useDispatch } from "react-redux";
import axios from "axios";
import "../components/messageBox.css";

const ChatroomMessages = () => {
	const location = useLocation();
	console.log("location.pathname:", location.pathname);

	const pathname = location.pathname.replace("/message-center/", "");
	console.log("pathname:", pathname);

	const dispatch = useDispatch();

	// const { sendMessage, lastMessage } = useWebSocket("ws://localhost:8000/");
	const { sendMessage, lastMessage } = useWebSocket(
		`ws://localhost:8000/${pathname}`
	);

	const validAccount = useSelector((state) => state.auth.accountVerified);
	const userEmail = useSelector((state) => state.auth.email);
	const userPass = useSelector((state) => state.auth.password);
	const username = useSelector((state) => state.auth.username);
	const userID = useSelector((state) => state.auth.userID);

	const prepMessage = useRef(null);

	// gets chatroom messages from persist store
	// const [messagelog, setMessagelog] = useState(
	// 	useSelector((state) => state.chatroom.messages)
	// );


	const [messagelog, setMessagelog] = useState([]);

	const getMessagelog = () => {
		axios
			.get("http://192.168.4.24:8000/messages")
			.then((res) => {
				// console.log(res);

				let currentChatroomMessages = []
				for (let i=0; i<res.data.length; i++) {
					if (res.data[i].roomID === pathname) {
						currentChatroomMessages.push(res.data[i])
					}
				}
				console.log("currentChatroomMessages:", currentChatroomMessages)
				setMessagelog([...currentChatroomMessages])
				return currentChatroomMessages
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
		// var client = new W3CWebSocket("ws://localhost:8000/", "echo-protocol");

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

		// dispatch to middleware
		dispatch({ type: "FETCH_CHATROOMS" });


		// dispatch({ type: "FETCH_MESSAGES" });
		// dispatch({ type: "FETCH_MESSAGES", payload: { pathname: pathname } });
		getMessagelog()

		// scrolls to the bottom of the messages when logging in
		scrollToBottom();

		// optional return function can be here to process a cleanup
	}, []);

	console.log("Current Message Log:", messagelog);

	const chatrooms = useSelector((state) => state.auth.chatrooms);
	// // const [chatrooms, setChatrooms] = useState(useSelector((state) => state.auth.chatrooms));
	console.log("Chatrooms in Store:", chatrooms);

	// gets the draft message
	let draftMessage = useSelector((state) => state.chatroom.draftMessage);

	// gets current chatroom id
	// const roomID = useSelector((state) => state.chatroom.roomID);

	// to detect when to scroll
	const messagesEndRef = useRef(null);

	const scrollToBottom = () => {
		// if the behavior is "smooth", it cannot catch up to fast messages
		messagesEndRef.current?.scrollIntoView({ behavior: "auto" });
	};

	const scrollRef = useRef(null);
	// const [bottomOfPage, setBottomOfPage] = useState(false);

	const isBottomOfMessages = (e) => {
		if (
			e.target.scrollHeight - e.target.scrollTop ===
			e.target.clientHeight
		) {
			scrollToBottom();
		}

		return;
		// return (
		// 	e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight
		// );
	};

	// const createChatRoomName = useRef(null);

	// const onScroll = (e) => {
	// 	// detects if youre at the bottom of the page
	// 	e.preventDefault()
	// 	// console.log("window.pageYOffset:", window.pageYOffset);
	// 	if (
	// 		e.target.scrollHeight - e.target.scrollTop ===
	// 		e.target.clientHeight
	// 	) {
	// 		// console.log("Bottom of the page");
	// 		setBottomOfPage(true);
	// 	} else {
	// 		// console.log("NOT bottom of the page");
	// 		setBottomOfPage(false);
	// 	}
	// };

	useEffect(() => {
		if (lastMessage !== null) {
			let convertData = JSON.parse(lastMessage.data);
			console.log("lastMessage:", convertData);
			// setMessagelog([...messagelog, convertData]);
			// dispatch({ type: "chatroom/sendMessages", payload: convertData });

			// when getting new messages just update the state
			setMessagelog([...messagelog, convertData])

		}
	}, [lastMessage]);

	// useEffect(() => {
	// 	// 2152, 1611, 541
	// 	// if (isBottomOfMessages()) {
	// 	console.log("scrollRef:", scrollRef);
	// 	console.log("scrollRef.scrollHeight:", scrollRef.current.scrollHeight);
	// 	console.log("scrollRef.scrollTop:", scrollRef.current.scrollTop);
	// 	console.log("scrollRef.clientHeight:", scrollRef.current.clientHeight);
	// 	console.log(
	// 		"Total:",
	// 		scrollRef.current.scrollHeight - scrollRef.current.scrollTop ===
	// 			scrollRef.current.clientHeight
	// 	);

	// 	const isBottom =
	// 		scrollRef.current.scrollHeight - scrollRef.current.scrollTop ===
	// 		scrollRef.current.clientHeight;
	// 	if (isBottom) {
	// 		scrollToBottom();
	// 	}
	// 	// }
	// }, [messagelog]);

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

		draftMessage = "";
		dispatch({
			type: "chatroom/draftMessage",
			payload: "",
		});

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
			// onScroll={(e) => onScroll(e)}
			onScroll={(e) => isBottomOfMessages(e)}
		>
			<div>
				{messagelog.map((message, idx) => {
					if (message !== null) {
						// console.log("message:", message)

						// this is needed due to the bug in which messages show for other rooms
						// if (message.roomID === pathname) {
						if (message.email !== userEmail) {
							return (
								<p key={idx} style={{ textAlign: "left" }}>
									{message.clientMessage}
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
					// }
					return null;
				})}
				<div ref={messagesEndRef} />
			</div>
			<div>
				<form
					className="messageBox"
					onSubmit={(e) => {
						e.preventDefault();
						if (prepMessage !== "") onFormSubmit(e);
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
				</form>
			</div>
		</div>
	);
};

export default ChatroomMessages;
