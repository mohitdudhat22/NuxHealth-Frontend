import { Route, Routes } from "react-router-dom";
import DoctorProfileEdit from "./profile/DoctorProfileEdit.jsx";
import AppointmentManagement from "./AppointmentManagement.jsx";
import PatientRecordAccesst from "./PatientRecordAccesst.jsx";
import ManagePrescriptionTools from "./ManagePrescriptionTools.jsx";
import TeleconsultationModule from "./TeleconsultationModule.jsx";
import AppointmentTimeSlot from "./AppointmentTimeSlot.jsx";
import PatientDetail from "./PatientDetail.jsx";
import PrescriptionView from "./PrescriptionView.jsx";
import DoctorProfile from "./profile/DoctorProfile.jsx";
import CreatePrescriptionForm from "./CreatePrescriptionForm.jsx";
import AllFiles from "./AllFiles.jsx";
import AddRecord from "./AddRecord.jsx";
import { DashboardLayout } from "@/Layouts/index.js";
import { DoctorPanelData } from "@/constants/data.jsx";
import DoctorMeetingConference from "./DoctorMeetingConference/DoctorMeetingConference.jsx";
import CreatePrescriptionTools from "./CreatePrescriptionTools.jsx";
import ChatScreen from "./ChatScreen.jsx";

const DoctorPanel = () => {
  return (
    <DashboardLayout items={DoctorPanelData}>
      <Routes>
        <Route path="profile/*" element={<DoctorProfile />} />
        <Route path="edit" element={<DoctorProfileEdit />} />
        <Route path="" element={<AppointmentManagement />} />
        <Route path="patientRecordAccesst" element={<PatientRecordAccesst />} />
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
        <Route path="appointmentTimeSlot" element={<AppointmentTimeSlot />} />
        {/* <Route path="appointmentTimeSlot" element={<Calendar />} /> */}
        <Route path="patientDetail/:id" element={<PatientDetail />} />
        <Route path="allFiles" element={<AllFiles />} />
        <Route path="prescriptionView/:id" element={<PrescriptionView />} />
        <Route
          path="createPrescriptionForm/:id"
          element={<CreatePrescriptionForm />}
        />
        <Route path="addRecord" element={<AddRecord />} />
        <Route path="vid" element={<DoctorMeetingConference />} />
      </Routes>
    </DashboardLayout>
  );
};

export default DoctorPanel;
