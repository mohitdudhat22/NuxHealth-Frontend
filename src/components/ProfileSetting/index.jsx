import React, { useRef, useState, useEffect } from "react";
import styles from "./EditProfile.module.css";
import { Avatar, Col, Row } from "antd";
import { NHButton, NHCard, NHInput, NHSelect } from "..";

export const ProfileSetting = () => {
  const [activeTab, setActiveTab] = useState("profile");

  const [userdetail, setUserDetail] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    societyName: "",
    country: "",
    state: "",
    city: "",
    profileImage: "",
  });

  const fileUpload = useRef(null);

  useEffect(() => {
    // Fetch user data from API
    fetch("/api/user")
      .then((res) => res.json())
      .then((data) => {
        setUserDetail(data);
      })
      .catch((error) => console.error("Error fetching user data:", error));
  }, []);

  const handleEditImage = () => {
    fileUpload.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!["image/jpeg", "image/png"].includes(file.type)) {
        alert("Only JPG and PNG files are allowed");
        return;
      }
      if (file.size > 2 * 1024 * 1024) {
        alert("File size should not exceed 2MB");
        return;
      }

      const reader = new FileReader();
      reader.onload = (event) => {
        setUserDetail((prev) => ({
          ...prev,
          profileImage: event.target.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserDetail((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmitData = (e) => {
    e.preventDefault();
    // Add validation or API call here
    console.log("Submitting Data:", userdetail);
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <>
      <div className="bg-gradient-to-b from-indigo-600 to-indigo-700 p-6 relative min-h-[35%]">
        <div className={styles.profileCard}>
          <div className={styles.profile}>
            <form action="" onSubmit={handleSubmitData}>
              <h3 className="mb-10 text-white text-5xl">Profile Setting</h3>

              <NHCard className="bg-white p-0">
                <div className="flex">
                  <div className="w-1/4 border-r min-h-[calc(100vh-400px)]">
                    <div className="flex flex-col items-center py-8 px-4">
                      <img
                        src={
                          userdetail.profileImage || "https://i.pravatar.cc/300"
                        }
                        alt="Profile"
                        className="w-[70%] rounded-full mb-6 border-4 border-white shadow-lg"
                      />
                      <h2 className="text-xl font-semibold">
                        {userdetail.firstName || "Lincoln"}{" "}
                        {userdetail.lastName || "Phillips"}
                      </h2>
                    </div>

                    <div className="px-4">
                      <nav className="bg-gray-100 rounded-lg p-2">
                        <ul className="space-y-1">
                          <li>
                            <button
                              onClick={() => handleTabChange("profile")}
                              className={`w-full text-left px-4 py-3 rounded-md transition-all duration-200 ${
                                activeTab === "profile"
                                  ? "bg-white text-blue-600 shadow-sm font-medium"
                                  : "text-gray-600 hover:bg-gray-50"
                              }`}
                            >
                              Profile
                            </button>
                          </li>
                          <li>
                            <button
                              onClick={() => handleTabChange("changePassword")}
                              className={`w-full text-left px-4 py-3 rounded-md transition-all duration-200 ${
                                activeTab === "changePassword"
                                  ? "bg-white text-blue-600 shadow-sm font-medium"
                                  : "text-gray-600 hover:bg-gray-50"
                              }`}
                            >
                              Change Password
                            </button>
                          </li>
                          <li>
                            <button
                              onClick={() => handleTabChange("terms")}
                              className={`w-full text-left px-4 py-3 rounded-md transition-all duration-200 ${
                                activeTab === "terms"
                                  ? "bg-white text-blue-600 shadow-sm font-medium"
                                  : "text-gray-600 hover:bg-gray-50"
                              }`}
                            >
                              Terms & Condition
                            </button>
                          </li>
                          <li>
                            <button
                              onClick={() => handleTabChange("privacy")}
                              className={`w-full text-left px-4 py-3 rounded-md transition-all duration-200 ${
                                activeTab === "privacy"
                                  ? "bg-white text-blue-600 shadow-sm font-medium"
                                  : "text-gray-600 hover:bg-gray-50"
                              }`}
                            >
                              Privacy Policy
                            </button>
                          </li>
                        </ul>
                      </nav>
                    </div>
                  </div>

                  <div className="w-3/4 p-6">
                    {activeTab === "profile" && <Profile />}
                    {activeTab === "changePassword" && <ChangePassword />}
                    {activeTab === "terms" && <Terms />}
                    {activeTab === "privacy" && <Privacy />}
                  </div>
                </div>
              </NHCard>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    firstName: "Lincoln",
    lastName: "Phillips",
    email: "lincoln@example.com",
    phoneNumber: "",
    hospitalName: "New York Medical Center",
    country: "",
    state: "",
    city: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(profileData);
    setIsEditing(false);
  };

  return (
    <NHCard>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Edit Profile</h2>
        <div className="space-x-4">
          {isEditing && (
            <NHButton variant="default" onClick={() => setIsEditing(false)}>
              Cancel
            </NHButton>
          )}
          <NHButton
            variant={isEditing ? "primary" : "default"}
            onClick={() => (isEditing ? handleSubmit() : setIsEditing(true))}
          >
            {isEditing ? "Save" : "Edit Profile"}
          </NHButton>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-3 gap-7">
          <NHInput
            label="First Name"
            name="firstName"
            value={profileData.firstName}
            onChange={handleChange}
            disabled={!isEditing}
            required
          />
          <NHInput
            label="Last Name"
            name="lastName"
            value={profileData.lastName}
            onChange={handleChange}
            disabled={!isEditing}
            required
          />
          <NHInput
            label="Email Address"
            name="email"
            type="email"
            value={profileData.email}
            onChange={handleChange}
            disabled={!isEditing}
            required
          />
        </div>

        <div className="grid grid-cols-3 gap-7">
          <NHInput
            label="Phone Number"
            name="phoneNumber"
            value={profileData.phoneNumber}
            onChange={handleChange}
            disabled={!isEditing}
          />
          <NHInput
            label="Hospital Name"
            name="hospitalName"
            value={profileData.hospitalName}
            onChange={handleChange}
            disabled={!isEditing}
          />
          <NHSelect
            label="Gender"
            name="gender"
            value={profileData.gender}
            onChange={handleChange}
            disabled={!isEditing}
            required
          />
          <NHInput
            label="Country"
            name="country"
            value={profileData.city}
            onChange={handleChange}
            disabled={!isEditing}
          />
          <NHInput
            label="State"
            name="state"
            value={profileData.state}
            onChange={handleChange}
            disabled={!isEditing}
          />
          <NHInput
            label="City"
            name="city"
            value={profileData.city}
            onChange={handleChange}
            disabled={!isEditing}
          />
        </div>
      </form>
    </NHCard>
  );
};

const Terms = () => (
  <div className="space-y-6 ">
    <h3 className="fw-semibold lh-base text-[26px] pl-5">Terms & Conditions</h3>
    <div className="prose max-w-none bg-white p-6 rounded-lg overflow-y-auto h-[calc(100vh-400px)] gap-4 grid">
      <p className="text-gray-600">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce quis ante
        nisl. Sed dictum felis vitae tellus sagittis, at varius massa pulvinar.
        Aenean ut massa id nulla tincidunt convallis.Lorem ipsum dolor sit amet,
        consectetur adipiscing elit. Fusce quis ante nisl. Sed dictum felis
        vitae tellus sagittis, at varius massa pulvinar. Aenean ut massa id
        nulla tincidunt convallis.Lorem ipsum dolor sit amet, consectetur
        adipiscing elit. Fusce quis ante nisl. Sed dictum felis vitae tellus
        sagittis, at varius massa pulvinar. Aenean ut massa id nulla tincidunt
        convallis.
      </p>
      <p className="text-gray-600">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce quis ante
        nisl. Sed dictum felis vitae tellus sagittis, at varius massa pulvinar.
        Aenean ut massa id nulla adipiscing elit. Fusce quis ante nisl. Sed
        dictum felis vitae tellus sagittis, at varius massa pulvinar. Aenean ut
        massa id nulla tincidunt convallis.
      </p>
      <p className="text-gray-600">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce quis ante
        nisl. Sed dictum felis vitae tellus sagittis, at varius massa pulvinar.
        Aenean ut massa id nulla tincidunt convallis.Lorem ipsum dolor sit amet,
        consectetur adipiscing elit. Fusce quis ante nisl. Sed dictum felis
        vitae tellus sagittis, at varius massa pulvinar. Aenean ut massa id
        nulla tincidunt convallis.
      </p>
      <p className="text-gray-600">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce quis ante
        nisl. Sed dictum felis vitae tellus sagittis, at varius massa pulvinar.
        Aenean ut massa id nulla tincidunt convallis.Lorem ipsum dolor sit amet,
        consectetur adipiscing elit. Fusce quis ante nisl. Sed dictum felis
        vitae tellus sagittis, at varius massa pulvinar. Aenean ut massa id
        nulla tincidunt convallis.Lorem ipsum dolor sit amet, consectetur
        adipiscing elit. Fusce quis ante nisl.
      </p>
      <p className="text-gray-600">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce quis ante
        nisl. Sed dictum feliar. Aenean ut massa id nulla tincidunt
        convallis.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
        quis ante nisl. Sed dictum felis vitae tellus sagittis, at varius massa
        pulvinar. Aenean ut massa id nulla tincidunt convallis.
      </p>
      <p className="text-gray-600">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce quis ante
        nisl. Sed dictum felis vitae tellus sagittis, at varius massa pulvinar.
        Aenean ut massa id nulla tincidunt convallis.Lorem ipsum dolor sit amet,
        consectetur adipiscing elit. Fusce quis ante nisl. Sed dictum felis
        vitae tellus sagittis, at varius massa pulvinar. Aenean ut massa id
        nulla tincidunt convallis.Lorem ipsum dolor sit amet, consectetur
        adipiscing elit. Fusce quis ante nisl. Sed dictum felis vitae tellus
        sagittis, at varius massa pulvinar. Aenean ut massa id nulla tincidunt
        convallis. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        Fusce quis ante nisl. Sed dictum felis vitae tellus sagittis, at varius
        massa pulvinar. Aenean ut massa id nulla tincidunt convallis.Lorem ipsum
        dolor sit amet, consectetur adipiscing elit. Fusce quis ante nisl. Sed
        dictum felis vitae tellus sagittis, at varius massa pulvinar. Aenean ut
        massa id nulla tincidunt convallis.Lorem ipsum dolor sit amet,
        consectetur adipiscing elit. Fusce quis ante nisl. Sed dictum felis
        vitae tellus sagittis, at varius massa pulvinar. Aenean ut massa id
        nulla tincidunt convallis.
      </p>
      <p className="text-gray-600">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce quis ante
        nisl. Sed dictum felis vitae tellus sagittis, at varius massa pulvinar.
        Aenean ut massa id nulla tincidunt convallis.Lorem ipsum dolor sit amet,
        consectetur adipiscing elit. Fusce quis ante nisl. Sed dictum felis.
        Fusce quis ante nisl. Sed dictum felis vitae tellus sagittis, at varius
        massa pulvinar. Aenean ut massa id nulla tincidunt convallis.
      </p>
      <p className="text-gray-600">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce quis ante
        nisl. Sed dictum felis vitae tellus sagittis, at varius massa pulvinar.
        Aenean ut massa id nulla tincidunt convallis.Lorem ipsum dolor sit amet,
        consectetur adipiscing elit. Fusce quis ante nisl. Sed dictum felis
        vitae tellus sagittis, at varius massa pulvinar. Aenean ut massa id
        nulla tincidunt convallis.Lorem ipsum dolor sit amet, consectetur
        adipiscing elit. Fusce quis ante nisl. Sed dictum felis vitae tellus
        sagittis, at varius massa pulvinar. Aenean ut massa id nulla tincidunt
        convallis.
      </p>
    </div>
  </div>
);

const Privacy = () => (
  <div className="space-y-6">
    <h3 className="fw-semibold lh-base text-[26px] pl-5">Privacy Policy</h3>
    <div className="prose max-w-none bg-white p-6 rounded-lg overflow-y-auto h-[calc(100vh-400px)] gap-4 grid">
      <p className="text-gray-600">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce quis ante
        nisl. Sed dictum felis vitae tellus sagittis, at varius massa pulvinar.
        Aenean ut massa id nulla tincidunt convallis.Lorem ipsum dolor sit amet,
        consectetur adipiscing elit. Fusce quis ante nisl. Sed dictum felis
        vitae tellus sagittis, at varius massa pulvinar. Aenean ut massa id
        nulla tincidunt convallis.Lorem ipsum dolor sit amet, consectetur
        adipiscing elit. Fusce quis ante nisl. Sed dictum felis vitae tellus
        sagittis, at varius massa pulvinar. Aenean ut massa id nulla tincidunt
        convallis.
      </p>
      <p className="text-gray-600">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce quis ante
        nisl. Sed dictum felis vitae tellus sagittis, at varius massa pulvinar.
        Aenean ut massa id nulla adipiscing elit. Fusce quis ante nisl. Sed
        dictum felis vitae tellus sagittis, at varius massa pulvinar. Aenean ut
        massa id nulla tincidunt convallis.
      </p>
      <p className="text-gray-600">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce quis ante
        nisl. Sed dictum felis vitae tellus sagittis, at varius massa pulvinar.
        Aenean ut massa id nulla tincidunt convallis.Lorem ipsum dolor sit amet,
        consectetur adipiscing elit. Fusce quis ante nisl. Sed dictum felis
        vitae tellus sagittis, at varius massa pulvinar. Aenean ut massa id
        nulla tincidunt convallis.
      </p>
      <p className="text-gray-600">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce quis ante
        nisl. Sed dictum felis vitae tellus sagittis, at varius massa pulvinar.
        Aenean ut massa id nulla tincidunt convallis.Lorem ipsum dolor sit amet,
        consectetur adipiscing elit. Fusce quis ante nisl. Sed dictum felis
        vitae tellus sagittis, at varius massa pulvinar. Aenean ut massa id
        nulla tincidunt convallis.Lorem ipsum dolor sit amet, consectetur
        adipiscing elit. Fusce quis ante nisl.
      </p>
      <p className="text-gray-600">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce quis ante
        nisl. Sed dictum feliar. Aenean ut massa id nulla tincidunt
        convallis.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
        quis ante nisl. Sed dictum felis vitae tellus sagittis, at varius massa
        pulvinar. Aenean ut massa id nulla tincidunt convallis.
      </p>
      <p className="text-gray-600">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce quis ante
        nisl. Sed dictum felis vitae tellus sagittis, at varius massa pulvinar.
        Aenean ut massa id nulla tincidunt convallis.Lorem ipsum dolor sit amet,
        consectetur adipiscing elit. Fusce quis ante nisl. Sed dictum felis
        vitae tellus sagittis, at varius massa pulvinar. Aenean ut massa id
        nulla tincidunt convallis.Lorem ipsum dolor sit amet, consectetur
        adipiscing elit. Fusce quis ante nisl. Sed dictum felis vitae tellus
        sagittis, at varius massa pulvinar. Aenean ut massa id nulla tincidunt
        convallis. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        Fusce quis ante nisl. Sed dictum felis vitae tellus sagittis, at varius
        massa pulvinar. Aenean ut massa id nulla tincidunt convallis.Lorem ipsum
        dolor sit amet, consectetur adipiscing elit. Fusce quis ante nisl. Sed
        dictum felis vitae tellus sagittis, at varius massa pulvinar. Aenean ut
        massa id nulla tincidunt convallis.Lorem ipsum dolor sit amet,
        consectetur adipiscing elit. Fusce quis ante nisl. Sed dictum felis
        vitae tellus sagittis, at varius massa pulvinar. Aenean ut massa id
        nulla tincidunt convallis.
      </p>
      <p className="text-gray-600">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce quis ante
        nisl. Sed dictum felis vitae tellus sagittis, at varius massa pulvinar.
        Aenean ut massa id nulla tincidunt convallis.Lorem ipsum dolor sit amet,
        consectetur adipiscing elit. Fusce quis ante nisl. Sed dictum felis.
        Fusce quis ante nisl. Sed dictum felis vitae tellus sagittis, at varius
        massa pulvinar. Aenean ut massa id nulla tincidunt convallis.
      </p>
      <p className="text-gray-600">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce quis ante
        nisl. Sed dictum felis vitae tellus sagittis, at varius massa pulvinar.
        Aenean ut massa id nulla tincidunt convallis.Lorem ipsum dolor sit amet,
        consectetur adipiscing elit. Fusce quis ante nisl. Sed dictum felis
        vitae tellus sagittis, at varius massa pulvinar. Aenean ut massa id
        nulla tincidunt convallis.Lorem ipsum dolor sit amet, consectetur
        adipiscing elit. Fusce quis ante nisl. Sed dictum felis vitae tellus
        sagittis, at varius massa pulvinar. Aenean ut massa id nulla tincidunt
        convallis.
      </p>
    </div>
  </div>
);

const ChangePassword = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(passwordData);
    setIsEditing(false);
  };

  return (
    <NHCard
      title="Change Password"
      headerContent={
        <>
          <NHButton
            variant={isEditing ? "primary" : "default"}
            onClick={() => (isEditing ? handleSubmit() : setIsEditing(true))}
          >
            {isEditing ? "Save Changes" : "Change Password"}
          </NHButton>
        </>
      }
    >
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 gap-x-8 gap-y-6"
      >
        <NHInput
          label="Current Password"
          name="currentPassword"
          type="password"
          value={passwordData.currentPassword}
          onChange={handlePasswordChange}
          disabled={!isEditing}
          required
        />
        <NHInput
          label="New Password"
          name="newPassword"
          type="password"
          value={passwordData.newPassword}
          onChange={handlePasswordChange}
          disabled={!isEditing}
          required
        />
        <NHInput
          label="Confirm Password"
          name="confirmPassword"
          type="password"
          value={passwordData.confirmPassword}
          onChange={handlePasswordChange}
          disabled={!isEditing}
          required
        />
      </form>
    </NHCard>
  );
};
