import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <div style={{ background: "#F3F5FB", height: "100vh" }}>
      <div
        style={{
          maxWidth: "fit-content",
          paddingTop: "50px",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        <App url={"http://127.0.0.1:5000"} width="1000px" height="70vh" />
      </div>
    </div>
  </React.StrictMode>,
);
