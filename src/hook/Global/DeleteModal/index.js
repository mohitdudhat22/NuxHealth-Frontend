import { useState } from 'react';
import { DeleteData } from '@/axiosApi/ApiHelper';
import toast from 'react-hot-toast';

export const useDeleteModal = (fetchData) => {
  const [isDelete, setDelete] = useState();

  const deleteData = async (url, id) => {
    const response = await DeleteData(`${url}/${id}`);
    if (response.status = 1) {
      toast.success("Deleted Successfully");
      setDelete(false)
      fetchData()
    }
  };

  return { deleteData, isDelete, setDelete };
};