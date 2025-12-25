import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./styles/globals.css";

import { Provider } from "react-redux";
import { store } from "./app/store";
import { ThemeProvider } from "./context/ThemeContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </Provider>
);
