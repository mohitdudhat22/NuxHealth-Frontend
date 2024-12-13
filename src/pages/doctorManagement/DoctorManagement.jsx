import React, { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { MdAdd } from "react-icons/md";
import { BsGenderFemale, BsGenderMale } from "react-icons/bs";
import { FaEdit, FaEye } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
// import apiService from "../../services/api.js";
import { useNavigate } from "react-router-dom";
import Onsite from "./Onsite"; // Import the Onsite component
import Delete from "./Delete.jsx";
import { useDoctor } from "../../hooks/useDoctor.jsx";
import toast from "react-hot-toast";
import apiService from "../../services/api.js";
export default function DoctorManagement() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [openModel, setOpenModel] = useState(false);
  const [selectedDoctorId, setSelectedDoctorId] = useState(null);
  const navigate = useNavigate();
  const { getAllDoctors, allDoctors } = useDoctor();

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        await getAllDoctors();
      } catch (error) {
        setError(
          "Error fetching doctors: " +
            (error.response ? error.response.data.message : error.message)
        );
        toast.error("Error fetching doctors");
      } finally {
        setLoading(false);
      }
    };
    fetchDoctors();
  }, []);

  const handleDeleteSuccess = (deletedId) => {
    setDoctors((prevDoctors) =>
      prevDoctors.filter((doctor) => doctor._id !== deletedId)
    );
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
      const response = await apiService.DeleteDoctor(id);
      if (response.data) {
        toast.success("Doctor deleted successfully");
        await getAllDoctors();
      }
    } catch (error) {
      console.error("Error deleting doctor:", error);
      toast.error("Error deleting doctor");
    }
  };
  const renderDoctorsTable = () => {
    return (
      <div
        className="h-[100%] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-200"
        style={{ maxHeight: "calc(100vh - 180px)" }}
      >
        <table className="min-w-full table-layout table-auto">
          <thead className="sticky top-0 bg-gray-100 z-10">
            <tr>
              <th className="new-xxl:p-3 new-lg:p-1 new-xl:p-2 text-[#030229] text-center text-left new-xxl:text-lg new-lg:text-sm new-xl:text-base font-semibold rounded-tl-xl">
                Doctor Name
              </th>
              <th className="new-xxl:p-3 new-lg:p-1 new-xl:p-2 text-[#030229]  text-left new-xxl:text-lg new-lg:text-sm new-xl:text-base font-semibold">
                Gender
              </th>
              <th className="new-xxl:p-3 new-lg:p-1 new-xl:p-2 text-[#030229] text-center text-left new-xxl:text-lg new-lg:text-sm new-xl:text-base font-semibold">
                Qualification
              </th>
              <th className="new-xxl:p-3 new-lg:p-1 new-xl:p-2 text-[#030229] text-center text-left new-xxl:text-lg new-lg:text-sm new-xl:text-base font-semibold">
                Specialty
              </th>
              <th className="new-xxl:p-3 new-lg:p-1 new-xl:p-2 text-[#030229] text-center text-left new-xxl:text-lg new-lg:text-sm new-xl:text-base font-semibold">
                Working Time
              </th>
              <th className="new-xxl:p-3 new-lg:p-1 new-xl:p-2 text-[#030229] text-center text-left new-xxl:text-lg new-lg:text-sm new-xl:text-base font-semibold">
                Patient Check Up Time
              </th>
              <th className="new-xxl:p-3 new-lg:p-1 new-xl:p-2 text-[#030229] text-center text-left new-xxl:text-lg new-lg:text-sm new-xl:text-base font-semibold">
                Break Time
              </th>
              <th className="new-xxl:p-3 new-lg:p-1 new-xl:p-2 text-[#030229] text-center new-xxl:text-lg new-lg:text-sm new-xl:text-base font-semibold rounded-tr-xl">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredDoctors.length > 0 ? (
              filteredDoctors.map((doctor) => (
                <tr key={doctor._id} className="border-t text-center">
                  <td className="flex items-center new-xxl:p-3 new-lg:p-1 new-xl:p-2">
                    <div className="rounded-full overflow-hidden mr-2">
                      <img
                        src={doctor.avatar}
                        alt={doctor.name}
                        className="new-xxl:w-[40px] new-xxl:h-[40px] new-lg:w-[25px] new-lg:h-[25px] new-xl:w-[30px] new-xl:h-[30px]"
                      />
                    </div>
                    <div className="text-[#4F4F4F] new-xxl:text-lg new-lg:text-sm new-xl:text-base font-semibold">
                      <h3>{doctor.name}</h3>
                    </div>
                  </td>
                  <td className="">
                    {doctor.gender === "female" ? (
                      <BsGenderFemale className="w-5 h-5 text-[#718ebf] bg-[#f6f8fb] rounded-full mr-2  " />
                    ) : (
                      <div className="w-10 h-10 text-[#718ebf] bg-[#f6f8fb] rounded-full flex items-center justify-center text-lg">
                        <BsGenderMale />
                      </div>
                    )}
                  </td>
                  <td className="new-xxl:p-3 new-lg:p-1 new-xl:p-2 text-[#4F4F4F] new-xxl:text-lg font-semibold new-lg:text-base new-xl:text-lg">
                    {doctor.qualification}
                  </td>
                  <td className="new-xxl:p-3 new-lg:p-1 new-xl:p-2 text-[#4F4F4F] new-xxl:text-lg font-semibold new-lg:text-base new-xl:text-lg">
                    {doctor.speciality}
                  </td>
                  <td className="time new-xxl:p-3 new-lg:p-1 new-xl:p-2 text-[#4F4F4F] new-xxl:text-lg font-semibold new-lg:text-base new-xl:text-lg">
                    <h3>{doctor.workingOn}</h3>
                  </td>
                  <td className="text-[#718EBF] new-xxl:text-lg new-lg:text-base new-xl:text-lg font-semibold flex justify-center">
                    <h3 className="mx-8 bg-[#f6f8fb] rounded-full p-1 text-center w-[47%]">
                      {doctor.patientCheckupTime}
                    </h3>
                  </td>
                  <td className="text-[#718EBF] new-xxl:text-lg new-lg:text-base new-xl:text-lg font-semibold">
                    <h3 className="bg-[#f6f8fb] rounded-full p-1 text-center">
                      {doctor.breakTime}
                    </h3>
                  </td>
                  <td className="flex items-center justify-center pb-2 px-2 new-lg:px-1 new-xl:px-2">
                    <div
                      className="new-xxl:w-10 new-xxl:h-10 new-lg:w-7 new-lg:h-7 new-xl:w-8 new-xl:h-8 text-[#39973D] bg-[#f6f8fb] rounded-md flex items-center justify-center new-xxl:text-base new-lg:text-sm new-xl:text-base"
                      onClick={() => navigate(`/doctorEdit/${doctor._id}`)}
                    >
                      <FaEdit />
                    </div>
                    <div
                      className="new-xxl:w-10 new-xxl:h-10 new-lg:w-7 new-lg:h-7 new-xl:w-8 new-xl:h-8 text-[#0EABEB] bg-[#f6f8fb] rounded-md flex items-center justify-center new-xxl:text-base new-lg:text-sm new-xl:text-base mx-2"
                      onClick={() => handleViewDoctorDetails(doctor)}
                    >
                      <FaEye />
                    </div>
                    <div
                      className="new-xxl:w-10 new-xxl:h-10 new-lg:w-7 new-lg:h-7 new-xl:w-8 new-xl:h-8 text-[#E11D29] bg-[#f6f8fb] rounded-md flex items-center justify-center text-lg"
                      onClick={() => handleDeleteDoctor(doctor._id)}
                    >
                      <MdDelete />
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-center">
                  <div className="image">
                    <img src="/img/no_doctors.png" alt="No data" />
                    <h1>No Doctor Found</h1>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div>
      <div className="bg-[#F6F8FB] p-3 h-[97%]">
        <div className="bg-white rounded-lg p-2 shadow-lg">
          <div className="top flex justify-between items-center p-2 pb-5">
            <div className="heading font-bold text-[26px] new-lg:text-xl new-xl:text-[26px]">
              <h3>Doctor Management</h3>
            </div>
            <div className="flex items-center space-x-2">
              <div className="flex items-center bg-gray-100 border border-gray-300 rounded-full px-4 py-2 w-80 new-lg:w-64 new-xl:w-80">
                <div className="text-xl text-gray-700">
                  <CiSearch />
                </div>
                <input
                  type="text"
                  placeholder="Search Doctor"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="bg-transparent pl-2 text-lg new-lg:text-base new-xl:text-lg outline-none"
                />
              </div>
              <button
                className="btn flex items-center bg-[#0EABEB] text-white rounded-lg px-4 py-2 ml-2"
                onClick={() => navigate("/doctorAdd")}
              >
                <div className="bg-white text-[#0EABEB] rounded text-xl mr-2">
                  <MdAdd />
                </div>
                <div className="text font-semibold text-lg new-lg:text-base new-xl:text-lg">
                  <h3>Add New Doctor</h3>
                </div>
              </button>
            </div>
          </div>

          {loading && <h3>Loading...</h3>}
          {error && <h3 className="text-red-500">{error}</h3>}
          {!loading && !error && renderDoctorsTable()}
        </div>
      </div>

      {/* Modal for Onsite component */}
      {openModel && (
        <Onsite selectedDoctor={selectedDoctor} setOpenModel={setOpenModel} />
      )}

      {/* Modal for Delete doctor */}
      {selectedDoctorId && (
        <Delete
          deleteId={selectedDoctorId}
          onClose={setSelectedDoctorId(null)}
          onDeleteSuccess={handleDeleteSuccess}
        />
      )}
    </div>
  );
}
