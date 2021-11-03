import { useSelector } from "react-redux";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import ChatroomObject from "../model/ChatroomObject";
import { isCompositeComponent } from "react-dom/test-utils";

const ChatroomLists = () => {
	const createChatRoomName = useRef(null);

	const userID = useSelector((state) => state.auth.userID);
	const userEmail = useSelector((state) => state.auth.email);
	const userPass = useSelector((state) => state.auth.password);

	const [chatrooms, setChatrooms] = useState([]);

	const getChatrooms = () => {
		const inputCred = {
			email: userEmail,
			password: userPass,
		};
		axios
			.post("http://192.168.4.24:8000/get-user-chatroom", inputCred)
			.then((res) => {
				console.log("User Chatrooms From Server:", res.data.chatrooms);
				setChatrooms([...res.data.chatrooms]);
				return;
			})
			.catch((e) => {
				console.log("Error:", e);
				return e;
			});
	};

	useEffect(() => {
		console.log("useEffect...");
		getChatrooms();
	}, []);

	const removeExtraSpace = (s) => s.trim().split(/ +/).join(" ");

	const createRoom = (e) => {
		e.preventDefault();

		// prevent white spaces from being used
		let strFilter = removeExtraSpace(createChatRoomName.current.value);

		if (strFilter.length === 0) {
			console.log("Cannot Have Empty Spaces in Chat Room Name");
			return;
		}

		console.log(
			"Creating Chat Room Name:",
			createChatRoomName.current.value
		);

		const inputCred = {
			userID: userID,
			chatroomName: createChatRoomName.current.value,
			timestamp: Math.floor(Date.now() / 1000),
		};

		axios
			.post("http://192.168.4.24:8000/create-chatroom", inputCred)
			.then((res) => {
				if (res.data.validCred === "true") {
					console.log("res.data:", res.data);

					console.log("Success! Auth to Create a Chatroom...");

					setChatrooms([
						...chatrooms,
						new ChatroomObject(
							res.data.chatroomCreated,
							inputCred.chatroomName,
							userID,
							[userID],
							Date.now()
						),
					]);
				} else {
					console.log("Error in Creating a Chatroom");
				}
			})
			.catch((err) => {
				console.log("Error in Creating a Chatroom...");
				console.error(err);
			});

		// reset the input box value after submitting
		createChatRoomName.current.value = "";
	};

	return (
		<div className="chatroomWindow">
			<form onSubmit={(e) => createRoom(e)}>
				<input
					type="text"
					name="name"
					placeholder="Create Chat Room"
					ref={createChatRoomName}
				/>
			</form>

			{chatrooms.map((chatroom, idx) => {
				console.log("chatroom:", chatroom)
				return (
					<a
						key={idx}
						// href={`/message-center/${chatroom.chatroomID}`}
						href={`/message-center/${chatroom}`}
					>
						{/* {chatroom.chatroomName} */}
						{chatroom}

					</a>
				);
			})}
		</div>
	);
};

export default ChatroomLists;
