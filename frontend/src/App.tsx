import { Route, Routes } from "react-router-dom";
import ChatPage from "./pages/ChatPage";
import Login from "./components/Authentication/Login";
import Registration from "./components/Authentication/Registration";

function App() {
  return (
    <>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} index />
          <Route path="/register" element={<Registration />} />
          <Route path="/chats" element={<ChatPage />} />
        </Routes>
      </div>
    </>
  )
}

export default App;
