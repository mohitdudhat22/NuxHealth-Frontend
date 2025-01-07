import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { forgotPassword } from "@/axiosApi/ApiHelper";
import toast from "react-hot-toast";

export const useForgetPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const isFormValid = email.trim() !== "";

  const handleInputChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async () => {
    if (!isFormValid) {
      toast.error("Please enter a valid email or phone number.");
      return;
    }

    try {
      setLoading(true);
      if (email) {
        localStorage.setItem("hms_email", email)
      }
      const response = await forgotPassword({ email: email });

      if (response && response.message) {
        toast.success(response.data?.message || "OTP sent successfully!");
        navigate("/otp");
      } else {
        toast.error(response.data?.message || "Failed to send OTP.");
      }
    } finally {
      setLoading(false);
    }
  };

  return { loading, handleInputChange, handleSubmit, email, isFormValid };
};