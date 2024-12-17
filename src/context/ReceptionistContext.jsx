import { createContext } from "react";
import PropTypes from "prop-types";
export const ReceptionistContext = createContext();

export const ReceptionistProvider = ({ children }) => {
  return (
    <ReceptionistContext.Provider value={{}}>{children}</ReceptionistContext.Provider>
  );
};
ReceptionistProvider.propTypes = {
  children: PropTypes.node.isRequired,
};