import axios from "axios";

const ChatPage = () => {
  return (
    <button onClick={async () => {
      const res = axios.get('http://localhost:3000/', { withCredentials: true });
      console.log(res);
    }}>click</button>
  )
}

export default ChatPage;