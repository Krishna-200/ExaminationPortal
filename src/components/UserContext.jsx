import { createContext, useState } from "react";

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
  const [fullname, setFullname] = useState(null);
  const [id, setId] = useState(null);
  return (
    <UserContext.Provider value={{ fullname, setFullname, id, setId }}>
      {children}
    </UserContext.Provider>
  );
}
