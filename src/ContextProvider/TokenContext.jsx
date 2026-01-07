import { createContext } from "react";

export const TokenContext = createContext();

export const TokenProvider = ({ children }) => {
  const login = (newToken, newUser) => {
    localStorage.setItem("token", newToken);
    localStorage.setItem("user", newUser);
  };

  const logout = () => {
    localStorage.clear();
  };

  return (
    <TokenContext.Provider value={{ login, logout }}>
      {children}
    </TokenContext.Provider>
  );
};
