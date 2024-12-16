import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {toast} from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useAuth } from "../hooks/useAuth";
import "./pages.css";
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
  useEffect(() => {
    if (!sessionStorage.getItem("hasVisitedLogin")) {
      sessionStorage.setItem("hasVisitedLogin", "true");
      alert("Welcome to the login page!");
      setTimeout(() => {
        window.location.reload();
      }, 100);
    }
  }, []);

  useEffect(() => {
    toast.success("Have you signed in")
    const slider = document.querySelector(".slider");
    const images = slider.querySelectorAll("img");
    const dots = slider.querySelectorAll(".dot");
    let currentIndex = 0;
    images[currentIndex].style.display = "block";
    dots.forEach((dot, index) => {
      dot.addEventListener("click", () => {
        currentIndex = index;
        updateSlider();
      });
    });
    function updateSlider() {
      images.forEach((image) => {
        image.style.display = "none";
      });
      images[currentIndex].style.display = "block";
      dots.forEach((dot, index) => {
        dot.classList.toggle("active", index === currentIndex);
      });
    }
  }, []);

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
      //validtae the password should have the 1 symbol and one uppercase and one lowercase lettern and one number
      if (formData.password.length < 6) {
        toast.error("Password should be atleast 6 characters long");
        return;
      }
      if (!formData.password.match(/[A-Z]/)) {
        toast.error("Password should have atleast one uppercase letter");
        return;
      }
      if (!formData.password.match(/[a-z]/)) {
        toast.error("Password should have atleast one lowercase letter");
        return;
      }
      if (!formData.password.match(/\d/)) {
        toast.error("Password should have atleast one number");
        return;
      }
      const role = await UniversalLogin(formData);
      console.log(role);
      if (role) {
        if (role === "admin") {
          toast.success("admin login successfully")
          window.location.href = "/";
        }
        else if (role === "patient") {
          toast.success("patient login successfully")
          window.location.href = "/patient";

        } else if (role === "doctor") {
          toast.success("doctor login successfully")
          console.log("navigating in doctor")
          window.location.href = "/doctor";
        }
      }
      toast.success("Login Successful");
    } catch (err) {
      toast.error("Login failed. Please check your credentials.");
      console.error(err);
      setError("Login failed. Please check your credentials.");
    }
  };

  return (
    <>
      <div className="login-section">
        <div className="row">
          <div className="main flex">
            <div className="form ">
              <div className="content">
                <div className="head">
                  <p>Login</p>
                </div>
                {error && <p className="error-message">{error}</p>}
                <div className="form-box">
                  <form onSubmit={handleSubmit} className="flex">
                    <div className="input-box">
                      <div className="label">
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

                    <div className="input-box">
                      <div className="label">
                        Password <span>*</span>
                      </div>
                      <div className="password-input-container">
                        <input
                          type={showPassword ? "text" : "password"}
                          name="password"
                          value={formData.password}
                          onChange={handleChange}

                          placeholder="Enter Password"
                        />
                        <div className="eye" onClick={() => setShowPassword(!showPassword)}>
                          {showPassword ? <FaEye size={20} /> : <FaEyeSlash size={20} />}
                        </div>
                      </div>
                    </div>

                    <div className="condition">
                      <div className="remember-forgot flex">
                        <div className="remember flex">
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
                        <div className="forgot" onClick={() => navigate("/AdminMobile")}>
                          <span
                            style={{
                              cursor: "pointer",
                            }}
                          >
                            Forgot password?
                          </span>
                        </div>
                      </div>

                      <div className="login-btn">
                        <button type="submit">Login</button>
                      </div>
                      <div
                        className="registration-btn"
                        onClick={() => navigate("/patientRegistration")}
                      >
                        <p style={{ cursor: "pointer" }}>Don’t have an account? <span> Register</span> (As Patient)</p>
                      </div>
                       <div
                        className="registration-btn"
                        onClick={() => navigate("/adminRegistration")}
                      >
                        <p style={{ cursor: "pointer" }}>Don’t have an account? Register (As Admin)</p>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div className="img-box">
              <div className="slider">
                <img src="/img/register.png" alt="Image 1" />
                <img src="/img/register2.png" alt="Image 2" />
                <div className="dots">
                  <span className="dot active"></span>
                  <span className="dot"></span>
                </div>
              </div>
              <div className="vector-1">
                <img src="/img/Vector-1.png" width="100%" />
              </div>
              <div className="vector-2">
                <img src="/img/Vector-2.png" width="100%" />
              </div>
              <div className="vector-dot">
                <img src="/img/Vector-dot.png" width="100%" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
