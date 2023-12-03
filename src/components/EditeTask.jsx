import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Modal, IconButton, TextField, Button, Box, InputLabel, Divider, Typography } from "@mui/material";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import { updateTask } from "../Redux/slices/Tasks";
import { Close } from "@mui/icons-material";
import { useTranslation } from "react-i18next";

function EditeTask({ task, isOpen, onClose }) {
  const { t } = useTranslation();
  const direction = t("languageDirection");

  const dispatch = useDispatch();
  const [updatedTitle, setUpdatedTitle] = useState(task.title);
  const [updatedDescription, setUpdatedDescription] = useState(
    task.description
  );

  const handleUpdateTask = () => {
      const updatedTask = {
        id: task.id,
        title: updatedTitle,
        description: updatedDescription,
      };
    dispatch(updateTask(updatedTask));
    onClose(); // Close the modal after updating
  };

  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "white",
          p: 4,
          borderRadius: "8px",
          maxWidth: "400px",
          maxWidth: "400px",
          width: "90%",
          "@media (max-width: 600px)": {
            maxWidth: "80%", // Override for small screens
          },
        }}
      >
        <IconButton
          onClick={onClose}
          sx={{ position: "absolute", top: 0, right: 0 }}
        >
          <Close />
        </IconButton>
        <Typography>{t("updateTask")}</Typography>
        <TextField
          dir={t("languageDirection")}
          fullWidth
          margin="normal"
          value={updatedTitle}
          onChange={(e) => setUpdatedTitle(e.target.value)}
          InputProps={{
            style: {
              fontSize: "1rem",
              color: "gray",
            },
            placeholder: t("title"),
          }}
        />
        <TextField
          fullWidth
          dir={t("languageDirection")}
          multiline
          rows={4}
          margin="normal"
          value={updatedDescription}
          onChange={(e) => setUpdatedDescription(e.target.value)}
          InputProps={{
            style: {
              fontSize: "1rem",
              color: "gray",
            },
            placeholder: t("Description"),
          }}
        />
        <Button onClick={handleUpdateTask} variant="contained" color="primary">
          {t("buttonUpdateTask")}
        </Button>
      </Box>
    </Modal>
  );
}

export default EditeTask;
