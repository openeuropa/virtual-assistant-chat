import React from "react";
import ReactDOM from "react-dom/client";
import App from "@/App.jsx";

const backendUrl = import.meta.env.VITE_BACKEND_URL;
const jwtEndpoint = import.meta.env.VITE_JWT_ENDPOINT;

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
        <App
          backendUrl={backendUrl}
          jwtEndpoint={jwtEndpoint}
          width="1000px"
          height="70vh"
        />
      </div>
    </div>
  </React.StrictMode>,
);
