import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    loggedIn: false
  },
  reducers: {
    login: (state, action) => {
      state.user = action.payload,
      state.loggedIn = true
		},
    logout: (state) => {
      state.loggedIn = false
		},
	},
});


export const { login, logout } = userSlice.actions;

export const isLoggedIn = (state) => state.user.loggedIn;
export const currentUser = (state) => state.user.user;

export default userSlice.reducer;
