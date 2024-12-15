import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import { TbCalendarClock, TbCalendarX } from "react-icons/tb";
import { FaCalendarAlt } from "react-icons/fa";
import CustomDateModal from "../../component/modals/CustomDateModal.jsx";
import CancelAppointmentModal from "../../component/modals/CancelAppointmentModal.jsx";
import { useAuth } from "../../hooks/useAuth.jsx";
import { useGlobal } from "../../hooks/useGlobal.jsx";
export default function AppointmentManagement() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { allAppointments, getAppointmetnsForDoctor } = useGlobal();

  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("Today Appointment");
  const [openCustomDateModal, setOpenCustomDateModal] = useState(false);
  const [openCancelAppointmentModal, setOpenCancelAppointmentModal] =
    useState(false);
  const [timeFilter, setTimeFilter] = useState("All");

  useEffect(() => {
    getAppointmetnsForDoctor(user.id);
  }, [user.id]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const formatTime = (timeString) => {
    const date = new Date(timeString);
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  const categorizeAppointments = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return {
      today: allAppointments.filter((apt) => {
        const aptDate = new Date(apt.date);
        aptDate.setHours(0, 0, 0, 0);
        return aptDate.getTime() === today.getTime();
      }),
      upcoming: allAppointments.filter((apt) => {
        const aptDate = new Date(apt.date);
        aptDate.setHours(0, 0, 0, 0);
        return aptDate > today;
      }),
      previous: allAppointments.filter((apt) => {
        const aptDate = new Date(apt.date);
        aptDate.setHours(0, 0, 0, 0);
        return aptDate < today;
      }),
      canceled: allAppointments.filter((apt) => apt.status === "cancelled"),
    };
  };

  const getAppointments = () => {
    const categorized = categorizeAppointments();
    switch (activeTab) {
      case "Today Appointment":
        return categorized.today;
      case "Upcoming Appointment":
        return categorized.upcoming;
      case "Previous Appointment":
        return categorized.previous;
      case "Cancel Appointment":
        return categorized.canceled;
      default:
        return [];
    }
  };

  const filterAppointmentsByTime = (appointments) => {
    const now = new Date();
    now.setHours(0, 0, 0, 0); // Set to start of today

    return appointments.filter((appointment) => {
      const appointmentDate = new Date(appointment.date);
      appointmentDate.setHours(0, 0, 0, 0); // Set to start of appointment day

      switch (timeFilter) {
        case "Day":
          return appointmentDate.getTime() === now.getTime();
        case "Week":
          let weekStart = new Date(now);
          weekStart.setDate(now.getDate() - now.getDay());
          const weekEnd = new Date(weekStart);
          weekEnd.setDate(weekStart.getDate() + 6);
          return appointmentDate >= weekStart && appointmentDate <= weekEnd;
        case "Month":
          return (
            appointmentDate.getMonth() === now.getMonth() &&
            appointmentDate.getFullYear() === now.getFullYear()
          );
        default:
          return true;
      }
    });
  };

  const filteredAppointments = getAppointments().filter((appointment) => {
    const lowerSearchTerm = searchTerm.toLowerCase();
    return (
      appointment.patientId.firstName.toLowerCase().includes(lowerSearchTerm) ||
      appointment.patient_issue.toLowerCase().includes(lowerSearchTerm)
    );
  });

  const timeFilteredAppointments =
    filterAppointmentsByTime(filteredAppointments);

  return (
    <div className="bg-[#F6F8FB] p-2 h-[92%]">
      <div className="p-6 bg-white rounded-lg shadow-md ">
        <div className="flex justify-between items-center mb-4  border-b  ">
          <div className="flex space-x-8 text-base font-normal text-gray-500 thead">
            {[
              "Today Appointment",
              "Upcoming Appointment",
              "Previous Appointment",
              "Cancel Appointment",
            ].map((tab) => (
              <button
                key={tab}
                className={
                  activeTab === tab
                    ? "!text-[#0EABEB] !border-b-2 !border-b-[#0EABEB] p-2"
                    : "text-gray-400"
                }
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div className="menu flex justify-between items-center mb-3">
          <h3 className="new-xxl:text-[20px] new-xl:text-[20px] new-lg:text-[18px] font-bold text-[#030229]">{activeTab}</h3>
          <div className="">
            <div className="flex items-center space-x-4">
              <div className="search-btn flex">
                <div className="flex items-center bg-gray-100 rounded-full ps-4 py-2 new-xxl:w-80 new-xl:w-60 new-lg:w-50">
                  <div className="text-xl text-gray-700">
                    <CiSearch />
                  </div>
                  <input
                    type="text"
                    placeholder="Search Doctor"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="bg-transparent pl-2 new-xxl:text-lg new-lg:text-sm"
                  />
                </div>
              </div>
              {(activeTab == "Cancel Appointment" ||
                activeTab == "Previous Appointment" ||
                activeTab == "Today Appointment" ||
                activeTab == "Upcoming Appointment") && (
                <select
                  value={timeFilter}
                  onChange={(e) => setTimeFilter(e.target.value)}
                  className="border rounded-lg  text-[#4F4F4F] px-5 py-2 text-base font-semibold"
                >
                  <option value="All">All Time</option>
                  <option value="Day">Today</option>
                  <option value="Week">Week</option>
                  <option value="Month">Month</option>
                </select>
              )}
              <div className="time-slot">
                <button
                  color="primary"
                  className="new-xxl:text-base time-slot bg-[#0EABEB] new-xxl:py-3 new-xxl:px-4 new-lg:px-2 new-lg:py-2 text-[#FFFFFF] rounded-lg flex items-center justify-center new-lg:text-sm"
                  onClick={() => navigate("/doctor/appointmentTimeSlot")}
                >
                  <FaCalendarAlt className="me-3" /> Appointment Time Slot
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="flex-grow overflow-hidden">
          <div className="max-h-[calc(100vh-260px)] overflow-y-auto">
            <table className="min-w-full table-auto">
              <thead className="sticky top-0 bg-gray-100 z-10">
                <tr>
                  <th className="new-xxl:p-3 new-lg:p-2 new-xl:p-2 text-left text-[#030229] new-xxl:text-lg new-lg:text-sm new-xl:text-base font-semibold rounded-tl-lg">
                    Patient Name
                  </th>
                  <th className="new-xxl:p-3 new-lg:p-2 new-xl:p-2 text-left text-[#030229] new-xxl:text-lg new-lg:text-sm new-xl:text-base font-semibold">
                    Dieses Name
                  </th>
                  <th className="new-xxl:p-3 new-lg:py-2 new-xl:p-2 text-left text-[#030229] new-xxl:text-lg new-lg:text-sm new-xl:text-base font-semibold">
                    Patient Issue
                  </th>
                  <th className="new-xxl:p-3 new-lg:p-2 new-xl:p-2 text-left text-[#030229] new-xxl:text-lg new-lg:text-sm new-xl:text-base font-semibold">
                    Appointment Date
                  </th>
                  <th className="new-xxl:p-3 new-lg:p-2 new-xl:p-2 text-left text-[#030229] new-xxl:text-lg new-lg:text-sm new-xl:text-base font-semibold">
                    Appointment Time
                  </th>
                  <th className="new-xxl:p-3 new-lg:p-2 new-xl:p-2 text-left text-[#030229] new-xxl:text-lg new-lg:text-sm new-xl:text-base font-semibold">
                    Appointment Type
                  </th>
                  <th className="new-xxl:p-3 new-lg:p-2 new-xl:p-2 text-center text-[#030229] new-xxl:text-lg new-lg:text-sm new-xl:text-base font-semibold rounded-tr-lg">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {timeFilteredAppointments.map((appointment) => (
                  <tr key={appointment._id} className="border-b">
                    <td className="new-xxl:p-3 new-lg:py-1 new-xl:p-2 text-[#4F4F4F] new-xxl:text-lg font-semibold new-lg:text-sm new-xl:text-base">
                      {`${appointment.patientId.firstName} ${appointment.patientId.lastName}`}
                    </td>
                    <td className="new-xxl:p-3 new-lg:py-1 new-xl:p-2 text-[#4F4F4F] new-xxl:text-lg font-semibold new-lg:text-base new-xl:text-base">
                      {appointment.dieseas_name}
                    </td>

                    <td className="new-xxl:p-3 new-lg:py-1 new-xl:p-2 text-[#4F4F4F] new-xxl:text-lg font-semibold new-lg:text-sm new-xl:text-base">
                      {appointment.patient_issue}
                    </td>
                    <td className="new-xxl:p-3 new-lg:py-1 new-xl:p-2 text-[#4F4F4F] new-xxl:text-lg font-semibold new-lg:text-sm new-xl:text-base">
                      <span>{formatDate(appointment.date)}</span>
                    </td>
                    <td className="new-xxl:p-3 new-lg:py-1 new-xl:p-2 text-center text-[#4F4F4F] new-xxl:text-lg font-semibold new-lg:text-sm new-xl:text-base">
                      <span className="p-2 bg-[#F6F8FB] rounded-full text-[#718EBF] font-semibold new-xxl:w-[90%] new-xl:w-[80%] new-lg:w-[88%] text-center">
                        {formatTime(appointment.appointmentTime)}
                      </span>
                    </td>
                    <td className="new-xxl:p-3 new-lg:py-1 new-xl:p-2 rounded-full text-center m-3">
                      <h3
                        className={`new-xxl:px-5 new-lg:px-2 py-2 text-[#4F4F4F]  new-xxl:text-lg font-semibold new-lg:text-sm new-xl:text-base rounded-full new-xxl:w-[80%] new-lg:w-[100%] text-center ${
                          appointment.type === "online"
                            ? "bg-yellow-100 text-yellow-600"
                            : "bg-[#eef1fd] text-[#5678E9]"
                        }`}
                      >
                        {appointment.type}
                      </h3>
                    </td>
                    <td className="action new-xxl:p-3 new-lg:py-2 new-lg:ps-2 new-xl:p-2 text-center font-semibold flex">
                      <div
                        className="text-blue-400 bg-gray-100 rounded-lg text-center cursor-pointer new-xxl:w-10 new-xxl:h-10 new-lg:w-75 new-lg:h-5  new-xl:w-8 new-xl:h-8 flex items-center justify-center text-[#4F4F4F] text-lg font-semibold mr-1"
                        onClick={() => setOpenCancelAppointmentModal(true)}
                      >
                        <TbCalendarX />
                      </div>
                      <div
                        className="text-blue-400 bg-gray-100 rounded-lg text-center cursor-pointer new-xxl:w-10 new-xxl:h-10 new-lg:w-75 new-lg:h-5 new-xl:w-8 new-xl:h-8 flex items-center justify-center text-[#4F4F4F] text-lg font-semibold"
                        onClick={() => navigate("/doctor/appointmentTimeSlot")}
                      >
                        <TbCalendarClock />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <CustomDateModal
          open={openCustomDateModal}
          onClose={() => setOpenCustomDateModal(false)}
          onApply={(dateRange) => {
            setDateRange(`${dateRange[0]} - ${dateRange[1]}`);
            setOpenCustomDateModal(false);
          }}
        />
        <CancelAppointmentModal
          open={openCancelAppointmentModal}
          onClose={() => setOpenCancelAppointmentModal(false)}
        />
      </div>
    </div>
  );
}
