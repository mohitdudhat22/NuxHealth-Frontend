import { Link } from "react-router-dom";
import Icons from "./icons";

export const AdminAsideData = [
  {
    key: "/admin",
    icon: Icons.Dashboard,
    label: <Link to='/admin'>Dashboard</Link>,
  },
  {
    key: "doctorManagement",
    icon: Icons.DoctorUser,
    label: <Link to='/admin/doctor-management'>Doctor Management</Link>,
  },
  {
    key: "patientManagement",
    icon: Icons.DoctorUser,
    label: <Link to='/admin/patient-management'>Patient Management</Link>,
  },
  {
    key: "receptionManagement",
    icon: Icons.DoctorUser,
    label: <Link to='/admin/reception-management'>Reception Management</Link>,
  },
  {
    key: "medicalManagement",
    icon: Icons.DoctorUser,
    label: <Link to='/admin/medical-management'>Medical Management</Link>,
  },
  {
    key: "BillingPayments",
    icon: Icons.Wallet,
    label: "Billing And Payments",
    children: [
      {
        key: "monitorBilling",
        label: <Link to='/admin/monitor-billing'>Monitor Billing</Link>,
      },
      {
        key: "insuranceClaims",
        label: <Link to='/admin/insurance-claims'>Insurance Claims</Link>,
      },
      {
        key: "paymentProcess",
        label: <Link to='/admin/payment-process'>Payment Process</Link>,
      },
    ],
  },
  {
    key: "reportingAnalytics",
    icon: Icons.Analytics,
    label: <Link to='/admin/reporting-analytics'>Reporting And Analytics</Link>,
  },
];

export const DoctorPanelData = [
  {
    key: "/doctor",
    icon: Icons.Analytics,
    label: <Link to='/doctor'>Appointment Management</Link>,
  },
  {
    key: "patientRecordAccess",
    icon: Icons.Analytics,
    label: <Link to='/doctor/patientrecordaccess'>Patient Record Accesst</Link>,
  },
  {
    key: "createPrescriptionTools",
    icon: Icons.Analytics,
    label: <Link to='/doctor/create-prescriptionTools'>Prescription Tools</Link>,
  },
  {
    key: "teleConsultationModule",
    icon: Icons.Analytics,
    label: <Link to='/doctor/teleconsultation-module'>Teleconsultation Module</Link>,
  },
  {
    key: "chatScreen",
    icon: Icons.Analytics,
    label: <Link to='/doctor/chat-screen'>Chat Screen</Link>,
  },
];

export const PatientPanelData = [
  {
    key: "/patient",
    icon: Icons.Analytics,
    label: <Link to='/patient'>Personal Health Record</Link>,
  },
  {
    key: "appointment",
    icon: Icons.Analytics,
    label: <Link to='/patient/appointment'>Appointment Booking</Link>,
  },
  {
    key: "prescriptionAccess",
    icon: Icons.Analytics,
    label: <Link to='/patient/prescription-access'>Prescription Access</Link>,
  },
  {
    key: "teleConsultation",
    icon: Icons.Analytics,
    label: <Link to='/patient/teleconsultation'>Teleconsultation Access</Link>,
  },
  {
    key: "chatScreen",
    icon: Icons.Analytics,
    label: <Link to='/patient/chat-screen'>Chat</Link>,
  },
  {
    key: "bills",
    icon: Icons.Analytics,
    label: <Link to='/patient/bills'>Bills</Link>,
  },
];

<<<<<<< Updated upstream
export const ReceptionPanelData = [
  {
    key: "reception",
    icon: Icons.Analytics,
    label: <Link to='/reception'>Dashboard</Link>,
  },
  {
    key: "patientRegistration",
    icon: Icons.Analytics,
    label: <Link to='/reception/patient-registration'>Patient Registration</Link>,
  },
  {
    key: "personalHealth",
    icon: Icons.Analytics,
    label: <Link to='/reception/personal-health'>Patient Health Record</Link>,
  },
  {
    key: "appointment",
    icon: Icons.Analytics,
    label: <Link to='/reception/appointment'>Appointment Booking</Link>,
  },
  {
    key: "BillingPayments",
    icon: Icons.Analytics,
    label: "Billing and Payments",
    children: [
      {
        key: "/monitorBilling",
        label: <Link to='/reception/monitor-billing'>Monitor Billing</Link>,
      },
    ],
  },
];

