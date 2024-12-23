import { useState } from "react";
import { toast } from "react-hot-toast";
import { createSociety, createUnit } from "@/axiosApi/ApiHelper";

export const useAddSociety = (handleClose) => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    societyName: "",
    societyAddress: "",
    country: "",
    state: "",
    city: "",
    zipCode: "",
    societyType: "",
    florNumber: "",
    wingCount: "",
    unitNumber: "",
    selectSeries: "",
  });

  // Compute if the form is valid
  const isFormValid = Object.entries(formData).every(([key, value]) => {
    if (key === "florNumber" && formData.societyType === "tenement") {
      return true;
    }
    return value !== "";
  });
  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);
    if (!isFormValid) {
      toast.error("All fields are required!");
      return;
    }
    try {
      let data = {
        societyName:formData.societyName,
        societyAddress:formData.societyAddress,
        country:formData.country,
        state:formData.state,
        city:formData.city,
        zipCode:formData.zipCode,
        societyType:formData.societyType,
        wingCount:Number(formData.wingCount),
      }
      let result = await createSociety(data);
      data = {
        societyId: result?.data?._id,
        unitCount: Number(formData.unitNumber),
        series: formData.selectSeries,
        floor: Number(formData.florNumber) || 0
      }
      await createUnit(data)
      toast.success("Society created successfully!");
      setFormData({
        societyName: "",
        societyAddress: "",
        country: "",
        state: "",
        city: "",
        zipCode: "",
        societyType: "",
        florNumber: "",
        wingCount: "",
        unitNumber: "",
        selectSeries: "",
      });
      handleClose?.();
    } finally {
      setIsLoading(false);
    }
  };

  return { handleChange, handleSubmit, formData, isFormValid, isLoading };
};
