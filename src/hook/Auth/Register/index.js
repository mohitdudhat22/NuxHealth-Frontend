import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { getHospitals, registerAdmin, registerPatient } from "@/axiosApi/ApiHelper";
import { Country } from "country-state-city";
export const useRegister = () => {
  const navigate = useNavigate();

  const [hospital, setHospital] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    gender: "",
    hospitalId: [],
    age: "",
    country: "",
    state: "",
    city: "",
    address: "",
    password: "",
    confirmPassword: "",
    termsAccepted: false,
    bloodGroup: "",
    dob: "",
    height: "",
    weight: "",
    phoneCode: ""
  });

  // Fetch hospitals based on zip code
  const fetchHospital = async (zipcode) => {
    try {
      const response = await getHospitals();
      const filteredHospital = response?.data?.filter(
        (item) => item.zipcode === zipcode
      );
      setHospital(filteredHospital);
    } catch (err) {
      toast.error("Error fetching hospitals.");
    }
  };

  // Handle zip code change and fetch hospitals
  const handleZipCodeChange = (e) => {
    const { value } = e.target;
    setFormData((prev) => ({
      ...prev,
      address: { ...prev.address, zipCode: value },
    }));
    if (value.length === 5) {
      fetchHospital(value);
    }
  };

  // Map hospitals for dropdown
  const hospitalNames = hospital?.map((hospital) => ({
    value: hospital._id,
    label: hospital.name,
  }));

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

    // Common fields for both Admin and Patient
    if (!formData.firstName) newErrors.firstName = "First name is required.";
    if (!formData.lastName) newErrors.lastName = "Last name is required.";
    if (!formData.email) newErrors.email = "Email is required.";
    if (!formData.phone) newErrors.phone = "Phone number is required.";
    if (!formData.gender) newErrors.gender = "Gender is required.";
    if (!formData.age) newErrors.age = "Age is required.";
    if (!formData.country) newErrors.country = "Country is required.";
    if (!formData.state) newErrors.state = "State is required.";
    if (!formData.city) newErrors.city = "City is required.";

    if (!formData.address) newErrors.fullAddress = "Address is required.";
    if (!formData.password) newErrors.password = "Password is required.";
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }
    if (!formData.termsAccepted) newErrors.termsAccepted = "You must accept the terms and conditions.";

    // Fields specific to Patient
    if (window.location.href.includes("reception")) {
      if (!formData.bloodGroup) newErrors.bloodGroup = "Blood group is required.";
      if (!formData.dob) newErrors.dob = "Date of birth is required.";
      if (!formData.height) newErrors.height = "Height is required.";
      if (!formData.weight) newErrors.weight = "Weight is required.";
    }

    // Fields specific to Admin
    if (!window.location.href.includes("reception")) {
      if (!formData.hospitalId || formData.hospitalId.length === 0) {
        newErrors.hospitalId = "Hospital is required for admin.";
      }
      if (!formData.zipCode) newErrors.zipCode = "Zip code is required.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Check if form is valid
  const isFormValid = () => {
    const commonFields = [
      formData.firstName,
      formData.lastName,
      formData.email,
      formData.phone,
      formData.gender,
      formData.age,
      formData.country,
      formData.state,
      formData.city,
      formData.address,
      formData.password,
      formData.confirmPassword,
      formData.termsAccepted,
    ];

    let specificFields = [];

    if (window.location.href.includes("reception")) {
      specificFields = [
        formData.bloodGroup,
        formData.dob,
        formData.height,
        formData.weight,
      ];
    } else {
      specificFields = [formData.zipCode, formData.hospitalId];

    }

    return (
      commonFields.every((field) => field) &&
      specificFields.every((field) => field) &&
      formData.password === formData.confirmPassword
    );
  };

  const isDisabled = !isFormValid();

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      const url = window.location.href;

      let apiRequestData;
      if (url.includes("reception")) {
        apiRequestData = {
          ...formData,
          age:Number(formData.age),
          fullAddress:formData.address,
          phoneCode: Country.getAllCountries().find((c) => c.name === formData.country).phonecode,
          phone: String("+" +Country.getAllCountries().find((c) => c.name === formData.country).phonecode) + formData.phone
        };
        await registerPatient(apiRequestData);
        toast.success("Patient registration successful!");
      } else {
        apiRequestData = {
          ...formData,
        };
        await registerAdmin(apiRequestData);
        toast.success("Admin registration successful!");
        navigate("/login");
      }
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
    isLoading,
    isDisabled,
    errors,
  };
};
