import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useRef } from "react";
import axios from "axios";
import ChatroomObject from "../model/ChatroomObject";

const ChatroomLists = () => {
	const dispatch = useDispatch();
	const createChatRoomName = useRef(null);

	const userID = useSelector((state) => state.auth.userID);
	const chatrooms = useSelector((state) => state.auth.chatrooms);

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
					// console.log("Success! Account Found:", inputCred);

					console.log("res.data:", res.data);

					console.log("Success! Auth to Create a Chatroom...");

					// setChatrooms([...chatrooms, res.data.chatroomCreated])
					dispatch({
						type: "auth/createChatroom",
						payload: new ChatroomObject(
							res.data.chatroomCreated,
							inputCred.chatroomName,
							userID,
							[userID],
							Date.now()
						),
					});
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

	const clickedChatroom = (e, chatroom) => {
		console.log("chatroom.chatroomID:", chatroom.chatroomID);
	};

	return (
		<div className="chatroomWindow">
			<form onSubmit={createRoom}>
				<input
					type="text"
					name="name"
					placeholder="Create Chat Room"
					ref={createChatRoomName}
				/>
			</form>
			<a href="https://images.wallpapersden.com/image/download/cybertruck_a2xsam2UmZqaraWkpJRobWllrWdma2U.jpg">
				TestRoom
			</a>

			{chatrooms.map((chatroom, idx) => {
				// console.log("Outputting Chatroom:", chatroom.chatroomID)
				return (
					<form>
						<input
							type="button"
							key={idx}
							value={chatroom.chatroomName}
							onClick={(e) => clickedChatroom(e, chatroom)}
						/>
					</form>
				);
			})}

			{/* {chatrooms.map((chatroom, idx) => {
				// console.log("Outputting Chatroom:", chatroom.chatroomID)
				return <p key={idx}>{chatroom.chatroomName}</p>;
			})} */}
		</div>
	);
};

export default ChatroomLists;
