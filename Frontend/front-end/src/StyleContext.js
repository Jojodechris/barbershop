import React, { useState, useContext } from "react";

// export default React.createContext();

export const StyleContext = React.createContext();

export const StyleContextProvider = ({ children }) => {
  const [selectedHairstyle, setSelectedHairstyle] = useState("");
  const [selectedBarber, setSelectedBarber] = useState("");

  return (
    <StyleContext.Provider
      value={{
        selectedHairstyle,
        setSelectedHairstyle,
        selectedBarber,
        setSelectedBarber,
      }}
    >
      {children}
    </StyleContext.Provider>
  );
};

export function useStyle() {
  return useContext(StyleContext);
}
