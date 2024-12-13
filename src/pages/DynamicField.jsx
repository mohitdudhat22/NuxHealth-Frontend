import React from "react";
import { FaCircleMinus } from "react-icons/fa6";

const DynamicField = ({ field, value, onChange, onRemove }) => {
  switch (field.fieldType) {
    case "Dropdown":
      return (
        <div className="input-box">
          <div className="label">{field.name}</div>
          <select
            value={value}
            onChange={(e) => onChange(field.name, e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          >
            <option value="">Select an option</option>
            {field.options.map((option, optIndex) => (
              <option key={optIndex} value={option}>
                {option}
              </option>
            ))}
          </select>
          <div className="minus-circle">
            <FaCircleMinus onClick={onRemove} />
          </div>
        </div>
      );
    case "Text Field":
      return (
        <div className="input-box">
          <div className="label">{field.name}</div>
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(field.name, e.target.value)}
            placeholder={`Enter ${field.name}`}
            className="w-full p-2 border border-gray-300 rounded"
          />
          <div className="minus-circle">
            <FaCircleMinus onClick={onRemove} />
          </div>
        </div>
      );
    default:
      return null;
  }
};

export default DynamicField;
