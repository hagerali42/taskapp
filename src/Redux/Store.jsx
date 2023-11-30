import { configureStore } from "@reduxjs/toolkit";
import tasksReducer from "./slices/Tasks"

export let store = configureStore({
  reducer: {
    taskes: tasksReducer,
  }
});
