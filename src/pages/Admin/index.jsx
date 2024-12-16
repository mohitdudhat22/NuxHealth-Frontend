import { Route, Routes } from "react-router-dom";
import { AdminPanelData } from "@/constants/data";
import Profile from "../profile/Profile";
import Edit from "../profile/Edit";
import {
  Bill2,
  Bill3,
  CreateBill,
  EditBill,
  EditDesignInvoice,
  Invoice,
} from "@/imports";
import { DashboardLayout } from "@/Layouts";
import MainBill from "../Patient/MainBill";
import PatientManagement from "../patientManagement/PatientManagement";
import MonitorBilling from "../billPayment/MonitorBilling";
import InsuranceClaims from "../billPayment/InsuranceClaims";
import PaymentMethod from "../billPayment/PaymentMethod";
import ReportingAndAnalytics from "../ReportingAndAnalytics/ReportingAndAnalytics";
//
import Dashboard from "./Dashboard";
import DoctorManagement from "./DoctorManagement";
import DoctorEdit from "./Doctors/DoctorEdit";
import DoctorAdd from "./Doctors/DoctorAdd";

const Admin = () => {
  return (
    <DashboardLayout items={AdminPanelData}>
      <Routes>
        <Route path="" element={<Dashboard />} />
        <Route path="profile/*" element={<Profile />} />
        <Route path="edit/" element={<Edit />} />
        <Route path="/createBill" element={<CreateBill />} />
        <Route path="/editBill/:id" element={<EditBill />} />
        <Route path="/bill/:id" element={<MainBill />} />
        <Route path="/bill2/:id" element={<Bill2 />} />
        <Route path="/bill3/:id" element={<Bill3 />} />
        <Route path="/editinvoice" element={<EditDesignInvoice />} />
        <Route path="doctorManagement" element={<DoctorManagement />} />
        <Route path="doctorAdd" element={<DoctorAdd />} />
        <Route path="doctorEdit/:doctorId" element={<DoctorEdit />} />
        <Route path="patientManagement" element={<PatientManagement />} />
        <Route path="monitorBilling" element={<MonitorBilling />} />
        <Route path="insuranceClaims" element={<InsuranceClaims />} />
        <Route path="paymentMethod" element={<PaymentMethod />} />
        <Route path="invoice" element={<Invoice />} />
        <Route
          path="reportingAndAnalytics"
          element={<ReportingAndAnalytics />}
        />
      </Routes>
    </DashboardLayout>
  );
};

export default Admin;
