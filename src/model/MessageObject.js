// import moment from "moment";

// const convertTime = (givenTimeStamp) => {
// 	// console.log("givenTimeStamp:", givenTimeStamp);
// 	return moment.unix(givenTimeStamp).format("MM/DD/YY hh:mm:ss a");
// };

class MessageObject {
	roomID;
	userID;
	username;
	email;
	password;
	timestamp;
	clientMessage;

	constructor(
		roomID,
		userID,
		username,
		email,
		password,
		timestamp,
		clientMessage
	) {
		this.roomID = String(roomID);
		this.userID = String(userID);
		this.username = String(username);
		this.email = String(email);
		this.password = String(password);
		this.timestamp = Number(timestamp);
		this.clientMessage = String(clientMessage);
	}
}

export default MessageObject;
