import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
	name: "auth",
	initialState: {
		accountVerified: false,
		userID: "",
		// chatrooms: [],
		username: "",
		email: "",
		password: "",
	},
	reducers: {
		login: (state, { type, payload }) => {
			state.accountVerified = true;
			state.userID = payload.userID;
			// state.chatrooms = payload.chatrooms;
			state.username = payload.username;
			state.email = payload.email;
			state.password = payload.password;
		},
		logout: (state) => {
			state.accountVerified = false;
			state.email = "";
			state.password = "";
		},
		isVerified: (state) => {
			console.log("isVerified:", state.accountVerified);
		},
		// this is for replacing chatrooms from database when refreshing and if other people created it
		// this is for resetting
		// setChatrooms: (state, { type, payload }) => {
		// 	// console.log("addChatrooms payload:", payload)
		// 	state.chatrooms = [...payload]
		// },
		// createChatroom: (state, { type, payload }) => {
		// 	console.log("addChatrooms payload.chatroomCreated:", payload.chatroomCreated)
		// 	state.chatrooms = [...state.chatrooms, payload]
		// },
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
