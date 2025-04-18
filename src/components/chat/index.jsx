import Narbar from "./Narbar";
import Sidebar from "./Sidebar";
import ChatHeader from "./ChatHeader";
import ChatInputBox from "./ChatInputBox";
import ChatRoom from "./ChatRoom";

export default function ChatPage() {
  return (
    <div className="flex flex-col h-screen bg-gray-100 overflow-hidden">
      {/* Navbar */}
      <Narbar />

      <div className="flex flex-row h-full overflow-hidden">
        {/* Sidebar */}
        <Sidebar />
        {/* Chat Area */}
        <div className="flex flex-col w-3/4 bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Chat Header */}
          <ChatHeader />

          {/* Chat Room */}
          <ChatRoom />

          {/* Chat Input Box */}
          <ChatInputBox />
        </div>
      </div>
    </div>
  );
}
