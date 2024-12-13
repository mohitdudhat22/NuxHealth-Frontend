//
// import { Route, Routes } from "react-router-dom";
//
// import DoctorAsidePanel from "../../component/doctorComponents/DoctorAsidePanel.jsx";
//
//
//
//
//
// import { useGlobal } from "../../hooks/useGlobal.jsx";
// import { SearchResult } from "../SearchResult.jsx";

// export default function DoctorPanel() {
//   const { searchTerm, setSearchTerm } = useGlobal();
//   const { selectedOption, setSelectedOption } = useGlobal();
//   return (
//     <>
//       <DoctorAsidePanel />
//       <div className="content w-[85%] ml-[15%] h-screen overflow-y-scroll">
//         <DoctorHeader />
//         {searchTerm === "" ? (
//           <Routes>
//             <Route path="profile/*" element={<DoctorProfile />} />
//             <Route path="edit" element={<DoctorProfileEdit />} />
//             <Route path="" element={<AppointmentManagement />} />

//             <Route
//               path="patientRecordAccesst"
//               element={<PatientRecordAccesst />}
//             />
//             <Route
//               path="createPrescriptionTools"
//               element={<CreatePrescriptionTools />}
//             />
//             <Route
//               path="managePrescriptionTools"
//               element={<ManagePrescriptionTools />}
//             />
//             <Route
//               path="teleconsultationModule"
//               element={<TeleconsultationModule />}
//             />
//             <Route path="chatScreen" element={<ChatScreen />} />
//             <Route
//               path="appointmentTimeSlot"
//               element={<AppointmentTimeSlot />}
//             />
//             {/* <Route path="appointmentTimeSlot" element={<Calendar />} /> */}
//             <Route path="patientDetail/:id" element={<PatientDetail />} />
//             <Route path="allFiles" element={<AllFiles />} />

//             <Route path="prescriptionView/:id" element={<PrescriptionView />} />
//             <Route
//               path="createPrescriptionForm/:id"
//               element={<CreatePrescriptionForm />}
//             />

