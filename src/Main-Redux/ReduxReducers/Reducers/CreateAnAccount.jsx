import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filteredData: null,
  error: null,
};

export const CollectiveData = createSlice({
  name: "logins",
  initialState,
  reducers: {
    login_User: (state, action) => {
      state.filteredData = action.payload;
    },
    loginError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { login_User, loginError } = CollectiveData.actions;
export default CollectiveData.reducer;
