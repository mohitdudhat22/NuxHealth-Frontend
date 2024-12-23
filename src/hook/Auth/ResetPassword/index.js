import { useState } from "react";
// import { resetPassword } from "@/axiosApi/ApiHelper";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const useResetPassword = () => {
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const isFormValid = newPassword.trim() !== "" && newPassword === confirmPassword;

  const handleInputChange = (e) => {
    if (e.target.name === "newPassword") {
      setNewPassword(e.target.value);
    } else if (e.target.name === "confirmPassword") {
      setConfirmPassword(e.target.value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid) {
      toast.error("Passwords must match and cannot be empty.");
      return;
    }

    try {
      setLoading(true);

      // const response = await resetPassword({ newPassword });

      console.log(response);

      if (response && response.message) {
        toast.success(response?.message || "Password reset successfully!");
        navigate("/login");
      } else {
        toast.error(response?.message || "Failed to reset password.");
      }
    } finally {
      setLoading(false);
    }
  };

  return { loading, handleInputChange, handleSubmit, newPassword, confirmPassword, isFormValid };
};
