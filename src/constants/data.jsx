import { RiContactsBookFill } from "react-icons/ri";
import {
  FaCalendarCheck,
  FaFilePrescription,
  FaLaptopMedical,
  FaCalendarAlt,
  FaUser,
  FaUsers,
} from "react-icons/fa";
import { IoMdChatbubbles, IoMdListBox } from "react-icons/io";
import { RiBillLine } from "react-icons/ri";
import { MdAnalytics, MdDashboard } from "react-icons/md";

export const AdminPanelData = [
  {
    key: "/",
    to: "/",
    icon: MdDashboard,
    text: "Dashboard",
  },
  {
    key: "/doctorManagement",
    to: "/doctorManagement",
    icon: FaUser,
    text: "Doctor Management",
  },
  {
    key: "/patientManagement",
    to: "/patientManagement",
    icon: FaUsers,
    text: "Patient Management",
  },
  {
    dropdown: true,
    text: "Billing and Payments",
    icon: FaLaptopMedical,
    dropdownItems: [
      {
        key: "/monitorBilling",
        to: "/monitorBilling",
        text: "Monitor Billing",
        icon: RiBillLine,
      },
      {
        key: "/insuranceClaims",
        to: "/insuranceClaims",
        text: "Insurance Claims",
        icon: RiBillLine,
      },
      {
        key: "/paymentMethod",
        to: "/paymentMethod",
        text: "Payment Methods",
        icon: RiBillLine,
      },
    ],
  },
  {
    key: "/reportingAndAnalytics",
    to: "/reportingAndAnalytics",
    icon: MdAnalytics,
    text: "Reporting and Analytics",
  },
];

export const DoctorPanelData = [
  {
    to: "/doctor",
    icon: FaCalendarAlt,
    text: "Appointment Management",
  },
  {
    to: "/doctor/patientRecordAccesst",
    icon: IoMdListBox,
    text: "Patient Record Accesst",
  },
];

export const PatientPanelData = [
  {
    key: "/patient",
    to: "/patient",
    icon: RiContactsBookFill,
    text: "Personal Health Record",
  },
  {
    key: "/appointment",
    to: "/patient/appointment",
    icon: FaCalendarCheck,
    text: "Appointment Booking",
  },
  {
    key: "/priscriptionAccess",
    to: "/patient/priscriptionAccess",
    icon: FaFilePrescription,
    text: "Prescription Access",
  },
  {
    key: "/teleconsultation",
    to: "/patient/teleconsultation",
    icon: FaLaptopMedical,
    text: "Teleconsultation Access",
  },
  {
    key: "/chatScreen",
    to: "/patient/chatScreen",
    icon: IoMdChatbubbles,
    text: "Chat",
  },
  {
    key: "/bills",
    to: "/patient/bills",
    icon: RiBillLine,
    text: "Bills",
  },
];

export const ReceptionPanelData = [
  {
    key: "reception",
    to: "/reception",
    icon: FaUser,
    text: "Patient Registration",
  },
  {
    key: "reception",
    to: "/reception/PersonalHealth",
    icon: RiContactsBookFill,
    text: "Personal Health Record",
  },
  {
    key: "reception",
    to: "/reception/appointment",
    icon: FaCalendarCheck,
    text: "Appointment Booking",
  },
  {
    key: "reception",
    to: "/reception/priscriptionAccess",
    icon: FaFilePrescription,
    text: "Prescription Access",
  },
  {
    key: "reception",
    to: "/reception/teleconsultation",
    icon: FaLaptopMedical,
    text: "Teleconsultation Access",
  },
  {
    key: "reception",
    to: "/reception/chatScreen",
    icon: IoMdChatbubbles,
    text: "Chat",
  },
  {
    key: "reception",
    to: "/reception/bills",
    icon: RiBillLine,
    text: "Bills",
  },
];

export const countryCodes = [
  { code: "+1", country: "USA" },
  { code: "+91", country: "India" },
  { code: "+44", country: "UK" },
  { code: "+61", country: "Australia" },
  { code: "+49", country: "Germany" },
];

export const timeOptions = [
  "08:00-09:00",
  "09:00-10:00",
  "10:00-11:00",
  "11:00-12:00",
  "12:00-13:00",
  "13:00-14:00",
  "14:00-15:00",
  "15:00-16:00",
  "16:00-17:00",
  "17:00-18:00",
  "18:00-19:00",
  "19:00-20:00",
  "20:00-21:00",
  "21:00-22:00",
];
