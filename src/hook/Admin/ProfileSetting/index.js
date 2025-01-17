import { useDecodeToken } from "@/hook/useDecodeToken";
import { useEffect, useRef, useState } from "react";
import { identifyRole } from "@/utils/identifyRole";
import { editProfile } from "@/axiosApi/ApiHelper";
import toast from "react-hot-toast";
import { setAuthHeader } from "@/axiosApi";
import Cookies from "js-cookie";

export const useEditProfile = () => {
    const [activeTab, setActiveTab] = useState("profile");
    const [isEditing, setIsEditing] = useState(false);
    const { token, setDecodedToken } = useDecodeToken();

    const [userDetail, setUserDetail] = useState({
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
    const [file, setFile] = useState(null); // New state to store the selected file
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
                metaData,
                age,
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
                dob: metaData?.patientData?.dob,
                height: metaData?.patientData?.height,
                weight: metaData?.patientData?.weight,
                fullAddress: address?.fullAddress,
                bloodGroup: metaData?.patientData?.bloodGroup,
                hospitalName: metaData?.doctorData?.hospitalName,
                age,
            });
        }
    }, [token]);

    const handleEditImage = () => {
        fileUpload.current.click();
    };

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            if (!["image/jpeg", "image/png"].includes(selectedFile.type)) {
                toast.error("Only JPG and PNG files are allowed.");
                return;
            }
            if (selectedFile.size > 2 * 1024 * 1024) {
                toast.error("File size should not exceed 2MB.");
                return;
            }
            setFile(selectedFile);
            setUserDetail((prev) => ({
                ...prev,
                profileImage: URL.createObjectURL(selectedFile),
            }));
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

        const formData = new FormData();
        formData.append("firstName", userDetail.firstName || "");
        formData.append("lastName", userDetail.lastName || "");
        formData.append("email", userDetail.email);
        formData.append("phone", userDetail.phoneNumber);
        formData.append("gender", userDetail.gender);
        formData.append("country", userDetail.country);
        formData.append("state", userDetail.state);
        formData.append("city", userDetail.city);
        formData.append("dob", userDetail?.dob || "");
        formData.append("height", userDetail.height || "");
        formData.append("weight", userDetail.weight || "");
        formData.append("fullAddress", userDetail.fullAddress || "");
        formData.append("bloodGroup", userDetail.bloodGroup || "");
        formData.append("age", userDetail.age || "");
        if (file) {
            formData.append("profilePicture", file);
        }

        try {
            const response = await editProfile(formData, identifyRole());

            if (response.status === 1) {
                const {
                    fullName = "",
                    email = "",
                    phone = "",
                    profilePicture = "",
                    gender = "",
                    role = "",
                    address = {},
                    metaData,
                    age,
                    token
                } = response.data;
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
                    dob: metaData?.patientData?.dob,
                    height: metaData?.patientData?.height,
                    weight: metaData?.patientData?.weight,
                    fullAddress: address?.fullAddress,
                    bloodGroup: metaData?.patientData?.bloodGroup,
                    hospitalName: metaData?.doctorData?.hospitalName,
                    age: age,
                });
                setDecodedToken((prev) => ({
                    ...prev,
                    userData: {
                        ...prev.userData,
                        fullName: fullName || "",
                        email: email || "",
                        phone: phone || "",
                        country: country || "",
                        state: state || "",
                        city: city || "",
                        gender: gender || "",
                        profilePicture: profilePicture || "",
                        metaData: {
                            patientData: { ...metaData?.patientData },
                            doctorData: {
                                ...metaData?.doctorData
                            }
                        },
                        address: address,
                        age: age
                    }
                }))

                if (token) {
                    Cookies.set(import.meta.env.VITE_TOKEN_NAME, token, {
                        path: `/`,
                        expires: 7,
                        secure: process.env.NODE_ENV === "production",
                    });
                    setAuthHeader(token);
                }
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

    return {
        activeTab,
        isEditing,
        setIsEditing,
        userDetail,
        fileUpload,
        handleEditImage,
        handleFileChange,
        handleInputChange,
        handleSubmitData,
        handleTabChange,
        setUserDetail,
    };
};

