import { useState } from "react";
import { editDoctorProfileChangePassword } from "@/axiosApi/ApiHelper";
import toast from "react-hot-toast";

export const useChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const isFormValid = newPassword.trim() !== "" && confirmPassword.trim() !== "" && newPassword === confirmPassword;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "currentPassword") {
      setCurrentPassword(value);
    } else if (name === "newPassword") {
      setNewPassword(value);
    } else if (name === "confirmPassword") {
      setConfirmPassword(value);
    }
  };

  const handleSubmit = async () => {
    if (!isFormValid) {
      toast.error("Please make sure the passwords match and are not empty.");
      return;
    }

    try {
      setLoading(true);
      const response = await editDoctorProfileChangePassword({
        currentPassword,
        newPassword,
        confirmPassword,
      });

      if (response && response.message) {
        toast.success(response.message || "Password changed successfully!");
      } else {
        toast.error(response.data?.message || "Failed to change password.");
      }
    } finally {
      setLoading(false);
    }
  };

  return {
    currentPassword,
    newPassword,
    confirmPassword,
    loading,
    handleInputChange,
    handleSubmit,
    isFormValid,
  };
};