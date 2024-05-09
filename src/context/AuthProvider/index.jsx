import React, { createContext, useState } from "react";

//criando contexto
export const AuthContext = createContext({});
export const AuthProvider = ({ children }) => {
  const [tasksByDay, settasksByDay] = useState([]);
  return (
    <AuthContext.Provider value={{ tasksByDay, settasksByDay }}>
      {children}
    </AuthContext.Provider>
  );
};
