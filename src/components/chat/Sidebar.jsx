import {
  Text,
  Divider,
  Group,
  Avatar,
  TextInput,
  ActionIcon,
  Popover,
  Loader,
} from "@mantine/core";
import { useEffect, useContext, useState } from "react";
import { AppContext } from "../context/AppProvider";
import { Search, Plus } from "lucide-react";
import { AuthContext } from "../context/AuthProvider";
import useChatUsers from "../../hooks/useChatUsers";
import useRecentChats from "../../hooks/useRecentChats";

const Sidebar = () => {
  const { users, setSelectedUser } = useContext(AppContext);
  const [searchOpened, setSearchOpened] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const { currentUser } = useContext(AuthContext);
  const { users: chatUsers, loading } = useChatUsers(currentUser?.uid);
  const { recentChats } = useRecentChats(currentUser?.uid);

  useEffect(() => {}, [chatUsers]);

  const filteredUsers = users?.filter(
    (u) =>
      u.displayName &&
      u.displayName.toLowerCase().includes(searchValue.toLowerCase())
  );

  const selectUserForChat = async (selectedUser) => {
    setSelectedUser(selectedUser);
    setSearchOpened(false);
  };

  // Hàm rút gọn tin nhắn cho sidebar
  const truncateMessage = (text, maxLength = 25) => {
    if (!text) return "";
    return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
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
      {loading ? (
        <div className="flex justify-center p-4">
          <Loader color="white" size="sm" />
        </div>
      ) : recentChats.length > 0 ? (
        <div className="space-y-2 mt-2">
          {recentChats.map((user) => (
            <div
              key={user.id}
              className="p-2 bg-gray-800 hover:bg-gray-700 rounded cursor-pointer"
              onClick={() => selectUserForChat(user)}
            >
              <Group>
                <Avatar src={user.photoURL} radius="xl">
                  {user.displayName?.charAt(0) || "U"}
                </Avatar>
                <div>
                  <Text c="white" size="sm" fw={500}>
                    {user.displayName}
                  </Text>
                  <Text c="gray.4" size="xs">
                    {user.lastMessage ? (
                      <>
                        {user.lastMessage.senderId === currentUser.uid && (
                          <span>Bạn: </span>
                        )}
                        {truncateMessage(user.lastMessage.text)}
                      </>
                    ) : (
                      "Tap to chat"
                    )}
                  </Text>
                </div>
              </Group>
            </div>
          ))}
        </div>
      ) : (
        <Text c="gray.4" size="sm" align="center" mt={2}>
          No recent chats
        </Text>
      )}
    </div>
  );
};

export default Sidebar;
