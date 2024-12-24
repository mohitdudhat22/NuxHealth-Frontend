// import { Avatar, Space, Tag } from "antd";
import { NavLink } from "react-router-dom";
import Icons from "./icons";
// import { authOne, authTwo } from "@/assets/images";
// import Icons from "@/constants/Icons";
// import { NHButton } from "@/components";

const getItem = (label, key, icon, path, children) => {
  const wrappedLabel = path ? <NavLink to={`${path}`}>{label}</NavLink> : label;

  return {
    key,
    icon,
    children,
    label: wrappedLabel,
  };
};

export const AdminAsideData = [
  getItem("Dashboard", "admin", Icons.Dashboard, "/admin"),
  getItem(
    "Doctor Management",
    "/doctor-management",
    Icons.DoctorUser,
    "/admin/doctor-management"
  ),
  getItem(
    "Patient Management",
    "PatientManagement",
    Icons.DoctorUser,
    "/admin/patient-management"
  ),
  getItem(
    "Billing And Payments",
    "BillingPayments",
    Icons.Wallet,
    null,
    [
      getItem(
        "Monitor Billing",
        "MonitorBilling",
        null,
        "/admin/monitor-billing"
      ),
      getItem(
        "Insurance Claims",
        "InsuranceClaims",
        null,
        "/admin/insurance-claims"
      ),
      getItem(
        "Payment Process",
        "PaymentProcess",
        null,
        "/admin/payment-process"
      ),
    ]
  ),
  getItem(
    "Reporting And Analytics",
    "ReportingAndAnalytics",
    Icons.Analytics,
    "/admin/reporting-analytics"
  ),
];

// export const DoctorPanelData = [
//   {
//     key: "/",
//     to: "/doctor",
//     icon: FaCalendarAlt,
//     text: "Appointment Management",
//   },
//   {
//     key: "/patientRecordaccesst",
//     to: "/doctor/patientrecordaccesst",
//     icon: IoMdListBox,
//     text: "Patient Record Accesst",
//   },
//   {
//     key: "/createPrescriptionTools",
//     to: "/doctor/createPrescriptionTools",
//     text: "Prescription Tools",
//     icon: FaLaptopMedical,
//   },
//   {
//     key: "/teleconsultationModule",
//     to: "/doctor/teleconsultationModule",
//     icon: IoMdListBox,
//     text: "teleconsultationModule",
//   },
//   {
//     key: "/chatScreen",
//     to: "/doctor/chatScreen",
//     icon: IoMdListBox,
//     text: "chatScreen",
//   },
// ];

// export const AdminPanelData = [
//   {
//     key: "/",
//     to: "/",
//     icon: MdDashboard,
//     text: "Dashboard",
//   },
//   {
//     key: "/doctorManagement",
//     to: "/doctorManagement",
//     icon: FaUser,
//     text: "Doctor Management",
//   },
//   {
//     key: "/patientManagement",
//     to: "/patientManagement",
//     icon: FaUsers,
//     text: "Patient Management",
//   },
//   {
//     key: "/receptionManagement",
//     to: "/receptionManagement",
//     icon: FaUsers,
//     text: "Reception Management",
//   },
//   {
//     dropdown: true,
//     text: "Billing and Payments",
//     icon: FaLaptopMedical,
//     dropdownItems: [
//       {
//         key: "/monitorBilling",
//         to: "/monitorBilling",
//         text: "Monitor Billing",
//         icon: RiBillLine,
//       },
//       {
//         key: "/insuranceClaims",
//         to: "/insuranceClaims",
//         text: "Insurance Claims",
//         icon: RiBillLine,
//       },
//       {
//         key: "/paymentMethod",
//         to: "/paymentMethod",
//         text: "Payment Methods",
//         icon: RiBillLine,
//       },
//     ],
//   },
//   {
//     key: "/reportingAndAnalytics",
//     to: "/reportingAndAnalytics",
//     icon: MdAnalytics,
//     text: "Reporting and Analytics",
//   },
// ];

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

