import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const PasswordField = ({
  label,
  name,
  value,
  handleChange,
  showPassword,
  setShowPassword,
}) => (
  <div className="input-box">
    <div className="label">
      {label} <span>*</span>
    </div>
    <div className="password-input-container">
      <input
        type={showPassword ? "text" : "password"}
        name={name}
        value={value}
        onChange={handleChange}
        placeholder={`Enter ${label}`}
        required
      />
      <div className="eye" onClick={() => setShowPassword(!showPassword)}>
        {showPassword ? <FaEye size={20} /> : <FaEyeSlash size={20} />}
      </div>
    </div>
  </div>
);

const SelectInput = ({
  label,
  name,
  options,
  value,
  handleChange,
  isDisabled,
}) => (
  <div className="input-box">
    <div className="label">
      {label} <span>*</span>
    </div>
    <select
      name={name}
      value={value}
      onChange={handleChange}
      required
      disabled={isDisabled}
    >
      <option value="">Select {label}</option>
      {options.map((option) => (
        <option
          key={option.isoCode || option.name}
          value={option.isoCode || option.name}
        >
          {option.name}
        </option>
      ))}
    </select>
  </div>
);
const InputField = ({ label, name, type, value, handleChange }) => (
  <div className="input-box">
    <div className="label">
      {label} <span>*</span>
    </div>
    <input
      type={type}
      name={name}
      value={value}
      onChange={handleChange}
      placeholder={`Enter ${label}`}
      required
    />
  </div>
);
const PatientRegistrationForm = ({
  handleSubmit,
  genders,
  bloodGroups,
  countries,
  states,
  cities,
}) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    gender: "",
    bloodGroup: "",
    country: "",
    state: "",
    city: "",
    address: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <form onSubmit={(e) => handleSubmit(e, formData)} className="flex">
      {/* Input fields for text inputs */}
      {[
        { label: "First Name", name: "firstName", type: "text" },
        { label: "Last Name", name: "lastName", type: "text" },
        { label: "Email", name: "email", type: "email" },
        { label: "Phone", name: "phone", type: "text" },
      ].map((input) => (
        <InputField
          key={input.name}
          label={input.label}
          name={input.name}
          type={input.type}
          value={formData[input.name]}
          handleChange={handleChange}
        />
      ))}

      {/* Gender Select */}
      <SelectInput
        label="Gender"
        name="gender"
        options={genders}
        value={formData.gender}
        handleChange={handleChange}
      />

      {/* Blood Group Select */}
      <SelectInput
        label="Blood Group"
        name="bloodGroup"
        options={bloodGroups}
        value={formData.bloodGroup}
        handleChange={handleChange}
      />

      {/* Country, State, and City Selects */}
      {[
        {
          label: "Country",
          name: "country",
          options: countries,
          isDisabled: false,
        },
        {
          label: "State",
          name: "state",
          options: states,
          isDisabled: !formData.country,
        },
        {
          label: "City",
          name: "city",
          options: cities,
          isDisabled: !formData.state,
        },
      ].map((select) => (
        <SelectInput
          key={select.name}
          label={select.label}
          name={select.name}
          options={select.options}
          value={formData[select.name]}
          handleChange={handleChange}
          isDisabled={select.isDisabled}
        />
      ))}

      {/* Address Field */}
      <InputField
        label="Address"
        name="address"
        type="text"
        value={formData.address}
        handleChange={handleChange}
      />

      {/* Password Field */}
      <PasswordField
        label="Password"
        name="password"
        value={formData.password}
        handleChange={handleChange}
        showPassword={showPassword}
        setShowPassword={setShowPassword}
      />

      {/* Confirm Password Field */}
      <PasswordField
        label="Confirm Password"
        name="confirmPassword"
        value={formData.confirmPassword}
        handleChange={handleChange}
        showPassword={showPassword}
        setShowPassword={setShowPassword}
      />

      {/* Terms and Conditions */}
      <div className="condition">
        <div className="policies">
          <input type="checkbox" required />
          <p>
            I agree to all the <span>T&C</span> and{" "}
            <span>Privacy Policies.</span>
          </p>
        </div>

        <div className="register-btn">
          <button type="submit">Register</button>
        </div>

        <div className="login-btn">
          <p>
            Already have an account?{" "}
            <span onClick={() => navigate("/login")}>Login</span>
          </p>
        </div>
      </div>
    </form>
  );
};

export default PatientRegistrationForm;
