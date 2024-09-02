import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <div style={{ background: "#F3F5FB", height: "100vh" }}>
      <App url={"http://127.0.0.1:5000"} />
    </div>
  </React.StrictMode>,
);
