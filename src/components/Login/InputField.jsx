import React from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const InputField = ({
  label,
  type,
  register,
  errors,
  name,
  placeholder,
  showPassword,
  setShowPassword,
}) => (
  <div className="input-box">
    <div className="label">
      {label} <span>*</span>
    </div>
    <div className="password-input-container">
      <input
        type={type === "password" && showPassword ? "text" : type}
        placeholder={placeholder}
        {...register(name, { required: `${label} is required` })}
      />
      {type === "password" && (
        <div className="eye" onClick={() => setShowPassword(!showPassword)}>
          {showPassword ? <FaEye size={20} /> : <FaEyeSlash size={20} />}
        </div>
      )}
    </div>
    {errors[name] && <p className="error-message">{errors[name].message}</p>}
  </div>
);

export default InputField;
