import React, { useState, useEffect, createContext } from "react";
import { useNavigate } from "react-router-dom";
import { auth, onAuthStateChanged } from "../../firebase/config";
import { Loader } from "@mantine/core";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({});
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        const { displayName, email, uid, photoURL } = currentUser;
        setCurrentUser({ displayName, email, uid, photoURL });
        setIsLoading(false);
        navigate("/");
        return;
      }
      setCurrentUser(null);
      setIsLoading(false);
      navigate("/login");
    });

    return () => unsubscribe();
  }, [navigate]);

  return (
    <AuthContext.Provider value={{ currentUser }}>
      {isLoading ? <Loader color="blue" /> : children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
