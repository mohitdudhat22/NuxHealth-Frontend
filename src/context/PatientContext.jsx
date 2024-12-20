// context/PatientContext.jsx
import { createContext, useState } from "react";
import PropTypes from "prop-types";
import apiService from "../services/api";
import toast from "react-hot-toast";

export const PatientContext = createContext();

export const PatientProvider = ({ children }) => {
  const [allPatients, setAllPatients] = useState([]);
  const [patientDetails, setPatientDetails] = useState(null);

  // Fetch all patients from the API
  const getAllPatients = async () => {
    try {
      const response = await apiService.GetAllPatients();
      setAllPatients(response.data.data);
      console.log("All patients:", response.data.data);
      return response.data.data;
    } catch (error) {
      console.error("Error fetching patients:", error);
      toast.error("Error fetching patients");
      throw error;
    }
  };

  // Fetch a specific patient's details by ID
  const getPatientById = async (id) => {
    try {
      const response = await apiService.GetPatientById(id);
      setPatientDetails(response.data.data);
      return response.data.data;
    } catch (error) {
      console.error(`Error fetching patient with ID ${id}:`, error);
      toast.error(`Error fetching patient with ID ${id}`);
      throw error;
    }
  };

  return (
    <PatientContext.Provider
      value={{ getAllPatients, allPatients, getPatientById, patientDetails }}
    >
      {children}
    </PatientContext.Provider>
  );
};

PatientProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
