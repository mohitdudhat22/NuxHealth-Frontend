import React, { useState } from 'react';
import { NHCard, NHInput, NHSelect, NHButton } from '@/components';
import { Upload, message } from 'antd';

export const AddNewDoctor = () => {
  const [formData, setFormData] = useState({
    doctorName: '',
    doctorQualification: '',
    gender: null,
    specialtyType: '',
    workOn: null,
    workingTime: '',
    checkUpTime: '',
    breakTime: '',
    experience: '',
    phoneNumber: '',
    age: '',
    doctorEmail: '',
    country: null,
    state: null,
    city: null,
    zipCode: '',
    doctorAddress: '',
    description: '',
    onlineConsultationRate: '',
    doctorCurrentHospital: '',
    hospitalName: '',
    hospitalAddress: '',
    hospitalWebsiteLink: '',
    emergencyContactNumber: '',
    profilePhoto: null,
    signature: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectChange = (value, name) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (file, name) => {
    setFormData((prev) => ({
      ...prev,
      [name]: file,
    }));
  };

  const handleSubmit = () => {
    // Basic form validation
    if (!formData.doctorName || !formData.doctorQualification || !formData.gender) {
      message.error('Please fill all required fields.');
      return;
    }
    // Submit the form
    console.log("🚀 ~ handleSubmit ~ formData:", formData)
    message.success('Doctor added successfully!');
  };

  return (
    <NHCard title="Add New Doctor" className="p-6">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <div className="flex gap-7">
          {/* Profile Photo and Signature Section */}
          <div className="w-[17%]">
            <div className="flex flex-col items-center gap-2 mt-6">
              <div className="overflow-hidden bg-gray-100 rounded-full w-[22rem] h-[22rem]">
                <Upload
                  className="flex items-center justify-center w-full h-full cursor-pointer"
                  showUploadList={false}
                  beforeUpload={(file) => {
                    handleFileChange(file, 'profilePhoto');
                    return false;
                  }}
                >
                  <div className="text-center">
                    <div className="text-gray-400">
                      <svg width="192" height="192" viewBox="0 0 192 192" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clipPath="url(#clip0_589_57669)">
                          <rect x="3" y="3" width="186" height="186" rx="93" fill="#D9D9D9" />
                          <path d="M189 165.705V189.01H3V165.791C13.8186 151.333 27.8613 139.598 44.0114 131.521C60.1614 123.443 77.9735 119.245 96.031 119.26C134.037 119.26 167.796 137.503 189 165.705ZM127.016 72.7519C127.016 80.9737 123.749 88.8586 117.936 94.6723C112.122 100.486 104.237 103.752 96.0155 103.752C87.7938 103.752 79.9088 100.486 74.0952 94.6723C68.2816 88.8586 65.0155 80.9737 65.0155 72.7519C65.0155 64.5302 68.2816 56.6453 74.0952 50.8316C79.9088 45.018 87.7938 41.752 96.0155 41.752C104.237 41.752 112.122 45.018 117.936 50.8316C123.749 56.6453 127.016 64.5302 127.016 72.7519Z" fill="#A7A7A7" />
                        </g>
                        <rect x="1.5" y="1.5" width="189" height="189" rx="94.5" stroke="#D9D9D9" strokeWidth="3" />
                        <defs>
                          <clipPath id="clip0_589_57669">
                            <rect x="3" y="3" width="186" height="186" rx="93" fill="white" />
                          </clipPath>
                        </defs>
                      </svg>
                    </div>
                  </div>
                </Upload>
              </div>
              <div className="mt-1 font-medium text-blue-600">Choose Photo</div>
            </div>
            <div className='mt-16 text-xl font-medium text-black ps-3'>Upload Signature</div>
            <div className="flex flex-col items-center gap-2">
              <div className="flex items-center justify-center w-[22rem] h-[22rem] border border-gray-300 border-dashed rounded-lg">
                <Upload
                  className="flex items-center justify-center w-full h-full cursor-pointer"
                  showUploadList={false}
                  beforeUpload={(file) => {
                    handleFileChange(file, 'signature');
                    return false;
                  }}
                >
                  <div className="text-center">
                    <div className="text-lg text-blue-600">Upload Signature</div>
                    <div className="mt-1 text-lg text-[#A7A7A7]">PNG Up To 5MB</div>
                  </div>
                </Upload>
              </div>
            </div>
          </div>

          {/* Form Fields */}
          <div className='w-[83%]'>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <NHInput
                label="Doctor Name"
                name="doctorName"
                placeholder="Enter Doctor Name"
                value={formData.doctorName}
                onChange={handleChange}
              />
              <NHInput
                label="Doctor Qualification"
                name="doctorQualification"
                placeholder="Enter Doctor Qualification"
                value={formData.doctorQualification}
                onChange={handleChange}
              />
              <NHSelect
                label="Gender"
                name="gender"
                placeholder="Select Gender"
                value={formData.gender}
                onChange={(value) => handleSelectChange(value, 'gender')}
                options={[
                  { value: 'male', label: 'Male' },
                  { value: 'female', label: 'Female' },
                  { value: 'other', label: 'Other' },
                ]}
              />
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <NHInput
                label="Specialty Type"
                name="specialtyType"
                placeholder="Enter Specialty Type"
                value={formData.specialtyType}
                onChange={handleChange}
              />
              <NHSelect
                label="Work On"
                name="workOn"
                placeholder="Select Work On"
                value={formData.workOn}
                onChange={(value) => handleSelectChange(value, 'workOn')}
                options={[
                  { value: 'fulltime', label: 'Full Time' },
                  { value: 'parttime', label: 'Part Time' }
                ]}
              />
              <NHInput
                label="Working Time"
                name="workingTime"
                type="time"
                value={formData.workingTime}
                onChange={handleChange}
              />
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <NHInput
                label="Check Up Time"
                name="checkUpTime"
                type="time"
                value={formData.checkUpTime}
                onChange={handleChange}
              />
              <NHInput
                label="Break Time"
                name="breakTime"
                type="time"
                value={formData.breakTime}
                onChange={handleChange}
              />
              <NHInput
                label="Experience"
                name="experience"
                placeholder="Enter Experience"
                value={formData.experience}
                onChange={handleChange}
              />
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <NHInput
                label="Phone Number"
                name="phoneNumber"
                placeholder="Enter Phone Number"
                value={formData.phoneNumber}
                onChange={handleChange}
              />
              <NHInput
                label="Age"
                name="age"
                placeholder="Enter Age"
                value={formData.age}
                onChange={handleChange}
              />
              <NHInput
                label="Doctor Email"
                name="doctorEmail"
                type="email"
                placeholder="Enter Email"
                value={formData.doctorEmail}
                onChange={handleChange}
              />
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <NHSelect
                label="Country"
                name="country"
                placeholder="Select Country"
                value={formData.country}
                onChange={(value) => handleSelectChange(value, 'country')}
                options={[
                  { value: 'india', label: 'India' },
                  { value: 'usa', label: 'USA' }
                ]}
              />
              <NHSelect
                label="State"
                name="state"
                placeholder="Select State"
                value={formData.state}
                onChange={(value) => handleSelectChange(value, 'state')}
                options={[]}
              />
              <NHSelect
                label="City"
                name="city"
                placeholder="Select City"
                value={formData.city}
                onChange={(value) => handleSelectChange(value, 'city')}
                options={[]}
              />
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <NHInput
                label="Zip code"
                name="zipCode"
                placeholder="Enter Zip Code"
                value={formData.zipCode}
                onChange={handleChange}
              />
              <NHInput
                label="Doctor Address"
                name="doctorAddress"
                placeholder="Enter Doctor Address"
                value={formData.doctorAddress}
                onChange={handleChange}
              />
              <NHInput
                label="Description"
                name="description"
                placeholder="Enter Description"
                value={formData.description}
                onChange={handleChange}
              />
            </div>

            <NHInput
              label="Online Consultation Rate"
              name="onlineConsultationRate"
              placeholder="₹ 0000"
              value={formData.onlineConsultationRate}
              onChange={handleChange}
              prefix="₹"
            />
          </div>
        </div>

        <div className='mt-[40px]'>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <NHInput
              label="Doctor Current Hospital"
              name="doctorCurrentHospital"
              placeholder="Enter Current Hospital"
              value={formData.doctorCurrentHospital}
              onChange={handleChange}
            />
            <NHInput
              label="Hospital Name"
              name="hospitalName"
              placeholder="Enter Hospital Name"
              value={formData.hospitalName}
              onChange={handleChange}
            />
            <NHInput
              label="Hospital Address"
              name="hospitalAddress"
              placeholder="Enter Hospital Address"
              value={formData.hospitalAddress}
              onChange={handleChange}
            />
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <NHInput
              label="Hospital Website Link"
              name="hospitalWebsiteLink"
              placeholder="Enter Hospital Website Link"
              value={formData.hospitalWebsiteLink}
              onChange={handleChange}
            />
            <NHInput
              label="Emergency Contact Number"
              name="emergencyContactNumber"
              placeholder="Enter Emergency Contact Number"
              value={formData.emergencyContactNumber}
              onChange={handleChange}
            />
          </div>
          <div className="flex justify-end mt-6">
            <NHButton type="submit" variant="primary">
              Add Doctor
            </NHButton>
          </div>
        </div>
      </form>
    </NHCard>
  );
};
