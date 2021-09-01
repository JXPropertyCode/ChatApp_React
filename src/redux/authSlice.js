import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
	name: "auth",
	initialState: {
		accountVerified: false,
	},
	reducers: {
		login: (state) => {
			state.accountVerified = true;
		},
		logout: (state) => {
			state.accountVerified = false;
		},
	},
});

export const login = authSlice.actions.login;
export const logout = authSlice.actions.logout;

export default authSlice.reducer;
