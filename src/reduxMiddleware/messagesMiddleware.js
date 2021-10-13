import axios from "axios";
import MessageObject from "../model/MessageObject";

const messagesMiddleware = (store) => (next) => (action) => {
	if (action.type === "FETCH_MESSAGES") {
		axios
			.get("http://192.168.4.24:8000/messages")
			.then((res) => {
				let tempArr = [];
				for (let i = 0; i < res.data.length; i++) {
					let data = res.data[i];
					let convertData = new MessageObject(
                        data.room_id,
						data.userID,
						data.username,
						data.email,
						data.password,
                        data.timestamp,
                        data.clientMessage
					);
					tempArr.push(convertData);
				}

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
