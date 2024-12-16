import React from "react";
import ImageSlider from "@/components/Login/ImageSlider";

export const AuthLayouts = ({ children }) => {
  return (
    <div className="login-section h-screen flex">
      <div className="w-full flex flex-col md:flex-row">
        <div className="w-full md:w-1/2 bg-white flex justify-center items-center p-0 md:p-0">
          <div className="w-full md:max-w-xl p-6 border shadow-md rounded-lg">
            {children}
          </div>
        </div>
        <div className="w-full md:w-1/2 bg-gray-100 relative p-2 md:p-16">
          <ImageSlider images={["/img/register.png", "/img/register2.png"]} />
          <div className="absolute right-0 bottom-0 w-1/4 sm:w-1/6 md:w-1/5 lg:w-1/4">
            <img src="/img/Vector-1.png" className="w-full" alt="Vector 1" />
          </div>
          <div className="absolute left-0 top-0 w-1/4 sm:w-1/6 md:w-1/5 lg:w-1/4">
            <img src="/img/Vector-2.png" className="w-full" alt="Vector 2" />
          </div>
          <div className="absolute right-0 top-0 w-1/6 sm:w-1/8 md:w-1/10 lg:w-1/12">
            <img
              src="/img/Vector-dot.png"
              className="w-full"
              alt="Vector dot"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
