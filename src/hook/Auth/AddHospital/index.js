import { addHospitals } from "@/axiosApi/ApiHelper";
import { useState } from "react";
import { toast } from "react-hot-toast";

export const useAddHospital = (handleClose) => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "1",
    address: "2",
    country: "India",
    state: "Gujarat",
    city: "Surat",
    zipcode: "395006",
    emergencyContactNo: "1478523690",
    worksiteLink: "https://www.google.com",
    hospitalLogo: null, // null initially
  });

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle file (image) change from NHUpload
  const handleFileChange = (file) => {
    // Here we ensure that we are setting a File object, not binary data
    setFormData((prev) => ({ ...prev, hospitalLogo: file }));
  };

  const uploadProps = {
    name: 'file',
    showUploadList: false,
    customRequest: ({ file, onError }) => {
      handleFileChange(file); // This will set the file object in formData
    },
  };

  const isFormValid = () => {
    return (
      formData.name !== "" &&
      formData.address !== "" &&
      formData.country !== "" &&
      formData.state !== "" &&
      formData.city !== "" &&
      formData.zipcode !== "" &&
      formData.emergencyContactNo !== "" &&
      formData.worksiteLink !== "" &&
      formData.hospitalLogo !== null // Ensure it's not null or undefined
    );
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);
    if (!isFormValid()) {
      toast.error("All fields are required!");
      setIsLoading(false);
      return;
    }

    try {
      const formDataToSend = new FormData();
      const data = formData;

      // Append text fields to formData
      const textFields = {
        name: data.name,
        address: data.address,
        country: data.country,
        state: data.state,
        city: data.city,
        zipcode: data.zipcode,
        emergencyContactNo: data.emergencyContactNo,
        worksiteLink: data.worksiteLink,
      };

      Object.entries(textFields).forEach(([key, value]) => {
        formDataToSend.append(key, value);
      });

      // Append the hospital logo file if it exists
      if (data.hospitalLogo) {
        formDataToSend.append("hospitalLogo", data.hospitalLogo); // Send file object
      }

      // Make the API request
      let response = await addHospitals(formDataToSend);

      if (response.status === 1) {
        toast.success("Hospital added successfully!");
        handleClose();
      } else {
        toast.error("Failed to add hospital.");
      }
    } catch (error) {
      toast.error("An error occurred while adding the hospital.");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    formData,
    handleChange,
    handleSubmit,
    handleFileChange,
    uploadProps,
  };
};
