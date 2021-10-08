import { createSlice } from "@reduxjs/toolkit";

export const notStartedSlice = createSlice({
  name: "notStarted",
  initialState: [],
  reducers: {
    getNotStarted: (state, action) => {
			// console.log('notstarted: ',action.payload);
      let spreadData = [ ...action.payload ];
			return spreadData;
		},
		addNotStarted: (state, action) => {
			console.log(action.payload);
			const issue = [...state, action.payload]
			return issue;
		},
		deleteNotStarted: (state, action) => {
			console.log('redux: ',action.payload.id)
			return state.filter((issue) => issue.id !== action.payload.id);
		},
		// deleteInProgress: (state, action) => {
		// 	return state.filter((issue) => issue.id !== action.payload.id);
		// },
	},
});


export const { getNotStarted, addNotStarted, deleteNotStarted } = notStartedSlice.actions;

export default notStartedSlice.reducer;

