import { useState } from 'react';
import { createReceptionist } from '@/axiosApi/ApiHelper';
import { useNavigate } from 'react-router-dom';

export const useCreateReceptionist = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    profilePicture: null,
    firstName: '',
    lastName: '',
    email: '',
    age: '',
    gender: [],
    phone: '',
    qualification: '',
    speciality: '',
    country: [],
    state: [],
    city: [],
    zipCode: '',
    fullAddress: '',
    emergencyContactNo: '',
  });

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
   

    const response = await createReceptionist(data);
    if (response.status === 1) {
      navigate('/admin/reception-management')
    }
  };

  return {
    formData,
    handleChange,
    handleSelectChange,
    handleFileChange,
    handleSubmit,
  };
};
