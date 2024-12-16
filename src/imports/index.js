import { lazy } from "react";
export { TailSpin } from "react-loader-spinner";

// Admin Components
export const Login = lazy(() => import("../pages/Login/Login.jsx"));
export const AdminRegistration = lazy(
  () => import("../pages/adminRegister/AdminRegistration.jsx")
);
export const AdminMobile = lazy(
  () => import("../pages/adminRegister/AdminMobile.jsx")
);
export const AdminOtp = lazy(
  () => import("../pages/adminRegister/AdminOtp.jsx")
);
export const AdminChangePassword = lazy(
  () => import("../pages/adminRegister/AdminChangePassword.jsx")
);

// Invoice Components
export const Invoice = lazy(() => import("../pages/invoice/Invoice.jsx"));
export const CreateBill = lazy(() => import("../pages/invoice/CreateBill.jsx"));
export const EditBill = lazy(() => import("../pages/invoice/EditBill.jsx"));

// Doctor Components
export const DoctorPanel = lazy(() => import("../pages/Doctor/index.jsx"));
export const DoctorProfile = lazy(
  () => import("../pages/Doctor/profile/DoctorProfile.jsx")
);

// Patient Components
export const PatientRegistration = lazy(
  () => import("../pages/PatientRegistration.jsx")
);
export const PatientPanel = lazy(() => import("../pages/Patient/index.jsx"));
export const PersonalHealthRecord = lazy(
  () => import("../pages/Patient/profile/PersonalHealthRecord.jsx")
);
export const PatientDetails = lazy(
  () => import("../pages/patientManagement/PatientDetails.jsx")
);
export const PatientProfile = lazy(
  () => import("../pages/Patient/profile/PatientProfile.jsx")
);
export const Prescriptions = lazy(
  () => import("../pages/Patient/profile/Prescriptions.jsx")
);
export const TestReport = lazy(
  () => import("../pages/Patient/profile/TestReport.jsx")
);
export const MedicalHistory = lazy(
  () => import("../pages/Patient/profile/MedicalHistory.jsx")
);
export const AllAppointment = lazy(
  () => import("../pages/Patient/profile/Allappoiment.jsx")
);
export const Appointment = lazy(
  () => import("../pages/Patient/Appointment.jsx")
);
export const AppointmentBooking = lazy(
  () => import("../pages/Patient/AppointmentBooking.jsx")
);
export const ChatScreen1 = lazy(
  () => import("../pages/Patient/ChatScreen1.jsx")
);

// Extra Components
export const Scheduler = lazy(() => import("../component/Schedular.jsx"));
export const Bill = lazy(() => import("../pages/invoice/Bill.jsx"));
export const Onsite = lazy(
  () => import("../pages/Admin/DoctorManagement/Onsite.jsx")
);
export const CashPayment = lazy(
  () => import("../pages/billPayment/CashPayment.jsx")
);
export const Delete = lazy(
  () => import("../pages/Admin/DoctorManagement/Delete.jsx")
);
export const Bill2 = lazy(() => import("../pages/invoice/Bill2.jsx"));
export const EditDesignInvoice = lazy(
  () => import("../pages/billPayment/EditDesignInvoice.jsx")
);
export const Bill3 = lazy(() => import("../pages/invoice/Bill3.jsx"));

// Charts, Chat, and Video Call
export const Chart = lazy(() => import("../pages/Chart.jsx"));
export const Chat = lazy(() => import("../pages/Chat.jsx"));
export const VideoCall = lazy(() => import("../VideoCall.jsx"));

// Common Components (not lazy-loaded)
export { default as Loading } from "../component/common/Loading.jsx";