// const StyleGuideGetItem = (label, key, path, children) => {
//   const wrappedLabel = path ? <NavLink to={`${path}`}>{label}</NavLink> : label;

//   return {
//     key,
//     children,
//     label: wrappedLabel,
//   };
// };

// export const StyleGuideAsideMenu = [
//   StyleGuideGetItem("Home", "/style-guide", "/style-guide"),
//   StyleGuideGetItem("Input", "/style-guide/input", "/style-guide/input"),
//   StyleGuideGetItem("Button", "/style-guide/button", "/style-guide/button"),
//   StyleGuideGetItem(
//     "CheckBox",
//     "/style-guide/checkBox",
//     "/style-guide/checkBox"
//   ),
//   StyleGuideGetItem("Icons", "/style-guide/icons", "/style-guide/icons"),
//   StyleGuideGetItem("Modal", "/style-guide/modal", "/style-guide/modal"),
//   StyleGuideGetItem("Tab", "/style-guide/tabs", "/style-guide/tabs"),
//   StyleGuideGetItem("Cards", "/style-guide/cards", "/style-guide/cards"),
// ];


export const AuthSliderData = [
=======
// export const PatientPanelData = [
//   {
//     key: "/patient",
//     to: "/patient",
//     icon: RiContactsBookFill,
//     text: "Personal Health Record",
//   },
//   {
//     key: "/appointment",
//     to: "/patient/appointment",
//     icon: FaCalendarCheck,
//     text: "Appointment Booking",
//   },
//   {
//     key: "/priscriptionAccess",
//     to: "/patient/priscriptionAccess",
//     icon: FaFilePrescription,
//     text: "Prescription Access",
//   },
//   {
//     key: "/teleconsultation",
//     to: "/patient/teleconsultation",
//     icon: FaLaptopMedical,
//     text: "Teleconsultation Access",
//   },
//   {
//     key: "/chatScreen",
//     to: "/patient/chatScreen",
//     icon: IoMdChatbubbles,
//     text: "Chat",
//   },
//   {
//     key: "/bills",
//     to: "/patient/bills",
//     icon: RiBillLine,
//     text: "Bills",
//   },
// ];

// export const ReceptionPanelData = [{
//   key: "/reception",
//   to: "/reception",
//   icon: MdDashboard,
//   text: "Dashboard",
// },
// {
//   key: "patientregistration",
//   to: "/reception/patient-registration",
//   icon: FaUser,
//   text: "Patient Registration",
// },
// {
//   key: "/personalhealth",
//   to: "/reception/personalhealth",
//   icon: RiContactsBookFill,
//   text: "patient Health Record",
// },
// {
//   key: "/personalhealth",
//   to: "/reception/personalhealth",
//   icon: RiContactsBookFill,
//   text: "patient Health Record",
// },
// {
//   key: "/appointment",
//   to: "/reception/appointment",
//   icon: FaCalendarCheck,
//   text: "Appointment Booking",
// },
// {
//   dropdown: true,
//   text: "Billing and Payments",
//   icon: FaLaptopMedical,
//   dropdownItems: [
//     {
//       key: "/monitorBilling",
//       to: "monitorBilling",
//       text: "Monitor Billing",
//       icon: RiBillLine,
//     },
//   ],
// },
// ];

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

export const initialChats = [
>>>>>>> Stashed changes
  {
    id: 1,
    title: "Connect, Collaborate, and Control - Society Management Simplified",
    // image: authOne,
  },
  {
    id: 2,
    title: "Your Space, Your Place: Society Management Made Simple",
    // image: authTwo,
  },
];