import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Country, State, City } from "country-state-city";
import { CreateReception } from "@/axiosApi/ApiHelper";
import toast from "react-hot-toast";

const useReceptionManagement = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [profilePicturePreview, setProfilePicturePreview] = useState(null);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    profilePicture: null,
    gender: "",
    country: "",
    state: "",
    city: "",
    zipCode: "",
    address: "",
    qualification: "",
    emergencyContactNo: "",
    workingTime: "",
    breakTime: "",
  });

  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  useEffect(() => {
    setCountries(Country.getAllCountries());
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    switch (name) {
      case "country":
        const country = countries.find((c) => c.isoCode === value);
        setStates(State.getStatesOfCountry(country.isoCode));
        setCities([]);
        break;
      case "state":
        setCities(City.getCitiesOfState(formData.country, value));
        break;
    }
  };

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.type !== "image/png" && file.type !== "image/jpeg") {
      toast.error("Please upload a PNG or JPEG image");
      return;
    }

    setFormData((prev) => ({ ...prev, profilePicture: file }));
    const reader = new FileReader();
    reader.onloadend = () => setProfilePicturePreview(reader.result);
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    const data = formData;

    // Format and append text fields
    const textFields = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phone: data.phone,
      gender: data.gender,
      country: data.country,
      state: data.state,
      city: data.city,
      zipCode: data.zipCode,
      address: data.address,
      hospitalId: data.hospitalId,
      qualification: data.qualification,
      emergencyContactNo: data.emergencyContactNo,
      workingTime: data.workingTime,
      breakTime: data.breakTime,
    };

    // Append all text fields
    Object.entries(textFields).forEach(([key, value]) => {
      formDataToSend.append(key, value);
    });

    // Handle profile picture
    if (data.profilePicture) {
      formDataToSend.append("profilePicture", data.profilePicture);
    }

    const response = await CreateReception(formDataToSend);
    if (response) {
      navigate("/receptionManagement");
      toast.success("Reception added successfully");
    }
  };

  return {
    showPassword,
    setShowPassword,
    formData,
    handleChange,
    handleProfilePictureChange,
    handleSubmit,
    profilePicturePreview,
    countries,
    states,
    cities,
  };
};

export default useReceptionManagement;
