import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import ChatroomMessages from "./ChatroomMessages";
import ChatroomLists from "./ChatroomLists";
import AddMembers from "./AddMembers";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import LeaveChatroom from "./LeaveChatroom";

const MessageCenter = () => {
	const history = useHistory();

	const username = useSelector((state) => state.auth.username);
	const userID = useSelector((state) => state.auth.userID);
	const userPass = useSelector((state) => state.auth.password);
	const userEmail = useSelector((state) => state.auth.email);
	const [isValidRoom, setIsValidRoom] = useState(false);

	const location = useLocation();
	console.log("location.pathname:", location.pathname);

	const pathname = location.pathname.replace("/message-center/", "");
	console.log("pathname:", pathname);


	// const [currentRoom, setCurrentRoom] = useState("");


	const logoutButton = () => {
		history.push("/logout");
	};

	console.log("Re-rendering...");

	useEffect(() => {
		// this is just to make sure taht if the user inputs a unauthorized chatroom, it wouldn't let them access it
		console.log("useEffect...");
		const inputData = {
			email: userEmail,
			password: userPass,
			reqChatroom: pathname,
		};
		axios
			.post(
				"http://192.168.4.24:8000/user-chatroom-validation",
				inputData
			)
			.then((res) => {
				console.log("res.data:", res.data);

				if (res.data.auth === true) {
					setIsValidRoom(true);
				} else {
					setIsValidRoom(false);
					history.push("/message-center");
				}
			})
			.catch((e) => {
				console.log("Error:", e);
			});

		// setCurrentRoom(pathname)
	}, []);

	// useEffect(() => {
	// 	console.log("Room Changed:", currentRoom);
	// 	if (
	// 		currentRoom === "" ||
	// 		currentRoom === "/message-center"
	// 	) {
	// 		setIsValidRoom(false);
	// 		history.push("/message-center");
	// 	}
	// }, [currentRoom]);


	// pathname is from useLocation() which is a hook therefore useEffect can be used
	useEffect(() => {
		console.log("Room Changed:", pathname);
		if (
			pathname === "" ||
			pathname === "/message-center"
		) {
			setIsValidRoom(false);
			history.push("/message-center");
		}
	}, [pathname]);

	return (
		<div>
			<header>
				<h1>{username}'s Dashboard</h1>
				<p>userID: {userID}</p>
				<p>Current Chatroom: {pathname} </p>
				<button onClick={logoutButton}>Logout Button</button>
			</header>

			<AddMembers chatroomID={pathname}></AddMembers>
			<LeaveChatroom chatroomID={pathname} userID={userID} />
			<div className="chatDisplay">
				<ChatroomLists></ChatroomLists>
				{isValidRoom && <ChatroomMessages></ChatroomMessages>}
			</div>
		</div>
	);
};

export default MessageCenter;
