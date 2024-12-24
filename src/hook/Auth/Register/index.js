import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { getHospitals } from "@/axiosApi/ApiHelper";

export const useRegister = () => {
  let navigate = useNavigate();

  const [hospital, setHospital] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    firstName: "Dhairy",
    lastName: "Dobariya",
    email: "dhairydobaryia@gmail.com",
    phone: "+918511623428",
    gender: "Male",
    hospitalId: "",
    age: 30,
    address: {
      country: "INDIA",
      state: "Gujarat",
      city: "Surat",
      zipCode: "394180",
      fullAddress: "123 Main St, Los Angeles, CA 90001"
    },
    password: "dhairy@123",
    confirmPassword: "dhairy@123",
    termsAccepted: false,
  });

  // Fetch societies based on zip code
  const fetchHospital = async (zipCode) => {
    try {
      const response = await getHospitals();
      console.log(response.data);
      const filteredHospital = response?.data?.filter(
        (item) => item.zipcode === zipcode
      );
      console.log(filteredHospital)
      setHospital(filteredHospital);
    } catch (err) {
      toast.error("Error fetching societies.");
    }
  };

  // Handle zip code change and fetch societies
  const handleZipCodeChange = (e) => {
    console.log("code is run")
    setFormData((prev) => ({
      ...prev,
      address: { ...prev.address, zipCode: e.target.value },
    }));
    const { value } = e.target;
    setFormData((prev) => ({
      ...prev,
      address: { ...prev.address, zipCode: value },
    }));
    if (value.length === 5) {
      fetchHospital(value);
    }
  };

  // Map societies for dropdown
  const hospitalNames = hospital?.map((hospital) => {
    console.log(hospital)
    return (
      {
        value: hospital._id,
        label: hospital.name,
      })
  });

  // console.log(hospitalNames)

  // Handle input change
  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    // Check password match dynamically
    if (name === "password" || name === "confirmPassword") {
      setErrors((prevErrors) => ({
        ...prevErrors,
        confirmPassword:
          name === "confirmPassword" && value !== formData.password
            ? "Passwords do not match."
            : undefined,
      }));
    }
  };

  // Validate form data
  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName) newErrors.firstName = "First name is required.";
    if (!formData.lastName) newErrors.lastName = "Last name is required.";
    if (!formData.email) newErrors.email = "Email is required.";
    if (!formData.phoneNumber)
      newErrors.phoneNumber = "Phone number is required.";
    if (!formData.country) newErrors.country = "Country is required.";
    if (!formData.state) newErrors.state = "State is required.";
    if (!formData.city) newErrors.city = "City is required.";
    if (!formData.selectSociety)
      newErrors.selectSociety = "Please select a society.";
    if (!formData.password) newErrors.password = "Password is required.";
    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match.";
    if (!formData.termsAccepted)
      newErrors.termsAccepted = "You must accept the terms and conditions.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Check if all fields are filled and valid
  const isDisabled = Object.values(formData).some((value) => value === "");

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);
    try {
      const apiRequestData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phoneNumber: formData.phoneNumber,
        country: formData.country,
        state: formData.state,
        city: formData.city,
        selectSociety: formData.selectSociety,
        password: formData.password,
        confirmPassword: formData.confirmPassword,
        zipCode: formData.zipCode
      };

      // await register(apiRequestData);
      navigate("/admin/login");
      toast.success("Registration successful!");
    } catch (error) {
      toast.error(error.message || "Registration failed.");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    hospitalNames,
    formData,
    handleChange,
    handleZipCodeChange,
    handleSubmit,
    setFormData,
    isModalOpen,
    setIsModalOpen,
    errors,
    isLoading,
    isDisabled,
  };
};
