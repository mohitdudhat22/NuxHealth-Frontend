import { useState } from 'react';
import { createDoctor } from '@/axiosApi/ApiHelper';
import { useNavigate } from 'react-router-dom';

export const useCreateDoctor = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    profilePicture: null,
    signature: null,
    firstName: '',
    lastName: '',
    email: '',
    age: '',
    gender: [],
    phone: '+914586239872',
    qualification: '',
    speciality: '',
    workOn: [],
    morningSession: '6', /* */
    eveningSession: '4',/* */
    duration: '1',/* */
    country: [],
    state: [],
    city: [],
    zipCode: '',
    fullAddress: '',
    experience: '',
    description: '',
    consultationRate: '',
    onlineConsultationRate: '',
    worksiteLink: '',
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
    console.log(formData);
    const data = new FormData();

    Object.keys(formData).forEach((key) => {
      if (formData[key] !== null && formData[key] !== undefined) {
        data.append(key, formData[key]);
      }
    });

    for (let [key, value] of data.entries()) {
      console.log(`${key}:`, value);
    }

    const response = await createDoctor(data);
    if (response.status === 1) {
      navigate('/admin/doctor-management')
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