class AccountObject {
	chatrooms;
	username;
	email;
	password;
	timestamp;

	constructor(chatrooms, username, email, password, timestamp) {
		this.chatrooms = new Array(...chatrooms);
		this.username = String(username);
		this.email = String(email);
		this.password = String(password);
		this.timestamp = Number(timestamp);
	}
}

export default AccountObject;
