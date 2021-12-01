class MessageObject {
  roomID;
  userID;
  username;
  email;
  password;
  clientMessage;

  constructor(
    roomID,
    userID,
    username,
    email,
    password,
    clientMessage
  ) {
    this.roomID = String(roomID);
    this.userID = String(userID);
    this.username = String(username);
    this.email = String(email);
    this.password = String(password);
    this.clientMessage = String(clientMessage);
  }
}

export default MessageObject;
