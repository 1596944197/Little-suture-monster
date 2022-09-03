import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "/public/style.less";
import "@arco-design/web-react/dist/css/arco.css";
import { BrowserRouter } from "react-router-dom";

const root = createRoot(document.getElementById("container") as HTMLElement);
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
);
