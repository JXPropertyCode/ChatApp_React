class MessageObject {
  room;
  owner;
  username;
  email;
  password;
  clientMessage;

  constructor(
    room,
    owner,
    username,
    email,
    password,
    clientMessage
  ) {
    this.room = String(room);
    this.owner = String(owner);
    this.username = String(username);
    this.email = String(email);
    this.password = String(password);
    this.clientMessage = String(clientMessage);
  }
}

export default MessageObject;
