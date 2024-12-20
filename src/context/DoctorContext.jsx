import { createContext, useState } from "react";
import PropTypes from "prop-types";
import apiService from "../services/api";
import toast from "react-hot-toast";
export const DoctorContext = createContext();

export const DoctorProvider = ({ children }) => {
  const [allDoctors, setAllDoctors] = useState([]);
  const getAllDoctors = async () => {
    try {
      const response = await apiService.GetAllDoctors();
      setAllDoctors(response.data.data);
      console.log(response)
      return response.data.data[0]._id;
    } catch (error) {
      console.error("Error fetching doctors:", error);
      toast.error("Error fetching doctors");
      throw error;
    }
  };
  return (
    <DoctorContext.Provider value={{ getAllDoctors, allDoctors }}>
      {children}
    </DoctorContext.Provider>
  );
};
DoctorProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
