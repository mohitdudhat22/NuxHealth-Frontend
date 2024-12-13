// Loading.js
import React from "react";
import "./Loading.css"; // Ensure you have this CSS file

const Loading = () => {
  return (
    <div
      className="overlay"
      style={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      }}
    >
      <div className="loader">
        <div className="dot-loading dot1">
          <i></i>
        </div>
        <div className="dot-loading dot2">
          <i></i>
        </div>
        <div className="dot-loading dot3">
          <i></i>
        </div>
        <div className="dot-loading dot4">
          <i></i>
        </div>
        <div className="dot-loading dot5">
          <i></i>
        </div>
        <div className="dot-loading dot6">
          <i></i>
        </div>
        <div className="dot-loading dot7">
          <i></i>
        </div>
        <div className="dot-loading dot8">
          <i></i>
        </div>
        <div className="dot-loading dot9">
          <i></i>
        </div>
      </div>
    </div>
  );
};

export default Loading;
