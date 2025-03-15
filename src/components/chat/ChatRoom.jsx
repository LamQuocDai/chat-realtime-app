import { ScrollArea } from "@mantine/core";
import { useState } from "react";
import Message from "./message";

const ChatRoom = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      displayName: "Alice",
      text: "Hey! How's it going?",
      photoURL: null,
      createAt: 1231231,
    },
    {
      id: 2,
      displayName: "You",
      text: "All good! How about you?",
      photoURL: null,
      createAt: 1231231,
    },
  ]);

  return (
    <ScrollArea className="flex-1 p-4 space-y-2 bg-gray-50 justify-end">
      {messages.map((msg) => (
        <div
          key={msg.id}
          className={`p-3 rounded-lg w-fit shadow-md ${
            msg.displayName === "You"
              ? "ml-auto bg-blue-500 text-white"
              : "bg-gray-300"
          }`}
        >
          <Message
            text={msg.text}
            displayName={msg.displayName}
            createAt={msg.createAt}
            photoURL={msg.photoURL}
          />
        </div>
      ))}
    </ScrollArea>
  );
};

export default ChatRoom;
