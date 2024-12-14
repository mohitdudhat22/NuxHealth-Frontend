import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Country, State, City } from "country-state-city";
import toast from "react-hot-toast";
import { countryCodes, timeOptions } from "@/constants/data.jsx";
const DoctorEdit = () => {
  const { doctorId } = useParams();
  const navigate = useNavigate();
  const [doctorData, setDoctorData] = useState({
    name: "",
    qualification: "",
    gender: "",
    speciality: "",
    workOnStart: "",
    workingTimeStart: "",
    checkUpTimeStart: "",
    breakTimeStart: "",
    experience: "",
    phone: "",
    countryCode: "",
    age: "",
    email: "",
    country: "",
    state: "",
    city: "",
    zipCode: "",
    doctorAddress: "",
    description: "",
    onlineConsultationRate: "",
    currentHospital: "",
    hospitalName: "",
    hospitalAddress: "",
    worksiteLink: "",
    emergencyContactNo: "",
    signature: null,
    profilePicture: null,
    password: "",
    confirmPassword: "",
    hospital: "",
  });
  const { getAllHospitals, allHospitals } = useGlobal();
  const [signatureFile, setSignatureFile] = useState(null);
  const [photoFile, setPhotoFile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [isoCodes, setIsoCodes] = useState();
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedState, setSelectedState] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const [errors, setErrors] = useState({});
  useEffect(() => {
    getAllHospitals();
    const fetchDoctor = async () => {
      try {
        if (doctorId) {
          const response = await apiService.GetDoctorById(doctorId);
          if (response.data.data) {
            const doctorInfo = response.data.data;
            setCountries(Country.getAllCountries());
            const selectedHospital = allHospitals.find(
              (hospital) => hospital.name === doctorInfo.hospitalId.name
            );
            setDoctorData((prevData) => ({
              ...prevData,
              countryCode: doctorInfo.countryCode,
            }));
            // Find the country object based on the country name
            const selectedCountry = Country.getAllCountries().find(
              (country) => country.name === doctorInfo.country
            );
            setSelectedCountry(selectedCountry);

            if (selectedCountry) {
              // Get states for the selected country
              const countryStates = State.getStatesOfCountry(
                selectedCountry.isoCode
              );
              setStates(countryStates);
              // Find the state object based on the state name
              const selectedState = countryStates.find(
                (state) => state.name === doctorInfo.state
              );

              setSelectedState(doctorInfo.state);
              if (selectedState) {
                // Get cities for the selected state
                const stateCities = City.getCitiesOfState(
                  selectedCountry.isoCode,
                  selectedState.isoCode
                );
                setCities(stateCities);
                setSelectedCity(
                  stateCities.find((city) => city.name === doctorInfo.city)
                );
              }
            }

            setDoctorData(doctorInfo);
          }
        }
      } catch (error) {
        console.error("Error fetching doctor data:", error);
        toast.error("Error fetching doctor data");
      } finally {
        setLoading(false);
      }
    };
    fetchDoctor();
  }, [doctorId]);
  const validateField = (name, value) => {
    switch (name) {
      case "name":
        if (!value) return "Doctor name is required";
        return "";
      case "qualification":
        if (!value) return "Qualification is required";
        return "";
      case "gender":
        if (!value) return "Gender is required";
        return "";
      case "speciality":
        if (!value) return "Specialty type is required";
        return "";
      case "workingTime":
        if (!value) return "Working time is required";
        return "";
      case "workingOn":
        if (!value) return "Work type is required";
        return "";
      case "patientCheckupTime":
        if (!value) return "Check-up time is required";
        return "";
      case "breakTime":
        if (!value) return "Break time is required";
        return "";
      case "experience":
        if (!value) return "Experience is required";
        if (isNaN(value) || value < 0)
          return "Experience must be a positive number";
        return "";
      case "phone":
        if (!value) return "Phone number is required";
        if (!/^\d{10}$/.test(value)) return "Phone number must be 10 digits";
        return "";
      case "age":
        if (!value) return "Age is required";
        if (value < 25 || value > 75) return "Age must be between 25 and 75";
        return "";
      case "email":
        if (!value) return "Email is required";
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
          return "Enter a valid email address";
        return "";
      case "zipCode":
        if (!value) return "Zip code is required";
        if (!/^\d{6}$/.test(value)) return "Zip code must be 6 digits";
        return "";
      case "hospitalName":
        if (!value) return "Hospital name is required";
        return "";
      default:
        return "";
    }
  };

  useEffect(() => {
    if (doctorData.country) {
      const selectedCountry = Country.getAllCountries().find(
        (country) => country.name === doctorData.country
      );
      if (selectedCountry) {
        // Get states for the selected country
        setIsoCodes(selectedCountry.phonecode);
        const countryStates = State.getStatesOfCountry(selectedCountry.isoCode);
        setStates(countryStates);

        // Find the state object based on the state name
        const selectedState = countryStates.find(
          (state) => state.name === doctorData.state
        );

        if (selectedState) {
          // Get cities for the selected state
          const stateCities = City.getCitiesOfState(
            selectedCountry.isoCode,
            selectedState.isoCode
          );
          setCities(stateCities);
        }
      }
    }
  }, [doctorData.country]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const error = validateField(name, value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error,
    }));
    if (name === "country") {
      const selectedCountry = countries.find(
        (country) => country.isoCode === value
      );
      const countryStates = State.getStatesOfCountry(value);
      setStates(countryStates);
      setCities(null);
      setDoctorData((prevData) => ({
        ...prevData,
        country: selectedCountry.name,
        state: "",
        city: "",
      }));
    } else if (name === "state") {
      const selectedState = states.find((state) => state.isoCode === value);
      const selectedCountry = Country.getAllCountries().find(
        (country) => country.name === doctorData.country
      );

      if (selectedCountry && selectedState) {
        const stateCities = City.getCitiesOfState(
          selectedCountry.isoCode,
          selectedState.isoCode
        );
        setCities(stateCities);
        setDoctorData((prevData) => ({
          ...prevData,
          state: selectedState.name,
          city: "",
        }));
      }
    } else if (name === "city") {
      const selectedCity = cities.find((city) => city.name === value);
      setDoctorData((prevData) => ({
        ...prevData,
        city: selectedCity ? selectedCity.name : value,
      }));
    } else if (name === "hospitalName") {
      const selectedHospital = allHospitals.find(
        (hospital) => hospital.name === value
      );
      setDoctorData((prevData) => ({
        ...prevData,
        hospitalName: selectedHospital ? selectedHospital.name : value,
        hospitalId: selectedHospital ? selectedHospital._id : "", // Use only the ID
        hospitalAddress: selectedHospital ? selectedHospital.address : "",
        worksiteLink: selectedHospital ? selectedHospital.worksiteLink : "",
        emergencyContactNo: selectedHospital ? selectedHospital.contact : "",
      }));
    } else {
      setDoctorData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  // Rest of your existing functions (handleSubmit, handleSignatureChange, handlePhotoChange)
  const handleSubmit = async (event) => {
    event.preventDefault();
    const newErrors = {};
    Object.keys(doctorData).forEach((field) => {
      const error = validateField(field, doctorData[field]);
      if (error) newErrors[field] = error;
    });
    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      toast.error("Please fix all errors before submitting");
      return;
    }
    try {
      const formData = new FormData();

      for (const [key, value] of Object.entries(doctorData)) {
        formData.append(key, value);
      }

      if (signatureFile) {
        formData.append("signature", signatureFile);
      }

      if (photoFile) {
        formData.append("profilePicture", photoFile);
      }
      //remove old hospitalIds from formData
      formData.delete("hospitalId");
      formData.append("hospitalId", doctorData.hospitalId._id);
      const response = await apiService.EditDoctor(doctorId, formData);
      toast.success("Doctor updated successfully!");
      navigate("/doctorManagement");
    } catch (error) {
      console.error("Error updating doctor:", error);
      toast.error("Error updating doctor");
    }
  };
  const handleSignatureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSignatureFile(file);
      setDoctorData({ ...doctorData, signature: URL.createObjectURL(file) });
    }
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhotoFile(file);
      setDoctorData({ ...doctorData, avatar: URL.createObjectURL(file) });
    }
  };

  if (loading) {
    return <p>Loading doctor data...</p>;
  }
  console.log(doctorData);
  console.log(selectedCountry, selectedState, selectedCity);
  console.log(
    states,
    states.find((s) => s.name == doctorData.state),
    cities
  );
  return (
    <div className=" bg-[#F6F8FB] p-[20px]  h-[93%]">
      <div className="row">
        <div className="main p-[20px] bg-white rounded-[15px]">
          <form onSubmit={handleSubmit}>
            <div className="top p-[20px] border rounded-[15px] my-[15px]">
              <div className="content">
                <div className="head">
                  <p className="text-[26px] font-bold text-[#030229]">
                    Edit Doctor Detail
                  </p>
                </div>
                <div className="details flex justify-between">
                  <div className="left w-[19%] flex flex-col items-center ">
                    <div className="choose-photo flex flex-col items-center">
                      <div className="image mt-[30px] mb-4">
                        <img
                          src={doctorData.avatar}
                          alt="Doctor Avatar"
                          className="w-32 h-32 rounded-full object-cover"
                        />
                      </div>

                      <div className="choose-img">
                        <label
                          htmlFor="photo-upload"
                          className="upload-label text-blue-500 cursor-pointer"
                        >
                          Choose Photo
                        </label>
                        <input
                          id="photo-upload"
                          type="file"
                          accept="image/*"
                          onChange={handlePhotoChange}
                          className="hidden"
                        />
                      </div>
                    </div>

                    <div className="upload-sign  w-[100%] flex-col  mt-5 ">
                      <div className="title mb-2">
                        <p className="text-lg font-semibold">Signature</p>
                      </div>

                      <div className="mt-2 flex flex-col items-center w-[100%] border-2 border-dashed border-[#D3D3D3] rounded-[6px] p-5">
                        <img
                          src={doctorData.signature}
                          alt="Doctor Signature"
                          className="w-32 h-16 object-contain mb-2"
                        />
                        <label
                          htmlFor="signature-upload"
                          className="upload-label text-blue-500 cursor-pointer"
                        >
                          Upload a file
                        </label>
                        <h5 className="text-sm text-gray-500">PNG Up To 5MB</h5>
                        <input
                          id="signature-upload"
                          type="file"
                          accept="image/*"
                          onChange={handleSignatureChange}
                          className="hidden"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="right w-[79%]">
                    <div className="form-box">
                      <form className="flex gap-x-[22px]">
                        {[
                          {
                            label: "Doctor Name",
                            name: "name",
                            type: "text",
                            placeholder: "Enter Doctor Name",
                            value: doctorData.name,
                          },
                          {
                            label: "Doctor Qualification",
                            name: "qualification",
                            type: "text",
                            placeholder: "Enter Doctor Qualification",
                            value: doctorData.qualification,
                          },
                          {
                            label: "Gender",
                            name: "gender",
                            type: "select",
                            options: ["Male", "Female", "Other"],
                            value: doctorData.gender,
                          },
                          {
                            label: "Specialty Type",
                            name: "speciality",
                            type: "text",
                            placeholder: "Enter Specialty Type",
                            value: doctorData.speciality,
                          },
                          {
                            label: "Working Time",
                            name: "workingTime",
                            type: "text",
                            placeholder: "Enter Working Time",
                            value: doctorData.workingTime,
                          },
                          {
                            label: "Work On",
                            name: "workingOn",
                            type: "select",
                            placeholder: "Enter Work On",
                            value: doctorData.workingOn,
                            options: ["Part-time", "Full-time", "Contract"],
                          },
                          {
                            label: "Check Up Time",
                            name: "patientCheckupTime",
                            type: "select",
                            placeholder: "Enter Check Up Time",
                            value: doctorData.patientCheckupTime,
                            options: timeOptions,
                          },
                          {
                            label: "Break Time",
                            name: "breakTime",
                            type: "select",
                            placeholder: "Enter Break Time",
                            value: doctorData.breakTime,
                            options: timeOptions,
                          },
                          {
                            label: "Experience",
                            name: "experience",
                            type: "text",
                            placeholder: "Enter Experience",
                            value: doctorData.experience,
                          },
                          {
                            label: "Phone Number",
                            name: "phone",
                            type: "text",
                            placeholder: "Enter Phone Number",
                            value: doctorData.phone,
                          },
                          {
                            label: "Country Code",
                            name: "countryCode",
                            type: "text",
                            options: countryCodes,
                            value: doctorData.countryCode || "+" + isoCodes,
                          },
                          {
                            label: "Age",
                            name: "age",
                            type: "number",
                            placeholder: "Enter Age",
                            value: doctorData.age,
                          },
                          {
                            label: "Email",
                            name: "email",
                            type: "email",
                            placeholder: "Enter Email",
                            value: doctorData.email,
                          },
                          {
                            label: "Country",
                            name: "country",
                            type: "select",
                            options: countries,
                            value:
                              countries.find(
                                (c) => c.name === doctorData.country
                              )?.isoCode || "",
                          },
                          {
                            label: "State",
                            name: "state",
                            type: "select",
                            options: states,
                            value:
                              states.find((s) => s.name === doctorData.state)
                                ?.isoCode || "",
                            isDisabled: !doctorData.country,
                          },
                          {
                            label: "City",
                            name: "city",
                            type: "select",
                            options: cities || [],
                            value: selectedCity?.name || null,
                            isDisabled: !doctorData.state,
                          },
                          {
                            label: "Zip Code",
                            name: "zipCode",
                            type: "text",
                            placeholder: "Enter Zip Code",
                            value: doctorData.zipCode,
                          },
                          {
                            label: "Address",
                            name: "doctorAddress",
                            type: "text",
                            placeholder: "Enter Address",
                            value: doctorData.doctorAddress,
                          },
                          {
                            label: "Description",
                            name: "description",
                            type: "text",
                            placeholder: "Enter Description",
                            value: doctorData.description,
                          },
                          {
                            label: "Online Consultation Rate",
                            name: "onlineConsultationRate",
                            type: "text",
                            placeholder: "Enter Consultation Rate",
                            value: doctorData.onlineConsultationRate,
                          },
                        ].map((field, index) => (
                          <div
                            className="input-box relative py-[15px] w-[32%] "
                            key={index}
                          >
                            <div className="label absolute top-[4px] left-[14px] bg-white z-10 text-[16px] font-medium">
                              {field.label}
                            </div>
                            {field.type === "select" ? (
                              <select
                                name={field.name}
                                value={field.value}
                                onChange={handleInputChange}
                                disabled={field.isDisabled}
                                className="w-full py-[12px] px-[14px] border border-[#d9d9d9] rounded-[10px] focus:border-[#718ebf] text-[#a7a7a7] outline-none"
                              >
                                <option value="">Select {field.label}</option>
                                {field?.options?.map((option) => {
                                  if (field.label === "Country Code") {
                                    return (
                                      <option
                                        key={option.code}
                                        value={option.code}
                                      >
                                        {option.code + " " + option.country}
                                      </option>
                                    );
                                  } else if (field.label === "Gender") {
                                    return (
                                      <option key={option} value={option}>
                                        {option}
                                      </option>
                                    );
                                  } else {
                                    return (
                                      <option
                                        key={option.isoCode || option.name}
                                        value={
                                          option.isoCode ||
                                          option.name ||
                                          option
                                        }
                                      >
                                        {option.name || option}
                                      </option>
                                    );
                                  }
                                })}
                              </select>
                            ) : (
                              <input
                                type={field.type}
                                name={field.name}
                                value={field.value}
                                onChange={handleInputChange}
                                placeholder={field.placeholder}
                                className="w-full py-[12px] px-[14px] border border-[#d9d9d9] rounded-[10px] focus:border-[#718ebf] text-[#a7a7a7]"
                              />
                            )}
                            {errors[field.name] && (
                              <p className="text-red-500 text-sm mt-1">
                                {errors[field.name]}
                              </p>
                            )}
                          </div>
                        ))}
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="bottom p-5 border-2 border-[#F4F4F4] rounded-xl my-4">
              <div className="content">
                <div className="details flex">
                  <div className="form-box w-full">
                    <form className="flex gap-x-[22px]">
                      {[
                        {
                          label: "Current Hospital",
                          name: "currentHospital",
                          type: "text",
                          placeholder: "Enter Doctor Current Hospital",
                          value: doctorData.currentHospital,
                        },
                        {
                          label: "Hospital Name",
                          name: "hospitalName",
                          type: "select",
                          placeholder: "Enter Hospital Name",
                          value: doctorData.hospitalName,
                          options: allHospitals,
                        },
                        {
                          label: "Hospital Address",
                          name: "hospitalAddress",
                          type: "text",
                          placeholder: "Enter Hospital Address",
                          value: doctorData.hospitalAddress,
                        },
                        {
                          label: "Hospital Website",
                          name: "worksiteLink",
                          type: "text",
                          placeholder: "Enter Hospital Website",
                          value: doctorData.worksiteLink,
                        },
                        {
                          label: "Emergency Contact",
                          name: "emergencyContactNo",
                          type: "text",
                          placeholder: "Enter Emergency Contact",
                          value: doctorData.emergencyContactNo,
                        },
                      ].map((field, index) => (
                        <div
                          className="input-box relative py-4 w-[32%]"
                          key={index}
                        >
                          <div className="label absolute top-1 left-4 bg-white z-10text-[16px] font-medium ">
                            {field.label}
                          </div>
                          {field.type === "select" ? (
                            <select
                              name={field.name}
                              value={doctorData.hospitalName || ""}
                              onChange={handleInputChange}
                              className="p-3 border border-[#d9d9d9] rounded-xl w-full focus:border-[#718ebf] bg-white text-[#a7a7a7]"
                            >
                              <option value="">Select Hospital</option>
                              {field.options.map((hospital) => (
                                <option
                                  key={hospital._id}
                                  value={hospital.name}
                                >
                                  {hospital.name}
                                </option>
                              ))}
                            </select>
                          ) : (
                            <input
                              type={field.type}
                              name={field.name}
                              value={field.value}
                              onChange={handleInputChange}
                              placeholder={field.placeholder}
                              className="p-3 border border-[#d9d9d9] rounded-xl w-full focus:border-[#718ebf] placeholder-[#a7a7a7]"
                            />
                          )}
                          {errors[field.name] && (
                            <p className="text-red-500 text-sm mt-1">
                              {errors[field.name]}
                            </p>
                          )}
                        </div>
                      ))}
                    </form>
                  </div>
                </div>
              </div>
            </div>
            <div className="save-btn flex justify-end">
              <button
                type="submit"
                className="bg-gray-100 px-10 py-2 text-gray-600 text-lg font-semibold rounded-lg hover:bg-blue-500 hover:text-white"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DoctorEdit;
