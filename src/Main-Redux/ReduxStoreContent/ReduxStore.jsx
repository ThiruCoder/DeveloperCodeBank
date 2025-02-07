import { combineReducers } from "redux";
import { LogInSlice } from "../ReduxReducers/Reducers/LogInReducer";
import { configureStore } from "@reduxjs/toolkit";
import { CollectiveData } from "../ReduxReducers/Reducers/CreateAnAccount";

const combine = combineReducers({
  logIn: LogInSlice,
  logins: CollectiveData,
});

export const store = configureStore({
  reducer: combine,
});
