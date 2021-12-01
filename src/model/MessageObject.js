class MessageObject {
  roomID;
  owner;
  username;
  email;
  password;
  clientMessage;

  constructor(
    roomID,
    owner,
    username,
    email,
    password,
    clientMessage
  ) {
    this.roomID = String(roomID);
    this.owner = String(owner);
    this.username = String(username);
    this.email = String(email);
    this.password = String(password);
    this.clientMessage = String(clientMessage);
  }
}

export default MessageObject;
