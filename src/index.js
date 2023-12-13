import React from "react";
import ReactDOM from "react-dom/client";

import App from "./components/App";
import "./styles/index.css";
import "./styles/reset.css";

const container = document.querySelector(".root");
// @ts-ignore
const divRoot = ReactDOM.createRoot(container);
divRoot.render(<App />);
