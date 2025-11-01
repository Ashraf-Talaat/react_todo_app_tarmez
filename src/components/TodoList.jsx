import * as React from "react";
import { useState } from "react";
import { useContext, useEffect } from "react";
import { useMemo } from "react";

//MUI
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Box, Container, Divider, Grid } from "@mui/material";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

// ToggleButtonGroup
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

//dialog
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

//component
import Todo from "./Todo";
import { TodosContext } from "../context/TodosContext";
import { useToast } from "../context/ToastContext";

//other
import { v4 as uuidv4 } from "uuid";

//**************************************************************************************/

export default function TodoList() {
  const { todosState, setTodosState } = useContext(TodosContext);
  const { showHideToast } = useToast();

  const [inputValue, setInputValue] = useState("");
  const [displayTodosTypeBtn, setDisplayTodosTypeBtn] = useState("all");
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [dialogTodo, setDialogTodo] = useState({ title: "", body: "" });
  const [showEditDialog, setShowEditDialog] = useState(false);

  //filtration array
  const completedTodos = useMemo(() => {
    return todosState.filter((t) => {
      return t.isComplete;
    });
  }, [todosState]);

  const notCompletedTodos = useMemo(() => {
    return todosState.filter((t) => {
      return !t.isComplete;
    });
  }, [todosState]);

  let displayTodos = todosState;

  if (displayTodosTypeBtn == "completed") {
    displayTodos = completedTodos;
  } else if (displayTodosTypeBtn == "incomplete") {
    displayTodos = notCompletedTodos;
  } else {
    displayTodos = todosState;
  }

  const todos = displayTodos.map((t) => {
    return (
      <Todo
        key={t.id}
        todo={t}
        showOpenDeleteDialog={openDeleteDialog}
        showOpenEditDialog={openEditDialog}
      />
    );
  });

  // add btn method
  function handleAddBtn() {
    const newTodo = {
      id: uuidv4(),
      title: inputValue,
      body: "",
      isComplete: false,
    };

    const updateTodos = [...todosState, newTodo];
    setTodosState(updateTodos);
    localStorage.setItem("todos", JSON.stringify(updateTodos));
    setInputValue("");
    showHideToast("Task Add to the List Successfully!");
  }

  //get todos from local storage
  useEffect(() => {
    const storageTodos = JSON.parse(localStorage.getItem("todos")) ?? [];
    if (storageTodos) {
      setTodosState(storageTodos);
    } else {
      setTodosState([]);
    }
  }, []);

  //*****start Event handlers*****
  //change display toggle btn method
  function changeTodosTypeBtns(e) {
    setDisplayTodosTypeBtn(e.target.value);
  }

  //start delete icon btn
  function openDeleteDialog(todo) {
    setShowDeleteDialog(true);
    setDialogTodo(todo);
  }
  function handleDeleteDialogClose() {
    setShowDeleteDialog(false);
  }
  function handleDeleteConfirm() {
    const updateTodos = todosState.filter((t) => {
      return t.id != dialogTodo.id;
    });
    setTodosState(updateTodos);
    localStorage.setItem("todos", JSON.stringify(updateTodos));
    setShowDeleteDialog(false);
    showHideToast("Task Deleted Successfully!");
  }
  //end delete icon btn

  //start edit icon btn
  function openEditDialog(todo) {
    setShowEditDialog(true);
    setDialogTodo(todo);
  }
  function handleEditDialogClose() {
    setShowEditDialog(false);
  }
  function handleEditDialogClickConfirm() {
    const updatedTodos = todosState.map((t) => {
      if (t.id == dialogTodo.id) {
        return {
          ...t,
          title: dialogTodo.title,
          body: dialogTodo.body,
        };
      } else {
        return t;
      }
    });
    setTodosState(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
    setShowEditDialog(false);
    showHideToast("Task Edit Successfully!");
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
            value={dialogTodo.title || ""}
            onChange={(e) =>
              setDialogTodo({ ...dialogTodo, title: e.target.value })
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
            value={dialogTodo.body || ""}
            onChange={(e) =>
              setDialogTodo({ ...dialogTodo, body: e.target.value })
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

      {/* start todo list container */}
      <Container maxWidth="md">
        <Card sx={{ minWidth: 275 }}>
          <CardContent>
            <Typography
              variant="h3"
              gutterBottom
              sx={{ textAlign: "center", color: "#003bc6ff" }}
            >
              My Tasks
            </Typography>

            <Divider />

            {/* start filter btns */}
            <ToggleButtonGroup
              value={displayTodosTypeBtn}
              onChange={changeTodosTypeBtns}
              exclusive
              aria-label="text alignment"
              sx={{
                margin: "1rem auto",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              color="primary"
            >
              <ToggleButton value="all" aria-label="left aligned">
                ALL
              </ToggleButton>
              <ToggleButton value="completed" aria-label="centered">
                Completed
              </ToggleButton>
              <ToggleButton value="incomplete" aria-label="right aligned">
                InCompleted
              </ToggleButton>
            </ToggleButtonGroup>
            {/* end filter btns */}

            {/* start all todos */}
            <Box
              sx={{
                maxHeight: "55vh",
                overflowY: "auto",
                marginTop: "1rem",
                paddingRight: "0.5rem",
                padding: "1rem",
              }}
            >
              {todos}
            </Box>
            {/* end all todos */}

            <Divider />

            {/* start add task */}
            <Grid container spacing={2} sx={{ marginTop: "2rem" }}>
              <Grid
                size={9}
                display="flex"
                alignItems="center"
                justifyContent="space-around"
              >
                <TextField
                  id="standard-basic"
                  label="Enter New Task"
                  variant="standard"
                  sx={{
                    width: "90%",
                    padding: "5px",
                    borderRadius: "8px",
                  }}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                />
              </Grid>
              <Grid
                size={3}
                display="flex"
                alignItems="center"
                justifyContent="space-around"
              >
                <Button
                  sx={{
                    width: "75%",
                    height: "80%",
                  }}
                  variant="contained"
                  onClick={() => handleAddBtn()}
                  disabled={inputValue.length == 0}
                >
                  Add Task
                </Button>
              </Grid>
            </Grid>
            {/* end add task */}
          </CardContent>
        </Card>
      </Container>
      {/* end todo list container */}
    </>
  );
}
