import { ScrollArea } from "@mantine/core";
import { useContext, useEffect, useRef } from "react";
import Message from "./message";
import { AppContext } from "../context/AppProvider";
import { AuthContext } from "../context/AuthProvider";
import useMessages from "../../hooks/useMessages";
import { formatTime } from "../../utils/formatTime";

const ChatRoom = () => {
  const { selectedUser } = useContext(AppContext);
  const { currentUser } = useContext(AuthContext);
  const messages = useMessages(selectedUser?.id, currentUser?.uid);
  const viewport = useRef(null);
  const lastMessageRef = useRef(null);

  useEffect(() => {
    if (messages.length > 0) {
      setTimeout(() => {
        if (viewport.current) {
          viewport.current.scrollTo({
            top: viewport.current.scrollHeight,
            behavior: "smooth",
          });
        }
      }, 100);
    }
  }, [messages]);

  if (!selectedUser) {
    return (
      <ScrollArea className="flex-1 p-4 space-y-2 bg-gray-50"></ScrollArea>
    );
  }

  return (
    <ScrollArea
      viewportRef={viewport}
      className="flex-1 bg-gray-50"
      style={{ height: "calc(100vh - 180px)" }}
    >
      <div className="p-4 space-y-2">
        {messages.map((msg, index) => (
          <div
            key={msg.id}
            ref={index === messages.length - 1 ? lastMessageRef : null}
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
              createdAt={formatTime(msg.createdAt)}
              photoURL={
                msg.senderId === currentUser.uid
                  ? currentUser.photoURL
                  : selectedUser.photoURL
              }
            />
          </div>
        ))}
      </div>
    </ScrollArea>
  );
};

export default ChatRoom;
