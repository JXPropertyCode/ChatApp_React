import moment from "moment";

// const convertTime = (givenTimeStamp) => {
// 	// console.log("givenTimeStamp:", givenTimeStamp);
// 	return moment.unix(givenTimeStamp).format("MM/DD/YY hh:mm:ss a");
// };

class MessageObject {
	room_id;
	userID;
	username;
	email;
	password;
	timestamp;
	clientMessage;

	constructor(
		room_id,
		userID,
		username,
		email,
		password,
		timestamp,
		clientMessage
	) {
		this.room_id = String(room_id);
		this.userID = String(userID);
		this.username = String(username);
		this.email = String(email);
		this.password = String(password);
		this.timestamp = Number(timestamp);
		this.clientMessage = String(clientMessage);
	}
}

export default MessageObject;
