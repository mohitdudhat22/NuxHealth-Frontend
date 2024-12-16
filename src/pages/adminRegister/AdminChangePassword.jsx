import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-hot-toast";
import apiService from "../../services/api.js";
import ImageSlider from "../../components/Login/ImageSlider.jsx";

export default function AdminChangePassword() {
  const location = useLocation();
  const navigate = useNavigate();
  const { identifier } = location.state || {};

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    if (!newPassword || !confirmPassword) {
      toast.error("Both password and confirm password are required");
      setError("Both fields are required.");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      setError("Passwords do not match.");
      return;
    }

    try {
      const response = await apiService.ResetPassword({
        identifier,
        password: newPassword,
        confirmPassword: confirmPassword,
      });
      toast.success("Password reset successfully");
      setSuccessMessage(response.data.message);

      navigate("/login");
    } catch (error) {
      if (error.response && error.response.data) {
        toast.error(error.response.data.message);
        setError(error.response.data.message);
      } else {
        toast.error("Something went wrong. Please try again.");
        setError("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <div>
      <div className="changePassword-section">
        <div className="row">
          <div className="main flex h-screen">
            <div className="form w-full md:w-1/2 bg-white flex justify-center items-center py-6 md:py-[30px]">
              <div className="p-6 md:p-10 border border-gray-200 shadow-md rounded-xl w-11/12 md:w-[80%]">
                <div className="head pb-4">
                  <p className="text-2xl md:text-3xl font-semibold">
                    Reset Password
                  </p>
                </div>

                {successMessage && (
                  <div className="success-message text-green-500 text-sm md:text-base">
                    {successMessage}
                  </div>
                )}

                {error && (
                  <div className="error-message text-red-500 text-sm md:text-base">
                    {error}
                  </div>
                )}

                <div className="changePassword-form-box pt-2">
                  <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                    <div className="input-box relative py-2 md:py-4 w-full">
                      <div className="label absolute top-1 left-3 bg-white text-sm md:text-base">
                        New Password <span>*</span>
                      </div>
                      <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter New Password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="w-full p-2 md:p-3 border border-gray-300 rounded-lg focus:border-blue-400 placeholder-gray-400 text-sm md:text-base"
                      />
                      <div
                        className="eye absolute top-6 md:top-7 right-4 cursor-pointer"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <FaEye /> : <FaEyeSlash />}
                      </div>
                    </div>

                    <div className="input-box relative py-2 md:py-4 w-full">
                      <div className="label absolute top-1 left-3 bg-white text-sm md:text-base">
                        Confirm Password <span>*</span>
                      </div>
                      <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full p-2 md:p-3 border border-gray-300 rounded-lg focus:border-blue-400 placeholder-gray-400 text-sm md:text-base"
                      />
                      <div
                        className="eye absolute top-6 md:top-7 right-4 cursor-pointer"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <FaEye /> : <FaEyeSlash />}
                      </div>
                    </div>

                    <div className="condition w-full pt-5">
                      <div className="otp py-2 md:py-4">
                        <button
                          type="submit"
                          className="w-full bg-gray-100 text-gray-700 p-2 md:p-3 rounded-lg text-base md:text-xl transition hover:bg-blue-500 hover:text-white"
                        >
                          Reset Password
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>

            <div className="img-box w-full md:w-1/2 md:p-[6.4%] p-0 relative bg-gray-100">
              <ImageSlider
                images={["/img/register.png", "/img/register2.png"]}
              />

              <div className="vector-1 absolute right-0 bottom-0 w-1/6 md:w-1/3">
                <img src="/img/Vector-1.png" className="w-full" />
              </div>

              <div className="vector-2 absolute left-0 top-0 w-1/6 md:w-1/3">
                <img src="/img/Vector-2.png" className="w-full" />
              </div>

              <div className="vector-dot absolute right-0 top-0 w-1/10 md:w-1/6">
                <img src="/img/Vector-dot.png" className="w-full" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
