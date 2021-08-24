import { createSlice } from "@reduxjs/toolkit";

export const notStartedSlice = createSlice({
  name: "notStarted",
  initialState: [],
  reducers: {
    getNotStarted: (state, action) => {
      let spreadData = [...new Set([...state,...action.payload])];
			return spreadData;
		},
		deleteNotStarted: (state, action) => {
			return state.filter((issue) => issue.id !== action.payload.id);
		},
	},
});


export const { getNotStarted, deleteNotStarted } = notStartedSlice.actions;

export default notStartedSlice.reducer;

