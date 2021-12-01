class ChatroomObject {
    chatroomID;
	chatroomName;
	creatorUserID;
	members;
	lastModified;

	constructor(chatroomID, chatroomName, creatorUserID, members, lastModified) {
		this.chatroomID = String(chatroomID)
		this.chatroomName = String(chatroomName)
        this.creatorUserID = String(creatorUserID);
		this.members = new Array(members);
		this.lastModified = Number(lastModified);
	}
}

export default ChatroomObject;
