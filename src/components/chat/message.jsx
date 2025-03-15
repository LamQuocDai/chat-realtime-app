import { Avatar, Text } from "@mantine/core";

const Message = ({ text, displayName, createAt, photoURL }) => {
  return (
    <div>
      <div>
        <Avatar src={photoURL}>A</Avatar>
        <Text className="ml-1 font-bold">{displayName}</Text>
        <Text className="me-2.5 text-[11px] text-[#a7a7a7]">{createAt}</Text>
      </div>
      <div>
        <Text className="me-[30px]">{text}</Text>
      </div>
    </div>
  );
};

export default Message;
