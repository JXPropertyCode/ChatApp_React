class AccountObject {
	chatrooms;
	username;
	email;
	// password;

	constructor(chatrooms, username, email) {
		this.chatrooms = new Array(...chatrooms);
		this.username = String(username);
		this.email = String(email);
		// this.password = String(password);
	}
}

export default AccountObject;
