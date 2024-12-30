import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import toast from "react-hot-toast";
import { login } from "@/axiosApi/ApiHelper";

export const useLogin = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState("dhairydobaryia@gmail.com");
  const [password, setPassword] = useState("123456");
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await login({ email, password });
      toast.success(response.message);
      const token = response.data;

      if (rememberMe) {
        localStorage.setItem(import.meta.env.VITE_TOKEN_NAME, token);
      } else {
        localStorage.setItem(import.meta.env.VITE_TOKEN_NAME, token);
      }

      const role = response.role;

      // Navigate based on user role
      if (role === "admin") {
        navigate("/admin");
      } else if (role === "doctor") {
        navigate("/doctor");
      } else if (role === "patient") {
        navigate("/patient");
      } else if (role === "receptionist") {
        navigate("/reception");
      } else {
        toast.error("Unauthorized role. Please contact support.");
        navigate("/login");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    rememberMe,
    setRememberMe,
    isLoading,
    location,
    handleSubmit,
  };
};
