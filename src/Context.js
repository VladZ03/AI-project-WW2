import React, { createContext, useState } from "react";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [userInput, setUserInput] = useState("");
  const [aiResponse, setAiResponse] = useState("");

  return (
    <AppContext.Provider value={{ userInput, setUserInput, aiResponse, setAiResponse }}>
      {children}
    </AppContext.Provider>
  );
};
