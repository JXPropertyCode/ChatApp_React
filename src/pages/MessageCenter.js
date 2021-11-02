import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import ChatroomMessages from "./ChatroomMessages";
import ChatroomLists from "./ChatroomLists";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";

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

	const logoutButton = () => {
		history.push("/logout");
	};

	console.log("Re-rendering...");

	useEffect(() => {
		console.log("useEffect...")
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
				}

				// return res.data.auth;
			})
			.catch((e) => {
				console.log("Error:", e);
				// return false;
			});
	}, []);

	// const validChatrooms = async () => {
	// 	const inputData = {
	// 		email: userEmail,
	// 		password: userPass,
	// 		reqChatroom: pathname,
	// 	};

	// 	const result = axios
	// 		.post(
	// 			"http://192.168.4.24:8000/user-chatroom-validation",
	// 			inputData
	// 		)
	// 		.then((res) => {
	// 			console.log("res.data:", res.data);
	// 			return res.data.auth;
	// 		})
	// 		.catch((e) => {
	// 			console.log("Error:", e);
	// 			return false;
	// 		});

	// 	console.log("Result:", await result);
	// 	return await result;
	// };

	return (
		<div>
			<header>
				<h1>{username}'s Dashboard</h1>
				<p>userID: {userID}</p>
				<p>Current Chatroom: {pathname} </p>
				<button onClick={logoutButton}>Logout Button</button>
			</header>

			<div className="chatDisplay">
				<ChatroomLists></ChatroomLists>
				{isValidRoom && <ChatroomMessages></ChatroomMessages>}
			</div>
		</div>
	);
};

export default MessageCenter;
