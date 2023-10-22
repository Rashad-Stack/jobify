import { configureStore } from "@reduxjs/toolkit";
import { persistStore } from "redux-persist";
import apiSlice from "../features/api/apiSlice";
import persistedReducer from "./rootReducer";

export const store = configureStore({
  reducer: persistedReducer,
  middleware(getDefaultMiddleWares) {
    return getDefaultMiddleWares().concat(apiSlice.middleware);
  },
  devTools: true,
});

export const persistor = persistStore(store);
