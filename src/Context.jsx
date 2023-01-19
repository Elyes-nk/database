import { createContext, useState } from "react";

const INITIAL_STATE = {
  database: null,
  table: null,
  property: null,
};

export const Context = createContext(INITIAL_STATE);

export const ContextProvider = ({ children }) => {
  const [database, setDatabase] = useState(null);
  const [table, setTable] = useState(null);
  const [property, setProperty] = useState(null);

  return (
    <Context.Provider
      value={{
        database,
        table,
        property,
        setDatabase,
        setTable,
        setProperty,
      }}
    >
      {children}
    </Context.Provider>
  );
};
