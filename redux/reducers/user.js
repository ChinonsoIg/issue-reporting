import { USER_STATE_CHANGE, USER_ISSUES, ALL_ISSUES, IS_COMPLETED, IS_IN_PROGRESS } from "../constants";

const initialState = {
  currentUser: null,
  userIssues: [],
  isInProgress: [],
  isCompleted: [],
}

const user = (state = initialState, action) => {
  console.log('Action: ',action)
  
  switch (action.type) {
    case USER_STATE_CHANGE:
      return {
        ...state,
        currentUser: action.currentUser
      }
    case IS_IN_PROGRESS:
      return {
        ...state,
        isInProgress: action.isInProgress
      }
    case IS_COMPLETED:
      return {
        ...state,
        isCompleted: action.isCompleted
      }
    default:
      return state
  }
}

export { user };