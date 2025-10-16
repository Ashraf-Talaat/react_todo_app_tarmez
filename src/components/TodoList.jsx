import * as React from "react";
import { useState } from "react";
import { useContext, useEffect } from "react";

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

//component
import Todo from "./Todo";
import { TodosContext } from "../context/TodosContext";

//other
import { v4 as uuidv4 } from "uuid";

export default function TodoList() {
  const [inputValue, setInputValue] = useState("");
  const { todosState, setTodosState } = useContext(TodosContext);
  const [displayTodosTypeBtn, setDisplayTodosTypeBtn] = useState("all");

  //filtration array
  const completedTodos = todosState.filter((t) => {
    return t.isComplete;
  });

  const notCompletedTodos = todosState.filter((t) => {
    return !t.isComplete;
  });

  let displayTodos = todosState;

  if (displayTodosTypeBtn == "completed") {
    displayTodos = completedTodos;
  } else if (displayTodosTypeBtn == "incomplete") {
    displayTodos = notCompletedTodos;
  } else {
    displayTodos = todosState;
  }

  const todos = displayTodos.map((t) => {
    return <Todo key={t.id} todo={t} />;
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

  //change display toggle btn method
  function changeTodosTypeBtns(e) {
    setDisplayTodosTypeBtn(e.target.value);
  }

  return (
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
              item
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
              item
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
  );
}
