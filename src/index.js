import React from "react";
import ReactDOM from "react-dom/client";
// import "./index.css";
import App from "./App";
import { ConfigProvider, Alert } from "antd";
import { BrowserRouter } from "react-router-dom";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ConfigProvider>
        <App />
      </ConfigProvider>
    </BrowserRouter>
  </React.StrictMode>
);
