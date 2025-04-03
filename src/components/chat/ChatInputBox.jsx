import { Group, TextInput, Button } from "@mantine/core";
import { SendHorizontal } from "lucide-react";
import { useState } from "react";
import { useContext } from "react";
import { AppContext } from "../context/AppProvider";
import { AuthContext } from "../context/AuthProvider";
import { sendMessage } from "../../firebase/services";

const ChatInputBox = () => {
  const [messageText, setMessageText] = useState("");
  const { selectedUser } = useContext(AppContext);
  const { currentUser } = useContext(AuthContext);

  const handleSendMessage = async () => {
    if (!messageText.trim() || !selectedUser.id || !currentUser.uid) return;

    try {
      console.log("Sending message:", messageText);
      await sendMessage(currentUser.uid, selectedUser.id, messageText);
      setMessageText("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <Group className="p-4 border-t bg-gray-100">
      <TextInput
        className="flex-1"
        radius="lg"
        placeholder="Type a message..."
        value={messageText}
        disabled={!selectedUser}
        onChange={(e) => setMessageText(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
      />
      <Button
        onClick={handleSendMessage}
        className="ml-2"
        color="blue"
        radius="lg"
        disabled={!selectedUser || !messageText.trim()}
        leftSection={<SendHorizontal />}
      >
        Send
      </Button>
    </Group>
  );
};

export default ChatInputBox;
