import { createContext, useContext, useState } from "react";
import MySnackbar from "../components/MySnackbar";

const ToastContext = createContext({});

export function ToastProvider({ children }) {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");

  function showHideToast(msg) {
    setOpen(true);
    setMessage(msg);
    setTimeout(() => {
      setOpen(false);
    }, 2000);
  }
  return (
    <ToastContext.Provider value={{ showHideToast: showHideToast }}>
      <MySnackbar open={open} message={message} />

      {children}
    </ToastContext.Provider>
  );
}

export const useToast = () => {
  return useContext(ToastContext);
};
