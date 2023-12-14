import { createContext } from "react";
import { useState } from "react";

const UserContext = createContext();

export function UserProvider({ children }) {
  let initialUser = "";
  const userInfosString = localStorage.getItem("user");
  const userInfos = JSON.parse(userInfosString);
  if (userInfos) {
    initialUser = userInfos;
  }
  const [user, setUser] = useState(initialUser);
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

export default UserContext;
