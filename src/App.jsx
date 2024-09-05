import "./styles/main.scss";
import Chat from "./components/Chat.jsx";
import { getAdapter } from "./services/adapter.js";

function App({ backendUrl, jwtEndpoint, width = "100%", height = "100vh" }) {
  const adapter = getAdapter({ backendUrl, jwtEndpoint });
  return <Chat {...{ adapter, width, height }} />;
}

export default App;
