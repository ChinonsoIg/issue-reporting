import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: {},
    loggedIn: false
  },
  reducers: {
    login: (state, action) => {
      state.user = { ...state.user, ...action.payload },
      console.log(state.user)
      state.loggedIn = true
		},
    logout: (state) => {
      state.user = null
      console.log(state.user)
      state.loggedIn = false
		},
	},
});


export const { login, logout } = userSlice.actions;

export const isLoggedIn = (state) => state.user.loggedIn;
export const currentUser = (state) => state.user.user;

export default userSlice.reducer;
