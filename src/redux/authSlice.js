import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
	name: "auth",
	initialState: {
		accountVerified: false,
		owner: "",
		username: "",
		email: "",
		password: "",
	},
	reducers: {
		login: (state, { type, payload }) => {
			state.accountVerified = true;
			state.owner = payload.owner;
			state.username = payload.username;
			state.email = payload.email;
			state.password = payload.password;
		},
		logout: (state) => {
			state.accountVerified = false;
			state.email = "";
			state.password = "";
			state.owner = "";
			state.username = ""
		},
		isVerified: (state) => {
			console.log("isVerified:", state.accountVerified);
		},
		changeUsername: (state, { type, payload }) => {
			state.username = payload.newUsername
		},
		changeEmail: (state, { type, payload }) => {
			state.email = payload.newEmail
		},
		changePassword: (state, { type, payload }) => {
			state.password = payload.newPassword
		},
		outputData: (state) => {
			console.log("state.accountVerified:", state.accountVerified);
			console.log("state.owner:", state.owner);
			console.log("state.email:", state.email);
			console.log("state.password:", state.password);
		},
	},
});

export const login = authSlice.actions.login;
export const logout = authSlice.actions.logout;
export const isVerified = authSlice.actions.isVerified;
export const changeUsername = authSlice.actions.changeUsername;
export const outputData = authSlice.actions.outputData;

export default authSlice.reducer;
