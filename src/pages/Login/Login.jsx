import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { FaEye, FaEyeSlash } from "react-icons/fa";
import "../pages.css";

import { useAuth } from "../../hooks/useAuth";
import toast from "react-hot-toast";
import ImageSlider from "../../components/Login/ImageSlider";

const Login = () => {
  const navigate = useNavigate();
  const { UniversalLogin, user } = useAuth();
  const [formData, setFormData] = useState({
    identifier: "",
    password: "",
    remember: "",
  });
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // useEffect(() => {
  //   const slider = document.querySelector(".slider");
  //   const images = slider.querySelectorAll("img");
  //   const dots = slider.querySelectorAll(".dot");
  //   let currentIndex = 0;
  //   images[currentIndex].style.display = "block";
  //   dots.forEach((dot, index) => {
  //     dot.addEventListener("click", () => {
  //       currentIndex = index;
  //       updateSlider();
  //     });
  //   });
  //   function updateSlider() {
  //     images.forEach((image) => {
  //       image.style.display = "none";
  //     });
  //     images[currentIndex].style.display = "block";
  //     dots.forEach((dot, index) => {
  //       dot.classNameList.toggle("active", index === currentIndex);
  //     });
  //   }
  // }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
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
      }
    } catch (err) {
      console.error(err);
      toast.error("Login failed. Please check your credentials.");
      setError("Login failed. Please check your credentials.");
    }
  };

  return (
    <>
      {/* <div classNameName="login-section">
        <div classNameName="row">
          <div classNameName="main flex">
            <div classNameName="form ">
              <div classNameName="content">
                <div classNameName="head">
                  <p>Login</p>
                </div>
                {error && <p classNameName="error-message">{error}</p>}
                <div classNameName="form-box">
                  <form onSubmit={handleSubmit} classNameName="flex">
                    <div classNameName="input-box">
                      <div classNameName="label">
                        Email or Phone <span>*</span>
                      </div>
                      <input
                        type="text"
                        name="identifier"
                        value={formData.identifier}
                        onChange={handleChange}
                        placeholder="Enter Email or Phone Number"
                      />
                    </div>

                    <div classNameName="input-box">
                      <div classNameName="label">
                        Password <span>*</span>
                      </div>
                      <div classNameName="password-input-container">
                        <input
                          type={showPassword ? "text" : "password"}
                          name="password"
                          value={formData.password}
                          onChange={handleChange}
                          placeholder="Enter Password"
                        />
                        <div
                          classNameName="eye"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <FaEye size={20} />
                          ) : (
                            <FaEyeSlash size={20} />
                          )}
                        </div>
                      </div>
                    </div>

                    <div classNameName="condition">
                      <div classNameName="remember-forgot flex">
                        <div classNameName="remember flex">
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
                          />
                          <p>Remember me</p>
                        </div>
                        <div
                          classNameName="forgot"
                          onClick={() => navigate("/AdminMobile")}
                        >
                          <span
                            style={{
                              cursor: "pointer",
                            }}
                          >
                            Forgot password?
                          </span>
                        </div>
                      </div>

                      <div classNameName="login-btn">
                        <button type="submit">Login</button>
                      </div>
                      <div
                        classNameName="registration-btn"
                        onClick={() => navigate("/patientRegistration")}
                      >
                        <p style={{ cursor: "pointer" }}>
                          Don’t have an account? Register (patient)
                        </p>
                      </div>
                      <div
                        classNameName="registration-btn"
                        onClick={() => navigate("/adminRegistration")}
                      >
                        <p style={{ cursor: "pointer" }}>Don’t have an account? Register</p>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
         
            <div classNameName="img-box w-full md:w-1/2 w-1/2 md:p-32 p-0 relative bg-gray-100">
              <ImageSlider
                images={["/img/register.png", "/img/register2.png"]}
              />

              <div classNameName="vector-1 absolute right-0 bottom-0 sm:w-1/3 w-[10%]">
                <img src="/img/Vector-1.png" className="w-full" />
              </div>

              <div classNameName="vector-2 absolute left-0 top-0 sm:w-1/3 w-[10%]">
                <img src="/img/Vector-2.png" className="w-full" />
              </div>

              <div classNameName="vector-dot absolute right-0 top-0 sm:w-1/10 w-[10%]">
                <img src="/img/Vector-dot.png" className="w-full" />
              </div>
            </div>
          </div>
        </div>
      </div> */}
      <div className="login-section h-screen flex">
        <div className="w-full flex flex-col md:flex-row">
          {/* Login Form Section */}
          <div className="w-full md:w-1/2 bg-white flex justify-center items-center p-0 md:p-0">
            <div className="w-full md:max-w-xl p-6 border shadow-md rounded-lg">
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
                    {showPassword ? (
                      <FaEye size={20} />
                    ) : (
                      <FaEyeSlash size={20} />
                    )}
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
                  <span className="text-black">Don’t have an account?</span>{" "}
                  Register
                </div>
                <div
                  className="text-center cursor-pointer text-blue-500"
                  onClick={() => navigate("/adminRegistration")}
                >
                  Don’t have an account? Register
                </div>
              </form>
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
    </>
  );
};

export default Login;
