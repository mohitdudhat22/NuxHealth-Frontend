import { createContext } from "react";
import PropTypes from "prop-types";
export const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  return <AdminContext.Provider value={{}}>{children}</AdminContext.Provider>;
};
AdminProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
