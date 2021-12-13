import { useEffect, useState } from "react";
import axios from "axios";

const ChatroomMembers = ({ chatroomId }) => {
	// console.log("In ChatroomMembers...");
	// console.log("chatroomId:", chatroomId);

	const [members, setMembers] = useState([]);

	const inputCred = {
		chatroom: chatroomId,
	};

	useEffect(() => {
		updateMemberList()
	}, []);

	function updateMemberList() {
		axios
			.post(
				`${process.env.REACT_APP_GET_API_KEY}get-chatroom-members`,
				inputCred
			)
			.then((res) => {
				// console.log("res.data:", res.data);

				setMembers(res.data.membersInChatroom);
			})
			.catch((err) => {
				// console.log("Error in Creating a Chatroom...");
				// console.error(err)
				err
			});

	}

	// console.log("members:", members);

	return (
		<div className="chatroomWindow">
			<input type="button" onClick={() => updateMemberList()} value="Refresh" />
			<h3>Chatroom Members</h3>
			{members.map((member, idx) => {
				return <p key={idx}>{member.username}</p>;
			})}
		</div>
	);
};

export default ChatroomMembers;
