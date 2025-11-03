import React from "react";

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

//context
import { useTodos } from "../context/TodosContext";
import { useToast } from "../context/ToastContext";

//**************************************************************************************/

export default function Todo({
  todo,
  showOpenDeleteDialog,
  showOpenEditDialog,
}) {
  const { todosState, dispatch } = useTodos();
  const { showHideToast } = useToast();

  //*****start Event handlers*****
  //start check icon btn
  function handleCheckClick() {
    dispatch({ type: "toggleCompleted", payload: todo });
    todosState.map((t) => {
      if (t.id == todo.id) {
        const msg = t.isComplete
          ? "Remove from Complete Tasks Successfully!"
          : "Add to Complete Tasks Successfully!";
        showHideToast(msg);
      }
      return t;
    });
  }
  //end check icon btn

  //start delete icon btn
  function handleDeleteClick() {
    showOpenDeleteDialog(todo);
  }
  //end delete icon btn

  //start edit icon btn
  function handleEditDialogClick() {
    showOpenEditDialog(todo);
  }
  //end edit icon btn
  //**************end Event handlers*****************

  return (
    <>
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
