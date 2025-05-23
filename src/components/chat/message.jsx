import { Avatar, Text } from "@mantine/core";

const Message = ({ text, displayName, createdAt, photoURL }) => {
  return (
    <div className="">
      <div className="flex items-center">
        <Avatar src={photoURL}>A</Avatar>
        <Text ml={4} fw={700}>
          {displayName}
        </Text>
        <Text ml={10} size="xs" variant="#a7a7a7">
          {createdAt}
        </Text>
      </div>
      <div>
        <Text ml={30}>{text}</Text>
      </div>
    </div>
  );
};

export default Message;
