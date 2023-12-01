import React from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { Alert, Box, Button, TextField } from "@mui/material";
import { addTask } from "../Redux/slices/Tasks";
import { useTranslation } from "react-i18next";

function Input() {
    const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    reset,
    setError,
    clearErrors,
    formState: { errors },
    } = useForm()
  const dispatch = useDispatch();
  const onSubmit = (data) => {
    if (!data.title || !data.description) {
      setError("title", { type: "required", message: t("Titleisrequired") });
      setError("description", {
        type: "required",
        message: t("Descriptionisrequired"),
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
            label={t("title")}
            fullWidth
            margin="normal"
            {...register("title", { required: t("Titleisrequired") })}
          />
          <TextField
            label={t("Description")}
            fullWidth
            multiline
            rows={4}
            margin="normal"
            {...register("description", {
              required: t("Descriptionisrequired"),
            })}
          />
          <Button type="submit" variant="contained" color="primary">
            {t("buttonAddTask")}
          </Button>
        </Box>
      </form>
    </>
  );
}

export default Input;
