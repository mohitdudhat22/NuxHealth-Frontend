import { useState } from 'react';
import { editAdminProfile } from '@/axiosApi/ApiHelper'; 

export const useEditAdminProfile = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const updateProfile = async (profileData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await editAdminProfile(profileData);
      return response;
    } finally {
      setLoading(false);
    }
  };

  return { updateProfile, loading, error };
};
