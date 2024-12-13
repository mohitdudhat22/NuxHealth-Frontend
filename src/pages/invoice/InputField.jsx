// components/InputField.jsx
import React from "react";
import { FaCircleMinus } from "react-icons/fa6";
import PropTypes from "prop-types";

const InputField = ({
  label = "",
  name = "",
  type = "text",
  value = "",
  onChange = () => {},
  options = [],
  placeholder = "",
  readOnly,
  disabled,
  className,
  ...props
}) => {
  if (type === "select") {
    return (
      <div className={`relative py-4 w-[24%] ${className}`}>
        <div className="absolute top-1 left-3 bg-white text-[#030229] text-[16px] font-medium">
          {label}
        </div>
        <select
          name={name}
          value={value}
          onChange={onChange}
          disabled={disabled}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
          {...props}
        >
          {options.map((option, idx) => (
            <option key={idx} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <div className="absolute top-1.5 right-[-8px] text-gray-400 text-xl">
          <FaCircleMinus />
        </div>
      </div>
    );
  }

  return (
    <div className={`relative py-4 w-[24%] ${className}`}>
      <div className="absolute top-1 left-3 bg-white text-[#030229] text-[16px] font-medium">
        {label}
      </div>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        readOnly={readOnly}
        disabled={disabled}
        className="w-full px-4 py-3 border border-gray-300 bg-white rounded-lg text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
        {...props}
      />
      <div className="absolute top-1.5 right-[-8px] text-gray-400 text-xl">
        <FaCircleMinus />
      </div>
    </div>
  );
};

// Adding PropTypes for better type checking
InputField.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  type: PropTypes.oneOf(["text", "number", "select", "date", "time"]),
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    }),
  ),
  readOnly: PropTypes.bool,
  disabled: PropTypes.bool,
  className: PropTypes.string,
};

InputField.defaultProps = {
  options: [],
  readOnly: false,
  disabled: false,
  className: "",
};

export default InputField;
