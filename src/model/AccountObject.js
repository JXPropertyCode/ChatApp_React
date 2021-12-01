class AccountObject {
	chatrooms;
	username;
	email;
	password;
	lastModified;

	constructor(chatrooms, username, email, password, lastModified) {
		this.chatrooms = new Array(...chatrooms);
		this.username = String(username);
		this.email = String(email);
		this.password = String(password);
		this.lastModified = Number(lastModified);
	}
}

export default AccountObject;
