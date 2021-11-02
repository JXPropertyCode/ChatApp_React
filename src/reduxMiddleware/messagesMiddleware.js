import axios from "axios";
import MessageObject from "../model/MessageObject";
import { useSelector } from "react-redux";

// const userID = useSelector((state) => state.auth.userID);

const messagesMiddleware = (store) => (next) => (action) => {
	if (action.type === "FETCH_MESSAGES") {
		console.log("Middleware Payload:", action.payload);

		const currentPathname = action.payload.pathname;
		axios
			.get("http://192.168.4.24:8000/messages")
			.then((res) => {
				let tempArr = [];
				for (let i = 0; i < res.data.length; i++) {
					let data = res.data[i];

					// filter to messages to see which ones belong to the user
					// if (res.data[i].userID === userID) {
					// console.log("data:", data)
					// console.log("data.roomID:", data.roomID)
					// console.log("currentPathname:", currentPathname)
					console.log("data.roomID:", data.roomID)
					console.log("currentPathname:", currentPathname)
					if (data.roomID === currentPathname) {
						let convertData = new MessageObject(
							data.roomID,
							data.userID,
							data.username,
							data.email,
							data.password,
							data.timestamp,
							data.clientMessage
						);
						tempArr.push(convertData);
					}

					// }
				}
				console.log("tempArr:", tempArr)
				// instead of using dispatch, which I can't use here, I can use next()
				next({ type: "chatroom/sendMessages", payload: tempArr });
			})
			.catch((e) => {
				console.log("Error:", e);
			});
		return;
	}

	// continue to the next middleware, if no more then go to reducer
	next(action);
};

export default messagesMiddleware;
