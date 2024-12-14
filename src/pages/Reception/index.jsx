import React from "react";
import { Route, Routes } from "react-router-dom";
import { ReceptionPatientRegistration } from "../ReceptionPanel/ReceptionPatientRegistration";
import {
  AllAppointment,
  AppointmentBooking,
  ChatScreen1,
  MedicalHistory,
  PatientProfile,
  Prescriptions,
  TestReport,
} from "@/imports";
import Bills from "../patientPanel/Bills";
import Teleconsultation from "../patientPanel/Teleconsultation";
import PatientMeetingConference from "../PatientMeetingConference/PatientMeetingConference";
import { ErrorSharp } from "@mui/icons-material";
import { ReceptionPanelData } from "@/constants/data";

export const Reception = () => {
  return (
    <DashboardLayout items={ReceptionPanelData}>
      <Routes>
        <Route path="" element={"home"} />
        <Route
          path="/patientRegistration"
          element={<ReceptionPatientRegistration />}
        />
        <Route path="/appointment" element={"hello"} />

        <Route path="profile/*" element={<PatientProfile />} />
        <Route path="/prescriptions" element={<Prescriptions />} />
        <Route path="/testReport" element={<TestReport />} />
        <Route path="/medicalHistory" element={<MedicalHistory />} />
        <Route path="/allAppointment" element={<AllAppointment />} />

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
};
