import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: [],
  reducers: {
    getUser: (state, action) => {
			state.push(action.payload);
		},
	},
});


export const { getUser } = userSlice.actions;

export default userSlice.reducer;
