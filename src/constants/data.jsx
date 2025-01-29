import { Link } from "react-router-dom";
import Icons from "./Icons";

export const AdminAsideData = [
  {
    key: "/admin",
    icon: Icons.Dashboard,
    label: <Link to="/admin">Dashboard</Link>,
  },
  {
    key: "doctorManagement",
    icon: Icons.DoctorUser,
    label: <Link to="/admin/doctor-management">Doctor Management</Link>,
  },
  {
    key: "patientManagement",
    icon: Icons.patientManagement,
    label: <Link to="/admin/patient-management">Patient Management</Link>,
  },
  {
    key: "receptionManagement",
    icon: Icons.patientManagement,
    label: <Link to="/admin/reception-management">Reception Management</Link>,
  },
  // {
  //   key: "medicalManagement",
  //   icon: Icons.DoctorUser,
  //   label: <Link to="/admin/medical-management">Medical Management</Link>,
  // },
  {
    key: "BillingPayments",
    icon: Icons.Wallet,
    label: "Billing And Payments",
    children: [
      {
        key: "monitorBilling",
        label: <Link to="/admin/monitor-billing">Monitor Billing</Link>,
      },
      {
        key: "insuranceClaims",
        label: <Link to="/admin/insurance-claims">Insurance Claims</Link>,
      },
      {
        key: "paymentProcess",
        label: <Link to="/admin/payment-process">Payment Process</Link>,
      },
    ],
  },
  {
    key: "reportingAnalytics",
    icon: Icons.Analytics,
    label: <Link to="/admin/reporting-analytics">Reporting And Analytics</Link>,
  },

  // temp all-modal

  // {
  //   key: "all-modal",
  //   icon: Icons.Analytics,
  //   label: <Link to="/admin/all-modal">All Modal</Link>,
  // },
];

export const DoctorPanelData = [
  {
    key: "/doctor",
    icon: Icons.AppointmentManagement,
    label: <Link to="/doctor">Appointment Management</Link>,
  },
  {
    key: "patientRecordAccess",
    icon: Icons.PatientRecordAccess,
    label: <Link to="/doctor/patientrecordaccess">Patient Record Accesst</Link>,
  },
  {
    key: "createPrescriptionTools",
    icon: Icons.PrescriptionTools,
    label: "Prescription Tools",
    children: [
      {
        key: "create",
        label: <Link to="/doctor/create-prescriptionTools/create">Create</Link>,
      },
      {
        key: "manage",
        label: <Link to="/doctor/create-prescriptionTools/manage">Manage</Link>,
      },
    ],
  },
  {
    key: "teleConsultationModule",
    icon: Icons.Teleconsultation,
    label: (
      <Link to="/doctor/teleconsultation-module">Teleconsultation Module</Link>
    ),
  },
  {
    key: "chatScreen",
    icon: Icons.chat,
    label: <Link to="/doctor/chat-screen">Chat Screen</Link>,
  },
];

export const PatientPanelData = [
  {
    key: "/patient",
    icon: Icons.PersonalHealthRecord,
    label: <Link to="/patient">Personal Health Record</Link>,
  },
  {
    key: "appointment",
    icon: Icons.appointmentBooking,
    label: <Link to="/patient/appointment">Appointment Booking</Link>,
  },
  {
    key: "prescriptionAccess",
    icon: Icons.PrescriptionAccess,
    label: <Link to="/patient/prescription-access">Prescription Access</Link>,
  },
  {
    key: "teleConsultation",
    icon: Icons.TeleconsultationAccess,
    label: <Link to="/patient/teleconsultation">Teleconsultation Access</Link>,
  },
  {
    key: "chatScreen",
    icon: Icons.chat,
    label: <Link to="/patient/chat-screen">Chat</Link>,
  },
  {
    key: "bills",
    icon: Icons.bill,
    label: <Link to="/patient/bills">Bills</Link>,
  },
];

