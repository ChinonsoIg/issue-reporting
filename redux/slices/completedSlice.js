import { createSlice } from "@reduxjs/toolkit";

export const completedSlice = createSlice({
  name: "completed",
  initialState: [],
  reducers: {
    getCompleted: (state, action) => {
      // console.log('completed: ',action.payload);
			let spreadData = [ ...action.payload ];
      return spreadData;
		},
    addCompleted: (state, action) => {
			const issue = [...state, action.payload]
			return issue;
		},
    deleteCompleted: (state, action) => {
			return state.filter((issue) => issue.id !== action.payload.id);
		},
	},
});




export const { getCompleted, addCompleted, deleteCompleted } = completedSlice.actions;

export default completedSlice.reducer;

