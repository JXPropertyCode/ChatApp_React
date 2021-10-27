import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import ChatroomMessages from "./ChatroomMessages";
import ChatroomLists from "./ChatroomLists";

const MessageCenter = () => {
	const history = useHistory();

	const username = useSelector((state) => state.auth.username);
	const userID = useSelector((state) => state.auth.userID);

	const logoutButton = () => {
		history.push("/logout");
	};

	console.log("Re-rendering...");

	return (
		<div>
			<header>
				<h1>{username}'s Dashboard</h1>
				<p>userID: {userID}</p>
				<button onClick={logoutButton}>Logout Button</button>
			</header>

			<div className="chatDisplay">
				<ChatroomLists></ChatroomLists>
				<ChatroomMessages></ChatroomMessages>
			</div>
		</div>
	);
};

export default MessageCenter;
