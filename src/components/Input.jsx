import React from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { Alert, Box, Button, TextField } from "@mui/material";
import { addTask } from "../Redux/slices/Tasks";

function Input() {
  const {
    register,
    handleSubmit,
    reset,
    setError,
    clearErrors,
    formState: { errors },
    } = useForm()
  const [showError, setShowError] = React.useState(false)
  const dispatch = useDispatch();

  const onSubmit = (data) => {
    if (!data.title || !data.description) {
      setError("title", { type: "required", message: "Title is required" });
      setError("description", {
        type: "required",
        message: "Description is required",
      });
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
    clearErrors(["title", "description"]);
  };

  return (
    <>
      {errors.title && (
        <Alert variant="filled" severity="error">
          {errors.title.message}
        </Alert>
      )}
      {errors.description && (
        <Alert variant="filled" severity="error">
          {errors.description.message}
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
            {...register("title", { required: "Title is required" })}
          />
          <TextField
            label="Description"
            fullWidth
            multiline
            rows={4}
            margin="normal"
            {...register("description", {
              required: "Description is required",
            })}
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
