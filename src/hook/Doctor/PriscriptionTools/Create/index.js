import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const useCreatePrescription = () => {
  const navigate = useNavigate();

  // State for loading and error handling
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Function to submit prescription data
  const createPrescription = async (appointmentId, prescriptionData) => {
    setIsLoading(true);
    setError(null);

    try {
      // Make the API request
      const response = await request(
        "post",
        `/api/doctor/createPrescription/${appointmentId}`,
        prescriptionData
      );

      // Handle success
      if (response.status === 1) {
        console.log("Prescription created successfully!", response.data);
      } else {
        setError("Failed to create prescription. Please try again.");
      }
    } catch (err) {
      setError("An error occurred while creating the prescription.");
      console.error("Error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    createPrescription,
    isLoading,
    error,
  };
};
