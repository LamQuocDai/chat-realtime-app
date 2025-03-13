import { ScrollArea } from "@mantine/core";
import { useState } from "react";

const ChatRoom = () => {
  const [messages, setMessages] = useState([
    { id: 1, sender: "Alice", text: "Hey! How's it going?" },
    { id: 2, sender: "You", text: "All good! How about you?" },
  ]);

  return (
    <ScrollArea className="flex-1 p-4 space-y-2 bg-gray-50">
      {messages.map((msg) => (
        <div
          key={msg.id}
          className={`p-3 rounded-lg w-fit shadow-md ${
            msg.sender === "You"
              ? "ml-auto bg-blue-500 text-white"
              : "bg-gray-300"
          }`}
        >
          <strong>{msg.sender}:</strong> {msg.text}
        </div>
      ))}
    </ScrollArea>
  );
};

export default ChatRoom;
