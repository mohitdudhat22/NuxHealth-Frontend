import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { getHospitals, registerAdmin } from "@/axiosApi/ApiHelper";

export const useRegister = () => {
  let navigate = useNavigate();

  const [hospital, setHospital] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    gender: "",
    hospitalId: [],
    age: "",
    address: {
      country: "",
      state: "",
      city: "",
      zipCode: "",
      fullAddress: "Kamrej",
    },
    gender: "Male",
    age: 10,
    password: "",
    confirmPassword: "",
    termsAccepted: false,
  });

  // Fetch societies based on zip code
  const fetchHospital = async (zipcode) => {
    try {
      const response = await getHospitals();
      const filteredHospital = response?.data?.filter(
        (item) => item.zipcode === zipcode
      );
      setHospital(filteredHospital);
    } catch (err) {
      toast.error("Error fetching societies.");
    }
  };

  // Handle zip code change and fetch societies
  const handleZipCodeChange = (e) => {
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
    return (
      {
        value: hospital._id,
        label: hospital.name,
      })
  });

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
    if (!formData.phone) newErrors.phone = "Phone number is required.";
    if (!formData.gender) newErrors.gender = "Gender is required.";
    if (!formData.age) newErrors.age = "Age is required.";
    if (!formData.address.country) newErrors.country = "Country is required.";
    if (!formData.address.state) newErrors.state = "State is required.";
    if (!formData.address.city) newErrors.city = "City is required.";
    if (!formData.address.zipCode) newErrors.zipCode = "Zip code is required.";
    if (!formData.address.fullAddress) newErrors.fullAddress = "Address is required.";
    if (!formData.hospitalId) newErrors.hospitalId = "Hospital is required.";
    if (!formData.password) newErrors.password = "Password is required.";
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = "Passwords do not match.";
    if (!formData.termsAccepted) newErrors.termsAccepted = "You must accept the terms and conditions.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isFormValid = (data) => {
    const validateFields = (obj) => {
      for (let key in obj) {
        if (typeof obj[key] === "object" && !Array.isArray(obj[key])) {
          if (!validateFields(obj[key])) return false;
        } else if (
          obj[key] === "" ||
          obj[key] === null ||
          (Array.isArray(obj[key]) && obj[key].length === 0)
        ) {
          return false;
        }
      }
      return true;
    };

    const fieldsValid = validateFields(data);
    const specificConditions =
      data.password === data.confirmPassword && data.termsAccepted;

    return fieldsValid && specificConditions;
  };

  const isDisabled = !isFormValid(formData);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);
    try {
      const apiRequestData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        gender: formData.gender,
        age: formData.age,
        address: {
          country: formData.address.country,
          state: formData.address.state,
          city: formData.address.city,
          fullAddress: formData.address.fullAddress,
          zipCode: formData.address.zipCode
        },
        hospitalId: formData.hospitalId,
        password: formData.password,
        confirmPassword: formData.confirmPassword,
      };
      console.log(apiRequestData)
      await registerAdmin(apiRequestData);
      navigate("/login");
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