import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteTask,
  selectTaskList,
  setCheck,
  updateTask,
} from "../Redux/slices/Tasks";
import {
  Card,
  Checkbox,
  IconButton,
  Typography,
  CardContent,
  CardActions,
  Box,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete"; // Import DeleteIcon
import BorderColorIcon from "@mui/icons-material/BorderColor";
import EditeTask from "./EditeTask";
function TodoList() {
    //cotrol to model  update
  const [isOpenUpdate, setIsOpenUpdate] = useState(false);
  const [taskToUpdate, setTaskToUpdate] = useState({});
  const dispatch = useDispatch();
const tasklist = useSelector(selectTaskList);
//handleComplet task
  const handleCheckboxChange = (taskId) => {
    dispatch(setCheck(taskId));
    };
//delete task
  const handleDeleteTask = (taskId) => {
    dispatch(deleteTask(taskId));
  };
 
  return (
    <div>
      <Card>
        {tasklist?.map((task) => (
          <Card key={task.id}>
            <Box
              sx={{ bgcolor: "lightgrey" }}
              px={1}
              display={"flex"}
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              <Typography sx={{ color: "black" }}>{task?.title}</Typography>
              <Checkbox
                checked={task?.isComplete}
                onChange={() => handleCheckboxChange(task.id)}
                style={{
                  color: task?.isComplete ? "green" : "",
                }}
              />
            </Box>
            <CardContent>
              <Typography sx={{ color: "black" }}>
                {task?.description}
              </Typography>
            </CardContent>
            <CardActions>
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={() => handleDeleteTask(task.id)}
              >
                <DeleteIcon />
              </IconButton>
              <IconButton
                edge="end"
                aria-label="update"
                onClick={() => {
                  setTaskToUpdate(task);
                  setIsOpenUpdate(true);
                }}
              >
                <BorderColorIcon />
              </IconButton>
              {/* updatePost */}
              {isOpenUpdate && taskToUpdate && (
                <EditeTask
                  task={taskToUpdate}
                  isOpen={isOpenUpdate}
                  onClose={() => {
                    setIsOpenUpdate(false);
                    setTaskToUpdate(null);
                  }}
                />
              )}
            </CardActions>
          </Card>
        ))}
      </Card>
    </div>
  );
}

export default TodoList;
