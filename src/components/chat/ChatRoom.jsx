import { ScrollArea } from "@mantine/core";
import { useContext, useState } from "react";
import Message from "./message";
import { AppContext } from "../context/AppProvider";
import { AuthContext } from "../context/AuthProvider";

const ChatRoom = () => {
  const [messages, setMessages] = useState([]);
  const { selectedUSer } = useContext(AppContext);
  const { currentUser } = useContext(AuthContext);

  if (!selectedUSer) {
    return (
      <ScrollArea className="flex-1 p-4 space-y-2 bg-gray-50"></ScrollArea>
    );
  }

  return (
    <ScrollArea className="flex-1 p-4 space-y-2 bg-gray-50 justify-items-end">
      {/* {messages.map((msg) => (
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
      ))} */}
      {messages.map((msg) => (
        <Message
          key={msg.id}
          text={msg.text}
          displayName={
            msg.senderId === currentUser.uid
              ? currentUser.displayName
              : selectedUser.displayName
          }
          createAt={new Date(msg.createAt).toLocaleTimeString()}
          photoURL={
            msg.senderId === currentUser.uid
              ? currentUser.photoURL
              : selectedUser.photoURL
          }
        />
      ))}
    </ScrollArea>
  );
};

export default ChatRoom;
