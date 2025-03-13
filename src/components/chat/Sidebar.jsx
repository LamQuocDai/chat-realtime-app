import { Text, Divider, Group, Avatar } from "@mantine/core";

const Sidebar = () => {
  return (
    <div className="w-1/4 bg-gray-900 p-4 rounded-lg shadow-lg">
      <Text size="xl" weight={700} mb="md" align="center" c="white">
        Friends & Groups
      </Text>
      <Divider my="sm" color="gray" />
      <ul>
        <li className="p-3 bg-white rounded-lg mb-2 cursor-pointer hover:bg-gray-200">
          <Group>
            <Avatar
              src="https://randomuser.me/api/portraits/women/1.jpg"
              alt="Alice"
              radius="xl"
              size="lg"
            />
            <Text size="xl">Alice</Text>
          </Group>
        </li>
        <li className="p-3 bg-white rounded-lg mb-2 cursor-pointer hover:bg-gray-200">
          <Group>
            <Avatar
              src="https://randomuser.me/api/portraits/women/1.jpg"
              alt="Alice"
              radius="xl"
              size="lg"
            />
            <Text size="xl">Bob</Text>
          </Group>
        </li>
        <li className="p-3 bg-white rounded-lg mb-2 cursor-pointer hover:bg-gray-200">
          <Group>
            <Avatar
              src="https://randomuser.me/api/portraits/women/1.jpg"
              alt="Alice"
              radius="xl"
              size="lg"
            />
            <Text size="xl">Group chat</Text>
          </Group>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
