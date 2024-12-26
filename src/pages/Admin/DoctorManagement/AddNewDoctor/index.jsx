import React, { useState } from 'react';
import { NHCard, NHInput, NHSelect, NHButton } from '@/components';
import { Upload } from 'antd';

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
    emergencyContactNumber: ''
  });

  const handleChange = (e) => {
    if (e.target) {
      const { name, value } = e.target;
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSelectChange = (value, name) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <>
      <NHCard title="Add New Doctor" className="p-6">
        <div className="grid grid-cols-1 gap-6">
          {/* Profile Photo and Signature Section */}
          <div className="flex items-start gap-8">
            <div className="flex flex-col items-center gap-2">
              <div className="w-24 h-24 bg-gray-100 rounded-full overflow-hidden">
                <Upload
                  className="w-full h-full flex items-center justify-center cursor-pointer"
                  showUploadList={false}
                >
                  <div className="text-center">
                    <div className="text-gray-400">
                      <svg className="w-8 h-8 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                    </div>
                    <div className="text-xs text-blue-600 mt-1">Choose Photo</div>
                  </div>
                </Upload>
              </div>
            </div>

            <div className="flex flex-col items-center gap-2">
              <div className="w-24 h-24 border border-dashed border-gray-300 rounded-lg flex items-center justify-center">
                <Upload
                  className="w-full h-full flex items-center justify-center cursor-pointer"
                  showUploadList={false}
                >
                  <div className="text-center">
                    <div className="text-xs text-blue-600">Upload Signature</div>
                    <div className="text-xs text-gray-400 mt-1">Upload in PDF</div>
                  </div>
                </Upload>
              </div>
            </div>
          </div>

          {/* Form Fields */}
          <div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                  { value: 'other', label: 'Other' }
                ]}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
          <div className="flex justify-end">
            <NHButton type="submit" variant="primary">
              Add
            </NHButton>
          </div>
        </div>
      </NHCard>
    </>
  );
};

export default AddNewDoctor;
