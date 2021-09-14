import moment from "moment";

const convertTime = (givenTimeStamp) => {
	// console.log("givenTimeStamp:", givenTimeStamp);
	return moment.unix(givenTimeStamp).format("MM/DD/YY hh:mm:ss a");
};

class MessageObject {
	username;
	email;
	password;
	timestamp;
	clientMessage;

	constructor(username, email, password, timestamp, clientMessage) {
		this.username = String(username);
		this.email = String(email);
		this.password = String(password);
		this.timestamp = String(convertTime(timestamp));
		this.clientMessage = String(clientMessage);
	}
}

export default MessageObject;