// export const ReceptionPanelData = [
//   {
//     key: "/reception",
//     to: "/reception",
//     icon: MdDashboard,
//     text: "Dashboard",
//   },
//   {
//     key: "patientregistration",
//     to: "/reception/patient-registration",
//     icon: FaUser,
//     text: "Patient Registration",
//   },
//   {
//     key: "/personalhealth",
//     to: "/reception/personalhealth",
//     icon: RiContactsBookFill,
//     text: "patient Health Record",
//   },
//   {
//     key: "/appointment",
//     to: "/reception/appointment",
//     icon: FaCalendarCheck,
//     text: "Appointment Booking",
//   },
//   {
//     dropdown: true,
//     text: "Billing and Payments",
//     icon: FaLaptopMedical,
//     dropdownItems: [
//       {
//         key: "/monitorBilling",
//         to: "monitorBilling",
//         text: "Monitor Billing",
//         icon: RiBillLine,
//       },
//     ],
//   },
// ];

// export const ResidentAsidData = [
//   getItem("Dashboard", "/resident", "Icons.Dashboard", "/resident"),
//   getItem(
//     "Personal Detail",
//     "/resident/personal-detail",
//     Icons.User,
//     "/resident/personal-detail"
//   ),
//   getItem(
//     "Service And Complaint",
//     "/resident/service",
//     Icons.User,
//     "/resident/service"
//   ),
//   getItem(
//     "Events Participation",
//     "/resident/events",
//     Icons.User,
//     "/resident/events"
//   ),
//   getItem("Community", "community", Icons.User, null, [
//     getItem(
//       "Access Forums",
//       "/resident/community/access-forums",
//       null,
//       "/resident/community/access-forums"
//     ),
//     getItem(
//       "Polls",
//       "/resident/community/polls",
//       null,
//       "/resident/community/polls"
//     ),
//     getItem(
//       "Communities Discussion",
//       "/resident/community/communities-discussion",
//       null,
//       "/resident/community/communities-discussion"
//     ),
//   ]),
//   getItem("Payment Portal", "payment_portal", Icons.User, null, [
//     getItem(
//       "Maintenance Invoices",
//       "/resident/payment/maintenance-invoices",
//       null,
//       "/resident/payment/maintenance-invoices"
//     ),
//     getItem(
//       "Other Income Invoice",
//       "/resident/payment/other-income-invoice",
//       null,
//       "/resident/payment/other-income-invoice"
//     ),
//   ]),
//   getItem(
//     "Security Protocols",
//     "/resident/security-protocols",
//     Icons.User,
//     "/resident/security-protocols"
//   ),
// ];

// export const SecurityAsideData = [
//   getItem("Security", "security", Icons.SecurityGuard, null, [
//     getItem("Visitor Tracking", "/security", null, "/security"),
//     getItem(
//       "Emergency Management",
//       "/security/emergency",
//       null,
//       "/security/emergency"
//     ),
//   ]),
// ];

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

// export const MemberCardData = [
//   {
//     id: 1,
//     title: "Arlene McCoy",
//     email: "arlenemccoy@gmail.com",
//     phone: "99130 52221",
//     age: 22,
//     gender: "Male",
//     relation: "Brother",
//   },
//   {
//     id: 2,
//     title: "Arlene McCoy",
//     email: "arlenemccoy@gmail.com",
//     phone: "99130 52221",
//     age: 22,
//     gender: "Male",
//     relation: "Brother",
//   },
//   {
//     id: 3,
//     title: "Arlene McCoy",
//     email: "arlenemccoy@gmail.com",
//     phone: "99130 52221",
//     age: 22,
//     gender: "Male",
//     relation: "Brother",
//   },
// ];

// export const AuthSliderData = [
//   {
//     id: 1,
//     title: "Connect, Collaborate, and Control - Society Management Simplified",
//     image: authOne,
//   },
//   {
//     id: 2,
//     title: "Your Space, Your Place: Society Management Made Simple",
//     image: authTwo,
//   },
// ];

