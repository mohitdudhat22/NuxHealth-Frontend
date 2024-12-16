import { CiSearch } from "react-icons/ci";
import { FaEye } from "react-icons/fa";
import { useEffect, useState } from "react";
import PatientDetails from "./PatientDetails.jsx";
import { usePatient } from "../../hooks/usePatient.jsx";

const PatientManagement =() => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [activeTab, setActiveTab] = useState("today");
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredAppointments, setFilteredAppointments] = useState([]);

  const { getAllPatients, allPatients } = usePatient();

  const filterAppointments = () => {
    if (!allPatients || !Array.isArray(allPatients)) return [];

    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const allAppointments = allPatients.flatMap((patient) =>
      (patient.appointmentId || []).map((apt) => ({
        name: `${patient.firstName} ${patient.lastName}`,
        issue: apt.patient_issue,
        doctor: "Dr. " + (apt.doctorId?.name || "Unknown"),
        disease: apt.type,
        time: new Date(apt.appointmentTime).toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        }),
        type: apt.type === "follow_up" ? "Follow-up" : "Consultation",
        phone: patient.phone,
        age: `${patient.age} Years`,
        gender: patient.gender,
        address: patient.address,
        date: new Date(apt.date).toLocaleDateString("en-US", {
          day: "numeric",
          month: "short",
          year: "numeric",
        }),
        status: apt.status,
        appointmentDate: new Date(apt.date),
        patientDetails: {
          ...patient,
          appointment: apt,
        },
      })),
    );

    switch (activeTab) {
      case "today":
        return allAppointments.filter((apt) => {
          const aptDate = new Date(apt.appointmentDate);
          return (
            aptDate.getDate() === today.getDate() &&
            aptDate.getMonth() === today.getMonth() &&
            aptDate.getFullYear() === today.getFullYear() &&
            apt.status === "scheduled"
          );
        });

      case "upcoming":
        return allAppointments.filter(
          (apt) => apt.appointmentDate > tomorrow && apt.status === "scheduled",
        );

      case "previous":
        return allAppointments.filter(
          (apt) => apt.appointmentDate < today || apt.status === "completed",
        );

      case "cancelled":
        return allAppointments.filter((apt) => apt.status === "cancelled");

      default:
        return [];
    }
  };

  useEffect(() => {
    getAllPatients();
  }, []);

  useEffect(() => {
    const filtered = filterAppointments();
    setFilteredAppointments(filtered);
  }, [allPatients, activeTab]);

  const openModal = (patient) => {
    setSelectedPatient(patient.patientDetails);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedPatient(null);
  };

  // Filter based on search query
  const searchFilteredAppointments = filteredAppointments.filter(
    (appointment) =>
      appointment.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      appointment.issue.toLowerCase().includes(searchQuery.toLowerCase()) ||
      appointment.doctor.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <>
      <div className="patient-section h-[92%] p-2 bg-gray-100">
        <div className="row">
          <div className="main bg-white rounded-lg p-4 h-full">
            <div className="top-menu flex border-b border-gray-300 space-x-4 xl:space-x-6">
              <button
                className="text-base xl:text-lg text-gray-600 font-normal pb-3 focus:border-b-2 focus:border-blue-500 focus:text-blue-500"
                onClick={() => setActiveTab("today")}
              >
                Today Appointment
              </button>
              <button
                className="text-base xl:text-lg text-gray-600 font-normal pb-3 focus:border-b-2 focus:border-blue-500 focus:text-blue-500"
                onClick={() => setActiveTab("upcoming")}
              >
                Upcoming Appointment
              </button>
              <button
                className="text-base xl:text-lg text-gray-600 font-normal pb-3 focus:border-b-2 focus:border-blue-500 focus:text-blue-500"
                onClick={() => setActiveTab("previous")}
              >
                Previous Appointment
              </button>
              <button
                className="text-base xl:text-lg text-gray-600 font-normal pb-3 focus:border-b-2 focus:border-blue-500 focus:text-blue-500"
                onClick={() => setActiveTab("cancelled")}
              >
                Cancel Appointment
              </button>
            </div>
            <div className="top flex justify-between items-center py-4">
              <div className="heading">
                <h3 className="text-xl xl:text-2xl font-bold">
                  {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}{" "}
                  Appointments
                </h3>
              </div>
              <div className="search-btn flex">
                <div className="flex items-center bg-gray-100 rounded-full px-3 xl:px-4 py-2 w-64 xl:w-80">
                  <div className="text-xl text-gray-700">
                    <CiSearch />
                  </div>
                  <input
                    type="text"
                    placeholder="Search Doctor"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="bg-transparent pl-2 text-lg outline-none"
                  />
                </div>
              </div>
            </div>
            <div className="pr-data h-[80%] overflow-y-auto max-h-[calc(100vh-280px)] xl:max-h-[calc(100vh-249px)] scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-200">
              <table className="min-w-full table-auto">
                <thead className="sticky top-0 bg-[#F6F8FB] z-10">
                  <tr>
                    <th className="new-xxl:p-3 new-lg:p-1 new-xl:p-2 text-left new-xxl:text-lg new-lg:text-sm new-xl:text-base font-semibold rounded-tl-lg">
                      Patient Name
                    </th>
                    <th className="new-xxl:p-3 new-lg:p-1 new-xl:p-2 text-left new-xxl:text-lg new-lg:text-sm new-xl:text-base font-semibold">
                      Patient Issue
                    </th>
                    <th className="new-xxl:p-3 new-lg:p-1 new-xl:p-2 text-left new-xxl:text-lg new-lg:text-sm new-xl:text-base font-semibold">
                      Doctor Name
                    </th>
                    <th className="new-xxl:p-3 new-lg:p-1 new-xl:p-2 text-left new-xxl:text-lg new-lg:text-sm new-xl:text-base font-semibold">
                      Diseases Name
                    </th>
                    <th className="new-xxl:p-3 new-lg:p-1 new-xl:p-2 text-left new-xxl:text-lg new-lg:text-sm new-xl:text-base font-semibold">
                      Appointment Time
                    </th>
                    <th className="new-xxl:p-3 new-lg:p-1 new-xl:p-2 text-left new-xxl:text-lg new-lg:text-sm new-xl:text-base font-semibold">
                      Appointment Type
                    </th>
                    <th className="new-xxl:p-3 new-lg:p-1 new-xl:p-2 text-left new-xxl:text-lg new-lg:text-sm new-xl:text-base font-semibold rounded-tr-lg">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {searchFilteredAppointments.length > 0 ? (
                    searchFilteredAppointments.map((appointment, index) => (
                      <tr key={index} className="border-t">
                        <td className="flex items-center  new-xxl:p-3 new-lg:p-4 new-xl:py-3 new-xl:px-2">
                          <div className="avatar">
                            <img
                              src={
                                appointment.patientDetails?.avatar ||
                                "/img/Avatar.png"
                              }
                              alt="Avatar"
                              className="new-xxl:w-[40px] new-xxl:h-[40px] new-lg:w-[30px] new-lg:h-[30px] new-xl:w-[30px] new-xl:h-[30px] rounded-full mr-2"
                            />
                          </div>
                          <div className="name">
                            <h3 className="text-[#4F4F4F] new-xxl:text-lg new-lg:text-sm new-xl:text-sm font-bold">
                              {appointment.name}
                            </h3>
                          </div>
                        </td>
                        <td className="p-2 xl:p-3 text-[#4F4F4F] new-xxl:text-lg new-lg:text-sm new-xl:text-base font-semibold">
                          <h3>{appointment.issue}</h3>
                        </td>
                        <td className="p-2 xl:p-3 text-[#4F4F4F] new-xxl:text-lg new-lg:text-sm new-xl:text-base font-semibold">
                          <h3>{appointment.doctor}</h3>
                        </td>
                        <td className="p-2 xl:p-3 text-[#4F4F4F] new-xxl:text-lg new-lg:text-sm new-xl:text-base font-semibold">
                          <h3>{appointment.disease}</h3>
                        </td>
                        <td className="time p-2 ">
                          <h3 className="bg-[#F6F8FB] text-[#718EBF] rounded-full w-[80%] xl:w-[70%] py-1.5 xl:py-2 text-center new-xxl:text-lg new-lg:text-base new-xl:text-base font-semibold">
                            {appointment.time}
                          </h3>
                        </td>
                        <td className="time p-3">
                          <h3 className="bg-[#eef1fd] text-[#5678E9] rounded-full w-[80%] xl:w-[98%] py-1.5 xl:py-2 text-center new-xxl:text-lg new-lg:text-base new-xl:text-base font-semibold">
                            {appointment.type}
                          </h3>
                        </td>
                        <td className="action p-2 xl:p-3">
                          <div
                            className="bg-[#F6F8FB] text-[#0EABEB] rounded-lg new-xxl:w-10 new-xxl:h-10 new-lg:w-7 new-lg:h-7 new-xl:w-8 new-xl:h-8 px-2 py-2 text-center new-xxl:text-base new-lg:text-sm new-xl:text-base font-semibold flex items-center justify-center"
                            onClick={() => openModal(appointment)}
                          >
                            <FaEye />
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="7"
                        className="p-2 xl:p-3 text-center text-gray-600"
                      >
                        No appointments found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <PatientDetails patient={selectedPatient} closeModal={closeModal} />
          </div>
        </div>
      )}
    </>
  );
}

export default PatientManagement
