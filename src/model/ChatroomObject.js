// import moment from "moment";

// const convertTime = (givenTimeStamp) => {
// 	// console.log("givenTimeStamp:", givenTimeStamp);
// 	return moment.unix(givenTimeStamp).format("MM/DD/YY hh:mm:ss a");
// };

class ChatroomObject {
    chatroomID;
	chatroomName;
	creatorUserID;
	members;
	timestamp;

	constructor(chatroomID, chatroomName, creatorUserID, members, timestamp) {
		this.chatroomID = String(chatroomID)
		this.chatroomName = String(chatroomName)
        this.creatorUserID = String(creatorUserID);
		this.members = new Array(members);
		this.timestamp = Number(timestamp);
	}
}

export default ChatroomObject;
