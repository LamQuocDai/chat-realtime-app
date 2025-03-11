import { useState } from "react";
import {
  Avatar,
  Button,
  Paper,
  Text,
  TextInput,
  ScrollArea,
  Group,
  Divider,
} from "@mantine/core";
import { IconLogout2, IconSend2 } from "@tabler/icons-react";

export default function ChatPage() {
  const [messages, setMessages] = useState([
    { id: 1, sender: "Alice", text: "Hey! How's it going?" },
    { id: 2, sender: "You", text: "All good! How about you?" },
  ]);
  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (input.trim()) {
      setMessages([
        ...messages,
        { id: messages.length + 1, sender: "You", text: input },
      ]);
      setInput("");
    }
  };

  return (
    <div className="flex h-screen bg-gray-100 flex-col">
      {/* Navbar */}
      <Paper className="p-4 bg-gray-200 border-b flex justify-between items-center shadow-md">
        <Group>
          <Avatar
            src="https://randomuser.me/api/portraits/men/1.jpg"
            alt="User"
            radius="xl"
            size="md"
          />
          <Text size="lg" weight={600}>
            John Doe
          </Text>
        </Group>
        <Button variant="subtle" color="red" leftSection={<IconLogout2 />}>
          Logout
        </Button>
      </Paper>

      <div className="flex flex-1 p-4 gap-4">
        {/* Sidebar */}
        <Paper className="w-1/4 bg-gray-900 text-white p-4 rounded-lg shadow-lg">
          <Text size="xl" weight={700} mb="md" align="center">
            Friends & Groups
          </Text>
          <Divider my="sm" color="gray" />
          <ul>
            <li className="p-3 bg-gray-800 rounded-lg mb-2 cursor-pointer hover:bg-gray-700">
              Alice
            </li>
            <li className="p-3 bg-gray-800 rounded-lg mb-2 cursor-pointer hover:bg-gray-700">
              Bob
            </li>
            <li className="p-3 bg-gray-800 rounded-lg mb-2 cursor-pointer hover:bg-gray-700">
              Group Chat
            </li>
          </ul>
        </Paper>

        {/* Chat Area */}
        <Paper className="flex flex-col w-3/4 bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Chat Header */}
          <Group className="p-4 bg-gray-200 border-b" position="apart">
            <Group>
              <Avatar
                src="https://randomuser.me/api/portraits/women/1.jpg"
                alt="Alice"
                radius="xl"
                size="md"
              />
              <Text size="lg" weight={600}>
                Chat with Alice
              </Text>
            </Group>
          </Group>

          {/* Chat Room */}
          <ScrollArea className="flex-1 p-4 space-y-2 bg-gray-50">
            {messages.map((msg) => (
              <Paper
                key={msg.id}
                className={`p-3 rounded-lg w-fit shadow-md ${
                  msg.sender === "You"
                    ? "ml-auto bg-blue-500 text-white"
                    : "bg-gray-300"
                }`}
              >
                <strong>{msg.sender}:</strong> {msg.text}
              </Paper>
            ))}
          </ScrollArea>

          {/* Chat Input Box */}
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
              leftSection={<IconSend2 />}
            >
              Send
            </Button>
          </Group>
        </Paper>
      </div>
    </div>
  );
}
