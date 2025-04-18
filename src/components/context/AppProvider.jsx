import React, { createContext, useContext, useMemo, useState } from "react";
import useFirestore from "../../hooks/useFirestore";
import { AuthContext } from "./AuthProvider";
import { auth } from "../../firebase/config";

export const AppContext = createContext();

const AppProvider = ({ children }) => {
  const authData = useContext(AuthContext) || null;
  const [selectedUser, setSelectedUser] = useState(null);

  // const {
  //   currentUser: { uid },
  // } = authData;

  const usersCondition = useMemo(() => {
    if (!authData || !authData.currentUser) return null;
    return null;
  }, [authData]);

  const uid = authData?.currentUser?.uid;

  const allUsers = useFirestore("users", usersCondition);

  const users = uid ? allUsers.filter((user) => user.id !== uid) : allUsers;
  return (
    <AppContext.Provider value={{ users, selectedUser, setSelectedUser }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
