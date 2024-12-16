import { Link, useNavigate } from "react-router-dom";
import { FaCalendarAlt } from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";
import { IoEyeSharp } from "react-icons/io5";
import { TbCalendarClock } from "react-icons/tb";
import { TbCalendarX } from "react-icons/tb";
import { BiSolidCalendar } from "react-icons/bi";
import { GoSearch } from "react-icons/go";
import moment from "moment";
import { RiCalendarScheduleFill } from "react-icons/ri";
import { InputBase } from "@mui/material";
import { FiPhoneCall } from "react-icons/fi";
import { useEffect, useRef, useState } from "react";
import { IoCloseCircleOutline } from "react-icons/io5";
import { Search } from "@mui/icons-material";
import { useGlobal } from "../../hooks/useGlobal";
import { useAuth } from "../../hooks/useAuth";
import { useDoctor } from "../../hooks/useDoctor";
import CustomDateModal from "../../component/modals/CustomDateModal";

const Teleconsultation = () => {
  const [activeTab, setActiveTab] = useState("scheduled");
  const [openModal, setOpenModal] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const searchRef = useRef(null);
  const { user } = useAuth();
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [dateRange, setDateRange] = useState([null, null]);
  const { getAllDoctors, allDoctors } = useDoctor();
  const {
    getAllHospitals,
    allHospitals,
    getAllAppointmentById,
    allAppointmentsById,
    findPatientPrescriptions,
    patientPrescription,
  } = useGlobal();
  const [openCustomDateModal, setOpenCustomDateModal] = useState(false);

  const navigate = useNavigate();
  useEffect(() => {
    getAllDoctors();
    getAllHospitals();
    getAllAppointmentById(user?.id);
    findPatientPrescriptions(user.id);
  }, []);

  useEffect(() => {
    filterAppointments();
  }, [activeTab, allAppointmentsById, dateRange, searchTerm]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSearchOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  const handleJoinCall = (appointmentId) => {
    navigate(`/patient/vid?room=${appointmentId}`);
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  const filterAppointments = () => {
    const currentDate = moment();
    const [startDate, endDate] = dateRange;

    const filtered = allAppointmentsById?.filter((appointment) => {
      const appointmentDate = moment(appointment.date);
      const lowerSearchTerm = searchTerm.toLowerCase();

      const isWithinDateRange =
        !startDate ||
        !endDate ||
        (appointmentDate.isSameOrAfter(moment(startDate)) &&
          appointmentDate.isSameOrBefore(moment(endDate)));

      const matchesSearch =
        appointment.doctorId?.name?.toLowerCase().includes(lowerSearchTerm) ||
        appointment.type.toLowerCase().includes(lowerSearchTerm) ||
        appointment.patient_issue.toLowerCase().includes(lowerSearchTerm);

      switch (activeTab) {
        case "scheduled":
          return (
            appointmentDate.isAfter(currentDate) &&
            appointment.status === "scheduled" &&
            isWithinDateRange &&
            matchesSearch
          );
        case "previous":
          return (
            appointmentDate.isBefore(currentDate) &&
            appointment.status === "completed" &&
            isWithinDateRange &&
            matchesSearch
          );
        case "cancel":
          return (
            appointment.status === "canceled" &&
            isWithinDateRange &&
            matchesSearch
          );
        case "pending":
          return (
            appointment.status === "pending" &&
            isWithinDateRange &&
            matchesSearch
          );
        default:
          return false;
      }
    });
    setFilteredAppointments(filtered || []);
  };
  const handleViewDetails = (appointment) => {
    setSelectedAppointment(appointment);
    setOpenModal(true);
  };

  const clearDateRange = (e) => {
    e.stopPropagation();
    setDateRange([null, null]);
  };

  return (
    <>
      <div className="p-4 bg-[#f6f8fb]">
        <div className="mx-3 mt-5">
          <div className="bg-white shadow-lg h-auto p-4 rounded-xl">
            {/* Tab navigation */}
            <ul className="overflow-x-auto flex flex-nowrap border-b border-gray-300 new-lg:justify-start">
              {["scheduled", "previous", "cancel", "pending"].map((tab) => (
                <li key={tab} className="mr-4">
                  <button
                    onClick={() => setActiveTab(tab)}
                    className={`py-2 px-4 font-semibold text-sm ${
                      activeTab === tab
                        ? "text-[#0EABEB] border-b-2 border-[#0EABEB]"
                        : "text-gray-500"
                    }`}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)} Appointment
                  </button>
                </li>
              ))}
            </ul>

            {/* Tab content */}
            <div className="tab-content mt-3">
              <div className="w-full p-4">
                <div className="flex flex-col flex-row space-y-4 lg:space-y-0 lg:flex-row lg:justify-between lg:items-center">
                  {/* Title */}
                  <h1 className="sm:text-2xl new-lg:text-2xl new-xxl:grid-cols-4 text-md font-semibold text-gray-900">
                    My Appointment
                  </h1>

                  {/* Controls Container */}
                  <div className="flex flex-col space-y-4 new-sm:flex-row new-sm:justify-between new-sm:items-center sm:flex-row sm:space-y-0 sm:space-x-2">
                    <div ref={searchRef} className="relative">
                      <button
                        onClick={toggleSearch}
                        className="md:hidden hover:bg-gray-100 transition-colors h-12 w-12 rounded-md bg-[#f6f8fb] text-xl new-sm:mt-3"
                      >
                        <Search className="text-gray-600" />
                      </button>
                      <div
                        className={`
                          ${
                            isSearchOpen
                              ? "absolute top-[8px] left-[8px] w-[calc(100vw-2rem)] z-50"
                              : "hidden"
                          }
                          md:relative md:block
                        `}
                      >
                        <div className="flex items-center bg-gray-50 rounded-full px-4 py-2 sm:w-full new-lg:w-[100%] w-[40%]">
                          <Search className="h-4 w-4 text-gray-500 mr-2 flex-shrink-0" />
                          <input
                            type="text"
                            placeholder="Quick Search"
                            className="bg-transparent w-[130px] sm:w-[200px] new-lg:w-[100px] new-xl:w-[150px] new-xxl:w-[200px] focus:outline-none sm:text-sm text-gray-600 placeholder-gray-400 text-[10px]"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                          />
                          {isSearchOpen && (
                            <button
                              onClick={toggleSearch}
                              className="md:hidden ml-2 p-1 rounded-full hover:bg-gray-200 transition-colors"
                            >
                              <IoCloseCircleOutline className="h-4 w-4 text-gray-500" />
                            </button>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Date Selector */}
                    <div
                      className="flex items-center border rounded-md p-2 bg-white cursor-pointer relative"
                      onClick={() => setOpenCustomDateModal(true)}
                    >
                      <span className="pl-3 text-gray-500 me-1">
                        <FaCalendarAlt />
                      </span>
                      <input
                        type="text"
                        className="flex-1 focus:outline-none text-sm min-w-[159px] max-w-[300px] new-sm:min-w-[189px] new-sm:max-w-[300px] sm:min-w-[180px]"
                        value={
                          dateRange[0] && dateRange[1]
                            ? `${moment(dateRange[0]).format("MM/DD/YYYY")} - ${moment(dateRange[1]).format("MM/DD/YYYY")} `
                            : "Select Date Range"
                        }
                        readOnly
                      />
                      <div
                        className="h-5 w-5 rounded-full bg-red-500 flex items-center justify-center cursor-pointer text-white"
                        onClick={clearDateRange}
                      >
                        <IoCloseSharp />
                      </div>
                    </div>

                    {/* Book Appointment Button */}
                    <Link to="/patient/appointmentBooking">
                      <button className="w-auto new-lg:px-2 new-lg:py-2 new-lg:text-sm new-xl:px-3 new-xl:py-2 new-xl:text-base px-3 py-3 sm:px-4 sm:py-2 bg-sky-500 hover:bg-sky-600 transition-colors rounded-md text-white flex items-center justify-center w-[calc(100vw-2rem)] z-50">
                        <BiSolidCalendar className="h-5 w-5" />
                        <span className="hidden sm:inline-block sm:ml-2">
                          Book Appointment
                        </span>
                      </button>
                    </Link>
                  </div>
                </div>
              </div>

              <div className="overflow-y-auto" style={{ height: "550px" }}>
                <div className="grid grid-cols-1 md:grid-cols-2 new-lg:grid-cols-3 new-xxl:grid-cols-4 new-sm:grid-cols-1 new-sm:w-[70%] new-lg:w-[100%] new-sm:m-auto gap-4">
                  {filteredAppointments.map((appointment) => (
                    <div
                      key={appointment.id}
                      className="w-full mx-auto bg-white rounded-lg shadow-md"
                    >
                      <div className="bg-[#f6f8fb] p-3 flex items-center justify-between">
                        <h2 className="text-lg font-semibold text-foreground">
                          {appointment.doctorId?.name || "N/A"}
                        </h2>
                        <div className="flex">
                          {/* <div className="bg-white rounded-lg border text-[#A7A7A7] hover:text-[#0EABEB] transition duration:100 p-2 me-2">
                            <RiCalendarScheduleFill />
                          </div> */}
                          <div
                            onClick={() => handleViewDetails(appointment)}
                            className="bg-white rounded-lg border text-[#A7A7A7] hover:text-[#0EABEB] transition duration:300 p-2"
                          >
                            <IoEyeSharp />
                          </div>
                        </div>
                      </div>
                      <div className="p-3 border">
                        <div className="flex items-center justify-between">
                          <span className="text-base font-normal text-[#818194]">
                            Appointment Type
                          </span>
                          <span className="text-sm font-medium text-[#FFC313]">
                            {appointment.type || "N/A"}
                          </span>
                        </div>
                        <div className="mt-1 flex items-center justify-between">
                          <span className="text-base font-normal text-[#818194]">
                            Hospital Name
                          </span>
                          <p className="text-sm font-medium text-[#4F4F4F]">
                            {appointment?.doctorId?.hospitalName || "N/A"}
                          </p>
                        </div>
                        <div className="mt-1 flex items-center justify-between">
                          <span className="text-base font-normal text-[#818194]">
                            Appointment Date
                          </span>
                          <p className="text-sm font-medium text-[#4F4F4F]">
                            {appointment.date
                              ? moment(appointment.date).format("YYYY-MM-DD")
                              : "N/A"}
                          </p>
                        </div>
                        <div className="mt-1 flex items-center justify-between">
                          <span className="text-base font-normal text-[#818194]">
                            Appointment Time
                          </span>
                          <p className="text-sm font-medium text-[#4F4F4F]">
                            {appointment.date
                              ? moment(appointment.date).format("HH:mm")
                              : "N/A"}
                          </p>
                        </div>
                        <div className="mt-1 flex items-center justify-between">
                          <span className="text-base font-normal text-[#818194]">
                            Patient Issue
                          </span>
                          <p className="text-sm font-medium text-[#4F4F4F]">
                            {appointment.patient_issue || "N/A"}
                          </p>
                        </div>
                        {activeTab === "scheduled" && (
                          <div className="flex justify-between mt-4">
                            <button className="border p-2 rounded-md w-[47%] text-lg font-semibold text-[#4F4F4F] flex items-center justify-center">
                              <TbCalendarX className="me-2" />
                              Cancel
                            </button>
                            <button
                              className="bg-[#f6f8fb] text-[#4F4F4F] hover:bg-[#39973D] text-lg font-semibold hover:text-white transition duration-300 p-2 rounded-md w-[47%] flex items-center justify-center"
                              onClick={() => handleJoinCall(appointment._id)}
                            >
                              <FiPhoneCall className="me-2" />
                              Join Call
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {openModal && selectedAppointment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-40">
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="max-w-xl bg-white rounded-lg shadow-lg p-5">
              <div className="flex justify-between items-center border-b pb-2">
                <h2 className="text-lg font-bold text-[#030229] me-20">
                  {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}{" "}
                  Appointment
                </h2>
                <button
                  className="w-6 h-6 bg-red-600 text-white rounded-full flex justify-center items-center"
                  onClick={() => setOpenModal(false)}
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="mt-4">
                {/* Render appointment details */}
                <p className="text-[#4F4F4F] text-base font-normal flex justify-between">
                  Appointment Type:{" "}
                  <span className="text-[#FFC313] bg-[#fff9e7] px-3 py-1 rounded-full">
                    {selectedAppointment.type || "N/A"}
                  </span>
                </p>
                <p className="text-[#4F4F4F] text-base font-normal flex justify-between my-2">
                  Appointment Date:{" "}
                  <span className="text-[#030229]">
                    {selectedAppointment.date
                      ? moment(selectedAppointment.date).format("YYYY-MM-DD")
                      : "N/A"}
                  </span>
                </p>
                <p className="text-[#4F4F4F] text-base font-normal flex justify-between">
                  Appointment Time:{" "}
                  <span className="text-[#030229]">
                    {selectedAppointment.date
                      ? moment(selectedAppointment.date).format("HH:mm")
                      : "N/A"}
                  </span>
                </p>
                <p className="text-[#4F4F4F] text-base font-normal flex justify-between my-2">
                  Hospital Name:{" "}
                  <span className="text-[#030229]">
                    {selectedAppointment?.doctorId?.hospitalName || "N/A"}
                  </span>
                </p>
                <p className="text-[#4F4F4F] text-base font-normal flex justify-between">
                  Patient Issue:{" "}
                  <span className="text-[#030229]">
                    {selectedAppointment.patient_issue || "N/A"}
                  </span>
                </p>
                <p className="text-[#4F4F4F] text-base font-normal flex justify-between my-2">
                  Doctor Name:{" "}
                  <span className="text-[#030229]">
                    {selectedAppointment.doctorId.name || "N/A"}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      <CustomDateModal
        open={openCustomDateModal}
        onClose={() => setOpenCustomDateModal(false)}
        onApply={(newRange) => {
          setDateRange(newRange);
          setOpenCustomDateModal(false);
        }}
      />
    </>
  );
};

export default Teleconsultation;
