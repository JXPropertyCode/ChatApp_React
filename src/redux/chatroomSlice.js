import { createSlice } from "@reduxjs/toolkit";
// import uuid from "react-native-uuid";

const chatroomSlice = createSlice({
	name: "chatroom",
	initialState: {
		// roomID: uuid.v4(),
		draftMessage: "",
		messages: [],
	},
	reducers: {
		draftMessage: (state, { type, payload }) => {
			console.log("Saving Draft Message:", payload);
			state.draftMessage = payload;
		},
		sendMessages: (state, { type, payload }) => {
			console.log("incoming payload:", payload);

			if (Array.isArray(payload)) {
				console.log("Setting state.messages...");
				// initalization getting message data from database and inserting it into the message array to be read
				console.log("Payload.length:", payload.length)
				if (payload.length === 0) {
					state.messages = [];
				} else {
					state.messages = [...payload];
				}
			} else {
				console.log("Adding state.messages...");
				// messages that are being sent after messages are retrieved from server
				state.messages = [...state.messages, payload];
			}
		},
		// clearMessages: (state) => {
		//     state.messages = []
		// }
	},
});

export const draftMessage = chatroomSlice.actions.draftMessage;
export const sendMessages = chatroomSlice.actions.sendMessages;
export const clearMessages = chatroomSlice.actions.clearMessages;

export default chatroomSlice.reducer;
