import moment from "moment";

const convertTime = (givenTimeStamp) => {
	// console.log("givenTimeStamp:", givenTimeStamp);
	return moment.unix(givenTimeStamp).format("MM/DD/YY hh:mm:ss a");
};

class AccountObject {
	username;
    email;
    password;
	timestamp;

	constructor(username, email, password, timestamp) {
		this.username = String(username);
        this.email = String(email);
        this.password = String(password)
		this.timestamp = String(convertTime(timestamp));
	}
}

export default AccountObject;
