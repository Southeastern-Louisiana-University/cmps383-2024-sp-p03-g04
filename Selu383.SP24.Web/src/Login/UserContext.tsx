// UserContext.tsx
import { ReactNode, createContext, useContext, useState } from "react";

interface UserDto {
	userName?: string;
	id?: number;
  email?:string;
  roles: string[];
}
interface UserContextProps {
  user: UserDto | null;
  setUser: React.Dispatch<React.SetStateAction<UserDto | null>>;
}
interface UserProviderProps {
  children: ReactNode; 
}

export const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => { // Use the UserProviderProps here
  const [user, setUser] = useState<UserDto | null>(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
