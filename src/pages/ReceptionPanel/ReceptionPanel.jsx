import React from 'react'
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { RiContactsBookFill } from "react-icons/ri";
import { FaUser } from "react-icons/fa";
import {
    FaCalendarCheck,
    FaFilePrescription,
    FaLaptopMedical,
    FaCalendarAlt,
} from "react-icons/fa";
import { IoMdChatbubbles } from "react-icons/io";
import { RiBillLine } from "react-icons/ri";
import { Route, Routes, NavLink } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import PatientHeader from "../../component/PatientComponents/PatientHeader";
import PersonalHealthRecord from '../patientPanel/profile/PersonalHealthRecord';
import PatientProfile from '../patientPanel/profile/PatientProfile';
import Prescriptions from '../patientPanel/profile/Prescriptions';
import TestReport from '../patientPanel/profile/TestReport';
import MedicalHistory from '../patientPanel/profile/MedicalHistory';
import AllAppointment from '../patientPanel/profile/Allappoiment';
import Appointment from '../patientPanel/Appointment';
import Bills from '../patientPanel/Bills';
import Teleconsultation from '../patientPanel/Teleconsultation';
import AppointmentBooking from '../patientPanel/AppointmentBooking';
import ChatScreen1 from '../patientPanel/ChatScreen1';
import PriscriptionAccess from "../patientPanel/PriscriptionAccess";
import PatientMeetingConference from '../PatientMeetingConference/PatientMeetingConference';
import { ErrorSharp } from '@mui/icons-material';
import { useGlobal } from '../../hooks/useGlobal';
import { ReceptionPatientRegistration } from './ReceptionPatientRegistration';
import { ReceptionAppoinment } from './ReceptionAppoinment';
import ReceptionAppoinmentBooking from './ReceptionAppoinmentBooking';

export const ReceptionPanel = () => {

    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
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
                className={`bg-white w-64 min-h-screen flex flex-col transition-all duration-300 ease-in-out ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"
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
                    <nav >
                        <ul className="space-y-2 p-2">
                            {[
                                {
                                    to: "",
                                    icon: FaUser,
                                    text: "Patient Registration",
                                },
                                {
                                    to: "/patient",
                                    icon: RiContactsBookFill,
                                    text: "Personal Health Record",
                                },
                                {
                                    to: "/reception/appointment",
                                    icon: FaCalendarCheck,
                                    text: "Appointment Booking",
                                },
                                {
                                    to: "/patient/priscriptionAccess",
                                    icon: FaFilePrescription,
                                    text: "Prescription Access",
                                },
                                {
                                    to: "/patient/teleconsultation",
                                    icon: FaLaptopMedical,
                                    text: "Teleconsultation Access",
                                },
                                {
                                    to: "/patient/chatScreen",
                                    icon: IoMdChatbubbles,
                                    text: "Chat",
                                },
                                {
                                    to: "/patient/bills",
                                    icon: RiBillLine,
                                    text: "Bills"
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
                        </ul>
                    </nav>
                    <div className="aside-img mx-auto w-4/5 bg-[#f4f4f4] text-center relative p-4 mb-4 rounded-lg">
                        <img
                            src="/img/header-img.png"
                            alt="Hospital"
                            className="absolute -top-16 left-1/2 transform -translate-x-1/2 w-1/2"
                        />
                        <div className="text mt-12">
                            <h3 className="text-[#141414] text-lg font-semibold">
                                Hospital appointment
                            </h3>
                            <p className="text-[#4f4f4f] text-sm py-2">
                                You have to fill up the form to be admitted to the hospital.
                            </p>
                            <div className="btn flex justify-center">
                                <button className="flex items-center bg-[#0eabeb] text-white px-4 py-2 rounded-lg">
                                    <FaCalendarAlt className="mr-2" />
                                    <span>Appointment</span>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="logout-btn">
                        <button
                            onClick={logout}
                            className="flex items-center w-full p-3 bg-[rgba(225,29,42,0.16)] text-[#e11d29] font-semibold"
                        >
                            <img src="../img/logout.png" alt="Logout" className="mr-2" />{" "}
                            Logout
                        </button>
                    </div>
                </div>
            </aside>

            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Header */}
                <header className="bg-white shadow-sm z-10">
                    <div className="max-w-10xl mx-auto py-1 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
                        <button onClick={toggleSidebar} className="lg:hidden">
                            {isSidebarOpen ? (
                                <X className="h-6 w-6" />
                            ) : (
                                <Menu className="h-6 w-6" />
                            )}
                        </button>
                        <PatientHeader />
                    </div>
                </header>

                {/* Page content */}

                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
                    <div className="max-w-10xl mx-auto py-2">
                        {searchTerm === "" ? (
                            <Routes>
                                {/* <Route path="" element={"home"} /> */}
                                <Route path="" element={<ReceptionPatientRegistration />} />
                                <Route path="/appointment" element={<ReceptionAppoinment />} />
                                <Route path="/appointmentBooking" element={<ReceptionAppoinmentBooking />} />


                                <Route path="profile/*" element={<PatientProfile />} />
                                <Route path="/prescriptions" element={<Prescriptions />} />
                                <Route path="/testReport" element={<TestReport />} />
                                <Route path="/medicalHistory" element={<MedicalHistory />} />
                                <Route path="/allAppointment" element={<AllAppointment />} />
                                <Route path="/bills" element={<Bills />} />
                                <Route path="/teleconsultation" element={<Teleconsultation />} />
                                <Route path="/priscriptionAccess" element={<PriscriptionAccess />} />
                                <Route path="/chatScreen" element={<ChatScreen1 />} />
                                <Route path="/vid" element={<PatientMeetingConference />} />
                                <Route path="/404" element={<ErrorSharp />} />
                            </Routes>
                        ) : (
                            <SearchResult />
                        )}
                    </div>
                </main>

            </div>

        </div>
    )
}
