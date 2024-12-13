import { FaCamera } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { useEdit } from "../../hooks/useEdit";
import { useEffect, useState } from "react";

import { Country, State, City } from "country-state-city";

export const Edit = () => {
  const navigate = useNavigate();
  const { profile, setProfile, handleInputChange, handleFormSubmit, allHospitals, handleImageChange } = useEdit();
  const [isLoading, setIsLoading] = useState(true);

  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedState, setSelectedState] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  useEffect(() => {
    if (profile?.firstName || profile?.email) {
      setIsLoading(false);
    }
  }, [profile]);

  useEffect(() => {
    const allCountries = Country.getAllCountries().map((country) => ({
      value: country.isoCode,
      label: country.name,
    }));
    setCountries(allCountries);

    // Set selected country if profile has a saved country
    if (profile?.country) {
      const countryCode = allCountries.find((c) => c.label === profile.country)?.value;
      setSelectedCountry(countryCode);
    }
  }, [profile?.country]); 
  useEffect(() => {
    if (selectedCountry) {
      const statesList = State.getStatesOfCountry(selectedCountry).map((state) => ({
        value: state.isoCode,
        label: state.name,
      }));
      setStates(statesList);

      if (profile?.state) {
        const stateCode = statesList.find((s) => s.label === profile.state)?.value;
        setSelectedState(stateCode);
      }
    }
  }, [selectedCountry, profile?.state]);

  useEffect(() => {
    if (selectedState) {
      const citiesList = City.getCitiesOfState(selectedCountry, selectedState).map((city) => ({
        value: city.name,
        label: city.name,
      }));
      setCities(citiesList);

      // Set selected city if profile has a saved city
      if (profile.city) {
        const city = citiesList.find((c) => c.label === profile.city);
        if (city) setProfile((prev) => ({ ...prev, city: city.value }));
      }
    } else {
      setCities([]);
    }
  }, [selectedState, selectedCountry, profile.city]);

  const handleCountryChange = (e) => {
    const countryCode = e.target.value;
    setSelectedCountry(countryCode);
    const countryName = countries.find((c) => c.value === countryCode)?.label;
    setProfile((prev) => ({
      ...prev,
      country: countryName || "",
      state: "",
      city: "",
    }));
    setSelectedState(null);
  };


  const handleStateChange = (e) => {
    const stateCode = e.target.value;
    setSelectedState(stateCode);
    const stateName = states.find((s) => s.value === stateCode)?.label;
    setProfile((prev) => ({
      ...prev,
      state: stateName || "",
      city: "",
    }));
  };

  const handleCityChange = (e) => {
    const cityName = e.target.value;
    setProfile((prevProfile) => ({
      ...prevProfile,
      city: cityName,
    }));
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <div className="edit-section">
        <div className="row">
          <div className="main">
            <div className="top h-[296px] bg-gradient-to-r from-[#4c49ed] to-[#020067]"></div>
            <div className="profile-setting new-xxl:w-[80%] new-xl:w-[85%] new-lg:w-[90%] mx-auto mt-[-15%]">
              <div className="head pb-[15px]">
                <p className="new-xxl:text-[44px] new-xl:text-[40px] new-lg:text-[36px] font-bold text-white">
                  Profile Setting
                </p>
              </div>
              <div className="content bg-white rounded-[15px] p-[20px] shadow-[0_0_3px_1px_#d7d5d5] flex">
                <div className="left p-[20px] new-xxl:w-[23%] new-xl:w-[25%] new-lg:w-[27%] border-r-[3px] border-[#d9d9d94d]">
                  <div className="img-box">
                    <div className="img">
                      <img
                        src={previewImage || profile?.avatar || "../img/profile.png"}
                        alt=""
                        className="mx-auto new-xxl:w-[214px] new-xxl:h-[214px] new-xl:w-[190px] new-xl:h-[190px] new-lg:w-[170px] new-lg:h-[170px] rounded-full object-cover"
                      />
                    </div>
                    <div className="change-profile pt-[15px]">
                      <ul>
                        <li className="flex justify-center items-center p-[12px] bg-[#F6F8FB] rounded-[10px]">
                        <input
                          type="file"
                          id="profilePic"
                          name="profilePic"
                          style={{ display: "none" }}
                          onChange={handleImageChange}
                          accept="image/*"
                        />
                          <label htmlFor="profilePic" className="flex items-center cursor-pointer">
                            <FaCamera />
                            <span className="pl-[15px] text-[#4F4F4F] new-xxl:text-[20px] new-xl:text-[18px] new-lg:text-[17px] font-semibold">
                              Change Profile
                            </span>
                          </label>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="right new-xxl:w-[77%] new-xl:w-[75%] new-lg:w-[73%]">
                  <div className="content p-[30px] rounded-[15px]">
                    <div className="head flex justify-between items-center">
                      <div className="title">
                        <p className="text-[34px] font-semibold text-[#030229]">
                          Edit Profile
                        </p>
                      </div>
                    </div>
                    <div className="form-box pt-[20px]">
                      <form
                        onSubmit={handleFormSubmit}
                        className="flex flex-wrap justify-between"
                      >

                        <div className="input-box w-[32%] relative py-[15px]">
                          <div className="label absolute top-[4px] left-[14px] bg-white z-10 new-xxl:text-[16px] new-xl:text:[15px] new-lg:text:[15px] font-medium">
                            First Name <span className="text-red-500">*</span>
                          </div>
                          <input
                            type="text"
                            name="firstName"
                            value={profile.firstName ?? ""}
                            onChange={handleInputChange}
                            placeholder="Enter First Name"
                            className="w-full p-[12px] border rounded-[10px] focus:border-[#718ebf] placeholder-gray-400 new-xxl:text-[16px] new-xl:text:[15px] new-lg:text:[15px] text-[#141414] font-normal"
                          />
                        </div>

                        <div className="input-box w-[32%] relative py-[15px]">
                          <div className="label absolute top-[4px] left-[14px] bg-white z-10 new-xxl:text-[16px] new-xl:text:[15px] new-lg:text:[15px] font-medium">
                            Last Name <span className="text-red-500">*</span>
                          </div>
                          <input
                            type="text"
                            name="lastName"
                            value={profile.lastName ?? ""}
                            onChange={handleInputChange}
                            placeholder="Enter Last Name"
                            className="w-full p-[12px] border rounded-[10px] focus:border-[#718ebf] placeholder-gray-400 new-xxl:text-[16px] new-xl:text:[15px] new-lg:text:[15px] text-[#141414] font-normal"
                          />
                        </div>

                        <div className="input-box w-[32%] relative py-[15px]">
                          <div className="label absolute top-[4px] left-[14px] bg-white z-10 new-xxl:text-[16px] new-xl:text:[15px] new-lg:text:[15px] font-medium">
                            Email Address{" "}
                            <span className="text-red-500">*</span>
                          </div>
                          <input
                            type="email"
                            name="email"
                            value={profile.email ?? ""}
                            onChange={handleInputChange}
                            placeholder="Enter Email"
                            className="w-full p-[12px] border rounded-[10px] focus:border-[#718ebf] placeholder-gray-400 new-xxl:text-[16px] new-xl:text:[15px] new-lg:text:[15px] text-[#141414] font-normal"
                          />
                        </div>

                        <div className="input-box w-[32%] relative py-[15px] ">
                          <div className="label absolute top-[4px] left-[14px] bg-white z-10 new-xxl:text-[16px] new-xl:text:[15px] new-lg:text:[15px] font-medium">
                            Phone Number <span className="text-red-500">*</span>
                          </div>
                          <input
                            type="text"
                            name="phone"
                            value={profile.phone ?? ""}
                            onChange={handleInputChange}
                            placeholder="Enter Phone Number"
                            className="w-full p-[12px] border rounded-[10px] focus:border-[#718ebf] placeholder-gray-400 new-xxl:text-[16px] new-xl:text:[15px] new-lg:text:[15px] text-[#141414] font-normal"
                          />
                        </div>

                        <div className="input-box w-[32%] relative py-[15px]">
                          <div className="label absolute top-[4px] left-[14px] bg-white z-10 new-xxl:text-[16px] new-xl:text:[15px] new-lg:text:[15px] font-medium">
                            Hospital Name{" "}
                            <span className="text-red-500">*</span>
                          </div>
                          <select
                            name="hospitalName"
                            value={profile.hospitalId}
                            onChange={handleInputChange}
                            className="w-full p-[12px] border rounded-[10px] focus:border-[#718ebf] bg-white new-xxl:text-[16px] new-xl:text:[15px] new-lg:text:[15px] text-[#141414] font-normal"
                          >
                            <option value="">Select Hospital</option>
                            {allHospitals.map((hospital) => (
                              <option key={hospital._id} value={hospital._id}>
                                {hospital.name}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div className="input-box w-[32%] relative py-[15px]">
                          <div className="label absolute top-[4px] left-[14px] bg-white z-10 new-xxl:text-[16px] new-xl:text:[15px] new-lg:text:[15px] font-medium">
                            Gender <span className="text-red-500">*</span>
                          </div>
                          <select
                            name="gender"
                            value={profile.gender || ""}
                            onChange={handleInputChange}
                            className="w-full p-[12px] border rounded-[10px] focus:border-[#718ebf] bg-white new-xxl:text-[16px] new-xl:text:[15px] new-lg:text:[15px] text-[#141414] font-normal"
                          >
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                          </select>
                        </div>

                        <div className="input-box w-[32%] relative py-[15px]">
                          <div className="label absolute top-[4px] left-[14px] bg-white z-10 new-xxl:text-[16px] new-xl:text:[15px] new-lg:text:[15px] font-medium">
                            Country <span className="text-red-500">*</span>
                          </div>
                          <select
                            name="country"
                            value={selectedCountry || ""}
                            onChange={handleCountryChange}
                            className="w-full p-[12px] border rounded-[10px] focus:border-[#718ebf] bg-white new-xxl:text-[16px] new-xl:text:[15px] new-lg:text:[15px] text-[#141414] font-normal"
                          >
                            <option value="">Select Country</option>
                            {countries.map((country) => (
                              <option key={country.value} value={country.value}>
                                {country.label}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div className="input-box w-[32%] relative py-[15px]">
                          <div className="label absolute top-[4px] left-[14px] bg-white z-10 new-xxl:text-[16px] new-xl:text:[15px] new-lg:text:[15px] font-medium">
                            State <span className="text-red-500">*</span>
                          </div>
                          <select
                            name="state"
                            value={selectedState || ""}
                            onChange={handleStateChange}
                            className="w-full p-[12px] border rounded-[10px] focus:border-[#718ebf] bg-white new-xxl:text-[16px] new-xl:text:[15px] new-lg:text:[15px] text-[#141414] font-normal"
                            disabled={!selectedCountry}
                          >
                             <option value="">Select State</option>
                            {states.map((state) => (
                              <option key={state.value} value={state.value}>
                                {state.label}
                              </option>
                            ))}
                          </select>
                        </div>
                        
                        <div className="input-box w-[32%] relative py-[15px]">
                          <div className="label absolute top-[4px] left-[14px] bg-white z-10 new-xxl:text-[16px] new-xl:text:[15px] new-lg:text:[15px] font-medium">
                            City <span className="text-red-500">*</span>
                          </div>
                          <select
                            name="gender"
                            value={profile.city || ""}
                            onChange={handleCityChange}
                            className="w-full p-[12px] border rounded-[10px] focus:border-[#718ebf] bg-white new-xxl:text-[16px] new-xl:text:[15px] new-lg:text:[15px] text-[#141414] font-normal"
                            disabled={!selectedState}
                          >
                             <option value="">Select City</option>
                            {cities.map((city) => (
                              <option key={city.value} value={city.value}>
                                {city.label}
                              </option>
                            ))}
                          </select>
                        </div>


                        <div className="input-box flex justify-end w-full py-[15px]">
                          <div className="cancel-btn mr-[15px]">
                            <button
                              type="button"
                              className="new-xxl:w-[160px] new-xl:w-[130px] new-lg:w-[110px] py-[12px] px-[14px] border-[1px] border-[#D3D3D3] rounded-[10px] text-black font-semibold new-xxl:text-[20px] font-semibold new-lg:text-[18px] font-semibold new-lg:text-[17px]"
                              onClick={() => {
                                setProfile({ ...profile });
                                navigate("/profile");
                              }}
                            >
                              Cancel
                            </button>
                          </div>
                          <div className="save-btn">
                            <button
                              type="submit"
                              className="new-xxl:w-[160px] new-xl:w-[130px] new-lg:w-[110px] py-[12px] px-[14px] bg-[#0EABEB] rounded-[10px] text-white new-xxl:text-[20px] text-white new-xl:text-[18px] text-white new-lg:text-[17px] font-semibold"
                            >
                              Save
                            </button>
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

    </div>
  );
};