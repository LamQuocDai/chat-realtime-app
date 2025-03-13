import { Group, Avatar, Text } from "@mantine/core";

const ChatHeader = () => {
  return (
    <Group className="p-4 bg-gray-200 border-b" position="apart">
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
  );
};

export default ChatHeader;
