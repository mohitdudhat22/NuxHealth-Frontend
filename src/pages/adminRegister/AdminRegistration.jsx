import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Country, City, State } from "country-state-city";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useGlobal } from "../../hooks/useGlobal";
import { useAuth } from "../../hooks/useAuth";
import { toast } from "react-hot-toast";
import { HospitalFormData,FormData } from "@/constants/data";
import ImageSlider from "../../components/Login/ImageSlider";

const AdminRegistration = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const { AdminRegister } = useAuth();
  const { getAllHospitals, allHospitals, createHospital } = useGlobal();
  const [formData, setFormData] = useState(FormData);
  const [hospitalFormData, setHospitalFormData] = useState(HospitalFormData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState("");
  const [countryIso, setCountryIso] = useState("");
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  const fetchData = async () => {
    setCountries(Country.getAllCountries());
    await getAllHospitals();
  };

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
  //     images.forEach((image) => {
  //       image.style.display = "none";
  //     });
  //     images[currentIndex].style.display = "block";
  //     dots.forEach((dot, index) => {
  //       dot.classList.toggle("active", index === currentIndex);
  //     });
  //   }
  // }, []);

  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    if (name === "country") {
      const selectedCountry = countries.find(
        (country) => country.name === value,
      );
      if (selectedCountry) {
        setStates(State.getStatesOfCountry(selectedCountry.isoCode));
        setCountryIso(selectedCountry.isoCode);
        setFormData((prevState) => ({ ...prevState, state: "", city: "" }));
      }
      setCities([]);
    } else if (name === "state") {
      const selectedState = states.find((state) => state.name === value);
      if (selectedState) {
        setCities(City.getCitiesOfState(countryIso, selectedState.isoCode));
        setFormData((prevState) => ({ ...prevState, city: "" }));
      }
    }
  };
  const handleHospitalFormChange = (e) => {
    const { name, value } = e.target;
    setHospitalFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const validateFormData = () => {
    let valid = true;
    setError("");
    // Validate admin registration form
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      setError("Passwords do not match");
      valid = false;
    }

    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.phone ||
      !formData.country ||
      !formData.state ||
      !formData.city ||
      !formData.hospital ||
      !formData.password
    ) {
      toast.error("All fields are required.");
      setError("All fields are required.");
      valid = false;
    }

    return valid;
  };

  const validateHospitalFormData = () => {
    let valid = true;

    // Validate hospital form
    if (
      !hospitalFormData.name ||
      !hospitalFormData.address ||
      !hospitalFormData.country ||
      !hospitalFormData.state ||
      !hospitalFormData.city ||
      !hospitalFormData.zipcode
    ) {
      toast.error("All fields are required for hospital registration.");
      valid = false;
    }

    return valid;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      setError("Passwords do not match");
      return;
    }

    try {
      await AdminRegister(formData);
      toast.success("register successfully");
      navigate("/login", { replace: true });
    } catch (error) {
      toast.error(error.response.data.message);
      setError(error.response?.data?.message || "Registration failed");
    }
  };
  const handleHospitalSubmit = async (e) => {
    e.preventDefault();
    if (!validateHospitalFormData()) return;
    try {
      await createHospital(hospitalFormData);
      await fetchData();
      setHospitalFormData(HospitalFormData);
      setIsModalOpen(false);
      toast.success("Hospital created successfully");
    } catch (error) {
      toast.error("Error creating hospital");
      console.error("Error creating hospital:", error);
    }
  };
  const handelAddHospitalModel = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <div className="registration-section flex justify-center items-center">
        <div className="bg-white p-10 md:w-1/2 w-full">
          <div className="w-full shadow-xl rounded-lg p-5">
            <div className="text-center mb-8">
              <p className="text-2xl font-semibold text-left">Registration</p>
            </div>
            {error && <div className="text-red-600 mb-4">{error}</div>}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="input-box relative">
                  <label className="block text-sm font-medium absolute top-[-0.75rem] left-4 bg-white z-10">
                    First Name <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="Enter First Name"
                    required
                    className="w-full p-2 border border-gray-300 rounded-lg"
                  />
                </div>

                <div className="input-box relative">
                  <label className="block text-sm font-medium absolute top-[-0.75rem] left-4 bg-white z-10">
                    Last Name <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Enter Last Name"
                    required
                    className="w-full p-2 border border-gray-300 rounded-lg"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="input-box relative">
                  <label className="block text-sm font-medium absolute top-[-0.75rem] left-4 bg-white z-10">
                    Email Address <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter Email Address"
                    required
                    className="w-full p-2 border border-gray-300 rounded-lg"
                  />
                </div>

                <div className="input-box relative">
                  <label className="block text-sm font-medium absolute top-[-0.75rem] left-4 bg-white z-10">
                    Country Code <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    name="countryCode"
                    value={formData.countryCode}
                    onChange={handleChange}
                    placeholder="Enter Country Code"
                    required
                    className="w-full p-2 border border-gray-300 rounded-lg"
                  />
                </div>

                <div className="input-box relative">
                  <label className="block text-sm font-medium absolute top-[-0.75rem] left-4 bg-white z-10">
                    Phone Number <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Enter Phone Number"
                    required
                    className="w-full p-2 border border-gray-300 rounded-lg"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="input-box relative">
                  <label className="block text-sm font-medium absolute top-[-0.75rem] left-4 bg-white z-10">
                    Country <span className="text-red-600">*</span>
                  </label>
                  <select
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    // disabled={!formData.country}
                    required
                    className="w-full p-2 border border-gray-300 rounded-lg"
                  >
                    <option value="">Select Country</option>
                    {countries.map((country) => (
                      <option key={country.isoCode} value={country.name}>
                        {country.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="input-box relative">
                  <label className="block text-sm font-medium absolute top-[-0.75rem] left-4 bg-white z-10">
                    State <span className="text-red-600">*</span>
                  </label>
                  <select
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    required
                    disabled={!formData.country}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                  >
                    <option value="">Select State</option>
                    {states.map((state) => (
                      <option key={state.isoCode} value={state.name}>
                        {state.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="input-box relative">
                  <label className="block text-sm font-medium absolute top-[-0.75rem] left-4 bg-white z-10">
                    City <span className="text-red-600">*</span>
                  </label>
                  <select
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    required
                    disabled={!formData.state}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                  >
                    <option value="">Select City</option>
                    {cities.map((city) => (
                      <option key={city.name} value={city.name}>
                        {city.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="input-box relative">
                <label className="block text-sm font-medium absolute top-[-0.75rem] left-4 bg-white z-10">
                  Select Hospital <span className="text-red-600">*</span>
                </label>
                <select
                  name="hospital"
                  value={formData.hospital}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border border-gray-300 rounded-lg"
                >
                  <option value="">Select Hospital</option>
                  {allHospitals.map((hospital) => (
                    <option key={hospital._id} value={hospital._id}>
                      {hospital.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="input-box relative">
                <label className="block text-sm font-medium absolute top-[-0.75rem] left-4 bg-white z-10">
                  Password <span className="text-red-600">*</span>
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter Password"
                    required
                    className="w-full p-2 border border-gray-300 rounded-lg"
                  />
                  <div
                    className="absolute top-3 right-4 cursor-pointer"
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

              <div className="input-box relative">
                <label className="block text-sm font-medium absolute top-[-0.75rem] left-4 bg-white z-10">
                  Confirm Password <span className="text-red-600">*</span>
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm Password"
                  required
                  className="w-full p-2 border border-gray-300 rounded-lg"
                />
                <div
                  className="absolute top-3 right-4 cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <FaEye size={20} />
                  ) : (
                    <FaEyeSlash size={20} />
                  )}
                </div>
              </div>

              <div className="flex items-center">
                <input type="checkbox" required className="mr-2" />
                <p>
                  I agree to all the <span className="text-blue-600">T&C</span>{" "}
                  and <span className="text-blue-600">Privacy Policies.</span>
                </p>
              </div>

              <div className="mt-6">
                <button
                  type="submit"
                  className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
                >
                  Register
                </button>
              </div>

              <div className="text-center mt-4">
                <p>
                  Already have an account?{" "}
                  <span
                    className="text-blue-600 cursor-pointer"
                    onClick={() => navigate("/login")}
                  >
                    Login
                  </span>
                </p>
              </div>
            </form>
          </div>
        </div>

        <div className="img-box w-full md:w-1/2 w-1/2 md:p-[6.4%] p-0 relative bg-gray-100">
          <ImageSlider images={["/img/register.png", "/img/register2.png"]} />

          <div className="vector-1 absolute right-0 bottom-0 sm:w-1/3 w-[10%]">
            <img src="/img/Vector-1.png" className="w-full" />
          </div>

          <div className="vector-2 absolute left-0 top-0 sm:w-1/3 w-[10%]">
            <img src="/img/Vector-2.png" className="w-full" />
          </div>

          <div className="vector-dot absolute right-0 top-0 sm:w-1/10 w-[10%]">
            <img src="/img/Vector-dot.png" className="w-full" />
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-5 rounded-lg shadow-lg max-w-md">
            <div className="modal-overlay">
              <div className="modal-content">
                <div className="hospital-section">
                  <div className="row">
                    <div className="main">
                      <div className="form">
                        <div className="content">
                          <div className="head">
                            <p>Add New Hospital</p>
                          </div>
                          <div className="form-box">
                            <form
                              onSubmit={handleHospitalSubmit}
                              className="flex"
                            >
                              <div className="input-box">
                                <div className="label">
                                  Hospital Name <span>*</span>
                                </div>
                                <input
                                  type="text"
                                  name="name"
                                  value={hospitalFormData.name}
                                  onChange={handleHospitalFormChange}
                                  placeholder="Enter Hospital Name"
                                  required
                                />
                              </div>

                              <div className="input-box">
                                <div className="label">
                                  Hospital Address <span>*</span>
                                </div>
                                <input
                                  type="text"
                                  name="address"
                                  value={hospitalFormData.address}
                                  onChange={handleHospitalFormChange}
                                  placeholder="Enter Hospital Address"
                                  required
                                />
                              </div>

                              <div className="input-box">
                                <div className="label">
                                  Country <span>*</span>
                                </div>
                                <select
                                  name="country"
                                  value={hospitalFormData.country}
                                  onChange={handleHospitalFormChange}
                                  required
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

                              <div className="input-box">
                                <div className="label">
                                  State <span>*</span>
                                </div>
                                <select
                                  name="state"
                                  value={hospitalFormData.state}
                                  onChange={handleHospitalFormChange}
                                  required
                                >
                                  <option value="">Select State</option>
                                  {State.getStatesOfCountry(
                                    hospitalFormData.country,
                                  ).map((state) => (
                                    <option
                                      key={state.isoCode}
                                      value={state.isoCode}
                                    >
                                      {state.name}
                                    </option>
                                  ))}
                                </select>
                              </div>

                              <div className="input-box">
                                <div className="label">
                                  City <span>*</span>
                                </div>
                                <select
                                  name="city"
                                  value={hospitalFormData.city}
                                  onChange={handleHospitalFormChange}
                                  required
                                >
                                  <option value="">Select City</option>
                                  {City.getCitiesOfState(
                                    hospitalFormData.country,
                                    hospitalFormData.state,
                                  ).map((city) => (
                                    <option key={city.name} value={city.name}>
                                      {city.name}
                                    </option>
                                  ))}
                                </select>
                              </div>

                              <div className="input-box">
                                <div className="label">
                                  Zip Code <span>*</span>
                                </div>
                                <input
                                  type="text"
                                  name="zipcode"
                                  value={hospitalFormData.zipcode}
                                  onChange={handleHospitalFormChange}
                                  placeholder="Enter Zip Code"
                                  required
                                />
                              </div>

                              <div className="btn flex">
                                <div className="cancel-btn">
                                  <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                  >
                                    Cancel
                                  </button>
                                </div>

                                <div className="save-btn">
                                  <button type="submit">Save</button>
                                </div>
                              </div>
                            </form>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>{" "}
        </div>
      )}
    </>
  );
};

export default AdminRegistration;
