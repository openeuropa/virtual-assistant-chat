import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import {
    MainContainer,
    ChatContainer,
    MessageList,
    Message,
    MessageInput,
} from "@chatscope/chat-ui-kit-react";


function App() {
  return (
      <div style={{ position: "absolute", width: "100%", height: "100vh", top: 0 }}>
          <MainContainer>
              <ChatContainer>
                  <MessageList>
                      <Message
                          model={{
                              message: "Hello my friend",
                              sentTime: "just now",
                              sender: "Joe",
                          }}
                      />
                  </MessageList>
                  <MessageInput placeholder="Type message here" />
              </ChatContainer>
          </MainContainer>
      </div>
    )
}

export default App
