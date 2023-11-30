import React from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { Alert, Box, Button, TextField } from "@mui/material";
import { addTask } from "../Redux/slices/Tasks";

function Input() {
  const { register, handleSubmit, reset } = useForm();
  const [showError, setShowError] = React.useState(false);
  const dispatch = useDispatch();

  const onSubmit = (data) => {
    if (!data.title || !data.description) {
      setShowError(true);
      setTimeout(() => {
        setShowError(false);
      }, 4000);
      return;
    }

    const newTask = {
      id: Date.now(),
      title: data.title,
      description: data.description,
      isComplete: false,
    };

    dispatch(addTask(newTask));

    reset();
  };

  return (
    <>
      {showError && (
        <Alert variant="filled" severity="error">
          Please enter a task
        </Alert>
      )}
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box
          sx={{
            bgcolor: "white",
            p: 4,
            borderRadius: "8px",
          }}
        >
          <TextField
            label="Title"
            fullWidth
            margin="normal"
            {...register("title", { required: true })}
          />
          <TextField
            label="Description"
            fullWidth
            multiline
            rows={4}
            margin="normal"
            {...register("description", { required: true })}
          />
          <Button type="submit" variant="contained" color="primary">
            Add Task
          </Button>
        </Box>
      </form>
    </>
  );
}

export default Input;
