import {
  Text,
  Divider,
  Group,
  Avatar,
  TextInput,
  ActionIcon,
  Popover,
  Button,
} from "@mantine/core";
import { useContext, useState } from "react";
import { AppContext } from "../context/AppProvider";
import { Search, Plus } from "lucide-react";

const Sidebar = () => {
  const { chats, users, setSelectedUser } = useContext(AppContext);
  const [searchOpened, setSearchOpened] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const filteredUsers = users.filter(
    (u) =>
      u.displayName &&
      u.displayName.toLowerCase().includes(searchValue.toLowerCase())
  );

  const selectUserForChat = async (selectedUser) => {
    setSelectedUser(selectedUser);
    setSearchOpened(false);
  };

  return (
    <div className="w-1/4 bg-gray-900 p-4 rounded-lg shadow-lg">
      <Text
        style={{ fontSize: "30px" }}
        weight={700}
        mb="md"
        align="center"
        c="white"
      >
        Chats
      </Text>

      <Popover
        opened={searchOpened}
        onDismiss={() => setSearchOpened(false)}
        position="bottom"
        width="target"
        withArrow
      >
        <Popover.Target>
          <TextInput
            placeholder="Tìm kiếm người dùng..."
            icon={<Search size={16} />}
            mb="md"
            onFocus={() => setSearchOpened(true)}
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </Popover.Target>

        <Popover.Dropdown>
          {filteredUsers.length > 0 ? (
            <div className="max-h-60 overflow-y-auto">
              {filteredUsers.map((user) => (
                <Group
                  key={user.id}
                  position="apart"
                  className="p-2 hover:bg-gray-100 rounded cursor-pointer"
                  justify="space-between"
                >
                  <Group>
                    <Avatar src={user.photoURL} radius="xl">
                      {user.displayName?.charAt(0)}
                    </Avatar>
                    <Text>{user.displayName}</Text>
                  </Group>
                  <ActionIcon
                    variant="light"
                    color="blue"
                    onClick={() => selectUserForChat(user)}
                  >
                    <Plus size={16} />
                  </ActionIcon>
                </Group>
              ))}
            </div>
          ) : (
            <Text align="center" py="xs">
              Không tìm thấy người dùng
            </Text>
          )}
        </Popover.Dropdown>
      </Popover>

      <Divider my="sm" color="gray" />
      <ul>
        {chats &&
          chats.length > 0 &&
          chats.map((room) => (
            <li className="p-3 bg-white rounded-lg mb-2 cursor-pointer hover:bg-gray-200">
              <Group>
                <Avatar src="" alt="Alice" radius="xl" size="lg" />
                <Text size="xl">Alice</Text>
              </Group>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Sidebar;
