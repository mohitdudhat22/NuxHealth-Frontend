import React from 'react'
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth.jsx";
import { Country, City, State } from "country-state-city";
import {
  bloodGroups,
  genders,
  PatientFormData,
  PatientRegistrationFormFields,
} from "../constant.js";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import ImageSlider from "../../components/Login/ImageSlider.jsx";

export const ReceptionPatientRegistration = () => {
  const navigate = useNavigate();
  const { PatientRegister } = useAuth();
  const [error, setError] = useState("");
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState(PatientFormData);

  useEffect(() => {
    setCountries(Country.getAllCountries());
  }, []);

  // useEffect(() => {
  //   const slider = document.querySelector(".slider");
  //   const images = slider.querySelectorAll("img");
  //   const dots = slider.querySelectorAll(".dot");
  //   let currentIndex = 0;
  //   images[currentIndex].style.display = "block";
  //   dots.forEach((dot, index) => {
  //     dot.addEventListener("click", () => {
  //       currentIndex = index;
  //       updateSlider();
  //     });
  //   });
  //   function updateSlider() {
  //     images.forEach((image) => (image.style.display = "none"));
  //     images[currentIndex].style.display = "block";
  //     dots.forEach((dot, index) =>
  //       dot.classList.toggle("active", index === currentIndex)
  //     );
  //   }
  // }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));

    if (name === "country") {
      const selectedCountry = countries.find(
        (country) => country.isoCode === value,
      );
      setStates(State.getStatesOfCountry(selectedCountry.isoCode));
      setFormData((prevState) => ({ ...prevState, state: "", city: "" }));
      setCities([]);
    } else if (name === "state") {
      const selectedState = states.find((state) => state.isoCode === value);
      setCities(City.getCitiesOfState(formData.country, selectedState.isoCode));
      setFormData((prevState) => ({ ...prevState, city: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    await PatientRegister(formData);
  };

  return (
    <div className="patient-registration-section flex flex-col md:flex-row">
      {/* Main registration form */}
      <div className="main w-full md:w-1/2 flex justify-center items-center">
        <div className="w-[90%] md:w-[70%] p-5 shadow-md rounded-lg mx-4 md:mx-10">
          <div className="head pb-5">
            <p className="text-2xl font-semibold">Registration</p>
          </div>
          <div className="form-box">
            {error && <div className="text-red-500 mb-4">{error}</div>}
            <form onSubmit={handleSubmit} className="flex flex-wrap">
              {PatientRegistrationFormFields.map((input) => (
                <div
                  className="input-box w-full md:w-1/2 px-4 mb-6 relative"
                  key={input.name}
                >
                  <label className="block text-sm text-[#030229] font-medium absolute top-[-0.6rem] left-[2rem] bg-white z-10">
                    {input.label} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type={input.type}
                    name={input.name}
                    value={formData[input.name]}
                    onChange={handleChange}
                    placeholder={`Enter ${input.label}`}
                    required
                    className="border border-gray-300 px-4 py-2 rounded-md w-full"
                  />
                </div>
              ))}

              {/* Height, Weight, DOB fields */}
              <div className="grid grid-cols-1 md:grid-cols-3 w-full gap-4 px-4 mb-6">
                <div className="input-box relative">
                  <label className="block text-sm text-[#030229] font-medium absolute top-[-0.6rem] left-4 bg-white z-10">
                    Height(cm) <span className="text-red-500">*</span>
                  </label>
                  <input
                    name="height"
                    value={formData.height}
                    type="number"
                    onChange={handleChange}
                    placeholder="Enter Height"
                    className="w-full border border-gray-300 py-2 px-4 rounded-md"
                  />
                </div>
                <div className="input-box relative">
                  <label className="block text-sm text-[#030229] font-medium absolute top-[-0.6rem] left-4 bg-white z-10">
                    Weight(kg) <span className="text-red-500">*</span>
                  </label>
                  <input
                    name="weight"
                    value={formData.weight}
                    type="number"
                    onChange={handleChange}
                    placeholder="Enter Weight"
                    className="w-full border border-gray-300 py-2 px-4 rounded-md"
                  />
                </div>
                <div className="input-box relative">
                  <label className="block text-sm text-[#030229] font-medium absolute top-[-0.6rem] left-4 bg-white z-10">
                    Date of Birth <span className="text-red-500">*</span>
                  </label>
                  <input
                    name="dob"
                    value={formData.dob}
                    type="date"
                    onChange={handleChange}
                    className="w-full border  border-gray-300 py-2 px-4 rounded-md"
                  />
                </div>
              </div>

              {/* Age, Gender, Blood Group fields */}
              <div className="grid grid-cols-1 md:grid-cols-3 w-full gap-4 px-4 mb-6">
                <div className="input-box relative">
                  <label className="block text-sm text-[#030229] font-medium absolute top-[-0.6rem] left-4 bg-white z-10">
                    Age <span className="text-red-500">*</span>
                  </label>
                  <input
                    name="age"
                    value={formData.age}
                    onChange={handleChange}
                    placeholder="Enter Age"
                    className="w-full border  border-gray-300 py-2 px-4 rounded-md"
                  />
                </div>
                <div className="input-box relative">
                  <label className="block text-sm text-[#030229] font-medium absolute top-[-0.6rem] left-4 bg-white z-10">
                    Blood Group <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="bloodGroup"
                    value={formData.bloodGroup}
                    onChange={handleChange}
                    required
                    className="w-full border  border-gray-300 py-2 px-4 rounded-md"
                  >
                    <option value="" className="text-gray-500">
                      {" "}
                      Select Blood Group
                    </option>
                    {bloodGroups.map((group) => (
                      <option key={group} value={group}>
                        {group}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="input-box relative">
                  <label className="block text-sm text-[#030229] font-medium absolute top-[-0.6rem] left-4 bg-white z-10">
                    Gender <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    required
                    className="w-full border  border-gray-300 py-2 px-4 rounded-md"
                  >
                    <option value="">Select Gender</option>
                    {genders.map((gender) => (
                      <option key={gender} value={gender}>
                        {gender}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Country, State, City fields */}
              <div className="grid grid-cols-1 md:grid-cols-3 w-full gap-4 px-4 mb-6">
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
                  <div className="input-box relative" key={select.name}>
                    <label className="block text-sm text-[#030229] font-medium absolute top-[-0.6rem] left-4 bg-white z-10">
                      {select.label} <span className="text-red-500">*</span>
                    </label>
                    <select
                      name={select.name}
                      value={formData[select.name]}
                      onChange={handleChange}
                      required
                      disabled={select.isDisabled}
                      className="w-full border border-gray-300 py-2 px-4 rounded-md"
                    >
                      <option value="">{`Select ${select.label}`}</option>
                      {select.options.map((option) => (
                        <option
                          key={option.isoCode || option.name}
                          value={option.isoCode || option.name}
                        >
                          {option.name}
                        </option>
                      ))}
                    </select>
                  </div>
                ))}
              </div>

              {/* Address Field */}
              <div className="input-box w-full px-4 mb-6 relative">
                <label className="block text-sm text-[#030229] font-medium absolute top-[-0.6rem] left-[2rem] bg-white z-10">
                  Address <span className="text-red-500">*</span>
                </label>
                <input
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Enter Address"
                  className="w-full border border-gray-300 py-2 px-4 rounded-md"
                />
              </div>

              {/* Password Fields */}
              {[
                { label: "Password", name: "password" },
                { label: "Confirm Password", name: "confirmPassword" },
              ].map((field) => (
                <div
                  className="input-box w-full px-4 mb-6 relative"
                  key={field.name}
                >
                  <label className="block text-sm text-[#030229] font-medium absolute top-[-0.6rem] left-[2rem] bg-white z-10">
                    {field.label} <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      name={field.name}
                      value={formData[field.name]}
                      onChange={handleChange}
                      placeholder={`Enter ${field.label}`}
                      required
                      className="w-full border border-gray-300 py-2 px-4 rounded-md"
                    />
                    <div
                      className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <FaEye size={20} />
                      ) : (
                        <FaEyeSlash size={20} />
                      )}
                    </div>
                  </div>
                </div>
              ))}

              {/* Terms & Conditions */}
              <div className="w-full px-4 mb-4">
                <div className="flex items-center">
                  <input type="checkbox" required className="mr-2" />
                  <p className="text-gray-700">
                    I agree to all the
                    <span className="text-blue-500">T&C</span> and
                    <span className="text-blue-500"> Privacy Policies.</span>
                  </p>
                </div>
              </div>

              {/* Submit Button */}
              <div className="w-full px-4 mt-4">
                <button
                  type="submit"
                  className="w-full py-2 px-4 bg-blue-500 text-white rounded-md"
                >
                  Register
                </button>
              </div>

              {/* Login Link */}
              <div className="w-full px-4 mt-4 text-center">
                <p>
                  Already have an account?{" "}
                  <span
                    onClick={() => navigate("/login")}
                    className="text-blue-500 cursor-pointer"
                  >
                    Login
                  </span>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div> 
    </div>
  );
}
