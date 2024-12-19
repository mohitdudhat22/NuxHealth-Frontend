import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useGlobal } from "@/hooks/useGlobal";
import { City, Country, State } from "country-state-city";

const useReceptionManagement = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
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
    password: "",
    emergencyContactNo: "",
    workingTime: "",
    breakTime: "",
    confirmPassword: "",
  });

  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  useEffect(() => {
    setCountries(Country.getAllCountries());
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === "country") {
      const country = countries.find((c) => c.isoCode === value);
      setStates(State.getStatesOfCountry(country.isoCode));
      setCities([]);
    } else if (name === "state") {
      setCities(City.getCitiesOfState(formData.country, value));
    }
  };

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!["image/png", "image/jpeg"].includes(file.type)) {
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
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    const formDataToSend = new FormData();
    const { confirmPassword, ...data } = formData;

    Object.entries(data).forEach(([key, value]) => {
      formDataToSend.append(key, value);
    });

    if (data.profilePicture) {
      formDataToSend.append("profilePicture", data?.profilePicture);
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
    profilePicturePreview,
    formData,
    countries,
    states,
    cities,
    handleChange,
    handleProfilePictureChange,
    handleSubmit,
  };
};

export default useReceptionManagement;
