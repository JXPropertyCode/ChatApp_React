class ChatroomObject {
    chatroomId;
	chatroomName;
	creatorOwnerID;
	members;
	lastModified;

	constructor(chatroomId, chatroomName, creatorOwnerID, members, lastModified) {
		this.chatroomId = String(chatroomId)
		this.chatroomName = String(chatroomName)
        this.creatorOwnerID = String(creatorOwnerID);
		this.members = new Array(members);
		this.lastModified = Number(lastModified);
	}
}

export default ChatroomObject;
