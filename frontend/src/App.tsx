import { Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ChatPage from "./pages/ChatPage";

function App() {
  return (
    <>
      <div className="App">
        <Route path="/" element={<HomePage />} index />
        <Route path="/chats" element={<ChatPage />} />
      </div>
    </>
  )
}

export default App;
