import { createSlice } from "@reduxjs/toolkit";

export const inProgressSlice = createSlice({
  name: "inProgress",
  initialState: [],
  reducers: {
    getInProgress: (state, action) => {
			let f = [...new Set([...state,...action.payload])]
			console.log(f)
			state.push(...f)
		},
		addInProgress: (state, action) => {
			const issue = [...state, action.payload]
			return issue;
		},
		deleteInProgress: (state, action) => {
			return state.filter((issue) => issue.id !== action.payload.id);
		},
	},
});


export const { getInProgress, addInProgress, deleteInProgress } = inProgressSlice.actions;

export default inProgressSlice.reducer;

