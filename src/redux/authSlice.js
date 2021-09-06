import { createSlice } from "@reduxjs/toolkit";
// import { persistReducer } from "redux-persist";
// import storage from "redux-persist/lib/storage"; // defaults to localStorage for web

// JSON that we represent the possible configurations that we want for Redux Persist to use
// const persistConfig = {
// 	// at what point inside our reducer object do we want to start storing everything.
// 	// in this case, it is from the root 
// 	key: 'root',
// 	storage, 
// 	// contains the string names of any of the reducers that we want to store
// 	// aka what do you want to persist
// 	whitelist: []
// }

const authSlice = createSlice({
	name: "auth",
	initialState: {
		accountVerified: false,
		email: "",
		password: "",
	},
	reducers: {
		login: (state, { type, payload }) => {
			state.accountVerified = true;
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
		outputData: (state) => {
			console.log("state.accountVerified:", state.accountVerified);
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
