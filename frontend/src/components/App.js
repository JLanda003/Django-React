import React from "react";
import { createRoot } from "react-dom/client";
import HomePage from "./HomePage";


const appDiv = document.getElementById('app');
const root = createRoot(appDiv)


const App = () => {
  return <HomePage />
}

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)