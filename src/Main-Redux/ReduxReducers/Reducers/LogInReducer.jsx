import { createSlice } from "@reduxjs/toolkit";
import { useContext } from "react";
import { GlobalContext } from "../../../Home/CustomerViewPage/ViewGrid/Context/Context";
import { DATA_ENTRY, IS_LOGGEDIN, LOGIN_ERROR } from "../ActionType/ActionType";

const initialLoginUser = {
  userData: [],
  logIn_Error: "",
  isloggedIn: false,
};

export const LogInSlice = (state = initialLoginUser, action) => {
  switch (action.type) {
    case IS_LOGGEDIN:
      return {
        ...state,
        isloggedIn: true,
      };
    case DATA_ENTRY:
      return {
        ...state,
        userData: [...state.userData, action.payload],
        isloggedIn: true,
      };
    case LOGIN_ERROR:
      return {
        ...state,
        userData: "",
        isloggedIn: false,
        logIn_Error: action.payload,
      };
    default:
      return state;
  }
};
