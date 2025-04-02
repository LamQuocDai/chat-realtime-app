import { Group, TextInput, Button } from "@mantine/core";
import { SendHorizontal } from "lucide-react";
import { useState } from "react";

const ChatInputBox = () => {
  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (input.trim()) {
      setInput("");
    }
  };

  return (
    <Group className="p-4 border-t bg-gray-100">
      <TextInput
        className="flex-1"
        radius="lg"
        placeholder="Type a message..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && sendMessage()}
      />
      <Button
        onClick={sendMessage}
        className="ml-2"
        color="blue"
        radius="lg"
        leftSection={<SendHorizontal />}
      >
        Send
      </Button>
    </Group>
  );
};

export default ChatInputBox;
