import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import apiSlice from "../features/api/apiSlice";
import authReducer from "../features/auth/authSlice";
import togglerReducer from "../features/toggler/togglerSlice";

const persistConfig = {
  key: "root",
  storage,
  blacklist: [], // Exclude reducer1 from persistence
  serialize: true,
};

const rootReducer = combineReducers({
  [apiSlice.reducerPath]: apiSlice.reducer,
  auth: authReducer,
  toggler: togglerReducer,
  // Add more reducers as needed
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default persistedReducer;
