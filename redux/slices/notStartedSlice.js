import { createSlice } from "@reduxjs/toolkit";

export const notStartedSlice = createSlice({
  name: "notStarted",
  initialState: [],
  reducers: {
    getNotStarted: (state, action) => {
      let f = [...new Set([...state,...action.payload])]
      console.log(f)
			state.push(...f)
		},
		deleteNotStarted: (state, action) => {
			return state.filter((issue) => issue.id !== action.payload.id);
		},
	},
});


export const { getNotStarted, toggleComplete, deleteNotStarted } = notStartedSlice.actions;

export default notStartedSlice.reducer;

