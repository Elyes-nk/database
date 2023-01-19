import { createContext, useState } from "react";

const INITIAL_STATE = {
  database: null,
  table: null,
  property: null,
  selected:  "DataBases"
};

export const Context = createContext(INITIAL_STATE);

export const ContextProvider = ({ children }) => {
  const [database, setDatabase] = useState(null);
  const [table, setTable] = useState(null);
  const [property, setProperty] = useState(null);
  const [selected, setSelected] = useState("DataBases");

  return (
    <Context.Provider
      value={{
        database,
        table,
        property,
        selected,
        setDatabase,
        setTable,
        setProperty,
        setSelected
      }}
    >
      {children}
    </Context.Provider>
  );
};
