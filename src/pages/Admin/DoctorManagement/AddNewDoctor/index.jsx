import { NHCard, NHInput, NHSelect, NHButton, NHHead } from "@/components";
import { NHTimePicker } from "@/components/FormComponents/NHTimePicker";
import { useCreateDoctor } from "@/hook";
import { Upload } from "antd";
import { City, Country, State } from "country-state-city";

export const AddNewDoctor = () => {
  const {
    formData,
    handleChange,
    handleSelectChange,
    handleFileChange,
    handleSubmit,
    isEditing,
  } = useCreateDoctor();
  const countries = Country.getAllCountries().map((country) => ({
    value: country.name, 
    label: country.name,
  }));
  const states = formData.country
    ? State.getStatesOfCountry(
      Country.getAllCountries().find((c) => c.name === formData.country)?.isoCode // Get states using the country name
    ).map((state) => ({
      value: state.name,
      label: state.name, 
    }))
    : [];

  const cities = formData.state
    ? City.getCitiesOfState(
      Country.getAllCountries().find((c) => c.name === formData.country)?.isoCode,
      State.getStatesOfCountry(
        Country.getAllCountries().find((c) => c.name === formData.country)?.isoCode
      ).find((s) => s.name === formData.state)?.isoCode
    ).map((city) => ({
      value: city.name,
      label: city.name,
    }))
    : [];
  console.log(formData)
  return (
    <>
      <NHHead title="Add New Doctor" />
      <NHCard
        title={isEditing ? "Edit Doctor" : "Add New Doctor"}
        className="p-6"
      >
        <form onSubmit={handleSubmit}>
          <div className="flex flex-wrap justify-between gap-7">
            {/* Profile Photo and Signature Section */}
            <div className="lg:w-[17%] w-full">
              <div className="flex flex-col items-center gap-2 mt-6">
                <div className="overflow-hidden bg-gray-100 rounded-full w-[22rem] h-[22rem]">
                  <Upload
                    className="flex items-center justify-center w-full h-full cursor-pointer"
                    showUploadList={false}
                    beforeUpload={(file) => {
                      handleFileChange(file, "profilePicture");
                      return false;
                    }}
                  >
                    <div className="text-center">
                      <div className="text-gray-400">
                        <svg
                          width="192"
                          height="192"
                          viewBox="0 0 192 192"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g clipPath="url(#clip0_589_57669)">
                            <rect
                              x="3"
                              y="3"
                              width="186"
                              height="186"
                              rx="93"
                              fill="#D9D9D9"
                            />
                            <path
                              d="M189 165.705V189.01H3V165.791C13.8186 151.333 27.8613 139.598 44.0114 131.521C60.1614 123.443 77.9735 119.245 96.031 119.26C134.037 119.26 167.796 137.503 189 165.705ZM127.016 72.7519C127.016 80.9737 123.749 88.8586 117.936 94.6723C112.122 100.486 104.237 103.752 96.0155 103.752C87.7938 103.752 79.9088 100.486 74.0952 94.6723C68.2816 88.8586 65.0155 80.9737 65.0155 72.7519C65.0155 64.5302 68.2816 56.6453 74.0952 50.8316C79.9088 45.018 87.7938 41.752 96.0155 41.752C104.237 41.752 112.122 45.018 117.936 50.8316C123.749 56.6453 127.016 64.5302 127.016 72.7519Z"
                              fill="#A7A7A7"
                            />
                          </g>
                          <rect
                            x="1.5"
                            y="1.5"
                            width="189"
                            height="189"
                            rx="94.5"
                            stroke="#D9D9D9"
                            strokeWidth="3"
                          />
                          <defs>
                            <clipPath id="clip0_589_57669">
                              <rect
                                x="3"
                                y="3"
                                width="186"
                                height="186"
                                rx="93"
                                fill="white"
                              />
                            </clipPath>
                          </defs>
                        </svg>
                      </div>
                    </div>
                  </Upload>
                </div>
                <div className="mt-1 font-medium text-blue-600">
                  Choose Photo
                </div>
              </div>
              {/* <NHProfilePicUploader /> */}
              <div className="mt-16 text-xl font-medium text-black ps-3 center">
                <p className="text-center text-xl"> Upload Signature</p>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="flex items-center justify-center w-[22rem] h-[22rem] border border-gray-300 border-dashed rounded-lg">
                  <Upload
                    className="flex items-center justify-center w-full h-full cursor-pointer"
                    showUploadList={false}
                    beforeUpload={(file) => {
                      handleFileChange(file, "signature");
                      return false;
                    }}
                  >
                    <div className="text-center">
                      <div className="text-lg text-blue-600">
                        Upload Signature
                      </div>
                      <div className="mt-1 text-lg text-[#A7A7A7]">
                        PNG Up To 5MB
                      </div>
                    </div>
                  </Upload>
                </div>
              </div>
            </div>

            {/* Form Fields */}
            <div className="lg:w-[80%] w-full">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                <NHInput
                  label="First Name"
                  name="firstName"
                  placeholder="Enter First Name"
                  value={formData.firstName}
                  onChange={handleChange}
                />
                <NHInput
                  label="Last Name"
                  name="lastName"
                  placeholder="Enter Last Name"
                  value={formData.lastName}
                  onChange={handleChange}
                />
                <NHInput
                  label="Doctor Email"
                  name="email"
                  type="email"
                  placeholder="Enter Email"
                  value={formData.email}
                  onChange={handleChange}
                />
                <NHInput
                  label="Age"
                  name="age"
                  placeholder="Enter Age"
                  value={formData.age}
                  onChange={handleChange}
                  type="number"
                />
                <NHSelect
                  label="Gender"
                  name="gender"
                  placeholder="Select Gender"
                  value={formData.gender}
                  onChange={(value) => handleSelectChange(value, "gender")}
                  options={[
                    { value: "Male", label: "Male" },
                    { value: "Female", label: "Female" },
                    { value: "Other", label: "Other" },
                  ]}
                />
                <NHInput
                  label="Phone Number"
                  name="phone"
                  placeholder="Enter Phone Number"
                  value={formData.phone}
                  onChange={handleChange}
                />
                <NHInput
                  label="Doctor Qualification"
                  name="qualification"
                  placeholder="Enter Doctor Qualification"
                  value={formData.qualification}
                  onChange={handleChange}
                />
                <NHInput
                  label="Specialty Type"
                  name="speciality"
                  placeholder="Enter Specialty Type"
                  value={formData.speciality}
                  onChange={handleChange}
                />
                <NHSelect
                  label="Work On"
                  name="workOn"
                  placeholder="Select Work On"
                  value={formData.workOn}
                  onChange={(value) => handleSelectChange(value, "workOn")}
                  options={[
                    { value: "Online", label: "Online" },
                    { value: "Onsite", label: "Onsite" },
                    { value: "Both", label: "Both" },
                  ]}
                />
                <NHTimePicker
                  label="Morning Session"
                  isRange
                  format="HH:mm"
                  value={formData.morningSession}
                  onChange={(time, timeString) => {
                    const demo = timeString?.replace(",", " to ");
                    handleChange({
                      target: { name: "morningSession", value: demo },
                    });
                  }}
                />
                <NHTimePicker
                  label="Evening Session"
                  isRange
                  format="HH:mm"
                  value={formData.eveningSession}
                  onChange={(time, timeString) =>
                    handleChange({
                      target: {
                        name: "eveningSession",
                        value: timeString?.replace(",", " to "),
                      },
                    })
                  }
                />
                <NHInput
                  label="Break Time(minute)"
                  name="duration"
                  placeholder="Session Duration"
                  value={formData.duration}
                  onChange={handleChange}
                />
                <NHSelect
                  showSearch
                  label="Country"
                  name="country"
                  placeholder="Select Country"
                  options={countries}
                  value={formData?.country}
                  onChange={(value) => handleChange({
                    target: { name: "country", value },
                  })
                  }
                />
                <NHSelect
                  showSearch
                  label="State"
                  name="state"
                  placeholder="Select State"
                  options={states}
                  value={formData?.state}
                  onChange={(value) => handleChange({
                    target: { name: "state", value },
                  })}
                />
                <NHSelect
                  label="City"
                  name="city"
                  placeholder="Select City"
                  options={cities}
                  onChange={(value) => handleChange({
                    target: { name: "city", value },
                  })}
                />
                <NHInput
                  label="Zip code"
                  name="zipCode"
                  placeholder="Enter Zip Code"
                  value={formData.zipCode}
                  onChange={handleChange}
                />
                <NHInput
                  label="Doctor Address"
                  name="fullAddress"
                  placeholder="Enter Doctor Address"
                  value={formData.fullAddress}
                  onChange={handleChange}
                />
                <NHInput
                  label="Experience"
                  name="experience"
                  placeholder="Enter Experience"
                  value={formData.experience}
                  onChange={handleChange}
                  type="number"
                />
                <NHInput
                  label="Description"
                  name="description"
                  placeholder="Enter Description"
                  value={formData.description}
                  onChange={handleChange}
                />
                <NHInput
                  label="Consultation Rate"
                  name="consultationRate"
                  placeholder="0000"
                  value={formData.consultationRate}
                  onChange={handleChange}
                  prefix="₹"
                  type="number"
                />
                <NHInput
                  label="Online Consultation Rate"
                  name="onlineConsultationRate"
                  placeholder="0000"
                  value={formData.onlineConsultationRate}
                  onChange={handleChange}
                  prefix="₹"
                  type="number"
                />
              </div>
            </div>
          </div>

          <div className="mt-[40px]">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              <NHInput
                label="Doctor Current Hospital"
                // name="doctorCurrentHospital"
                placeholder="Enter Current Hospital"
              // value={formData.doctorCurrentHospital}
              // onChange={handleChange}
              />
              <NHInput
                label="Hospital Name"
                // name="hospitalName"
                placeholder="Enter Hospital Name"
              // value={formData.hospitalName}
              // onChange={handleChange}
              />
              <NHInput
                label="Hospital Address"
                // name="hospitalAddress"
                placeholder="Enter Hospital Address"
              // onChange={handleChange}
              />
              <NHInput
                label="Hospital Website Link"
                name="worksiteLink"
                placeholder="Enter Hospital Website Link"
                value={formData.worksiteLink}
                onChange={handleChange}
                type="url"
              />
              <NHInput
                label="Emergency Contact Number"
                name="emergencyContactNo"
                placeholder="Enter Emergency Contact Number"
                value={formData.emergencyContactNo}
                onChange={handleChange}
              />
            </div>
            <div className="flex justify-end mt-6">
              <NHButton type="submit" variant="primary">
                {isEditing ? "Update Doctor" : "Add Doctor"}
              </NHButton>
            </div>
          </div>
        </form>
      </NHCard>
    </>
  );
};