export const ReceptionPanelData = [
  {
    key: "reception",
    icon: Icons.Dashboard,
    label: <Link to="/reception">Dashboard</Link>,
  },
  {
    key: "patientRegistration",
    icon: Icons.patientManagement,
    label: (
      <Link to="/reception/patient-registration">Patient Registration</Link>
    ),
  },
  {
    key: "personalHealth",
    icon: Icons.patientList,
    label: <Link to="/reception/personal-health">Patients List</Link>,
  },
  {
    key: "appointment",
    icon: Icons.allAppointment,
    label: <Link to="/reception/appointment">All Appointments</Link>,
  },
  {
    key: "bills",
    icon: Icons.bill,
    label: <Link to="/reception/bills">Bills</Link>,
  },
];

export const StyleGuideAsideMenu = [
  {
    key: "home",
    label: <Link to="/style-guide">Home</Link>,
  },
  {
    key: "input",
    label: <Link to="/style-guide/input">Input</Link>,
  },
  {
    key: "button",
    label: <Link to="/style-guide/button">Button</Link>,
  },
  {
    key: "checkbox",
    label: <Link to="/style-guide/checkBox">CheckBox</Link>,
  },
  {
    key: "icons",
    label: <Link to="/style-guide/icons">Icons</Link>,
  },
  {
    key: "modal",
    label: <Link to="/style-guide/modal">Modal</Link>,
  },
  {
    key: "tabs",
    label: <Link to="/style-guide/tabs">Tab</Link>,
  },
  {
    key: "cards",
    label: <Link to="/style-guide/cards">Cards</Link>,
  },
];

export const AuthSliderData = [
  {
    id: 1,
    title: "Connect, Collaborate, and Control - Society Management Simplified",
  },
  {
    id: 2,
    title: "Your Space, Your Place: Society Management Made Simple",
  },
];

// Header Search Select Options
export const headerOption = [
  {
    key: "all",
    value: "All",
    disabled: false,
  },
  {
    key: "doctor",
    value: "Doctor",
    disabled: false,
  },
  {
    key: "receptionist",
    value: "Receptionist",
    disabled: false,
  },
  {
    key: "patient",
    value: "Patient",
    disabled: false,
  },
];

export const headerDropdownItems = [
  {
    key: "1",
    label: <>Profile</>,
  },
];

/* Common Table Columns */

/* staticData */
export const appointmentDataReportAndAnalytics = [
  { year: 2020, onlineConsultation: 30, otherAppointment: 40 },
  { year: 2021, onlineConsultation: 45, otherAppointment: 35 },
  { year: 2022, onlineConsultation: 50, otherAppointment: 45 },
  { year: 2023, onlineConsultation: 55, otherAppointment: 50 },
];

export const patientDepartmentDataReportAndAnalytics = [
  { key: "1", name: "Cardiology", count: "105" },
  { key: "2", name: "Endocrinologist", count: "254" },
  { key: "3", name: "Gastroenterologist", count: "657" },
  { key: "4", name: "Anesthesiologist", count: "02" },
  { key: "5", name: "Pediatrician", count: "784" },
  { key: "6", name: "Ophthalmologist", count: "254" },
];

export const doctorDepartmentDataReportAndAnalytics = [
  { key: "1", name: "Cardiology", count: "08" },
  { key: "2", name: "Endocrinologist", count: "22" },
  { key: "3", name: "Gastroenterologist", count: "15" },
  { key: "4", name: "Anesthesiologist", count: "11" },
  { key: "5", name: "Pediatrician", count: "10" },
  { key: "6", name: "Ophthalmologist", count: "08" },
];
export const PatientDataReportAndAnalytics = [
  { age: "0-2 Years", value: 8, color: "#E91E63" },
  { age: "3-12 Years", value: 12, color: "#3F51B5" },
  { age: "13-19 Years", value: 20, color: "#03A9F4" },
  { age: "20-39 Years", value: 18, color: "#FFC107" },
  { age: "40-59 Years", value: 8, color: "#009688" },
  { age: "60 And Above", value: 34, color: "#FF9F83" },
];
