const FormInput = ({
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  readOnly = false,
  name,
}) => {
  if (type === "select") {
    return (
      <div className="input-field">
        <label htmlFor={name}>{label}</label>
        <select
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          {...props}
        >
          {options.map((option, index) => (
            <option key={index} value={option.value || option}>
              {option.label || option}
            </option>
          ))}
        </select>
      </div>
    );
  }
  return (
    <div className="input-box relative py-4 w-[24%]">
      <label className="label absolute top-1 left-3 bg-white text-[#030229] text-[16px] font-medium">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full px-4 py-3 border border-gray-300 bg-white rounded-lg text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
        readOnly={readOnly}
      />
    </div>
  );
};

export default FormInput;
