import { Group, Avatar, Text, Button } from "@mantine/core";
import { IconLogout2 } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import { signOut, auth } from "../../firebase/config";

const Narbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    try {
      signOut(auth);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex items-center justify-between p-4 border-b shadow-md w-full h-1/12">
      <Group>
        <Avatar
          src="https://randomuser.me/api/portraits/men/1.jpg"
          alt="User"
          radius="xl"
          size="lg"
        />
        <Text size="28px">Chat App</Text>
      </Group>
      <Group className="flex items-center space-x-3">
        <Avatar
          src="https://randomuser.me/api/portraits/men/1.jpg"
          alt="User"
          radius="xl"
          size="lg"
        />
        <Text size="lg" weight={600}>
          John Doe
        </Text>
        <Button
          variant="subtle"
          color="red"
          leftSection={<IconLogout2 />}
          onClick={handleLogout}
        >
          Logout
        </Button>
      </Group>
    </div>
  );
};

export default Narbar;
