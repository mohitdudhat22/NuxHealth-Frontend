import { Route, Routes } from "react-router-dom";
import PersonalHealthRecord from "./profile/PersonalHealthRecord";
import PatientProfile from "./profile/PatientProfile";
import Prescriptions from "./profile/Prescriptions";
import TestReport from "./profile/TestReport";
import MedicalHistory from "./profile/MedicalHistory";
import AllAppointment from "./profile/Allappoiment";
import Appointment from "./Appointment";
import AppointmentBooking from "./AppointmentBooking";
import ChatScreen1 from "./ChatScreen1";
import PriscriptionAccess from "./PriscriptionAccess";
import Teleconsultation from "./Teleconsultation";
import Bills from "./Bills";
import PatientMeetingConference from "./PatientMeetingConference";
import { ErrorSharp } from "@mui/icons-material";
import { DashboardLayout } from "@/Layouts";
import { PatientPanelData } from "@/constants/data";

export default function PatientPanel() {
  return (
    <DashboardLayout items={PatientPanelData}>
      <Routes>
        <Route path="" element={<PersonalHealthRecord />} />
        <Route path="profile/*" element={<PatientProfile />} />
        <Route path="/prescriptions" element={<Prescriptions />} />
        <Route path="/testReport" element={<TestReport />} />
        <Route path="/medicalHistory" element={<MedicalHistory />} />
        <Route path="/allAppointment" element={<AllAppointment />} />
        <Route path="/appointment" element={<Appointment />} />
        <Route path="/bills" element={<Bills />} />
        <Route path="/teleconsultation" element={<Teleconsultation />} />
        <Route path="/appointmentBooking" element={<AppointmentBooking />} />
        <Route path="/priscriptionAccess" element={<PriscriptionAccess />} />
        <Route path="/chatScreen" element={<ChatScreen1 />} />
        <Route path="/vid" element={<PatientMeetingConference />} />
        <Route path="/404" element={<ErrorSharp />} />
      </Routes>
    </DashboardLayout>
  );
}
