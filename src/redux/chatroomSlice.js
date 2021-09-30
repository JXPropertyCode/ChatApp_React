import { createSlice } from "@reduxjs/toolkit";

const chatroomSlice = createSlice({
	name: "chatroom",
	initialState: {
		room_id: "1999",
		draftMessage: "",
		messages: [],
	},
	reducers: {
		draftMessage: (state, {type, payload}) => {
			console.log("Saving Draft Message:", payload)
			state.draftMessage = payload
		},
		sendMessages: (state, { type, payload }) => {
			// state.messages = state.chatInfo.push({
			// 	timestamp: payload.timestamp,
			// 	username: payload.username,
			// 	message: payload.message,
			// });
            // state.messages = [...state.messages, {
			// 	timestamp: payload.timestamp,
			// 	username: payload.username,
			// 	message: payload.message,
			// }];
            console.log("incoming payload:", payload)
            state.messages = [...state.messages, payload];
		},
        clearMessages: (state) => {
            state.messages = []
        }
	},
});

export const draftMessage = chatroomSlice.actions.draftMessage;
export const sendMessages = chatroomSlice.actions.sendMessages;
export const clearMessages = chatroomSlice.actions.clearMessages;

export default chatroomSlice.reducer;
