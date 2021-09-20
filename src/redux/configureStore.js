import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import authSliceReducer from "./authSlice";
import chatroomSliceReducer from "./chatroomSlice";

import { combineReducers } from "redux";

import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import { persistReducer } from "redux-persist";

const middlewares = [logger];

const rootReducer = combineReducers({
	auth: authSliceReducer,
	chatroom: chatroomSliceReducer,
});

const persistConfig = {
	// the key means, at what point inside of our reducer object, do we want to start storing everything
	// in this case, we want to start storing everything from the root
	key: "root",
	// we also want to pass storage which defaults to saving locally
	storage: storage,
	// blacklist: [], // to NOT allow persist
	// whitelist: [], // to allow persist
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
	middleware: middlewares,
	reducer: persistedReducer,
});

export default store;
