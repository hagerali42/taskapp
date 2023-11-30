import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Modal, IconButton, TextField, Button, Box } from "@mui/material";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import { updateTask } from "../Redux/slices/Tasks";
import { Close } from "@mui/icons-material";

function EditeTask({ task, isOpen, onClose }) {
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
        }}
      >
        <IconButton
          onClick={onClose}
          sx={{ position: "absolute", top: 0, right: 0 }}
        >
          <Close />
        </IconButton>
        <TextField
          label="Title"
          fullWidth
          margin="normal"
          value={updatedTitle}
          onChange={(e) => setUpdatedTitle(e.target.value)}
        />
        <TextField
          label="Description"
          fullWidth
          multiline
          rows={4}
          margin="normal"
          value={updatedDescription}
          onChange={(e) => setUpdatedDescription(e.target.value)}
        />
        <Button onClick={handleUpdateTask} variant="contained" color="primary">
          Update Task
        </Button>
      </Box>
    </Modal>
  );
}

export default EditeTask;
