import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { AuthProvider } from "./context/AuthProvider";
import { BrowserRouter as Router } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "./customTheme.jsx";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <Router>
        <ChakraProvider theme={theme}>
          <App />
        </ChakraProvider>
      </Router>
    </AuthProvider>
  </React.StrictMode>
);
