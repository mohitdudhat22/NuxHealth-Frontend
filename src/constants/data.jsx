import { RiContactsBookFill } from "react-icons/ri";
import {
  FaCalendarCheck,
  FaFilePrescription,
  FaLaptopMedical,
  FaCalendarAlt,
  FaUser,
} from "react-icons/fa";
import { IoMdChatbubbles, IoMdListBox } from "react-icons/io";
import { RiBillLine } from "react-icons/ri";

export const AdminPanelData = [
  {
    key: "patientRegistration",
    to: "/reception/patientRegistration",
    icon: FaUser,
    text: "Patient Registration",
  },
  {
    key: "personalHealthRecord",
    to: "/patient",
    icon: RiContactsBookFill,
    text: "Personal Health Record",
  },
  {
    key: "appointmentBooking",
    to: "/reception/appointmentBooking",
    icon: FaCalendarCheck,
    text: "Appointment Booking",
  },
  {
    key: "prescriptionAccess",
    to: "/patient/priscriptionAccess",
    icon: FaFilePrescription,
    text: "Prescription Access",
  },
  {
    key: "teleconsultation",
    to: "/patient/teleconsultation",
    icon: FaLaptopMedical,
    text: "Teleconsultation Access",
  },
  {
    key: "chat",
    to: "/patient/chatScreen",
    icon: IoMdChatbubbles,
    text: "Chat",
  },
  {
    key: "bills",
    to: "/patient/bills",
    icon: RiBillLine,
    text: "Bills",
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
    dropdown: true,
    key: "/chatScreen",
    icon: IoMdChatbubbles,
    text: "Chat",
    dropdownItems: [
      {
        to: "/monitorBilling",
        text: "Monitor Billing",
        icon: RiBillLine ,
      },
      {
        to: "/insuranceClaims",
        text: "Insurance Claims",
        icon: RiBillLine,
      },
      {
        to: "/paymentMethod",
        text: "Payment Methods",
        icon: RiBillLine,
      },
    ],
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
