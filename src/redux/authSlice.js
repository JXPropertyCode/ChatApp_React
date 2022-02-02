import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    accountVerified: false,
    // owner to be populated
    owner: "",
    username: "",
    email: "",
  },
  reducers: {
    login: (state, { type, payload }) => {
      state.accountVerified = true;
      state.owner = payload.owner;
      state.username = payload.username;
      state.email = payload.email;
    },
    logout: (state) => {
      state.accountVerified = false;
      state.email = "";
      state.owner = "";
      state.username = "";
    },
    changeUsername: (state, { type, payload }) => {
      state.username = payload.newUsername;
    },
  },
});

export const login = authSlice.actions.login;
export const logout = authSlice.actions.logout;
export const changeUsername = authSlice.actions.changeUsername;

export default authSlice.reducer;
