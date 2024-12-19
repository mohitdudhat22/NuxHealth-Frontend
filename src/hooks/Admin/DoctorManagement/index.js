import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useDoctor } from "@/hooks/useDoctor.jsx";
import { DeleteDoctor } from "@/axiosApi/ApiHelper";

const useDoctorManagement = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [openModel, setOpenModel] = useState(false);
  const [selectedDoctorId, setSelectedDoctorId] = useState(null);
  const { getAllDoctors, allDoctors } = useDoctor();

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        await getAllDoctors();
      } catch (error) {
        setError(
          "Error fetching doctors: " +
            (error.response ? error?.response?.data?.message : error?.message)
        );
        toast.error("Error fetching doctors");
      } finally {
        setLoading(false);
      }
    };
    fetchDoctors();
  }, []);

  const handleDeleteSuccess = (deletedId) => {
    setSelectedDoctorId(null);
  };

  const handleViewDoctorDetails = (doctor) => {
    setSelectedDoctor(doctor);
    setOpenModel(true);
  };

  const filteredDoctors = allDoctors.filter((doctor) =>
    doctor?.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDeleteDoctor = async (id) => {
    try {
      const response = await DeleteDoctor(id);
      if (response.data) {
        toast.success("Doctor deleted successfully");
        await getAllDoctors();
      }
    } catch (error) {
      console.error("Error deleting doctor:", error);
      toast.error("Error deleting doctor");
    }
  };

  return {
    loading,
    error,
    searchTerm,
    setSearchTerm,
    selectedDoctor,
    openModel,
    setOpenModel,
    selectedDoctorId,
    setSelectedDoctorId,
    filteredDoctors,
    handleDeleteSuccess,
    handleViewDoctorDetails,
    handleDeleteDoctor,
  };
};

export default useDoctorManagement;
