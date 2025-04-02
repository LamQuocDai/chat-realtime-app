import React, { createContext, useContext, useMemo, useState } from "react";
import userFirestore from "../../hooks/userFirestore";
import { AuthContext } from "./AuthProvider";

export const AppContext = createContext();

const AppProvider = ({ children }) => {
  const authData = useContext(AuthContext) || null;
  const [selectedUser, setSelectedUser] = useState(null);

  if (!authData || !authData.currentUser) return children;

  const {
    currentUser: { uid },
  } = authData;

  const roomsCondition = useMemo(() => {
    return {
      fieldName: "members",
      operator: "array-contains",
      compareValue: uid,
    };
  }, [uid]);

  // Lay danh sach Chats
  const chats = userFirestore("chats", roomsCondition);

  const usersCondition = useMemo(() => {
    return null;
  }, [uid]);

  const allUsers = userFirestore("users", usersCondition);
  const users = allUsers.filter((user) => user.uid !== uid);
  return (
    <AppContext.Provider
      value={{ chats, users, selectedUser, setSelectedUser }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
