import { useHistory, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";

const LeaveChatroom = ({ chatroomID }) => {
	const history = useHistory();
	const userID = useSelector((state) => state.auth.userID);

	useEffect(() => {
		console.log("In Leave Chatroom...");
	}, []);

	const leaveChatroom = () => {
		// e.preventDefault();
		console.log(userID, "is Leaving Chatroom:", chatroomID);
		history.push("/message-center");
		// return <Redirect to="/message-center" />
	};

	return (
		<input
			type="button"
			value="Leave Chatroom Button"
			onClick={() => leaveChatroom()}
		/>
	);
};

export default LeaveChatroom;
