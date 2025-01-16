import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode,
} from "react";
import { jwtDecode } from "jwt-decode";

interface DecodedToken {
  userId: string;
  email: string;
  iat: number;
  exp: number;
}

interface currentUserContextType {
  currentUser: DecodedToken | null;
  setCurrentUser: React.Dispatch<React.SetStateAction<DecodedToken | null>>;
}

const currentUserContext = createContext<currentUserContextType | undefined>(
  undefined
);

interface CurrentUserProviderProps {
  children: ReactNode;
}

export const CurrentUserProvider: React.FC<CurrentUserProviderProps> = ({
  children,
}) => {
  const [currentUser, setCurrentUser] = useState<DecodedToken | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      const decoded: DecodedToken = jwtDecode(token);
      setCurrentUser(decoded);
    }
    console.log("currentUser", currentUser);
  }, []);

  return (
    <currentUserContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </currentUserContext.Provider>
  );
};

export const useCurrentUserAuth = (): currentUserContextType => {
  const context = useContext(currentUserContext);
  if (!context) {
    throw new Error("useCurrentUserAuth must be used within an AuthProvider");
  }
  return context;
};
