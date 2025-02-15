import { useEffect, useState } from "react";
import { createDoctor, editDoctor } from "@/axiosApi/ApiHelper";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Country } from "country-state-city";

export const useCreateDoctor = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const isEditing = !!id;
  const EditData = location?.state?.data;

  const [formData, setFormData] = useState({
    profilePicture: null,
    signature: null,
    firstName: "",
    lastName: "",
    email: "",
    age: "",
    gender: [],
    phone: "",
    qualification: "",
    speciality: "",
    workOn: [],
    morningSession: "null" /* */,
    eveningSession: "null" /* */,
    duration: "" /* */,
    country: [],
    state: [],
    city: [],
    zipCode: "",
    fullAddress: "",
    experience: "",
    description: "",
    consultationRate: "",
    onlineConsultationRate: "",
    worksiteLink: "",
    emergencyContactNo: "",
  });
  const [signature, setSignature] = useState(null);
  const [profilePicture, setProfilePicture] = useState(null);

  useEffect(() => {
    if (isEditing && EditData) {
      setFormData({
        firstName: EditData?.fullName?.split(" ")[0] || "",
        lastName: EditData?.fullName?.split(" ")[1] || "",
        email: EditData?.email || "",
        age: EditData?.age || "",
        gender: EditData?.gender || "",
        phone: EditData?.phone || "",
        qualification: EditData?.metaData?.doctorData?.qualification || "",
        speciality: EditData?.metaData?.doctorData?.speciality || "",
        workOn: EditData?.metaData?.doctorData?.workOn || "",
        morningSession: EditData?.metaData?.doctorData?.morningSession || "",
        eveningSession: EditData?.metaData?.doctorData?.eveningSession || "",
        duration: EditData?.metaData?.doctorData?.duration || "",
        country: EditData?.address?.country || "",
        state: EditData?.address?.state || "",
        city: EditData?.address?.city || "",
        zipCode: EditData?.address?.zipCode || "",
        fullAddress: EditData?.address?.fullAddress || "",
        experience: EditData?.metaData?.doctorData?.experience || "",
        description: EditData?.metaData?.doctorData?.description || "",
        consultationRate:
          EditData?.metaData?.doctorData?.consultationRate || "",
        onlineConsultationRate:
          EditData?.metaData?.doctorData?.onlineConsultationRate || "",
        worksiteLink: EditData?.metaData?.doctorData?.worksiteLink || "",
        emergencyContactNo:
          EditData?.metaData?.doctorData?.emergencyContactNo || "",
        profilePicture: EditData?.profilePicture || "",
        signature: EditData?.metaData?.doctorData?.signature || "",
      });
    }
  }, [EditData, isEditing]);

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
    if (file instanceof File) {
      setFormData((prev) => ({
        ...prev,
        [name]: file,
      }));
      if(name == "signature"){
        setSignature(URL.createObjectURL(file));
      }else if(name == "profilePicture"){
        setProfilePicture(URL.createObjectURL(file));
      }
    } else {
      console.error(`Invalid file for ${name}`);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();

    Object.keys(formData).forEach((key) => {
      if (formData[key] !== null && formData[key] !== undefined) {
        data.append(key, formData[key]);
      }
    });
    data.append("phoneCode", Country.getAllCountries().find((c) => c.name === formData.country).phonecode);
    data.delete("phone");
    data.append("phone", String("+" +Country.getAllCountries().find((c) => c.name === formData.country).phonecode + formData.phone) );
    if (isEditing) {
      const response = await editDoctor(id, data);
      if (response.status === 1) {
        navigate("/admin/doctor-management");
      }
    }

    if (!isEditing) {
      const response = await createDoctor(data);
      if (response.status === 1) {
        navigate("/admin/doctor-management");
      }
    }
  };

  return {
    formData,
    handleChange,
    handleSelectChange,
    handleFileChange,
    handleSubmit,
    isEditing,
    signature,
    profilePicture,
    setProfilePicture,
    setSignature,
  };
};
