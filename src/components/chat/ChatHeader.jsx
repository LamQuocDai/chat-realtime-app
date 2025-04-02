import { Group, Avatar, Text } from "@mantine/core";
import { useContext } from "react";
import { AppContext } from "../context/AppProvider";

const ChatHeader = () => {
  const { selectedUser } = useContext(AppContext);

  if (!selectedUser) {
    return (
      <Group className="p-4 bg-gray-200 border-b" position="apart">
        <Text size="lg" weight={600}>
          Chọn một người dùng để bắt đầu trò chuyện
        </Text>
      </Group>
    );
  }

  return (
    <Group className="p-4 bg-gray-200 border-b" position="apart">
      <Avatar
        src={selectedUser?.photoURL || ""}
        alt={selectedUser?.displayName || "User"}
        radius="xl"
        size="md"
      >
        {selectedUser?.displayName?.charAt(0).toUpperCase() || "U"}
      </Avatar>
      <Text size="lg" weight={600}>
        Chat with {selectedUser?.displayName || "User"}
      </Text>
    </Group>
  );
};

export default ChatHeader;
