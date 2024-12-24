import { useState } from "react";
import { toast } from "react-hot-toast";

export const useAddSociety = (handleClose) => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    country: "India",
    state: "Gujarat",
    city: "Surat",
    zipcode: "395006",
    emergencyContactNo: "1478523690",
    worksiteLink: "https//www.google.com",
    hospitalLogo: [],
  });

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Validate form data
  const isFormValid = () => {
    return Object.values(formData).every((field) => field.trim() !== "");
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);
    if (!isFormValid()) {
      toast.error("All fields are required!");
      setIsLoading(false);
      return;
    }

    try {
      // Replace with your API call
      // let data = await (formData);
      toast.success("Hospital added successfully!");
      handleClose();
    } catch (error) {
      toast.error("Failed to add society!");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    formData,
    handleChange,
    handleSubmit,
  };
};