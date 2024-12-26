import React from "react";
import { ErrorSharp } from "@mui/icons-material";
import { Route, Routes, } from "react-router-dom";
import Prescriptions from "../Patient/profile/Prescriptions";
import TestReport from "../Patient/profile/TestReport";
import MedicalHistory from "../Patient/profile/MedicalHistory";
import AllAppointment from "../Patient/profile/Allappoiment";
import ReceptionPatientRegistration from "./ReceptionPatientRegistration";
import ReceptionAppoinmentBooking from "./ReceptionAppoinmentBooking";
import ReceptionProfile from "./profile/ReceptionProfile";
import { DashboardLayout } from "@/Layouts";
import { ReceptionPanelData } from "@/constants/data";
import ReceptionAppoinment from "./ReceptionAppoinment";
import { ReceptionPatientHealthRecord } from "./ReceptionPatientHealthRecord";
import { MonitorBilling } from "./Billing/MonitorBilling";
import { Createbill } from "./Billing/Createbill";
import { ViewBill } from "./Billing/ViewBill";
import { Dashboard } from "./Dashboard";

const ReceptionPanel = () => {
  return (
    <DashboardLayout items={ReceptionPanelData}>
      <Routes>
        <Route path="" element={<Dashboard />} />
        <Route path="/patient-registration" element={<ReceptionPatientRegistration />} />
        <Route path="/PersonalHealth" element={<ReceptionPatientHealthRecord />} />
        <Route path="/PatientList" element={<PatientList />} />
        <Route path="/appointment" element={<ReceptionAppoinment />} />
        <Route path="/appointmentBooking" element={<ReceptionAppoinmentBooking />} />
        <Route path="profile/*" element={<ReceptionProfile />} />
        <Route path="/prescriptions" element={<Prescriptions />} />
        <Route path="/testReport" element={<TestReport />} />
        <Route path="/medicalHistory" element={<MedicalHistory />} />
        <Route path="/allAppointment" element={<AllAppointment />} />
        <Route path="/monitorBilling" element={<MonitorBilling />} />
        <Route path="/monitorBilling/createbill/" element={<Createbill />} />
        <Route path="/monitorBilling/createbill/:id" element={<Createbill />} />
        <Route path="/bill/:id" element={<ViewBill />} />
        <Route path="/404" element={<ErrorSharp />} />
      </Routes>
    </DashboardLayout>
  );
};

export default ReceptionPanel;
