import React from "react";

const Button = ({ onClick, children }) => (
  <div className="login-btn">
    <button type="button" onClick={onClick}>
      {children}
    </button>
  </div>
);

export default Button;
