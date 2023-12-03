import React from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { Alert, Box, Button, InputLabel, TextField } from "@mui/material";
import { addTask } from "../Redux/slices/Tasks";
import { useTranslation } from "react-i18next";

function Input() {
  const { t } = useTranslation();
  const direction = t("languageDirection");

  const {
    register,
    handleSubmit,
    reset,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm();
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
            boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <InputLabel
            shrink
            htmlFor="title-input"
            sx={{
              direction: direction,
              position: "relative",
              left: direction === "rtl" ? "auto" : "0",
              right: direction === "rtl" ? "0" : "auto",
              mb: 1,
              fontSize: "1.5rem",
            }}
            size="xl"
          >
            {t("title")}
          </InputLabel>
          <TextField
            fullWidth
            margin="normal"
            id="title-input"
            {...register("title", { required: t("Title is required") })}
          />

          <InputLabel
            shrink
            htmlFor="description-input"
            sx={{
              direction: direction,
              position: "relative",
              left: direction === "rtl" ? "auto" : "0",
              right: direction === "rtl" ? "0" : "auto",
              mb: 1,
              mt: 2,
              fontSize: "1.5rem",
            }}
          >
            {t("Description")}
          </InputLabel>
          <TextField
            fullWidth
            multiline
            rows={4}
            margin="normal"
            id="description-input"
            {...register("description", {
              required: t("Description is required"),
            })}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ mt: 3 }}
          >
            {t("buttonAddTask")}
          </Button>
        </Box>
      </form>
    </>
  );
}

export default Input;
