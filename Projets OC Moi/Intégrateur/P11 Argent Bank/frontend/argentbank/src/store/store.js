import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import tokenReducer from "./tokenSlice";

const rootReducer = combineReducers({
  user: userReducer,
  token: tokenReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
