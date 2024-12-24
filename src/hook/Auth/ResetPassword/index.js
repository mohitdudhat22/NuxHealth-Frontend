import { useState, useEffect } from "react";
import { resetPassword } from "@/axiosApi/ApiHelper";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const useResetPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const storedEmail = localStorage.getItem("hms_email");
    if (storedEmail) {
      setEmail(storedEmail);
    }
  }, []);

  const isFormValid = email.trim() !== "" && newPassword.trim() !== "" && newPassword === confirmPassword;

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
      toast.error("Email, passwords must match and cannot be empty.");
      return;
    }

    try {
      setLoading(true);
      const Data = {
        "email": email,
        "password": newPassword,
        "confirmPassword": confirmPassword
      };
      const response = await resetPassword(Data);
      localStorage.removeItem("hms_email");
      console.log(response?.status === 1)
      if (response?.status === 1) {
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