import moment from "moment";

const convertTime = (givenTimeStamp) => {
	// console.log("givenTimeStamp:", givenTimeStamp);
	return moment.unix(givenTimeStamp).format("MM/DD/YY hh:mm:ss a");
};

class MessageObject {
	username;
	timestamp;
	clientMessage;

	constructor(username, timestamp, clientMessage) {
		this.username = String(username);
		this.timestamp = String(convertTime(timestamp));
		this.clientMessage = String(clientMessage);
	}
}

export default MessageObject;
