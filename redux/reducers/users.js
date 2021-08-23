// import { USERS_ISSUES, USERS_STATE_CHANGE } from "../constants";

// const initialState = {
//   users: [],
//   usersIssues: [],
// }

// const users = (state = initialState, action) => {
//   switch (action.type) {
//     case USERS_STATE_CHANGE:
//       return {
//         ...state,
//         users: [...state.users ,action.user]
//       }
//     case USERS_ISSUES:
//       return {
//         ...state,
//         usersIssues: [...state.usersIssues, action.userIssue]
//       }
//     default:
//       return state;
//   }
// }

// export { users };