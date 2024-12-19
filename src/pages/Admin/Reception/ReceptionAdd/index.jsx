import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import useReceptionManagement from "@/hooks/Admin/Reception/ReceptionManagement";

export const ReceptionAdd = () => {
  const [showPassword, setShowPassword] = useState(false);

  const {
    formData,
    handleChange,
    handleProfilePictureChange,
    handleSubmit,
    profilePicturePreview,
    countries,
    states,
    cities,
  } = useReceptionManagement();

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
                      Add New Reception
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
                          className="hidden object-cover"
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
                    </div>

                    <div className="w-[79%]">
                      <div className="form-box">
                        <div className="flex flex-wrap gap-3.5">
                          <div className="relative w-[32%] pt-4">
                            <div className="absolute top-1 left-3.5 bg-white z-10 text-[16px] font-medium">
                              First Name
                            </div>
                            <input
                              type="text"
                              name="firstName"
                              placeholder="Enter first Name"
                              maxLength={50}
                              value={formData.firstName}
                              onChange={handleChange}
                              className="w-full p-3 border border-[#d9d9d9] rounded-[10px] focus:border-[#718ebf] placeholder-[#a7a7a7]"
                            />
                          </div>
                          <div className="relative w-[32%] pt-4">
                            <div className="absolute top-1 left-3.5 bg-white z-10 text-[16px] font-medium">
                              Last Name
                            </div>
                            <input
                              type="text"
                              name="lastName"
                              placeholder="Enter last Name"
                              maxLength={50}
                              value={formData.lastName}
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
                              Phone Number
                            </div>
                            <input
                              type="text"
                              name="phone"
                              placeholder="Enter Phone Number"
                              maxLength={15}
                              value={formData.phone}
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
                              {states?.map((state) => (
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
                              Address
                            </div>
                            <input
                              type="text"
                              name="address"
                              placeholder="Enter Address"
                              maxLength={200}
                              value={formData.address}
                              onChange={handleChange}
                              className="w-full p-3 border border-[#d9d9d9] rounded-[10px] focus:border-[#718ebf] placeholder-[#a7a7a7]"
                            />
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
                              Emergency Contact Number
                            </div>
                            <input
                              type="text"
                              name="emergencyContactNo"
                              placeholder="Enter Emergency Contact Number"
                              maxLength={15}
                              value={formData.emergencyContactNo}
                              onChange={handleChange}
                              className="w-full p-3 border border-[#d9d9d9] rounded-[10px] focus:border-[#718ebf] placeholder-[#a7a7a7]"
                            />
                          </div>
                          <div className="relative w-[32%] pt-4">
                            <div className="absolute top-1 left-3.5 bg-white z-10 text-[16px] font-medium">
                              qualification
                            </div>
                            <input
                              type="text"
                              name="qualification"
                              placeholder="Enter qualification"
                              value={formData.qualification}
                              onChange={handleChange}
                              className="w-full p-3 border border-[#d9d9d9] rounded-[10px] focus:border-[#718ebf] placeholder-[#a7a7a7]"
                            />
                          </div>
                          <div className="relative w-[32%] pt-4">
                            <div className="absolute top-1 left-3.5 bg-white z-10 text-[16px] font-medium">
                              Working Time
                            </div>
                            <input
                              type="text"
                              name="workingTime"
                              placeholder="Enter Working Time"
                              value={formData.workingTime}
                              onChange={handleChange}
                              className="w-full p-3 border border-[#d9d9d9] rounded-[10px] focus:border-[#718ebf] placeholder-[#a7a7a7]"
                            />
                          </div>
                          <div className="relative w-[32%] pt-4">
                            <div className="absolute top-1 left-3.5 bg-white z-10 text-[16px] font-medium">
                              Break Time
                            </div>
                            <input
                              type="text"
                              name="breakTime"
                              placeholder="Enter Break Time"
                              value={formData.breakTime}
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
                        </div>
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
