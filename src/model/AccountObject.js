class AccountObject {
	chatrooms;
	username;
	email;
	password;

	constructor(chatrooms, username, email, password) {
		this.chatrooms = new Array(...chatrooms);
		this.username = String(username);
		this.email = String(email);
		// password here is needed ONLY in signupform or else it cannot pass the password to the server
		// also login form needs password as well to send to server
		this.password = String(password);
	}
}

export default AccountObject;
