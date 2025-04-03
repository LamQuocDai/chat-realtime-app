import { ScrollArea } from "@mantine/core";
import { useContext, useState } from "react";
import Message from "./message";
import { AppContext } from "../context/AppProvider";
import { AuthContext } from "../context/AuthProvider";
import useMessages from "../../hooks/useMessages";
import { formatTime } from "../../utils/formatTime";

const ChatRoom = () => {
  const { selectedUser } = useContext(AppContext);
  const { currentUser } = useContext(AuthContext);
  const messages = useMessages(selectedUser?.id, currentUser?.uid);

  if (!selectedUser) {
    return (
      <ScrollArea className="flex-1 p-4 space-y-2 bg-gray-50"></ScrollArea>
    );
  }

  return (
    <ScrollArea className="flex-1 p-4 space-y-2 bg-gray-50">
      {messages.map((msg) => (
        <div
          key={msg.id}
          className={`p-2 mt-2 rounded-lg w-fit shadow-md ${
            msg.senderId === currentUser.uid
              ? "ml-auto bg-blue-500 text-white"
              : "bg-gray-300"
          }`}
        >
          <Message
            text={msg.text}
            displayName={
              msg.senderId === currentUser.uid
                ? currentUser.displayName
                : selectedUser.displayName
            }
            createAt={formatTime(msg.createAt)}
            photoURL={
              msg.senderId === currentUser.uid
                ? currentUser.photoURL
                : selectedUser.photoURL
            }
          />
        </div>
      ))}
      {/* {messages.map((msg) => (
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
      ))} */}
    </ScrollArea>
  );
};

export default ChatRoom;
