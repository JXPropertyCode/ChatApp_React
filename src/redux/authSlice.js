import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
	name: "auth",
	initialState: {
		accountVerified: false,
		userID: "",
		username: "",
		email: "",
		password: "",
	},
	reducers: {
		login: (state, { type, payload }) => {
			state.accountVerified = true;
			state.userID = payload.userID;
			state.username = payload.username;
			state.email = payload.email;
			state.password = payload.password;
		},
		logout: (state) => {
			state.accountVerified = false;
			state.email = "";
			state.password = "";
			state.userID = "";
			state.username = ""
		},
		isVerified: (state) => {
			console.log("isVerified:", state.accountVerified);
		},
		outputData: (state) => {
			console.log("state.accountVerified:", state.accountVerified);
			console.log("state.userID:", state.userID);
			console.log("state.email:", state.email);
			console.log("state.password:", state.password);
		},
	},
});

export const login = authSlice.actions.login;
export const logout = authSlice.actions.logout;
export const isVerified = authSlice.actions.isVerified;
export const outputData = authSlice.actions.outputData;

export default authSlice.reducer;
