import "./styles/main.scss";
import Chat from "./components/Chat.jsx";
import AuthProvider from "./contexts/authProvider.jsx";
import createClient from "./services/client.js";

function App({ backendUrl, jwtEndpoint, width = "100%", height = "100vh" }) {
  const client = createClient(backendUrl, jwtEndpoint);
  return (
    <AuthProvider>
      <Chat {...{ client, width, height }} />
    </AuthProvider>
  );
}

export default App;
