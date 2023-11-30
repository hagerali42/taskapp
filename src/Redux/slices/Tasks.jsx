import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   taskesList: [],
// };

export let TaskesSlice = createSlice({
  name: "tasks",
  initialState: {
    taskesList: [],
  },
  reducers: {
    addTask: (state, action) => {
      console.log("actooon", action);
      state.taskesList.push(action.payload);
    },
    //action
    setCheck: (state, action) => {
      console.log("state", state);
      console.log("action", action);

      state.taskesList.map((task) => {
        if (action.payload == task.id) {
          task.isComplete
            ? (task.isComplete = false)
            : (task.isComplete = true);
        }
      });
    },
    deleteTask: (state, action) => {
      state.taskesList = state.taskesList.filter(
        (item) => item.id !== action.payload
      );
    },
    updateTask: (state, action) => {
      const { id, title, description } = action.payload;
      const index = state.taskesList.findIndex((item) => item.id === id);

      if (index !== -1) {
        state.taskesList[index] = {
          ...state.taskesList[index],
          title,
          description,
        };
      }
    },
  },
});
export const { addTask, setCheck, deleteTask, updateTask } = TaskesSlice.actions;
export const selectTaskList = (state) => state.taskes.taskesList;
export default TaskesSlice.reducer;