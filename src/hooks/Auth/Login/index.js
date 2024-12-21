import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "@/hooks/useAuth";

export const useLoginForm = () => {
  const navigate = useNavigate();
  const { UniversalLogin } = useAuth();
  const [formData, setFormData] = useState({
    identifier: "",
    password: "",
    remember: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const role = await UniversalLogin(formData);
    if (role) {
      if (role === "admin") {
        navigate("/admin");
      } else {
        navigate("/dashboard");
      }
    } else {
      toast.error("Invalid credentials");
    }
  };

  return {
    formData,
    showPassword,
    setShowPassword,
    handleChange,
    handleSubmit,
  };
};
