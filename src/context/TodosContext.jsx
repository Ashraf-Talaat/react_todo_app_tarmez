import { createContext, useReducer, useContext } from "react";

//reducer
import todosReducer from "./../reducers/todosReducer";

const TodosContext = createContext([]);

export default function TodosProvider({ children }) {
  const [todos, todosDispatch] = useReducer(todosReducer, []);

  return (
    <TodosContext.Provider
      value={{ todosState: todos, dispatch: todosDispatch }}
    >
      {children}
    </TodosContext.Provider>
  );
}
export const useTodos = () => {
  return useContext(TodosContext);
};
