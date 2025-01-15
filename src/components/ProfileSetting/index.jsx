import React, { useRef, useState, useEffect } from "react";
import styles from "./EditProfile.module.css";
import { NHButton, NHCard, NHInput, NHPasswordInput, NHSelect } from "..";
import { useChangePassword } from "@/hook/Admin/AdminEditProfile/ChangePassword";
import { useDecodeToken } from "@/hook";
import { editAdminProfile } from "@/axiosApi/ApiHelper";
import toast from "react-hot-toast";
import { identifyRole } from "@/utils/identifyRole";

export const ProfileSetting = () => {
  const { token } = useDecodeToken();
  const [activeTab, setActiveTab] = useState("profile");
  const [isEditing, setIsEditing] = useState(false);

  const [userdetail, setUserDetail] = useState({
    firstName: "",
    lastName: "",
    fullName: "",
    phoneNumber: "",
    email: "",
    country: "",
    state: "",
    city: "",
    gender: "",
    profileImage: "",
  });

  const fileUpload = useRef(null);

  useEffect(() => {
    if (token?.userData) {
      const {
        fullName = "",
        email = "",
        phone = "",
        profilePicture = "",
        gender = "",
        role = "",
        address = {},
      } = token.userData;
      const { country = "", state = "", city = "" } = address;
      const [firstName = "", lastName = ""] = fullName.split(" ");

      setUserDetail({
        fullName: fullName || "",
        firstName: firstName || "",
        lastName: lastName || "",
        phoneNumber: phone || "",
        email: email || "",
        country: country || "",
        state: state || "",
        city: city || "",
        profileImage: profilePicture || "",
        gender: gender || "",
        role: role || "",
      });
    }
  }, [token]);

  const handleEditImage = () => {
    fileUpload.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!["image/jpeg", "image/png"].includes(file.type)) {
        toast.error("Only JPG and PNG files are allowed.");
        return;
      }
      if (file.size > 2 * 1024 * 1024) {
        toast.error("File size should not exceed 2MB.");
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

  const handleSubmitData = async (e) => {
    if (e) e.preventDefault();

    const payload = {
      firstName: userdetail.firstName || "",
      lastName: userdetail.lastName || "",
      email: userdetail.email,
      phone: userdetail.phoneNumber,
      address: {
        country: userdetail.country,
        state: userdetail.state,
        city: userdetail.city,
      },
      gender: userdetail.gender,
      profilePicture: userdetail.profileImage,
    };


    console.log("Payload being sent to API:", payload);


    console.log("Payload being sent to API:", payload);

    try {
      const response = await editAdminProfile(payload, identifyRole());

      if (response.status === 1) {
        const {
          firstName = "",
          lastName = "",
          email,
          phone,
          address = {},
          gender,
          profilePicture,
        } = response.data;

        setUserDetail((prev) => ({
          ...prev,
          fullName: `${firstName} ${lastName}`.trim(),
          phoneNumber: phone || "",
          email: email || "",
          country: address.country || "",
          state: address.state || "",
          city: address.city || "",
          profileImage: profilePicture || "",
          gender: gender || "",
        }));

        toast.success("Profile updated successfully!");
        return true;
      } else {
        toast.error(`Failed to update profile: ${response.message}`);
        return false;
      }
    } catch (error) {
      toast.error(`An error occurred while updating the profile: ${error.message}`);
      return false;
    }
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="bg-gradient-to-b from-indigo-600 to-indigo-700 p-6 relative h-[35%] min-h-[40vh]">
      <div className={styles.profileCard + " w-full h-full absolute top-1/4 left-[10.5%]"}>
        <div className={styles.profile + " w-[1200px] flex flex-col"}>
          <form action="" onSubmit={handleSubmitData}>
            <h3 className="mb-10 text-4xl text-white">Profile Setting</h3>
            <NHCard className="p-0 bg-white">
              <div className="flex">
                <div className="w-1/4 border-r min-h-[calc(100vh-400px)]">
                  <div className="flex flex-col items-center px-4 py-8">
                    <div className="img-box w-[150px] h-[150px] bg-[#D9D9D9] rounded-full border border-[#DFE0EB] relative flex flex-col items-center">
                      <img
                        src={userdetail?.profileImage || "https://i.pravatar.cc/300"}
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
                      {userdetail.firstName || "Lincoln"}{" "}
                      {userdetail.lastName || "Phillips"}
                    </h2>
                  </div>

                  <div className="px-4">
                    <nav className="p-2 bg-gray-100 rounded-lg">
                      <ul className="space-y-1">
                        <li>
                          <button
                            onClick={() => handleTabChange("profile")}
                            className={`w-full text-left px-4 py-3 rounded-xl transition-all  duration-200 ${activeTab === "profile" ? "bg-white text-blue-600 shadow-sm font-medium" : "text-gray-600 hover:bg-gray-50"}`}
                          >
                            Profile
                          </button>
                        </li>
                        <li>
                          <button
                            onClick={() => handleTabChange("changePassword")}
                            className={`w-full text-left px-4 py-3 rounded-md transition-all duration-200 ${activeTab === "changePassword" ? "bg-white text-blue-600 shadow-sm font-medium" : "text-gray-600 hover:bg-gray-50"}`}
                          >
                            Change Password
                          </button>
                        </li>
                        <li>
                          <button
                            onClick={() => handleTabChange("terms")}
                            className={`w-full text-left px-4 py-3 rounded-md transition-all duration-200 ${activeTab === "terms" ? "bg-white text-blue-600 shadow-sm font-medium" : "text-gray-600 hover:bg-gray-50"}`}
                          >
                            Terms & Condition
                          </button>
                        </li>
                        <li>
                          <button
                            onClick={() => handleTabChange("privacy")}
                            className={`w-full text-left px-4 py-3 rounded-md transition-all duration-200 ${activeTab === "privacy" ? "bg-white text-blue-600 shadow-sm font-medium" : "text-gray-600 hover:bg-gray-50"}`}
                          >
                            Privacy Policy
                          </button>
                        </li>
                      </ul>
                    </nav>
                  </div>
                </div>

                <div className="w-3/4 p-6">
                  {activeTab === "profile" && (
                    <Profile
                      userDetail={userdetail}
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
          </form>
        </div>
      </div>
    </div>
  );
};

const Profile = ({ userDetail, setUserDetail, handleSubmit, isEditing, setIsEditing }) => {
  const fileUpload = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetail((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!["image/jpeg", "image/png"].includes(file.type)) {
        toast.error("Only JPG and PNG files are allowed.");
        return;
      }
      if (file.size > 2 * 1024 * 1024) {
        toast.error("File size should not exceed 2MB.");
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

  const handleEditImage = () => {
    if (isEditing) {
      fileUpload.current.click();
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

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-3 gap-7">
          <NHInput
            label="First Name"
            name="firstName"
            value={userDetail.firstName}
            onChange={handleChange}
            disabled={!isEditing}
            required
          />
          <NHInput
            label="Last Name"
            name="lastName"
            value={userDetail.lastName}
            onChange={handleChange}
            disabled={!isEditing}
          />
          <NHInput
            label="Email Address"
            name="email"
            value={userDetail.email}
            onChange={handleChange}
            disabled={!isEditing}
            required
          />
        </div>

        <div className="grid grid-cols-3 gap-7">
          <NHInput
            label="Phone Number"
            name="phoneNumber"
            value={userDetail.phoneNumber}
            onChange={handleChange}
            disabled={!isEditing}
          />
          <NHInput
            label="Country"
            name="country"
            value={userDetail.country}
            onChange={handleChange}
            disabled={!isEditing}
          />
          <NHInput
            label="State"
            name="state"
            value={userDetail.state}
            onChange={handleChange}
            disabled={!isEditing}
          />
          <NHInput
            label="City"
            name="city"
            value={userDetail.city}
            onChange={handleChange}
            disabled={!isEditing}
          />
          <NHSelect
            label="Gender"
            name="gender"
            value={userDetail.gender}
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
          disabled={!isFormValid() || loading}
        >
          Change Password
        </NHButton>
      </div>
    </div>
  );
};
