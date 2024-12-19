import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { AuthLayouts } from "@/Layouts/";
import { useAuth } from "@/hooks/useAuth";

const Login = () => {
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
        window.location.href = "/";
      } else if (role === "patient") {
        window.location.href = "/patient";
      } else if (role === "doctor") {
        toast.success("doctor login successfully");
        window.location.href = "/doctor";
      }
    } else if (role === "receptionist") {
      toast.success("reception login successfully");
      window.location.href = "/reception";
    }
  };

  return (
    <AuthLayouts>
      <div className="mb-6 text-center">
        <p className="text-2xl font-semibold text-left">Login</p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-1 relative">
          <label className="block text-[#030229] absolute top-[-0.65rem] left-4 bg-white z-10">
            Email or Phone <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="identifier"
            value={formData.identifier}
            onChange={handleChange}
            placeholder="Enter Email or Phone (e.g., +917621478456)"
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-400"
          />
        </div>
        <div className="space-y-1 relative">
          <label className="block text-[#030229] absolute top-[-0.65rem] left-4 bg-white z-10">
            Password <span className="text-red-500">*</span>
          </label>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter Password"
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-400"
          />
          <div
            onClick={() => setShowPassword(!showPassword)}
            className="absolute top-5 right-4 transform -translate-y-1/2 cursor-pointer"
          >
            {showPassword ? <FaEye size={20} /> : <FaEyeSlash size={20} />}
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input
              type="checkbox"
              name="remember"
              checked={formData.remember === "true"}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  remember: e.target.checked ? "true" : "false",
                })
              }
              className="text-blue-500 rounded focus:ring-0"
            />
            <p className="pl-2 text-gray-600">Remember me</p>
          </div>
          <div
            className="text-blue-500 cursor-pointer"
            onClick={() => navigate("/AdminMobile")}
          >
            Forgot password?
          </div>
        </div>
        <button
          type="submit"
          className="w-full p-3 bg-gray-100 text-gray-700 rounded-md hover:bg-blue-500 hover:text-white transition-all"
        >
          Login
        </button>
        <div
          className="text-center cursor-pointer text-blue-500"
          onClick={() => navigate("/patientRegistration")}
        >
          <span className="text-black">Don’t have an account?</span> Register
        </div>
        <div
          className="text-center cursor-pointer text-blue-500"
          onClick={() => navigate("/adminRegistration")}
        >
          Don’t have an account? Register
        </div>
      </form>
    </AuthLayouts>
  );
};

export default Login;
