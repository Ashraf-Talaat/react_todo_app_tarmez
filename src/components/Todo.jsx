import React, { useState } from "react";
import { useContext } from "react";

//MUI
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

//MUI icons
import CheckIcon from "@mui/icons-material/Check";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import IconButton from "@mui/material/IconButton";

//dialog
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";

//components
import { TodosContext } from "../context/TodosContext";

//**************************************************************************************/

export default function Todo({ todo }) {
  const { todosState, setTodosState } = useContext(TodosContext);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [editInputValue, setEditInputValue] = useState({
    title: todo.title || "",
    body: todo.body || "",
  });

  //*****start Event handlers*****
  //start check icon btn
  function handleCheckClick() {
    const updateTodos = todosState.map((t) => {
      if (t.id == todo.id) {
        t.isComplete = !t.isComplete;
      }
      return t;
    });
    setTodosState(updateTodos);
    localStorage.setItem("todos", JSON.stringify(updateTodos));
  }
  //end check icon btn

  //start delete icon btn
  function handleDeleteClick() {
    setShowDeleteDialog(true);
  }
  function handleDeleteDialogClose() {
    setShowDeleteDialog(false);
  }
  function handleDeleteConfirm() {
    const updateTodos = todosState.filter((t) => {
      return t.id != todo.id;
    });
    setTodosState(updateTodos);
    localStorage.setItem("todos", JSON.stringify(updateTodos));
  }
  //end delete icon btn

  //start edit icon btn
  function handleEditDialogClick() {
    setShowEditDialog(true);
  }
  function handleEditDialogClose() {
    setShowEditDialog(false);
  }
  function handleEditDialogClickConfirm() {
    const updatedTodos = todosState.map((t) => {
      if (t.id == todo.id) {
        return {
          ...t,
          title: editInputValue.title,
          body: editInputValue.body,
        };
      } else {
        return t;
      }
    });
    setTodosState(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
    setShowEditDialog(false);
  }
  //end edit icon btn
  //**************end Event handlers*****************

  return (
    <>
      {/* start delete dialog */}
      <Dialog
        open={showDeleteDialog}
        keepMounted
        onClose={handleDeleteDialogClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Delete Confirm"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Are you sure you want to delete this task?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteDialogClose}>Cancel</Button>
          <Button onClick={handleDeleteConfirm}>Delete</Button>
        </DialogActions>
      </Dialog>
      {/* end delete dialog */}

      {/* start edit dialog */}
      <Dialog
        open={showEditDialog}
        keepMounted
        onClose={handleEditDialogClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Edit Task"}</DialogTitle>
        <DialogContent>
          {/* start title input  */}
          <TextField
            autoFocus
            required
            margin="dense"
            id="taskTitle"
            name="Task Title"
            label="Task Title "
            type="text"
            fullWidth
            variant="standard"
            value={editInputValue.title}
            onChange={(e) =>
              setEditInputValue({ ...editInputValue, title: e.target.value })
            }
          />
          {/* end title input  */}

          {/* start body input */}
          <TextField
            autoFocus
            required
            margin="dense"
            id="takBody"
            name="Task Body"
            label="Task Body "
            type="text"
            fullWidth
            variant="standard"
            value={editInputValue.body}
            onChange={(e) =>
              setEditInputValue({ ...editInputValue, body: e.target.value })
            }
          />
          {/* end body input */}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditDialogClose}>Cancel</Button>
          <Button onClick={handleEditDialogClickConfirm}>Edit</Button>
        </DialogActions>
      </Dialog>
      {/* end edit dialog */}

      {/* start todo card */}
      <Card
        className="todoCard"
        sx={{
          minWidth: 275,
          margin: "1rem auto",
          background: "#eeeeee7a",
        }}
      >
        <CardContent>
          <Grid container spacing={2}>
            <Grid size={8}>
              <Typography
                variant="h6"
                gutterBottom
                sx={{
                  textDecoration: todo.isComplete ? "line-through" : "none",
                }}
              >
                {todo.title}
              </Typography>
              <Typography
                variant="body2"
                gutterBottom
                sx={{
                  textDecoration: todo.isComplete ? "line-through" : "none",
                }}
              >
                {todo.body}
              </Typography>
            </Grid>
            <Grid
              size={4}
              display="flex"
              alignItems="center"
              justifyContent="space-around"
            >
              {/* start check btn */}
              <IconButton
                sx={{
                  color: todo.isComplete ? "white" : "#64dd17",
                  border: "1px solid",
                  background: todo.isComplete ? "#64dd17" : "white",
                }}
                size="medium"
                aria-label="Check"
                onClick={() => handleCheckClick()}
              >
                <CheckIcon />
              </IconButton>
              {/* end check btn */}

              {/* start edit btn */}
              <IconButton
                size="medium"
                sx={{
                  color: "#2196f3",
                  border: "1px solid",
                  background: "white",
                }}
                aria-label="Edit"
                onClick={handleEditDialogClick}
              >
                <EditOutlinedIcon />
              </IconButton>
              {/* end edit btn */}

              {/* start delete btn */}
              <IconButton
                sx={{ color: "red", border: "1px solid", background: "white" }}
                size="medium"
                aria-label="delete"
                onClick={handleDeleteClick}
              >
                <DeleteOutlinedIcon />
              </IconButton>
              {/* end delete btn */}
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      {/* end todo card */}
    </>
  );
}
