class MessageObject {
  room;
  owner;
  username;
  email;
  clientMessage;

  constructor(room, owner, username, email, clientMessage) {
    this.room = String(room);
    this.owner = String(owner);
    this.username = String(username);
    this.email = String(email);
    this.clientMessage = String(clientMessage);
  }
}

export default MessageObject;
