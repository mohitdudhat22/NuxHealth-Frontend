import React from "react";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { RiContactsBookFill } from "react-icons/ri";
import { FaUser } from "react-icons/fa";
import { ErrorSharp } from "@mui/icons-material";
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
import PersonalHealthRecord from "../Patient/profile/PersonalHealthRecord";
import PatientProfile from "../Patient/profile/PatientProfile";
import Prescriptions from "../Patient/profile/Prescriptions";
import TestReport from "../Patient/profile/TestReport";
import MedicalHistory from "../Patient/profile/MedicalHistory";
import AllAppointment from "../Patient/profile/Allappoiment";
import Appointment from "../Patient/Appointment";
import Bills from "../Patient/Bills";
import Teleconsultation from "../Patient/Teleconsultation";
import AppointmentBooking from "../Patient/AppointmentBooking";
import ChatScreen1 from "../Patient/ChatScreen1";
import PriscriptionAccess from "../Patient/PriscriptionAccess";
import PatientMeetingConference from "../Patient/PatientMeetingConference";
import { useGlobal } from "../../hooks/useGlobal";
import ReceptionPatientRegistration from "./ReceptionPatientRegistration";
import ReceptionAppoinmentBooking from "./ReceptionAppoinmentBooking";
import ReceptionProfile from "./profile/ReceptionProfile";
import { DashboardLayout } from "@/Layouts";
import { ReceptionPanelData } from "@/constants/data";
import ReceptionAppoinment from "./ReceptionAppoinment";
import { ReceptionPatientHealthRecord } from "./ReceptionPatientHealthRecord";

const ReceptionPanel = () => {
  return (
    <DashboardLayout items={ReceptionPanelData}>
      <Routes>
        <Route path="" element={<ReceptionPatientRegistration />} />
        <Route path="/patientRegistration" element={<ReceptionPatientRegistration />} />
        <Route path="/patientHealthRecord" element={<ReceptionPatientHealthRecord />} />
        <Route path="/appointment" element={<ReceptionAppoinment />} />
        <Route path="/appointmentBooking" element={<ReceptionAppoinmentBooking />} />
        <Route path="profile/*" element={<ReceptionProfile />} />

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
    </DashboardLayout>
  );
};

export default ReceptionPanel;
