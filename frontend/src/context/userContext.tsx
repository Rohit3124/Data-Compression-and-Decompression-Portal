import React, { createContext, useState, useEffect } from "react";
import type { ReactNode, Dispatch, SetStateAction } from "react";

interface IUser {
  username: string;
  email: string;
}
interface UserContextType {
  currentUser: IUser | null;
  setCurrentUser: Dispatch<SetStateAction<IUser | null>>;
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
}

export const currentUserContext = createContext<UserContextType>({
  currentUser: null,
  setCurrentUser: () => {},
  isLoading: true,
  setIsLoading: () => {},
});

interface UserContextProps {
  children: ReactNode;
}

export const UserContext: React.FC<UserContextProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<IUser | null>(() => {
    const savedUser = localStorage.getItem("currentUser");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [isLoading, setIsLoading] = useState<boolean>(true);
  useEffect(() => {
    const savedUser = localStorage.getItem("currentUser");
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
    }
  }, []);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem("currentUser", JSON.stringify(currentUser));
    } else {
      localStorage.removeItem("currentUser");
    }
  }, [currentUser]);

  return (
    <currentUserContext.Provider
      value={{ currentUser, setCurrentUser, isLoading, setIsLoading }}
    >
      {children}
    </currentUserContext.Provider>
  );
};

export default UserContext;
