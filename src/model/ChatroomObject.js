class ChatroomObject {
    chatroomId;
	chatroomName;
	creatorOwnerID;
	members;

	constructor(chatroomId, chatroomName, creatorOwnerID, members) {
		this.chatroomId = String(chatroomId)
		this.chatroomName = String(chatroomName)
        this.creatorOwnerID = String(creatorOwnerID);
		this.members = new Array(members);
	}
}

export default ChatroomObject;
