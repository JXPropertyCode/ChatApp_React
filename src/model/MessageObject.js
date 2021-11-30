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
