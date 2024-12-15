import React, { useState } from "react";
import { FaCircleMinus, FaImage } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";
import DynamicField from "./DynamicField";

const HospitalDetailsForm = ({
  formData,
  handleInputChange,
  handleFileChange,
  handleSubmit,
  hospitalDynamicFields,
  handleDynamicFieldChange,
  removeDynamicField,
  openModal,
}) => {
  const [formErrors, setFormErrors] = useState({}); // Added state for form errors

  const validateForm = () => {
    const errors = {};

    // Required fields validation
    if (!formData.hospitalName)
      errors.hospitalName = "Hospital name is required.";
    if (!formData.email) errors.email = "Email is required.";
    if (!formData.billDate) errors.billDate = "Bill date is required.";
    if (!formData.billTime) errors.billTime = "Bill time is required.";
    if (!formData.billNumber) errors.billNumber = "Bill number is required.";
    if (!formData.phoneNumber) errors.phoneNumber = "Phone number is required.";
    if (!formData.hospitalAddress)
      errors.hospitalAddress = "Address is required.";

    // Email format validation
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Please enter a valid email address.";
    }

    // Phone number format validation (basic check for numbers)
    if (formData.phoneNumber && !/^\d{10}$/.test(formData.phoneNumber)) {
      errors.phoneNumber = "Phone number should be 10 digits.";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0; // Returns true if there are no errors
  };

  return (
    <div className="hospital-details">
      <div className="content">
        <div className="head flex">
          <p>Hospital Details</p>
          <button className="flex" onClick={openModal}>
            <FaEdit />
            <span>Add New Field</span>
          </button>
        </div>

        <div className="details flex">
          <div className="left">
            <div className="upload-logo">
              <label htmlFor="logo-upload">
                <FaImage />
                <p>
                  <span>Upload a file</span> or drag and drop
                </p>
                <h5>PNG, JPG, GIF up to 10MB</h5>
              </label>
              <input
                type="file"
                id="logo-upload"
                onChange={handleFileChange}
                style={{ display: "none" }}
              />
            </div>
          </div>

          <div className="right">
            <div className="form-box">
              <form className="flex" onSubmit={handleSubmit}>
                <div className="input-box">
                  <div className="label">Name</div>
                  <input
                    type="text"
                    name="hospitalName"
                    value={formData.hospitalName}
                    onChange={handleInputChange}
                    placeholder="Enter Name"
                  />
                  {formErrors?.hospitalName && (
                    <p className="text-red-500 text-xs">
                      {formErrors.hospitalName}
                    </p>
                  )}
                  <div className="minus-circle">
                    <FaCircleMinus />
                  </div>
                </div>
                <div className="input-box">
                  <div className="label">Other Text</div>
                  <input
                    type="text"
                    name="otherText"
                    value={formData.otherText}
                    onChange={handleInputChange}
                    placeholder="Enter Other Text"
                  />
                  <div className="minus-circle">
                    <FaCircleMinus />
                  </div>
                </div>
                <div className="input-box">
                  <div className="label">
                    Email <span>*</span>
                  </div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter Email"
                    required
                  />
                  {formErrors.email && (
                    <p className="text-red-500 text-xs">{formErrors.email}</p>
                  )}
                  <div className="minus-circle">
                    <FaCircleMinus />
                  </div>
                </div>
                <div className="input-box">
                  <div className="label">
                    Bill Date <span>*</span>
                  </div>
                  <input
                    type="date"
                    name="billDate"
                    value={formData.billDate}
                    onChange={handleInputChange}
                    required
                  />
                  {formErrors.billDate && (
                    <p className="text-red-500 text-xs">
                      {formErrors.billDate}
                    </p>
                  )}
                  <div className="minus-circle">
                    <FaCircleMinus />
                  </div>
                </div>
                <div className="input-box">
                  <div className="label">
                    Bill Time <span>*</span>
                  </div>
                  <input
                    type="time"
                    name="billTime"
                    value={formData.billTime}
                    onChange={handleInputChange}
                    required
                  />
                  {formErrors.billTime && (
                    <p className="text-red-500 text-xs">
                      {formErrors.billTime}
                    </p>
                  )}
                  <div className="minus-circle">
                    <FaCircleMinus />
                  </div>
                </div>
                <div className="input-box">
                  <div className="label">
                    Bill Number <span>*</span>
                  </div>
                  <input
                    type="text"
                    name="billNumber"
                    value={formData.billNumber}
                    onChange={handleInputChange}
                    placeholder="Enter Bill Number"
                    required
                  />
                  {formErrors.billNumber && (
                    <p className="text-red-500 text-xs">
                      {formErrors.billNumber}
                    </p>
                  )}
                  <div className="minus-circle">
                    <FaCircleMinus />
                  </div>
                </div>
                <div className="input-box">
                  <div className="label">
                    Phone Number <span>*</span>
                  </div>
                  <input
                    type="tel"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    placeholder="Enter Phone Number"
                    required
                  />
                  {formErrors.phoneNumber && (
                    <p className="text-red-500 text-xs">
                      {formErrors.phoneNumber}
                    </p>
                  )}
                  <div className="minus-circle">
                    <FaCircleMinus />
                  </div>
                </div>
                <div className="input-box">
                  <div className="label">
                    Address <span>*</span>
                  </div>
                  <input
                    type="text"
                    name="hospitalAddress"
                    value={formData.hospitalAddress}
                    onChange={handleInputChange}
                    placeholder="Enter Address"
                    required
                  />
                  {formErrors.hospitalAddress && (
                    <p className="text-red-500 text-xs">
                      {formErrors.hospitalAddress}
                    </p>
                  )}
                  <div className="minus-circle">
                    <FaCircleMinus />
                  </div>
                </div>
                {hospitalDynamicFields.map((field, index) => (
                  <DynamicField
                    key={index}
                    field={field}
                    value={formData[field.name] || ""}
                    onChange={(name, value) =>
                      handleDynamicFieldChange("hospital", name, value)
                    }
                    onRemove={() => removeDynamicField("hospital", index)}
                  />
                ))}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HospitalDetailsForm;
