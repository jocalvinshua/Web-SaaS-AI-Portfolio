import { createContext, useState } from "react";

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Gunakan null jika belum ada user
  const [isLogin, setIsLogin] = useState(false);

  const value = {
    // Hook
    user, setUser, isLogin, setIsLogin
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};