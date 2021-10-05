import axios from "axios";
import MessageObject from "../model/MessageObject";

const messagesMiddleware = (store) => (next) => (action) => {
	if (action.type === "FETCH_MESSAGES") {
		axios
			.get("http://192.168.4.24:8000/messages")
			.then((res) => {
				// let data = res.data;
				// let convertData = new MessageObject(
				// 	data.timestamp,
				// 	data.iss_position.latitude,
				// 	data.iss_position.longitude
				// );
				// next({ type: "iss/fetchSuccess", payload: convertData });
				console.log(res.data);
				let tempArr = [];
				for (let i = 0; i < res.data.length; i++) {
					let data = res.data[i];
					let convertData = new MessageObject(
                        data.room_id,
						data.username,
						data.email,
						data.password,
                        data.timestamp,
                        data.clientMessage
					);
					tempArr.push(convertData);
				}

				console.log(tempArr);

				// instead of using dispatch, I can use next()
				next({ type: "chatroom/sendMessages", payload: tempArr });
			})
			.catch((e) => {
				console.log("Error:", e);
				// next({ type: "iss/fetchFailed" });
			});
		return;
	}

	// continue to the next middleware, if no more then go to reducer
	next(action);
};

export default messagesMiddleware;
