// import axios from "axios";
// import ChatroomObject from "../model/ChatroomObject";
// import { useSelector } from "react-redux";

// const chatroomsMiddleware = (store) => (next) => (action) => {
// 	if (action.type === "FETCH_CHATROOMS") {
// 		// const userID = useSelector((state) => state.auth.userID);

// 		axios
// 			.get("http://192.168.4.24:8000/chatrooms")
// 			.then((res) => {
// 				let tempArr = [];
// 				for (let i = 0; i < res.data.length; i++) {
// 					let data = res.data[i];
// 					// if (res.data[i].userID === userID) {
// 					let convertData = new ChatroomObject(
//                         data._id,
// 						data.chatroomName,
// 						data.creatorUserID,
// 						data.members,
// 						data.timestamp
// 					);
// 					tempArr.push(convertData);
// 					// }
// 				}
//                 console.log("Chatrooms From Server:", tempArr)

// 				// instead of using dispatch, which I can't use here, I can use next()
// 				next({ type: "auth/setChatrooms", payload: tempArr });
// 			})
// 			.catch((e) => {
// 				console.log("Error:", e);
// 			});
// 		return;
// 	}

// 	//if (action.type === "CREATE_CHATROOM") {
// 		// axios
// 		// 	.post("http://192.168.4.24:8000/create-chatroom", inputCred)
// 		// 	.then((res) => {
// 		// 		if (res.data.validCred === "true") {
// 		// 			// console.log("Success! Account Found:", inputCred);

// 		// 			console.log("res.data:", res.data);

// 		// 			console.log("Success! Auth to Create a Chatroom...");

// 		// 			// setChatrooms([...chatrooms, res.data.chatroomCreated])
// 		// 			//dispatch({type: "add", id})
// 		// 		} else {
// 		// 			console.log("Error in Creating a Chatroom");
// 		// 		}
// 		// 	})
// 		// 	.catch((err) => {
// 		// 		console.log("Error in Creating a Chatroom...");
// 		// 		console.error(err);
// 		// 	});
// 	//}

// 	// continue to the next middleware, if no more then go to reducer
// 	next(action);
// };

// export default chatroomsMiddleware;
