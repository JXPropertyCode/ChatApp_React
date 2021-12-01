class ChatroomObject {
    chatroomID;
	chatroomName;
	creatorOwnerID;
	members;
	lastModified;

	constructor(chatroomID, chatroomName, creatorOwnerID, members, lastModified) {
		this.chatroomID = String(chatroomID)
		this.chatroomName = String(chatroomName)
        this.creatorOwnerID = String(creatorOwnerID);
		this.members = new Array(members);
		this.lastModified = Number(lastModified);
	}
}

export default ChatroomObject;
