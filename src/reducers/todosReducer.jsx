import { v4 as uuidv4 } from "uuid";

export default function todosReducer(currentTodos, action) {
  switch (action.type) {
    case "add": {
      const newTodo = {
        id: uuidv4(),
        title: action.payload.newTitle,
        body: "",
        isComplete: false,
      };
      const updateTodos = [...currentTodos, newTodo];
      localStorage.setItem("todos", JSON.stringify(updateTodos));
      return updateTodos;
    }

    case "delete": {
      const updateTodos = currentTodos.filter((t) => {
        return t.id != action.payload.id;
      });
      localStorage.setItem("todos", JSON.stringify(updateTodos));
      return updateTodos;
    }

    case "edit": {
      const updatedTodos = currentTodos.map((t) => {
        if (t.id == action.payload.id) {
          return {
            ...t,
            title: action.payload.title,
            body: action.payload.body,
          };
        } else {
          return t;
        }
      });
      localStorage.setItem("todos", JSON.stringify(updatedTodos));
      return updatedTodos;
    }

    case "get": {
      const storageTodos = JSON.parse(localStorage.getItem("todos")) ?? [];
      return storageTodos;
    }

    case "toggleCompleted": {
      const updateTodos = currentTodos.map((t) => {
        if (t.id == action.payload.id) {
          const updatedTodo = { ...t, isComplete: !t.isComplete };
          return updatedTodo;
        }
        return t;
      });
      localStorage.setItem("todos", JSON.stringify(updateTodos));
      return updateTodos;
    }

    default: {
      throw Error("Unknown action" + action.type);
    }
  }
}
