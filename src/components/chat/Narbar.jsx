import { Group, Avatar, Text, Button } from "@mantine/core";
import { LogOut } from "lucide-react";
import { signOut, auth } from "../../firebase/config";
import { AuthContext } from "../context/AuthProvider";
import { useContext } from "react";
import avatarImage from "../../assets/chat-app.avif";

const Narbar = () => {
  const handleLogout = () => {
    try {
      signOut(auth);
    } catch (error) {
      console.log(error);
    }
  };

  const {
    currentUser: { displayName, photoURL },
  } = useContext(AuthContext);

  return (
    <div className="flex items-center justify-between p-4 border-b shadow-md w-full h-1/12">
      <Group>
        <Avatar src={avatarImage} alt="User" radius="xl" size="lg" />
        <Text size="28px">Chat App</Text>
      </Group>
      <Group className="flex items-center space-x-3">
        <Avatar src={photoURL} radius="xl" size="lg">
          {photoURL ? "" : displayName && displayName?.charAt(0)?.toUpperCase()}
        </Avatar>
        <Text size="lg" weight={600}>
          {displayName}
        </Text>
        <Button
          variant="subtle"
          color="red"
          leftSection={<LogOut />}
          onClick={handleLogout}
        >
          Logout
        </Button>
      </Group>
    </div>
  );
};

export default Narbar;
