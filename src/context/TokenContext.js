import { createContext } from "react";
import { useState } from "react";

const TokenContext = createContext();

export function TokenProvider({ children }) {
  let initialToken = null;
  const userToken = localStorage.getItem("token");
  if (userToken) {
    initialToken = userToken;
  }
  const [token, setToken] = useState(initialToken);
  return (
    <TokenContext.Provider value={{ token, setToken }}>
      {children}
    </TokenContext.Provider>
  );
}

export default TokenContext;
