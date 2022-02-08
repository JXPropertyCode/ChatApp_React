// import { createSlice } from "@reduxjs/toolkit";

// const chatroomSlice = createSlice({
//   name: "chatroom",
//   initialState: {
//     messages: [],
//   },
//   reducers: {
//     sendMessages: (state, { type, payload }) => {
//       if (Array.isArray(payload)) {
//         // initalization getting message data from database and inserting it into the message array to be read
//         if (payload.length === 0) {
//           state.messages = [];
//         } else {
//           state.messages = [...payload];
//         }
//       } else {
//         // messages that are being sent after messages are retrieved from server
//         state.messages = [...state.messages, payload];
//       }
//     },
//   },
// });

// export const sendMessages = chatroomSlice.actions.sendMessages;
// export const clearMessages = chatroomSlice.actions.clearMessages;

// export default chatroomSlice.reducer;
