import React, { createContext, useState, useContext } from "react";

const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const [searchValue, setSearchValue] = useState("");
  const [role, setRole] = useState("");

  return (
    <SearchContext.Provider
      value={{ searchValue, setSearchValue, role, setRole }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => useContext(SearchContext);
