import { IoTimeOutline } from "react-icons/io5";
import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import "../pages.css";
import apiService from "../../services/api.js";
import ImageSlider from "../../components/Login/ImageSlider.jsx";

export default function AdminOtp() {
  const location = useLocation();
  const navigate = useNavigate();
  const { identifier } = location.state || {};
  const inputRefs = useRef([]);
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [isResendDisabled, setIsResendDisabled] = useState(true);
  const [timer, setTimer] = useState(60); // 1 minute = 60 seconds

  // Check if identifier is valid
  useEffect(() => {
    if (!identifier) {
      toast.error("Invalid request. Please try again.");
      navigate("/someFallbackRoute"); // Navigate to a fallback route
    }
  }, [identifier, navigate]);

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
  //       dot.classList.toggle("active", index === currentIndex);
  //     });
  //   }
  // }, []);

  // Countdown Timer for Resend OTP
  useEffect(() => {
    const interval = setInterval(() => {
      if (timer > 0) {
        setTimer((prevTimer) => prevTimer - 1);
      } else {
        setIsResendDisabled(false);
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`;
  };

  const handleInputChange = (index, event) => {
    const { value } = event.target;

    if (!/^\d*$/.test(value)) {
      event.target.value = "";
      return;
    }

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value.length === 1 && index < inputRefs.current.length - 1) {
      const nextInput = inputRefs.current[index + 1];
      if (nextInput) {
        nextInput.focus();
      }
    }
  };

  const handleKeyDown = (index, event) => {
    if (event.key === "Backspace" && index > 0 && event.target.value === "") {
      const prevInput = inputRefs.current[index - 1];
      if (prevInput) {
        prevInput.focus();
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const enteredOtp = otp.join("");

    if (enteredOtp.length !== 6) {
      toast.error("Please enter a valid 6-digit OTP.");
      return;
    }

    try {
      const response = await apiService.VerifyOtp({
        identifier,
        otp: enteredOtp,
      });

      toast.success(response.data.message);
      navigate("/resetPassword", { state: { identifier } });
    } catch (error) {
      if (error.response && error.response.data) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    }
  };

  const handleResendOtp = async () => {
    setIsResendDisabled(true);
    setTimer(60);

    try {
      const response = await apiService.ForgetPassword({ identifier });
      toast.success(response.data.message);
    } catch (error) {
      if (error.response && error.response.data) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    }
  };

  return (
    // <div>
    //   <div className="admin-otp-section">
    //     <div className="row">
    //       <div className="main flex h-screen">
    //         <div className="form p-[120px_100px] w-1/2 bg-white flex justify-center items-center">
    //           <div className="admin-otp-content p-[40px] border border-[#f4f4f4] shadow-[0_2px_2px_0_#f4f4f4,0_0px_10px_0_#f4f4f4] rounded-xl">
    //             <div className="head pb-[15px]">
    //               <p className="text-[34px] font-semibold">Enter OTP</p>
    //             </div>
    //             <div className="note">
    //               <p className="text-[#4f4f4f] text-[16px] font-medium">
    //                 Please enter the 6-digit code that was sent to your phone
    //                 number.
    //               </p>
    //             </div>
    //             <div className="admin-otp-form-box pt-[10px]">
    //               <form className="flex justify-between" onSubmit={handleSubmit}>
    //                 {[...Array(6)].map((_, index) => (
    //                   <div
    //                     className="input-box relative py-[15px] w-[15%]"
    //                     key={index}
    //                   >
    //                     <input
    //                       type="text"
    //                       maxLength="1"
    //                       pattern="\d*"
    //                       inputMode="numeric"
    //                       ref={(el) => (inputRefs.current[index] = el)}
    //                       onChange={(e) => handleInputChange(index, e)}
    //                       onKeyDown={(e) => handleKeyDown(index, e)}
    //                       className="p-[12px_14px] border border-[#d9d9d9] rounded-[10px] text-center focus:border-[#718ebf]"
    //                       style={{ MozAppearance: "textfield" }}
    //                     />
    //                   </div>
    //                 ))}

    //                 <div className="condition w-full pt-[20px]">
    //                   <div className="resend-otp flex justify-between items-center">
    //                     <div className="sec">
    //                       <p className="flex items-center">
    //                         <IoTimeOutline />
    //                         <span className="px-[5px]">
    //                           {formatTime(timer)}
    //                         </span>{" "}
    //                         sec
    //                       </p>
    //                     </div>
    //                     <div className="r-otp">
    //                       <button
    //                         type="button"
    //                         onClick={handleResendOtp}
    //                         disabled={isResendDisabled}
    //                         className="text-[#5678e9]"
    //                       >
    //                         Resend OTP
    //                       </button>
    //                     </div>
    //                   </div>

    //                   <div className="verify pt-[15px]">
    //                     <button
    //                       type="submit"
    //                       className="w-full bg-[#f6f8fb] text-[#4f4f4f] p-[12px_14px] rounded-[10px] text-[20px] transition-all duration-500 hover:bg-[#0eabeb] hover:text-white"
    //                     >
    //                       Verify
    //                     </button>
    //                   </div>
    //                 </div>
    //               </form>
    //             </div>
    //           </div>
    //         </div>

    //         <div className="w-full md:w-1/2 bg-gray-100 relative p-2 md:p-16">
    //           <ImageSlider
    //             images={["/img/register.png", "/img/register2.png"]}
    //           />

    //           <div className="absolute right-0 bottom-0 w-1/4 sm:w-1/6 md:w-1/5 lg:w-1/4">
    //             <img src="/img/Vector-1.png" className="w-full" />
    //           </div>
    //           <div className="absolute left-0 top-0 w-1/4 sm:w-1/6 md:w-1/5 lg:w-1/4">
    //             <img src="/img/Vector-2.png" className="w-full" />
    //           </div>
    //           <div className="absolute right-0 top-0 w-1/6 sm:w-1/8 md:w-1/10 lg:w-1/12">
    //             <img src="/img/Vector-dot.png" className="w-full" />
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>
    <div>
      <div className="admin-otp-section">
        <div className="row">
          <div className="flex min-h-screen">
            {/* <!-- Form Section --> */}
            <div className="form p-6 md:p-16 w-full md:w-1/2 bg-white flex justify-center items-center">
              <div className="admin-otp-content p-10 border border-gray-200 shadow-md rounded-xl">
                <div className="head pb-4">
                  <p className="text-2xl font-semibold">Enter OTP</p>
                </div>

                <div className="note">
                  <p className="text-gray-600 text-base font-medium">
                    Please enter the 6-digit code that was sent to your phone
                    number.
                  </p>
                </div>

                <div className="admin-otp-form-box pt-2">
                  <form className="flex space-x-2" onSubmit={handleSubmit}>
                    {[...Array(6)].map((_, index) => (
                      <div
                        className="input-box relative py-4 w-[14%]"
                        key={index}
                      >
                        <input
                          type="text"
                          maxLength="1"
                          pattern="\d*"
                          inputMode="numeric"
                          ref={(el) => (inputRefs.current[index] = el)}
                          onChange={(e) => handleInputChange(index, e)}
                          onKeyDown={(e) => handleKeyDown(index, e)}
                          className="w-full p-3 border border-gray-300 rounded-xl text-center focus:border-blue-400"
                        />
                      </div>
                    ))}

                    <div className="condition w-full pt-5">
                      <div className="resend-otp flex justify-between items-center">
                        <div className="sec flex items-center">
                          <IoTimeOutline />
                          <span className="px-2">
                            {formatTime(timer)}
                          </span> sec
                        </div>
                        <div className="r-otp">
                          <button
                            type="button"
                            onClick={handleResendOtp}
                            disabled={isResendDisabled}
                            className="text-blue-600"
                          >
                            Resend OTP
                          </button>
                        </div>
                      </div>

                      <div className="verify pt-4">
                        <button
                          type="submit"
                          className="w-full bg-gray-100 text-gray-600 py-3 px-4 rounded-xl text-xl hover:bg-blue-500 hover:text-white transition"
                        >
                          Verify
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>

            {/* <!-- Image Section --> */}
            <div className="w-full md:w-1/2 bg-gray-100 relative p-4 md:p-16">
              <ImageSlider
                images={["/img/register.png", "/img/register2.png"]}
              />

              {/* <!-- Decorative Vectors --> */}
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
    </div>
  );
}
