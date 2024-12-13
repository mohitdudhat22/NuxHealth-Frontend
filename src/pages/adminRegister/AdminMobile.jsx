/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import apiService from "../../services/api.js";
import { toast } from "react-hot-toast";
import "../pages.css";
import ImageSlider from "../../components/Login/ImageSlider.jsx";

const AdminMobile = () => {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  const isLoginMode = location.pathname === "/login";

  // Validation for Identifier (Email or Phone)
  const validateIdentifier = (identifier) => {
    if (!identifier) {
      return "Please enter an email or phone number with country code";
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phonePattern = /^\+\d{10,15}$/; // Matches + followed by 10 to 15 digits
    if (!emailPattern.test(identifier) && !phonePattern.test(identifier)) {
      return "Please enter a valid email or phone number (e.g., +917621478456)";
    }
    return "";
  };

  // Validation for Password
  const validatePassword = (password) => {
    if (!password) {
      return "Please enter a password";
    }
    if (password.length < 6) {
      return "Password must be at least 6 characters long";
    }
    return "";
  };

  // Handle Submit (Forgot Password)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    const identifierError = validateIdentifier(identifier);
    if (identifierError) {
      toast.error(identifierError);
      setError(identifierError);
      return;
    }

    try {
      const response = await apiService.ForgetPassword({ identifier });
      toast.success(response.data.message);
      setSuccessMessage(response.data.message);

      navigate("/verifyOtp", { state: { identifier } });
    } catch (error) {
      if (error.response && error.response.data) {
        toast.error(error.response.data.message);
        setError(error.response.data.message);
      } else {
        setError("Something went wrong. Please try again.");
        toast.error("Something went wrong. Please try again.");
      }
    }
  };

  // Handle Login
  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    const identifierError = validateIdentifier(identifier);
    const passwordError = validatePassword(password);

    if (identifierError || passwordError) {
      toast.error(identifierError || passwordError);
      setError(identifierError || passwordError);
      return;
    }

    try {
      const response = await apiService.UniversalLogin({
        identifier,
        password,
      });
      toast.success(response.data.message);
      setSuccessMessage(response.data.message);
      navigate("/dashboard"); // After successful login
    } catch (error) {
      if (error.response && error.response.data) {
        toast.error(error.response.data.message);
        setError(error.response.data.message);
      } else {
        setError("Something went wrong. Please try again.");
        toast.error("Something went wrong. Please try again.");
      }
    }
  };

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
    }
  }, [successMessage]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  return (
    <div className="admin-mobile-section h-screen flex items-center justify-center bg-gray-100">
      <div className="row flex w-full h-full">
        <div className="main flex w-full">
          <div className="form flex items-center justify-center w-1/2 bg-white p-10">
            <div className="admin-mobile-content p-10 border border-gray-200 shadow-lg rounded-lg">
              <div className="head pb-4">
                <p className="text-2xl font-semibold">
                  {isLoginMode ? "Login" : "Forgot Password"}
                </p>
              </div>

              <div className="note pb-4">
                <p className="text-gray-600 text-lg font-medium">
                  {isLoginMode
                    ? "Enter your credentials to log in."
                    : "Enter your email or phone and we’ll send you an OTP to reset your password."}
                </p>
              </div>

              <div className="admin-mobile-form-box pt-2">
                <form
                  className="flex flex-col space-y-6"
                  onSubmit={isLoginMode ? handleLogin : handleSubmit}
                >
                  <div className="input-box relative">
                    <label className="absolute top-0 left-4 bg-white text-sm px-1">
                      Email or Phone <span>*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Enter Email or Phone (e.g., +917621478456)"
                      value={identifier}
                      onChange={(e) => setIdentifier(e.target.value)}
                      required
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                    />
                  </div>

                  {isLoginMode && (
                    <div className="input-box relative">
                      <label className="absolute top-0 left-4 bg-white text-sm px-1">
                        Password <span>*</span>
                      </label>
                      <input
                        type="password"
                        placeholder="Enter Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                      />
                    </div>
                  )}

                  <div className="condition pt-4">
                    <div className="otp py-4">
                      <button
                        type="submit"
                        className="w-full p-3 text-lg text-gray-600 bg-gray-100 rounded-lg transition duration-300 hover:bg-blue-400 hover:text-white"
                      >
                        {isLoginMode ? "Login" : "Get OTP"}
                      </button>
                    </div>

                    <div className="login-btn text-center">
                      <p className="text-blue-500 font-light text-base">
                        <span
                          onClick={() => {
                            navigate(
                              isLoginMode ? "/forgot-password" : "/login",
                            );
                          }}
                          className="cursor-pointer"
                        >
                          {isLoginMode ? "Forgot Password?" : "Back To Login"}
                        </span>
                      </p>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>

          {/* Image Section */}
          <div className="w-full md:w-1/2 bg-gray-100 relative p-2 md:p-16">
            <ImageSlider images={["/img/register.png", "/img/register2.png"]} />

            {/* Decorative Vectors */}
            <div className="absolute right-0 bottom-0 w-1/4 sm:w-1/6 md:w-1/5 lg:w-1/4">
              <img src="/img/Vector-1.png" className="w-full" />
            </div>
            <div className="absolute left-0 top-0 w-1/4 sm:w-1/6 md:w-1/5 lg:w-1/4">
              <img src="/img/Vector-2.png" className="w-full" />
            </div>
            <div className="absolute right-0 top-0 w-1/6 sm:w-1/8 md:w-1/10 lg:w-1/12">
              <img src="/img/Vector-dot.png" className="w-full" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminMobile;