// export const pendingMaintenancesData = [
//   {
//     _id: 1,
//     profileImage:
//       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-y-fFn8KjGMJWwHyFA32_Xvysu-c0c3pHIw&s",
//     fullName: "Roger Lubin",
//     dueDays: "2 Month Pending",
//     maintenanceAmount: "5000",
//   },
//   {
//     _id: 2,
//     profileImage:
//       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-y-fFn8KjGMJWwHyFA32_Xvysu-c0c3pHIw&s",
//     fullName: "Roger Lubin",
//     dueDays: "2 Month Pending",
//     maintenanceAmount: "5000",
//   },
//   {
//     _id: 3,
//     profileImage:
//       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-y-fFn8KjGMJWwHyFA32_Xvysu-c0c3pHIw&s",
//     fullName: "Roger Lubin",
//     dueDays: "2 Month Pending",
//     maintenanceAmount: "5000",
//   },
//   {
//     _id: 4,
//     profileImage:
//       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-y-fFn8KjGMJWwHyFA32_Xvysu-c0c3pHIw&s",
//     fullName: "Roger Lubin",
//     dueDays: "2 Month Pending",
//     maintenanceAmount: "5000",
//   },
//   {
//     _id: 5,
//     profileImage:
//       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-y-fFn8KjGMJWwHyFA32_Xvysu-c0c3pHIw&s",
//     fullName: "Roger Lubin",
//     dueDays: "2 Month Pending",
//     maintenanceAmount: "5000",
//   },
//   {
//     _id: 6,
//     profileImage:
//       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-y-fFn8KjGMJWwHyFA32_Xvysu-c0c3pHIw&s",
//     fullName: "Roger Lubin",
//     dueDays: "2 Month Pending",
//     maintenanceAmount: "5000",
//   },
//   {
//     _id: 7,
//     profileImage:
//       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-y-fFn8KjGMJWwHyFA32_Xvysu-c0c3pHIw&s",
//     fullName: "Roger Lubin",
//     dueDays: "2 Month Pending",
//     maintenanceAmount: "5000",
//   },
//   {
//     _id: 8,
//     profileImage:
//       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-y-fFn8KjGMJWwHyFA32_Xvysu-c0c3pHIw&s",
//     fullName: "Roger Lubin",
//     dueDays: "2 Month Pending",
//     maintenanceAmount: "5000",
//   },
//   {
//     _id: 9,
//     profileImage:
//       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-y-fFn8KjGMJWwHyFA32_Xvysu-c0c3pHIw&s",
//     fullName: "Roger Lubin",
//     dueDays: "2 Month Pending",
//     maintenanceAmount: "5000",
//   },
//   {
//     _id: 10,
//     profileImage:
//       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-y-fFn8KjGMJWwHyFA32_Xvysu-c0c3pHIw&s",
//     fullName: "Roger Lubin",
//     dueDays: "2 Month Pending",
//     maintenanceAmount: "5000",
//   },
// ];

// /* Tables Columns */

// export const ResidentManagementColumns = (onEdit, onViewDetails) => [
//   {
//     title: "Full Name",
//     dataIndex: "fullName",
//     key: "fullName",
//     render: (text, record) => (
//       <Space>
//         <Avatar src={record.avatar} size={40} style={{ marginRight: 8 }} />
//         {text}
//       </Space>
//     ),
//   },
//   {
//     title: "Unit",
//     dataIndex: "unitNumber",
//     key: "unitNumber",
//     render: (_, record) => (
//       <Tag color="blue">
//         {record.wing} - {record.unitNumber}
//       </Tag>
//     ),
//   },
//   {
//     title: "Unit Status",
//     dataIndex: "unitStatus",
//     key: "unitStatus",
//     render: (status) => (
//       <Tag color={status === "Occupied" ? "green" : "purple"}>{status}</Tag>
//     ),
//   },
//   {
//     title: "Resident Status",
//     dataIndex: "residentStatus",
//     key: "residentStatus",
//     render: (status) => (
//       <Tag color={status === "Owner" ? "blue" : "pink"}>{status}</Tag>
//     ),
//   },
//   {
//     title: "Phone Number",
//     dataIndex: "phoneNumber",
//     key: "phoneNumber",
//   },
//   {
//     title: "Family Members",
//     dataIndex: "member",
//     key: "member",
//   },
//   {
//     title: "Vehicles",
//     dataIndex: "vehicle",
//     key: "vehicle",
//   },
//   {
//     title: "Action",
//     key: "action",
//     render: (_, record) =>
//       record.unitStatus !== "Vacate" ? (
//         <Space size="middle">
//           <NHButton
//             type="primary"
//             size="small"
//             icon={Icons.Edit}
//             className="edit-btn"
//             onClick={() => onEdit(record)}
//           />
//           <NHButton
//             type="primary"
//             size="small"
//             icon={Icons.EyeShow}
//             className="view-btn"
//             onClick={() => onViewDetails(record)}
//           />
//         </Space>
//       ) : (
//         <Tag>--</Tag>
//       ),
//   },
// ];

export const AuthSliderData = [
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