//             <Route path="addRecord" element={<AddRecord />} />
//             <Route path="vid" element={<DoctorMeetingConference />} />
//           </Routes>
//         ) : (
//           <SearchResult />
//         )}
//       </div>
//     </>
//   );
// }
import { useState } from "react";
import { Route, Routes, NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";
import DoctorHeader from "../../component/doctorComponents/DoctorHeader.jsx";
import DoctorProfileEdit from "./profile/DoctorProfileEdit.jsx";
import AppointmentManagement from "./AppointmentManagement.jsx";
import PatientRecordAccesst from "./PatientRecordAccesst.jsx";
import CreatePrescriptionTools from "./CreatePrescriptionTools.jsx";
import ManagePrescriptionTools from "./ManagePrescriptionTools.jsx";
import TeleconsultationModule from "./TeleconsultationModule.jsx";
import ChatScreen from "./ChatScreen.jsx";
import AppointmentTimeSlot from "./AppointmentTimeSlot.jsx";
import PatientDetail from "./PatientDetail.jsx";
import PrescriptionView from "./PrescriptionView.jsx";
import DoctorProfile from "./profile/DoctorProfile.jsx";
import CreatePrescriptionForm from "./CreatePrescriptionForm.jsx";
import Calendar from "../patientPanel/Calendar.jsx";
import AllFiles from "./AllFiles.jsx";
import AddRecord from "./AddRecord.jsx";
import DoctorMeetingConference from "../DoctorMeetingConference/DoctorMeetingConference.jsx";
import { FaCalendarAlt } from "react-icons/fa";
import { IoMdChatbubbles, IoMdListBox } from "react-icons/io";
import { RiBillLine } from "react-icons/ri";

import { MdOutlineWifiCalling } from "react-icons/md";
import { useGlobal } from "../../hooks/useGlobal.jsx";
import { useAuth } from "../../hooks/useAuth.jsx";
import { SearchResult } from "../SearchResult.jsx";
import { BsFillBagPlusFill } from "react-icons/bs";

export default function DoctorPanel() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [billingDropdownOpen, setBillingDropdownOpen] = useState(false);
  const { searchTerm, setSearchTerm } = useGlobal();
  const { selectedOption, setSelectedOption } = useGlobal();
  const { logout } = useAuth();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside
        className={`bg-white w-72 flex flex-col transition-all duration-300 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 fixed lg:static z-30`}
      >
        <div className="flex flex-col h-full">
          <div className="text-right pe-2">
            <button onClick={toggleSidebar} className="md:hidden">
              <X size={24} />
            </button>
          </div>
          <div className="logo p-4 text-center flex items-center justify-between border-b">
            {/* <NavLink to="/patient"> */}
            <img
              src="/img/logo.png"
              alt="Logo"
              className="w-full max-w-[200px] mx-auto"
              width="100%"
              height="auto"
            />
            {/* </NavLink> */}
          </div>
          <nav className="">
            <ul className="space-y-2 p-2">
              {[
                {
                  to: "/doctor",
                  icon: FaCalendarAlt,
                  text: "Appointment Management",
                },
                {
                  to: "/doctor/patientRecordAccesst",
                  icon: IoMdListBox,
                  text: "Patient Record Accesst",
                },
              ].map((item, index) => (
                <li key={index}>
                  <NavLink
                    to={item.to}
                    className="flex items-center  p-3 text-base font-semibold text-gray-500 focus:bg-gradient-to-r from-[#D5F1FA] focus:text-[#0EABEB] transition duration-300"
                  >
                    <item.icon className="me-2" />
                    <span>{item.text}</span>
                  </NavLink>
                </li>
              ))}
              <li>
                <div>
                  <button
                    onClick={() => setBillingDropdownOpen(!billingDropdownOpen)}
                    className="flex items-center w-full p-3 text-base font-semibold text-gray-500 hover:bg-gradient-to-r from-[#D5F1FA] hover:text-[#0EABEB] transition duration-300"
                  >
                    <BsFillBagPlusFill className="me-2" />
                    <span>Prescription Tools</span>
                    <svg
                      className={`w-4 h-4 ml-auto transition-transform ${
                        billingDropdownOpen ? "rotate-180" : ""
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>
                  {billingDropdownOpen && (
                    <ul className="pl-6 mt-2 space-y-2">
                      <li>
                        <NavLink
                          to="/doctor/createPrescriptionTools"
                          className="flex items-center p-2 text-sm text-gray-500 hover:text-[#0EABEB] transition duration-300"
                        >
                          <RiBillLine className="me-2" />
                          create
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          to="/doctor/managePrescriptionTools"
                          className="flex items-center p-2 text-sm text-gray-500 hover:text-[#0EABEB] transition duration-300"
                        >
                          <RiBillLine className="me-2" />
                          Manage
                        </NavLink>
                      </li>
                    </ul>
                  )}
                </div>
              </li>
              <li>
                <NavLink
                  to="/doctor/teleconsultationModule"
                  className="flex items-center p-3 text-base font-semibold text-gray-500  hover:bg-gradient-to-r from-[#D5F1FA] hover:text-[#0EABEB] transition duration-300"
                >
                  <MdOutlineWifiCalling className="mr-3 text-xl" />
                  <p>Teleconsultation Module</p>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/doctor/chatScreen"
                  className="flex items-center p-3 text-base font-semibold text-gray-500  hover:bg-gradient-to-r from-[#D5F1FA] hover:text-[#0EABEB] transition duration-300"
                >
                  <IoMdChatbubbles className="mr-3 text-xl" />
                  <p>Chat</p>
                </NavLink>
              </li>
            </ul>
          </nav>

          <div className="fixed bottom-[30px] left-0 right-0">
            <button
              onClick={logout}
              className="flex items-center w-full p-3 bg-[rgba(225,29,42,0.16)] text-[#e11d29] font-semibold"
            >
              <img src="../img/logout.png" alt="Logout" className="mr-2" />
              Logout
            </button>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm z-10">
          <div className="max-w-10xl py-1 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
            <button onClick={toggleSidebar} className="lg:hidden">
              {isSidebarOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
            <DoctorHeader />
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
          <div className="max-w-10xl mx-auto">
            {searchTerm === "" ? (
              <Routes>
                <Route path="profile/*" element={<DoctorProfile />} />
                <Route path="edit" element={<DoctorProfileEdit />} />
                <Route path="" element={<AppointmentManagement />} />
                <Route
                  path="patientRecordAccesst"
                  element={<PatientRecordAccesst />}
                />
                <Route
                  path="createPrescriptionTools"
                  element={<CreatePrescriptionTools />}
                />
                <Route
                  path="managePrescriptionTools"
                  element={<ManagePrescriptionTools />}
                />
                <Route
                  path="teleconsultationModule"
                  element={<TeleconsultationModule />}
                />
                <Route path="chatScreen" element={<ChatScreen />} />
                <Route
                  path="appointmentTimeSlot"
                  element={<AppointmentTimeSlot />}
                />
                {/* <Route path="appointmentTimeSlot" element={<Calendar />} /> */}
                <Route path="patientDetail/:id" element={<PatientDetail />} />
                <Route path="allFiles" element={<AllFiles />} />
                <Route
                  path="prescriptionView/:id"
                  element={<PrescriptionView />}
                />
                <Route
                  path="createPrescriptionForm/:id"
                  element={<CreatePrescriptionForm />}
                />
                <Route path="addRecord" element={<AddRecord />} />
                <Route path="vid" element={<DoctorMeetingConference />} />
              </Routes>
            ) : (
              <SearchResult />
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
