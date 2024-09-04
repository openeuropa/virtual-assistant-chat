import "./styles/main.scss";
import Chat from "./components/Chat.jsx";

function App({ url = {}, width = "100%", height = "100vh" }) {
  return <Chat url={url} width={width} height={height} />;
}

export default App;
