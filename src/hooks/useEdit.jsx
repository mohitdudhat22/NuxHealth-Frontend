import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./useAuth";
import toast from "react-hot-toast";
import { useGlobal } from "./useGlobal";

export const useEdit = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { editAdminProfile, userData, editDoctorProfile } = useGlobal();
  const [profile, setProfile] = useState({
    ...userData,
  });
  const { getAllHospitals, allHospitals } = useGlobal();

  const [imageBlob, setImageBlob] = useState(null);

  useEffect(() => {
    getAllHospitals();
  }, []);

  useEffect(() => {
    setProfile((prevProfile) => ({
      ...prevProfile,
      hospitalId:
        profile?.hospitalId?._id ||
        profile?.hospitalId ||
        profile?.hospital?._id,
    }));
  }, [allHospitals]);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "hospitalName") {
      const hospitalName = allHospitals?.find(
        (hospital) => hospital._id === value
      );
      setProfile((prevProfile) => ({
        ...prevProfile,
        hospitalName: hospitalName?.name,
        hospitalId: hospitalName?._id,
        hospitalAddress: hospitalName?.address,
      }));
      return;
    }

    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
      hospitalId: profile.hospitalId?._id || profile.hospitalId,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setProfile((prev) => ({
        ...prev,
        avatar: previewUrl,
      }));

      const blob = new Blob([file], { type: file.type });
      setImageBlob(blob);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();

      //in this skip unavailable time
      Object.keys(profile).forEach((key) => {
        if (key === "unavailableTimes") return;
        formData.append(key, profile[key]);
      });
      if (imageBlob) formData.append("profilePic", imageBlob, "profile.jpg");
      if (user.role === "doctor") {
        await editDoctorProfile(user.id, formData);
        navigate("/doctor/profile");
        return;
      } else if (user.role === "admin") {
        await editAdminProfile(user.id, formData);
        navigate("/profile");
        return;
      }
      toast.success("Profile updated successfully");
    } catch (error) {
      console.error("Error saving profile:", error);
      toast.error("Error saving profile");
    }
  };

  return {
    profile,
    setProfile,
    handleInputChange,
    handleImageChange,
    handleFormSubmit,
    allHospitals,
  };
};
