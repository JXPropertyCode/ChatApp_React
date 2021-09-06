import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import authSliceReducer from "./authSlice";
// import { persistStore } from "redux-persist";
// import { combineReducers } from "redux";

// import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
// import { persistReducer } from "redux-persist";

const middlewares = [logger];

// const persistConfig = {
// 	key: "root",
// 	storage,
// };

// const reducers = combineReducers({
// 	auth: authSliceReducer,
// });

// const persistedReducer = persistReducer(persistConfig, reducers);

// export const persistor = persistStore(configureStore);

export default configureStore({
	middleware: middlewares,
	reducer: {
		auth: authSliceReducer,
	},
	// reducer: persistedReducer,
});

// export default store;
