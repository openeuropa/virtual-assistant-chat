import "./styles/main.scss";
import Chat from "./components/Chat.jsx";
import AuthProvider from "./contexts/authProvider.jsx";
import { getAdapter } from "./services/adapter.js";

function App({ backendUrl, jwtEndpoint, width = "100%", height = "100vh" }) {
  const adapter = getAdapter({ backendUrl, jwtEndpoint });
  return (
    <AuthProvider>
      <Chat {...{ adapter, width, height }} />
    </AuthProvider>
  );
}

export default App;
