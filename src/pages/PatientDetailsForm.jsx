import React, { useState } from "react";
import { FaEdit } from "react-icons/fa";
import { FaCircleMinus, FaImage } from "react-icons/fa6";
import DynamicField from "./DynamicField"; // Ensure this is imported

const PatientDetailsForm = ({
  openModal,
  patientData,
  setPatientData,
  dynamicFields,
  onDynamicFieldChange,
  onRemoveDynamicField,
}) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPatientData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSelectChange = (e) => {
    const { name, value } = e.target;
    setPatientData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  return (
    <div className="patient-details">
      <div className="content">
        <div className="head flex">
          <p>Patient</p>
          <button className="flex" onClick={openModal}>
            <FaEdit />
            <span>Add New Field</span>
          </button>
        </div>

        <div className="details flex">
          <div className="form-box">
            <form className="flex">
              <div className="input-box">
                <div className="label">Name</div>
                <input
                  type="text"
                  name="name"
                  placeholder="Enter Name"
                  value={patientData.name}
                  onChange={handleInputChange}
                  required
                />
                <div className="minus-circle">
                  <FaCircleMinus />
                </div>
              </div>

              <div className="input-box">
                <div className="label">Disease Name</div>
                <input
                  type="text"
                  name="diseaseName"
                  placeholder="Enter Disease Name"
                  value={patientData.diseaseName}
                  onChange={handleInputChange}
                />
                <div className="minus-circle">
                  <FaCircleMinus />
                </div>
              </div>

              <div className="input-box">
                <div className="label">Doctor Name</div>
                <input
                  type="text"
                  name="doctorName"
                  placeholder="Enter Doctor Name"
                  value={patientData.doctorName}
                  onChange={handleInputChange}
                />
                <div className="minus-circle">
                  <FaCircleMinus />
                </div>
              </div>

              <div className="input-box">
                <div className="label">Description</div>
                <input
                  type="text"
                  name="description"
                  placeholder="Enter Description"
                  value={patientData.description}
                  onChange={handleInputChange}
                />
                <div className="minus-circle">
                  <FaCircleMinus />
                </div>
              </div>

              <div className="input-box">
                <div className="label">Discount (%)</div>
                <input
                  type="number"
                  name="discount"
                  placeholder="0"
                  value={patientData.discount}
                  onChange={handleInputChange}
                />
                <div className="minus-circle">
                  <FaCircleMinus />
                </div>
              </div>

              <div className="input-box">
                <div className="label">Tax</div>
                <input
                  type="number"
                  name="tax"
                  placeholder="0"
                  value={patientData.tax}
                  onChange={handleInputChange}
                />
                <div className="minus-circle">
                  <FaCircleMinus />
                </div>
              </div>

              <div className="input-box">
                <div className="label">Amount</div>
                <input
                  type="number"
                  name="amount"
                  placeholder="0"
                  value={patientData.amount}
                  onChange={handleInputChange}
                />
                <div className="minus-circle">
                  <FaCircleMinus />
                </div>
              </div>

              <div className="input-box">
                <div className="label">Total Amount</div>
                <input
                  type="number"
                  name="totalAmount"
                  placeholder="0"
                  value={patientData.totalAmount}
                  onChange={handleInputChange}
                />
                <div className="minus-circle">
                  <FaCircleMinus />
                </div>
              </div>

              <div className="input-box">
                <div className="label">Payment Type</div>
                <select
                  name="paymentType"
                  value={patientData.paymentType}
                  onChange={handleSelectChange}
                >
                  <option value="">Select Payment Type</option>
                  <option value="cash">Cash</option>
                  <option value="card">Card</option>
                  <option value="insurance">Insurance</option>
                </select>
                <div className="minus-circle">
                  <FaCircleMinus />
                </div>
              </div>

              <div className="input-box">
                <div className="label">Age</div>
                <input
                  type="number"
                  name="age"
                  placeholder="Enter Age"
                  value={patientData.age}
                  onChange={handleInputChange}
                />
                <div className="minus-circle">
                  <FaCircleMinus />
                </div>
              </div>

              <div className="input-box">
                <div className="label">Gender</div>
                <select
                  name="gender"
                  value={patientData.gender}
                  onChange={handleSelectChange}
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
                <div className="minus-circle">
                  <FaCircleMinus />
                </div>
              </div>

              <div className="input-box">
                <div className="label">Address</div>
                <input
                  type="text"
                  name="address"
                  placeholder="Enter Address"
                  value={patientData.address}
                  onChange={handleInputChange}
                />
                <div className="minus-circle">
                  <FaCircleMinus />
                </div>
              </div>
              {dynamicFields.map((field, index) => (
                <DynamicField
                  key={index}
                  field={field}
                  value={patientData[field.name] || ""}
                  onChange={onDynamicFieldChange}
                  onRemove={() => onRemoveDynamicField(index)}
                />
              ))}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientDetailsForm;
