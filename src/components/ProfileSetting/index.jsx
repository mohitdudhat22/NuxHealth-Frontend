import React, { useRef, useState, useEffect } from "react";
import styles from "./EditProfile.module.css";
import { NHButton, NHCard, NHDatePicker, NHInput, NHNumberInput, NHPasswordInput, NHSelect } from "..";
import { useChangePassword } from "@/hook/Admin/AdminEditProfile/ChangePassword";
import { useEditProfile } from "@/hook/Admin/ProfileSetting";
import { identifyRole } from "@/utils/identifyRole";
import moment from "moment";

export const ProfileSetting = () => {
  const {
    activeTab,
    isEditing,
    setIsEditing,
    userDetail,
    setUserDetail,
    fileUpload,
    handleEditImage,
    handleFileChange,
    handleInputChange,
    handleSubmitData,
    handleTabChange,
  } = useEditProfile();
  return (
    <div className="bg-gradient-to-b from-indigo-600 to-indigo-700 p-6 relative h-[35%] min-h-[40vh]">
      <div className={styles.profileCard + " w-full h-full absolute top-1/4 left-[10.5%]"}>
        <div className={styles.profile + " w-[1200px] flex flex-col"}>
          <h3 className="mb-10 text-4xl text-white">Profile Setting</h3>
          <NHCard className="p-0 bg-white">
            <div className="flex">
              <div className="w-1/4 border-r min-h-[calc(100vh-400px)]">
                <div className="flex flex-col items-center px-4 py-8">
                  <div className="img-box w-[150px] h-[150px] bg-[#D9D9D9] rounded-full border border-[#DFE0EB] relative flex flex-col items-center">
                    <img
                      src={userDetail?.profileImage || "https://i.pravatar.cc/300"}
                      alt="Profile"
                      className="w-[150px] rounded-full"
                    />
                    {isEditing && (
                      <>
                        <input
                          type="file"
                          ref={fileUpload}
                          style={{ display: "none" }}
                          onChange={handleFileChange}
                        />
                        <button
                          type="button"
                          onClick={handleEditImage}
                          className="mt-4 bg-blue-500 text-white p-2 rounded-full"
                        >
                          Edit
                        </button>
                      </>
                    )}
                  </div>


                  <h2 className="text-xl font-semibold">
                    {userDetail?.firstName || "Lincoln"}{" "}
                    {userDetail?.lastName || "Phillips"}
                  </h2>
                </div>

                <div className="px-4">
                  <nav className="p-2 bg-gray-100 rounded-lg">
                    <ul className="space-y-1">
                      {[
                        { id: "profile", label: "Profile" },
                        { id: "changePassword", label: "Change Password" },
                        { id: "terms", label: "Terms & Condition" },
                        { id: "privacy", label: "Privacy Policy" }
                      ].map((tab) => (
                        <li key={tab.id}>
                          <button
                            type="button"
                            className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-200 ${
                              activeTab === tab.id 
                                ? "bg-white text-blue-600 shadow-sm font-medium" 
                                : "text-gray-600 hover:bg-gray-50"
                            }`}
                            onClick={(e) => {
                              e.preventDefault();
                              handleTabChange(tab.id);
                            }}
                          >
                            {tab.label}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </nav>
                </div>
              </div>

              <div className="w-3/4 p-6">
                {activeTab === "profile" && (
                  <Profile
                    userDetail={userDetail}
                    setUserDetail={setUserDetail}
                    handleSubmit={handleSubmitData}
                    isEditing={isEditing}
                    setIsEditing={setIsEditing}
                  />
                )}
                {activeTab === "changePassword" && <ChangePassword />}
                {activeTab === "terms" && <Terms />}
                {activeTab === "privacy" && <Privacy />}
              </div>
            </div>
          </NHCard>
        </div>
      </div>
    </div>
  );
};

const Profile = ({ userDetail, setUserDetail, handleSubmit, isEditing, setIsEditing }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetail((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const renderFormFields = () => {
    const role = identifyRole();
    switch (role) {
      case 'admin':
        return (
          <>
            <div className="grid grid-cols-3 gap-7">
              <NHInput
                label="First Name"
                name="firstName"
                value={userDetail?.firstName}
                onChange={handleChange}
                disabled={!isEditing}
                required
              />
              <NHInput
                label="Last Name"
                name="lastName"
                value={userDetail?.lastName}
                onChange={handleChange}
                disabled={!isEditing}
              />
              <NHInput
                label="Email Address"
                name="email"
                value={userDetail?.email}
                onChange={handleChange}
                disabled={!isEditing}
                required
              />
            </div>

            <div className="grid grid-cols-3 gap-7">
              <NHInput
                label="Phone Number"
                name="phoneNumber"
                value={userDetail?.phoneNumber}
                onChange={handleChange}
                disabled={!isEditing}
              />
              <NHInput
                label="Country"
                name="country"
                value={userDetail?.country}
                onChange={handleChange}
                disabled={!isEditing}
              />
              <NHInput
                label="State"
                name="state"
                value={userDetail?.state}
                onChange={handleChange}
                disabled={!isEditing}
              />
              <NHInput
                label="City"
                name="city"
                value={userDetail?.city}
                onChange={handleChange}
                disabled={!isEditing}
              />
              <NHSelect
                label="Gender"
                name="gender"
                value={userDetail?.gender}
                onChange={(value) =>
                  setUserDetail((prev) => ({ ...prev, gender: value }))
                }
                disabled={!isEditing}
                options={[
                  { label: "Male", value: "male" },
                  { label: "Female", value: "female" },
                ]}
                placeholder="Select Gender"
              />
            </div>
          </>
        );

      case 'doctor':
        return (
          <>
            <div className="grid grid-cols-3 gap-7">
              <NHInput
                label="First Name"
                name="firstName"
                value={userDetail?.firstName}
                onChange={handleChange}
                disabled={!isEditing}
                required
              />
              <NHInput
                label="Last Name"
                name="lastName"
                value={userDetail?.lastName}
                onChange={handleChange}
                disabled={!isEditing}
              />
              <NHInput
                label="Email Address"
                name="email"
                value={userDetail?.email}
                onChange={handleChange}
                disabled={!isEditing}
                required
              />
            </div>

            <div className="grid grid-cols-3 gap-7">
              <NHInput
                label="Phone Number"
                name="phoneNumber"
                value={userDetail?.phoneNumber}
                onChange={handleChange}
                disabled={!isEditing}
              />
              <NHInput
                label="Hospital Name"
                name="hospitalName"
                value={userDetail?.hospitalName}
                onChange={handleChange}
                disabled={true}
              />
              <NHSelect
                label="Gender"
                name="gender"
                value={userDetail?.gender}
                onChange={(value) =>
                  setUserDetail((prev) => ({ ...prev, gender: value }))
                }
                disabled={!isEditing}
                options={[
                  { label: "Male", value: "male" },
                  { label: "Female", value: "female" },
                ]}
                placeholder="Select Gender"
              />
              <NHInput
                label="Country"
                name="country"
                value={userDetail?.country}
                onChange={handleChange}
                disabled={!isEditing}
              />
              <NHInput
                label="State"
                name="state"
                value={userDetail?.state}
                onChange={handleChange}
                disabled={!isEditing}
              />
              <NHInput
                label="City"
                name="city"
                value={userDetail?.city}
                onChange={handleChange}
                disabled={!isEditing}
              />

            </div>
          </>
        );

      case 'patient':
        return (
          <>
            <div className="grid grid-cols-3 gap-7">
              <NHInput
                label="Name"
                name="firstName"
                value={userDetail?.firstName}
                onChange={handleChange}
                disabled={!isEditing}
                required
              />
              <NHInput
                label="Last Name"
                name="lastName"
                value={userDetail?.lastName}
                onChange={handleChange}
                disabled={!isEditing}
              />
              <NHInput
                label="Email Address"
                name="email"
                value={userDetail?.email}
                onChange={handleChange}
                disabled={!isEditing}
                required
              />
            </div>

            <div className="grid grid-cols-3 gap-7">
              <NHSelect
                label="Gender"
                name="gender"
                value={userDetail?.gender}
                onChange={(value) =>
                  setUserDetail((prev) => ({ ...prev, gender: value }))
                }
                disabled={!isEditing}
                options={[
                  { label: "Male", value: "male" },
                  { label: "Female", value: "female" },
                ]}
                placeholder="Select Gender"
              />
              <NHDatePicker
                label={"DOB"}
                name="dob"
                value={moment(userDetail?.dob)}
                onChange={handleChange} // Update selectedToDate
                style={{ padding: "10px" }}
              />
              <NHInput
                label="Age"
                name="age"
                value={userDetail?.age}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </div>
            <div className="grid grid-cols-3 gap-7">
            <NHInput
                label="Height"
                name="height"
                value={userDetail?.height}
                onChange={handleChange}
                disabled={!isEditing}
              />
                 <NHInput
                label="Weight"
                name="weight"
                value={userDetail?.weight}
                onChange={handleChange}
                disabled={!isEditing}
              />    
                  <NHSelect
                label="Blood Group"
                name="bloodGroup"
                value={userDetail?.bloodGroup}
                onChange={(value) =>
                  setUserDetail((prev) => ({ ...prev, bloodGroup: value }))
                }
                disabled={!isEditing}
                options={[
                  { value: "A+", label: "A+" },
                  { value: "A-", label: "A-" },
                  { value: "B+", label: "B+" },
                  { value: "B-", label: "B-" },
                  { value: "O+", label: "O+" },
                  { value: "O-", label: "O-" },
                  { value: "AB+", label: "AB+" },
                  { value: "AB-", label: "AB-" },
                ]}
              />   
            </div>
            <div className="grid grid-cols-3 gap-7">
              <NHInput
                label="Country"
                name="country"
                value={userDetail?.country}
                onChange={handleChange}
                disabled={!isEditing}
              />
              <NHInput
                label="State"
                name="state"
                value={userDetail?.state}
                onChange={handleChange}
                disabled={!isEditing}
              />
              <NHInput
                label="City"
                name="city"
                value={userDetail?.city}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </div>
            <div>
            <NHInput
                label="Address"
                name="fullAddress"
                value={userDetail?.fullAddress}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </div>
          </>
        );

      case 'receptionist':
        return (
          <>
            <div className="grid grid-cols-3 gap-7">
              <NHInput
                label="First Name"
                name="firstName"
                value={userDetail?.firstName}
                onChange={handleChange}
                disabled={!isEditing}
                required
              />
              <NHInput
                label="Last Name"
                name="lastName"
                value={userDetail?.lastName}
                onChange={handleChange}
                disabled={!isEditing}
              />
              <NHInput
                label="Email Address"
                name="email"
                value={userDetail?.email}
                onChange={handleChange}
                disabled={!isEditing}
                required
              />
            </div>

            <div className="grid grid-cols-3 gap-7">
              <NHInput
                label="Phone Number"
                name="phoneNumber"
                value={userDetail?.phoneNumber}
                onChange={handleChange}
                disabled={!isEditing}
              />
              <NHInput
                label="Country"
                name="country"
                value={userDetail?.country}
                onChange={handleChange}
                disabled={!isEditing}
              />
              <NHInput
                label="State"
                name="state"
                value={userDetail?.state}
                onChange={handleChange}
                disabled={!isEditing}
              />
              <NHInput
                label="City"
                name="city"
                value={userDetail?.city}
                onChange={handleChange}
                disabled={!isEditing}
              />
              <NHSelect
                label="Gender"
                name="gender"
                value={userDetail?.gender}
                onChange={(value) =>
                  setUserDetail((prev) => ({ ...prev, gender: value }))
                }
                disabled={!isEditing}
                options={[
                  { label: "Male", value: "male" },
                  { label: "Female", value: "female" },
                ]}
                placeholder="Select Gender"
              />
            </div>
          </>
        );

      default:
        return null;
    }
  };
  return (
    <NHCard>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">Edit Profile</h2>
        <div className="space-x-4">
          {isEditing && (
            <NHButton
              variant="default"
              onClick={() => {
                setIsEditing(false);
              }}
            >
              Cancel
            </NHButton>
          )}
          <NHButton
            variant={isEditing ? "primary" : "default"}
            onClick={
              isEditing
                ? async () => {
                  const updateSuccessful = await handleSubmit();
                  if (updateSuccessful) {
                    setIsEditing(false);
                  }
                }
                : () => setIsEditing(true)
            }
          >
            {isEditing ? "Save" : "Edit Profile"}
          </NHButton>
        </div>
      </div>

      <form 
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(e);
        }} 
        className="space-y-6"
      >
        {renderFormFields()}
      </form>
    </NHCard>
  );
};

const Terms = () => (
  <div className="space-y-6">
    <h3 className="fw-semibold lh-base text-[26px] pl-5">Terms & Conditions</h3>
    <div className="prose max-w-none bg-white p-6 rounded-lg overflow-y-auto h-[calc(100vh-400px)] gap-4 grid">
      <p className="text-base">
        The terms and conditions outline the rules and regulations for using the website and the services
        provided. By accessing this website, we assume you accept these terms and conditions.
      </p>
    </div>
  </div>
);

const Privacy = () => (
  <div className="space-y-6">
    <h3 className="fw-semibold lh-base text-[26px] pl-5">Privacy Policy</h3>
    <div className="prose max-w-none bg-white p-6 rounded-lg overflow-y-auto h-[calc(100vh-400px)] gap-4 grid">
      <p className="text-base">
        We value your privacy. The policy explains how we collect, use, and protect your personal data when
        using our services. By using this site, you consent to the processing of your data as described in
        this policy.
      </p>
    </div>
  </div>
);

const ChangePassword = () => {
  const {
    currentPassword,
    newPassword,
    confirmPassword,
    loading,
    handleInputChange,
    handleSubmit,
    isFormValid,
  } = useChangePassword();

  return (
    <div className="space-y-6">
      <h3 className="fw-semibold lh-base text-[26px] pl-5">Change Password</h3>
      <div className="max-w-none space-y-6 grid">
        <NHPasswordInput
          label="Current Password"
          name="currentPassword"
          value={currentPassword}
          onChange={handleInputChange}
          required
        />
        <NHPasswordInput
          label="New Password"
          name="newPassword"
          value={newPassword}
          onChange={handleInputChange}
          required
        />
        <NHPasswordInput
          label="Confirm New Password"
          name="confirmPassword"
          value={confirmPassword}
          onChange={handleInputChange}
          required
        />
        <NHButton
          variant="primary"
          onClick={handleSubmit}
          disabled={!isFormValid || loading}
        >
          Change Password
        </NHButton>
      </div>
    </div>
  );
};
