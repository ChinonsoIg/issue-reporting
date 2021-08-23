// import { USER_STATE_CHANGE, IS_NOT_STARTED, IS_IN_PROGRESS, IS_COMPLETED } from "../constants";

// const initialState = {
//   currentUser: null,
//   isNotStarted: [],
//   isInProgress: [],
//   isCompleted: [],
// }

// const user = (state = initialState, action) => {
//   console.log('Action: ',action)
  
//   switch (action.type) {
//     case USER_STATE_CHANGE:
//       return {
//         ...state,
//         currentUser: action.currentUser
//       }
//     case IS_NOT_STARTED:
//       return {
//         ...state,
//         isNotStarted: action.isNotStarted
//       }
//     case IS_IN_PROGRESS:
//       return {
//         ...state,
//         isInProgress: action.isInProgress
//       }
//     case IS_COMPLETED:
//       return {
//         ...state,
//         isCompleted: action.isCompleted
//       }
//     default:
//       return state
//   }
// }

// export { user };