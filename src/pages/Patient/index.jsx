import { Route, Routes } from "react-router-dom";
import { DashboardLayout } from "@/Layouts";
import {
  AllAppointment,
  Appointment,
  AppointmentBooking,
  ChatScreen1,
  MedicalHistory,
  PatientProfile,
  PersonalHealthRecord,
  Prescriptions,
  TestReport,
} from "@/imports";
import { ErrorSharp } from "@mui/icons-material";
import PatientMeetingConference from "../PatientMeetingConference/PatientMeetingConference";
import Teleconsultation from "../patientPanel/Teleconsultation";
import Bills from "../patientPanel/Bills";
import { PatientPanelData } from "@/constants/data";

const PatientPanel = () => {
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
        {/* <Route path="/priscriptionAccess" element={<PriscriptionAccess />} /> */}
        <Route path="/chatScreen" element={<ChatScreen1 />} />
        <Route path="/vid" element={<PatientMeetingConference />} />
        <Route path="/404" element={<ErrorSharp />} />
      </Routes>
    </DashboardLayout>
  );
};

export default PatientPanel;
