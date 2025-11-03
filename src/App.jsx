import { useState } from "react";

//component
import "./app.css";
import TodoList from "./components/TodoList";

//context
import TodosProvider from "./context/TodosContext";
import { ToastProvider } from "./context/ToastContext";

//other
import { v4 as uuidv4 } from "uuid";

//list of todos
const todosList = [
  {
    id: uuidv4(),
    title: "first task",
    body: "body of first task",
    isComplete: false,
  },
  {
    id: uuidv4(),
    title: "sec task",
    body: "body of sec task",
    isComplete: false,
  },
];

export default function App() {
  const [todosState, setTodosState] = useState(todosList);

  return (
    <TodosProvider>
      <ToastProvider>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            background: "#eee",
          }}
        >
          <TodoList />
        </div>
      </ToastProvider>
    </TodosProvider>
  );
}
