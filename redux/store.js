import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import notStartedReducer from "./slices/notStartedSlice";
import inProgressReducer from "./slices/inProgressSlice";
import completedReducer from "./slices/completedSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    notStarted: notStartedReducer,
    inProgress: inProgressReducer,
    completed: completedReducer
  },
});



