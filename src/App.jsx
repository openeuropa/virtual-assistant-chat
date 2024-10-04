import "@/styles/main.scss";
import AuthProvider from "@/contexts/authProvider.jsx";
import createClient from "@/services/client.js";
import ChatWrapper from "@/components/ChatWrapper.jsx";

function App({ backendUrl, jwtEndpoint, width = "100%", height = "100vh" }) {
  const client = createClient(backendUrl, jwtEndpoint);
  return (
    <AuthProvider>
      <ChatWrapper {...{ client, width, height }} />
    </AuthProvider>
  );
}

export default App;
