import { useSelector } from "react-redux";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import ChatroomObject from "../model/ChatroomObject";

const ChatroomLists = () => {
	const createChatRoomName = useRef(null);

	const userID = useSelector((state) => state.auth.userID);

	const [chatrooms, setChatrooms] = useState([]);

	const getChatrooms = () => {
		axios
			.get("http://192.168.4.24:8000/chatrooms")
			.then((res) => {
				let tempArr = [];
				for (let i = 0; i < res.data.length; i++) {
					let data = res.data[i];
					let convertData = new ChatroomObject(
						data._id,
						data.chatroomName,
						data.creatorUserID,
						data.members,
						data.timestamp
					);
					tempArr.push(convertData);
				}
				console.log("Chatrooms From Server:", tempArr);
				setChatrooms([...tempArr]);
				return tempArr;
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
				return (
					<a
						key={idx}
						href={`/message-center/${chatroom.chatroomID}`}
					>
						{chatroom.chatroomName}
					</a>
				);
			})}
		</div>
	);
};

export default ChatroomLists;
