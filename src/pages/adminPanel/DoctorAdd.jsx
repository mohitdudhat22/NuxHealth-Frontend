import { useEffect, useState } from "react";
import { FaCircleMinus, FaImage } from "react-icons/fa6";
import apiService from "../../services/api.js";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useGlobal } from "../../hooks/useGlobal.jsx";
import { countryCodes, DoctorFormData, timeOptions } from "./constants.js";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Country, State, City } from "country-state-city"; // Import country-state-city

const DoctorAdd = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { getAllHospitals, allHospitals } = useGlobal();

  const [signaturePreview, setSignaturePreview] = useState(null);
  const [profilePicturePreview, setProfilePicturePreview] = useState(null);
  const [formData, setFormData] = useState(DoctorFormData);

  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [isoCodes, setIsoCodes] = useState([]);

  useEffect(() => {
    getAllHospitals();
    setCountries(Country.getAllCountries()); // Fetch countries
  }, []);
  useEffect(() => {
    if (formData.hospital && allHospitals.length) {
      const selectedHospital = allHospitals.find(
        (hospital) => hospital._id === formData.hospital,
      );
      setFormData((prevData) => ({
        ...prevData,
        hospitalName: selectedHospital?.name || prevData.hospitalName,
        hospitalAddress: selectedHospital?.address || prevData.hospitalAddress,
        hospitalWebsite:
          selectedHospital?.worksiteLink || prevData.hospitalWebsite,
      }));
    }
  }, [formData.hospital, allHospitals]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    if (name === "country") {
      const selectedCountry = countries.find(
        (country) => country.isoCode === value,
      );
      setIsoCodes(selectedCountry.phonecode); // Set isoCode for use in the next step
      setFormData((prevData) => ({
        ...prevData,
        state: "",
        city: "",
        countryCode: `+${selectedCountry.phonecode}`,
      })); // Set formatted country code
      setStates(State.getStatesOfCountry(selectedCountry.isoCode)); // Fetch states based on selected country
      setCities([]); // Clear cities
    } else if (name === "state") {
      const selectedState = states.find((state) => state.isoCode === value);
      setCities(City.getCitiesOfState(formData.country, selectedState.isoCode)); // Fetch cities based on selected state
      setFormData((prevData) => ({ ...prevData, city: "" })); // Reset city
    } else if (name === "hospital") {
      const selectedHospital = allHospitals.find(
        (hospital) => hospital._id === value,
      );
      setFormData({
        ...formData,
        hospital: value,
        hospitalName: selectedHospital ? selectedHospital.name : "",
        hospitalAddress: selectedHospital ? selectedHospital.address : "",
        hospitalWebsite: selectedHospital ? selectedHospital.website : "",
        emergencyContactNo: selectedHospital
          ? selectedHospital.emergencyContactNo
          : "",
      });
    }
  };

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];

    if (file && (file.type === "image/png" || file.type === "image/jpeg")) {
      setFormData((prevData) => ({
        ...prevData,
        profilePicture: file,
      }));

      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicturePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      toast.error(
        "Please upload a valid PNG or JPEG file for the profile picture.",
      );
    }
  };

  const handleSignatureChange = (e) => {
    const file = e.target.files[0];
    const input = e.target;

    if (file) {
      if (file.type !== "image/png" && file.type !== "image/jpeg") {
        toast.error(
          "Please upload a valid PNG or JPEG file for the signature.",
        );
        input.value = ""; // Reset input
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        // 5MB
        toast.error("File size must be less than 5MB.");
        input.value = ""; // Reset input
        return;
      }

      setFormData((prevData) => ({
        ...prevData,
        signature: file,
      }));

      const reader = new FileReader();
      reader.onloadend = () => {
        setSignaturePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      toast.warning("No file selected. Please upload a signature.");
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if passwords match
    if (formData.password !== formData.confirmPassword) {
      toast.error("Password and Confirm Password do not match.");
      return;
    }

    // Fetch the country, state, and city names based on the selected ISO codes
    const countryObj = Country.getAllCountries().find(
      (country) => country.isoCode === formData.country,
    );
    const countryName = countryObj?.name;

    const stateObj = State.getStatesOfCountry(formData.country).find(
      (state) => state.isoCode === formData.state,
    );
    const stateName = stateObj?.name;

    const cityObj = City.getCitiesOfState(
      formData.country,
      formData.state,
    ).find((city) => city.name === formData.city);
    const cityName = cityObj?.name;

    if (!countryName || !stateName || !cityName) {
      toast.error("Please select a valid country, state, and city.");
      return;
    }

    // Construct the full phone number
    const fullPhoneNumber = formData.countryCode + formData.phone;

    // Prepare data to submit
    const dataToSubmit = new FormData();
    Object.keys(formData).forEach((key) => {
      if (key === "signature" || key === "profilePicture") {
        if (formData[key]) {
          dataToSubmit.append(key, formData[key]);
        }
      } else {
        dataToSubmit.append(key, formData[key]);
      }
    });

    // Set additional data
    dataToSubmit.set("countryCode", formData.countryCode);
    dataToSubmit.set("phone", fullPhoneNumber);
    dataToSubmit.set("country", countryName);
    dataToSubmit.set("state", stateName);
    dataToSubmit.set("city", cityName);

    // Submit the form data
    try {
      const response = await apiService.CreateDoctor(dataToSubmit);
      if (response) {
        navigate("/doctorManagement");
        toast.success("Doctor added successfully.");
      }
    } catch (error) {
      console.error("Error adding doctor:", error);
      toast.error("Failed to add doctor. Please try again later.");
    }
  };

  return (
    <div>
      <div className="p-5 bg-[#F6F8FB]">
        <div className="row">
          <div className="p-5 bg-white rounded-[15px]">
            <form onSubmit={handleSubmit}>
              <div className="p-5 border-2 border-[#F4F4F4] rounded-[15px] my-4">
                <div className="content">
                  <div className="mb-4">
                    <p className="text-2xl font-bold text-[#030229]">
                      Add New Doctor
                    </p>
                  </div>

                  <div className="flex justify-between">
                    <div className="w-[19%] flex flex-col items-start gap-8">
                      <div className="mx-auto mt-8 text-center">
                        <div
                          className="w-[186px] h-[186px] border-3 border-[#D9D9D9] rounded-full cursor-pointer"
                          onClick={() =>
                            document
                              .getElementById("profilePictureUpload")
                              .click()
                          }
                        >
                          {profilePicturePreview ? (
                            <img
                              src={profilePicturePreview}
                              alt="Profile Preview"
                              className="w-full h-full rounded-full"
                            />
                          ) : (
                            <img
                              src="../img/doctorAdd.png"
                              alt=""
                              className="w-full h-full rounded-full"
                            />
                          )}
                        </div>
                        <input
                          type="file"
                          accept="image/png, image/jpeg"
                          onChange={handleProfilePictureChange}
                          className="hidden"
                          id="profilePictureUpload"
                          name="profilePicture"
                        />
                        <p
                          className="text-[#5678E9] text-lg font-semibold mt-2 cursor-pointer"
                          onClick={() =>
                            document
                              .getElementById("profilePictureUpload")
                              .click()
                          }
                        >
                          Choose Photo
                        </p>
                      </div>

                      <div className="w-full">
                        <div className="mb-4">
                          <p className="text-black font-semibold">Signature</p>
                        </div>
                        <div className="border-2 border-dotted border-[#D3D3D3] rounded-md p-5 text-center">
                          <FaImage />
                          <input
                            type="file"
                            accept="image/png, image/jpeg"
                            onChange={handleSignatureChange}
                            className="hidden"
                            id="signatureUpload"
                            name="signature"
                          />
                          <label
                            htmlFor="signatureUpload"
                            className="text-[#5678E9] text-sm font-bold cursor-pointer block my-2.5"
                          >
                            Upload a file
                          </label>
                          <h5 className="text-[#A7A7A7] text-xs font-medium">
                            PNG or JPEG Up To 5MB
                          </h5>
                          {signaturePreview && (
                            <img
                              src={signaturePreview}
                              alt="Signature Preview"
                              className="w-full mt-2.5"
                            />
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="w-[79%]">
                      <div className="form-box">
                        <div className="flex flex-wrap gap-3.5">
                          <div className="relative w-[32%] pt-4">
                            <div className="absolute top-1 left-3.5 bg-white z-10 text-[16px] font-medium">
                              Doctor Name
                            </div>
                            <input
                              type="text"
                              name="name"
                              placeholder="Enter Doctor Name"
                              maxLength={50}
                              value={formData.doctorName}
                              onChange={handleChange}
                              className="w-full p-3 border border-[#d9d9d9] rounded-[10px] focus:border-[#718ebf] placeholder-[#a7a7a7]"
                            />
                          </div>

                          <div className="relative w-[32%] pt-4">
                            <div className="absolute top-1 left-3.5 bg-white z-10 text-[16px] font-medium">
                              Doctor Qualification
                            </div>
                            <input
                              type="text"
                              name="qualification"
                              placeholder="Enter Doctor Qualification"
                              maxLength={30}
                              value={formData.qualification}
                              onChange={handleChange}
                              className="w-full p-3 border border-[#d9d9d9] rounded-[10px] focus:border-[#718ebf] placeholder-[#a7a7a7]"
                            />
                          </div>

                          <div className="relative w-[32%] pt-4">
                            <div className="absolute top-1 left-3.5 bg-white z-10 text-[16px] font-medium">
                              Gender
                            </div>
                            <select
                              name="gender"
                              value={formData.gender}
                              onChange={handleChange}
                              className="w-full p-3 border border-[#d9d9d9] rounded-[10px] focus:border-[#718ebf] placeholder-[#a7a7a7]"
                            >
                              <option>Select Gender</option>
                              <option value="Male">Male</option>
                              <option value="Female">Female</option>
                              <option value="Other">Other</option>
                            </select>
                          </div>

                          <div className="relative w-[32%] pt-4">
                            <div className="absolute top-1 left-3.5 bg-white z-10 text-[16px] font-medium">
                              Specialty Type
                            </div>
                            <input
                              type="text"
                              name="speciality"
                              placeholder="Enter Specialty Type"
                              maxLength={30}
                              value={formData.speciality}
                              onChange={handleChange}
                              className="w-full p-3 border border-[#d9d9d9] rounded-[10px] focus:border-[#718ebf] placeholder-[#a7a7a7]"
                            />
                          </div>

                          <div className="relative w-[32%] pt-4">
                            <div className="absolute top-1 left-3.5 bg-white z-10 text-[16px] font-medium">
                              Working Time
                            </div>
                            <div className="time-range">
                              <select
                                name="workingTime"
                                value={formData.workingTime}
                                onChange={handleChange}
                                className="w-full p-3 border border-[#d9d9d9] rounded-[10px] focus:border-[#718ebf] placeholder-[#a7a7a7]"
                              >
                                <option value="">Start Time</option>
                                {timeOptions?.map((time, index) => (
                                  <option key={index} value={time}>
                                    {time}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </div>

                          <div className="relative w-[32%] pt-4">
                            <div className="absolute top-1 left-3.5 bg-white z-10 text-[16px] font-medium">
                              Work On
                            </div>
                            <select
                              name="workingOn"
                              value={formData.workingOn}
                              onChange={handleChange}
                              className="w-full p-3 border border-[#d9d9d9] rounded-[10px] focus:border-[#718ebf] placeholder-[#a7a7a7]"
                            >
                              <option value="">Select Work Type</option>
                              <option value="Part-time">Part-time</option>
                              <option value="Full-time">Full-time</option>
                              <option value="Contract">Contract</option>
                            </select>
                          </div>

                          <div className="relative w-[32%] pt-4">
                            <div className="absolute top-1 left-3.5 bg-white z-10 text-[16px] font-medium">
                              Check Up Time
                            </div>
                            <div className="time-range">
                              <select
                                name="patientCheckupTime"
                                value={formData.patientCheckupTime}
                                onChange={handleChange}
                                className="w-full p-3 border border-[#d9d9d9] rounded-[10px] focus:border-[#718ebf] placeholder-[#a7a7a7]"
                              >
                                <option value="">Start Time</option>
                                {timeOptions.map((time, index) => (
                                  <option key={index} value={time}>
                                    {time}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </div>

                          <div className="relative w-[32%] pt-4 text-[16px] font-medium">
                            <div className="absolute top-1 left-3.5 bg-white z-10">
                              Break Time
                            </div>
                            <div className="time-range">
                              <select
                                name="breakTime"
                                value={formData.breakTime}
                                onChange={handleChange}
                                className="w-full p-3 border border-[#d9d9d9] rounded-[10px] focus:border-[#718ebf] placeholder-[#a7a7a7]"
                              >
                                <option value="">Start Time</option>
                                {timeOptions.map((time, index) => (
                                  <option key={index} value={time}>
                                    {time}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </div>

                          <div className="relative w-[32%] pt-4">
                            <div className="absolute top-1 left-3.5 bg-white z-10 text-[16px] font-medium">
                              Experience
                            </div>
                            <input
                              type="number"
                              name="experience"
                              placeholder="Enter Experience in Years"
                              maxLength={10}
                              value={formData.experience}
                              onChange={handleChange}
                              className="w-full p-3 border border-[#d9d9d9] rounded-[10px] focus:border-[#718ebf] placeholder-[#a7a7a7]"
                            />
                          </div>

                          <div className="relative w-[32%] pt-4">
                            <div className="absolute top-1 left-3.5 bg-white z-10 text-[16px] font-medium">
                              Phone Number
                            </div>
                            <input
                              type="text"
                              name="phone"
                              placeholder="Enter Phone Number"
                              maxLength={15}
                              value={formData.phoneNumber}
                              onChange={handleChange}
                              className="w-full p-3 border border-[#d9d9d9] rounded-[10px] focus:border-[#718ebf] placeholder-[#a7a7a7]"
                            />
                          </div>

                          <div className="relative w-[32%] pt-4">
                            <div className="absolute top-1 left-3.5 bg-white z-10 text-[16px] font-medium">
                              Country Code
                            </div>
                            <input
                              type="text"
                              name="countryCode"
                              value={isoCodes}
                              disabled
                              className="w-full p-3 border border-[#d9d9d9] rounded-[10px] focus:border-[#718ebf] placeholder-[#a7a7a7]"
                            />
                          </div>

                          <div className="relative w-[32%] pt-4">
                            <div className="absolute top-1 left-3.5 bg-white z-10 text-[16px] font-medium">
                              Age
                            </div>
                            <input
                              type="number"
                              name="age"
                              placeholder="Enter Age"
                              maxLength={3}
                              value={formData.age}
                              onChange={handleChange}
                              className="w-full p-3 border border-[#d9d9d9] rounded-[10px] focus:border-[#718ebf] placeholder-[#a7a7a7]"
                            />
                          </div>

                          <div className="relative w-[32%] pt-4">
                            <div className="absolute top-1 left-3.5 bg-white z-10 text-[16px] font-medium">
                              Email
                            </div>
                            <input
                              type="email"
                              name="email"
                              placeholder="Enter Email"
                              maxLength={100}
                              value={formData.email}
                              onChange={handleChange}
                              className="w-full p-3 border border-[#d9d9d9] rounded-[10px] focus:border-[#718ebf] placeholder-[#a7a7a7]"
                            />
                          </div>

                          <div className="relative w-[32%] pt-4">
                            <div className="absolute top-1 left-3.5 bg-white z-10 text-[16px] font-medium">
                              Country
                            </div>
                            <select
                              name="country"
                              onChange={handleChange}
                              className="w-full p-3 border border-[#d9d9d9] rounded-[10px] focus:border-[#718ebf] placeholder-[#a7a7a7]"
                            >
                              <option value="">Select Country</option>
                              {countries.map((country) => (
                                <option
                                  key={country.isoCode}
                                  value={country.isoCode}
                                >
                                  {country.name}
                                </option>
                              ))}
                            </select>
                          </div>

                          <div className="relative w-[32%] pt-4">
                            <div className="absolute top-1 left-3.5 bg-white z-10 text-[16px] font-medium">
                              State
                            </div>
                            <select
                              name="state"
                              value={formData.state}
                              onChange={handleChange}
                              disabled={!formData.country}
                              className="w-full p-3 border border-[#d9d9d9] rounded-[10px] focus:border-[#718ebf] placeholder-[#a7a7a7]"
                            >
                              <option value="">Select State</option>
                              {states.map((state) => (
                                <option
                                  key={state.isoCode}
                                  value={state.isoCode}
                                >
                                  {state.name}
                                </option>
                              ))}
                            </select>
                          </div>

                          <div className="relative w-[32%] pt-4">
                            <div className="absolute top-1 left-3.5 bg-white z-10 text-[16px] font-medium">
                              City
                            </div>
                            <select
                              name="city"
                              value={formData.city}
                              onChange={handleChange}
                              disabled={!formData.state}
                              className="w-full p-3 border border-[#d9d9d9] rounded-[10px] focus:border-[#718ebf] placeholder-[#a7a7a7]"
                            >
                              <option value="">Select City</option>
                              {cities.map((city) => (
                                <option key={city.id} value={city.name}>
                                  {city.name}
                                </option>
                              ))}
                            </select>
                          </div>

                          <div className="relative w-[32%] pt-4">
                            <div className="absolute top-1 left-3.5 bg-white z-10 text-[16px] font-medium">
                              Zip Code
                            </div>
                            <input
                              type="text"
                              name="zipCode"
                              placeholder="Enter Zip Code"
                              maxLength={10}
                              value={formData.zipCode}
                              onChange={handleChange}
                              className="w-full p-3 border border-[#d9d9d9] rounded-[10px] focus:border-[#718ebf] placeholder-[#a7a7a7]"
                            />
                          </div>

                          <div className="relative w-[32%] pt-4">
                            <div className="absolute top-1 left-3.5 bg-white z-10 text-[16px] font-medium">
                              Address
                            </div>
                            <input
                              type="text"
                              name="doctorAddress"
                              placeholder="Enter Address"
                              maxLength={200}
                              value={formData.address}
                              onChange={handleChange}
                              className="w-full p-3 border border-[#d9d9d9] rounded-[10px] focus:border-[#718ebf] placeholder-[#a7a7a7]"
                            />
                          </div>

                          <div className="relative w-[32%] pt-4">
                            <div className="absolute top-1 left-3.5 bg-white z-10 text-[16px] font-medium">
                              Description
                            </div>
                            <input
                              name="description"
                              placeholder="Enter Description"
                              maxLength={500}
                              value={formData.description}
                              onChange={handleChange}
                              className="w-full p-3 border border-[#d9d9d9] rounded-[10px] focus:border-[#718ebf] placeholder-[#a7a7a7]"
                            />
                          </div>

                          <div className="relative w-[32%] pt-4">
                            <div className="absolute top-1 left-3.5 bg-white z-10 text-[16px] font-medium">
                              Password <span>*</span>
                            </div>
                            <div className="password-input-container">
                              <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Enter Password"
                                className="w-full p-3 border border-[#d9d9d9] rounded-[10px] focus:border-[#718ebf] placeholder-[#a7a7a7]"
                              />
                              <div
                                onClick={() => setShowPassword(!showPassword)}
                                className=" eye absolute top-[30px] right-3.5 cursor-pointer"
                              >
                                {showPassword ? (
                                  <FaEye size={20} />
                                ) : (
                                  <FaEyeSlash size={20} />
                                )}
                              </div>
                            </div>
                          </div>

                          <div className="relative w-[32%] pt-4">
                            <div className="absolute top-1 left-3.5 bg-white z-10 text-[16px] font-medium">
                              Confirm Password <span>*</span>
                            </div>
                            <input
                              type={showPassword ? "text" : "password"}
                              name="confirmPassword"
                              value={formData.confirmPassword}
                              onChange={handleChange}
                              placeholder="Confirm Password"
                              required
                              className="w-full p-3 border border-[#d9d9d9] rounded-[10px] focus:border-[#718ebf] placeholder-[#a7a7a7]"
                            />
                            <div
                              onClick={() => setShowPassword(!showPassword)}
                              className="eye absolute top-[30px] right-3.5 cursor-pointer"
                            >
                              {showPassword ? (
                                <FaEye size={20} />
                              ) : (
                                <FaEyeSlash size={20} />
                              )}
                            </div>
                          </div>

                          <div className="relative w-[32%] pt-4">
                            <div className="absolute top-1 left-3.5 bg-white z-10 text-[16px] font-medium">
                              Online Consultation Rate
                            </div>
                            <input
                              type="number"
                              name="onlineConsultationRate"
                              placeholder="Enter Rate"
                              maxLength={10}
                              value={formData.onlineConsultationRate}
                              onChange={handleChange}
                              className="w-full p-3 border border-[#d9d9d9] rounded-[10px] focus:border-[#718ebf] placeholder-[#a7a7a7]"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-5 border-2 border-[#F4F4F4] rounded-[15px] my-4">
                <div className="content">
                  <div className="flex justify-between gap-y-8">
                    <div className="w-[32%]">
                      <div className="input-box relative">
                        <div className="label absolute top-[-14px] left-3.5 bg-white z-10 text-[16px] font-medium">
                          Current Hospital
                        </div>
                        <input
                          type="text"
                          name="currentHospital"
                          placeholder="Enter Current Hospital"
                          maxLength={30}
                          value={
                            (formData.hospital &&
                              allHospitals.find(
                                (hospital) =>
                                  hospital._id ===
                                  formData.hospital.toString().name,
                              )) ||
                            formData.currentHospital
                          }
                          onChange={handleChange}
                          className="w-full p-3 border border-[#d9d9d9] rounded-[10px] focus:border-[#718ebf] placeholder-[#a7a7a7]"
                        />
                      </div>
                    </div>

                    <div className="w-[32%]">
                      <div className="input-box relative">
                        <div className="label absolute top-[-14px] left-3.5 bg-white z-10 text-[16px] font-medium">
                          Hospital Name
                        </div>
                        <input
                          type="text"
                          name="hospitalName"
                          placeholder="Enter Hospital Name"
                          maxLength={100}
                          value={
                            allHospitals?.find(
                              (item) => item._id === formData.hospital,
                            )?.name || formData.hospitalName
                          }
                          onChange={handleChange}
                          disabled={true}
                          className="w-full p-3 border border-[#d9d9d9] rounded-[10px] focus:border-[#718ebf] placeholder-[#a7a7a7]"
                        />
                      </div>
                    </div>

                    <div className="w-[32%]">
                      <div className="input-box relative">
                        <div className="label absolute top-[-14px] left-3.5 bg-white z-10 text-[16px] font-medium">
                          Hospital
                        </div>
                        <select
                          name="hospital"
                          value={formData.hospital}
                          onChange={handleChange}
                          className="w-full p-3 border border-[#d9d9d9] rounded-[10px] focus:border-[#718ebf] placeholder-[#a7a7a7]"
                        >
                          <option value="">Select Hospital</option>
                          {allHospitals.map((hospital) => (
                            <option key={hospital._id} value={hospital._id}>
                              {hospital.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="w-[32%]">
                      <div className="input-box relative">
                        <div className="label absolute top-[-14px] left-3.5 bg-white z-10 text-[16px] font-medium">
                          Hospital Address
                        </div>
                        <input
                          type="text"
                          name="hospitalAddress"
                          placeholder="Enter Hospital Address"
                          maxLength={200}
                          value={
                            allHospitals?.find(
                              (item) => item._id === formData.hospital,
                            )?.address || formData.hospitalAddress
                          }
                          onChange={handleChange}
                          disabled={true}
                          className="w-full p-3 border border-[#d9d9d9] rounded-[10px] focus:border-[#718ebf] placeholder-[#a7a7a7]"
                        />
                      </div>
                    </div>

                    <div className="w-[32%]">
                      <div className="input-box relative">
                        <div className="label absolute top-[-14px] left-3.5 bg-white z-10 text-[16px] font-medium">
                          Hospital Website
                        </div>
                        <input
                          type="url"
                          name="worksiteLink"
                          placeholder="Enter Hospital Website"
                          maxLength={100}
                          value={formData.hospitalWebsite}
                          onChange={handleChange}
                          disabled={false}
                          className="w-full p-3 border border-[#d9d9d9] rounded-[10px] focus:border-[#718ebf] placeholder-[#a7a7a7]"
                        />
                      </div>
                    </div>

                    <div className="w-[32%]">
                      <div className="input-box relative">
                        <div className="label absolute top-[-14px] left-3.5 bg-white z-10 text-[16px] font-medium">
                          Emergency Contact
                        </div>
                        <input
                          type="tel"
                          name="emergencyContactNo"
                          placeholder="Enter Emergency Contact"
                          maxLength={15}
                          value={formData.emergencyContactNo}
                          onChange={handleChange}
                          className="w-full p-3 border border-[#d9d9d9] rounded-[10px] focus:border-[#718ebf] placeholder-[#a7a7a7]"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-[#F6F8FB] px-10 py-2.5 text-[#4F4F4F] text-xl font-semibold rounded-[10px] hover:bg-[#0EABEB] hover:text-white"
                >
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorAdd;
