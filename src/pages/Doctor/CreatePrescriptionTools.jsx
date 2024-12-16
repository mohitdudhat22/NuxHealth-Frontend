import { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { FaCalendarAlt } from "react-icons/fa";
import CreatePrescription from "../../component/PrescriptionTools/CreatePrescription";
import { useGlobal } from "../../hooks/useGlobal";

const CreatePrescriptionTools = () => {
  const { getAllTodayAppointments, allAppointments } = useGlobal();
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    getAllTodayAppointments();
  }, []);

  // Format appointment time
  const formatTime = (dateString) => {
    return new Date(dateString).toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  // Transform appointment data to match your component props
  const transformedAppointments =
    allAppointments?.map((appointment) => ({
      id: appointment._id,
      name: `${appointment?.patientId?.firstName} ${appointment?.patientId?.lastName}`,
      age: appointment.patientId?.age,
      gender: appointment.patientId?.gender,
      appointmentType: appointment?.type,
      time: formatTime(appointment.appointmentTime),
      isNew:
        !appointment.patientId?.appointmentId ||
        appointment.patientId.appointmentId.length <= 1,
      // Additional data that might be needed
      patientId: appointment.patientId?._id,
      doctorId: appointment?.doctorId?._id,
      status: appointment?.status,
    })) || [];

  return (
    <div className="bg-[#F6F8FB] p-3 h-[92.5%]">
      <div className="cp-tool p-6 bg-white rounded-lg">
        <div className="flex justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold mb-4">Today Appointment</h1>
          </div>
          <div className="flex space-x-4">
            <div className="search-btn flex">
              <div className="flex items-center bg-gray-100 border border-gray-300 rounded-full px-4 py-2 new-xxl:w-[320px] new-xl:w-[300px] new-lg:w-[250px]">
                <div className="new-xxl:text-lg new-xl:text-lg new-lg:text-sm text-gray-700">
                  <CiSearch />
                </div>
                <input
                  type="text"
                  placeholder="Search Doctor"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="bg-transparent pl-2 new-xxl:text-lg new-xl:text-lg new-lg:text-sm"
                />
              </div>
            </div>
            <div className="flex items-center border py-2 px-3 rounded-lg">
              <FaCalendarAlt className="text-[#4F4F4F] text-xl me-2" />
              <h2 className="text-[20px] font-semibold text-[#141414]">
                2 March, 2024
              </h2>
            </div>
          </div>
        </div>
        <div className="cp-add grid grid-cols-1 new-lg:grid-cols-3 new-xl:grid-cols-3 new-xxl:grid-cols-4 gap-4 max-h-[calc(100vh-200px)] overflow-y-auto">
          {transformedAppointments?.map((appointment) => (
            <CreatePrescription
              key={appointment?.id}
              id={appointment?.id}
              name={appointment.name}
              age={appointment.age}
              gender={appointment.gender}
              appointmentType={appointment.appointmentType}
              time={appointment.time}
              isNew={appointment.isNew}
              status={appointment.status} // Additional prop if needed in the card
              patientId={appointment.patientId}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CreatePrescriptionTools;
