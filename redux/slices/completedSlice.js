import { createSlice } from "@reduxjs/toolkit";

export const completedSlice = createSlice({
  name: "completed",
  initialState: [],
  reducers: {
    getCompleted: (state, action) => {
			let spreadData = [...new Set([...state,...action.payload])];
      return spreadData;
		},
    addCompleted: (state, action) => {
			const issue = [...state, action.payload]
			return issue;
		},
	},
});


export const { getCompleted, addCompleted } = completedSlice.actions;

export default completedSlice.reducer;

