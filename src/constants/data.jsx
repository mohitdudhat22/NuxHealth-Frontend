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
    key: "/receptionManagement",
    to: "/receptionManagement",
    icon: FaUsers,
    text: "Reception Management",
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
    key: "/",
    to: "/doctor",
    icon: FaCalendarAlt,
    text: "Appointment Management",
  },
  {
    key: "/patientRecordaccesst",
    to: "/doctor/patientrecordaccesst",
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

export const ReceptionPanelData = [{
  key: "/reception",
  to: "/reception",
  icon: MdDashboard,
  text: "Dashboard",
},
{
  key: "patientregistration",
  to: "/reception/patient-registration",
  icon: FaUser,
  text: "Patient Registration",
},
{
  key: "/personalhealth",
  to: "/reception/personalhealth",
  icon: RiContactsBookFill,
  text: "patient Health Record",
},
{
  key: "/appointment",
  to: "/reception/appointment",
  icon: FaCalendarCheck,
  text: "Appointment Booking",
},
{
  dropdown: true,
  text: "Billing and Payments",
  icon: FaLaptopMedical,
  dropdownItems: [
    {
      key: "/monitorBilling",
      to: "monitorBilling",
      text: "Monitor Billing",
      icon: RiBillLine,
    },
  ],
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

export const initialChats = [
  {
    id: 1,
    name: "Daisy Benjamin",
    time: "12:27 PM",
    message: "Hello, Esther",
    profile: "https://randomuser.me/api/portraits/women/50.jpg",
    chat: [
      {
        sender: "Samantha",
        time: "10:48 AM",
        message: "Hi there, How are you?",
      },
      {
        sender: "Samantha",
        time: "10:48 AM",
        message: "Waiting for your reply. I have to go back soon.",
      },
      {
        sender: "Samantha",
        time: "10:57 AM",
        type: "image",
        imageUrl: "../../assets/chatImage.png",
      },
      {
        sender: "You",
        time: "10:50 AM",
        message: "Hi, I am coming there in few minutes.",
      },
      {
        sender: "You",
        time: "11:05 AM",
        type: "file",
        fileName: "PDF Documentation",
        fileSize: "500 kb",
      },
      { sender: "Samantha", time: "11:10 AM", message: "Okay, see you soon!" },
      { sender: "You", time: "11:15 AM", message: "Bye!" },
    ],
  },
  {
    id: 2,
    name: "Samantha Joy",
    time: "9:27 AM",
    message: "Hi, How are you?",
    profile: "https://randomuser.me/api/portraits/women/30.jpg",
    chat: [
      {
        sender: "Samantha",
        time: "10:48 AM",
        message: "Hi there, How are you?",
      },
      {
        sender: "You",
        time: "10:50 AM",
        message: "I am good, thanks for asking!",
      },
      { sender: "Samantha", time: "10:55 AM", message: "That's great!" },
      { sender: "You", time: "11:00 AM", message: "What about you?" },
    ],
  },
  {
    id: 3,
    name: "Emily Chen",
    time: "10:47 AM",
    message: "Hello, Doctor",
    profile: "https://randomuser.me/api/portraits/women/20.jpg",
    chat: [
      {
        sender: "Emily",
        time: "10:48 AM",
        message: "I have a question about my prescription.",
      },
      { sender: "You", time: "10:50 AM", message: "What is your question?" },
      {
        sender: "Emily",
        time: "10:55 AM",
        message: "Can I take it with food?",
      },
      {
        sender: "You",
        time: "11:00 AM",
        message: "Yes, you can take it with food.",
      },
      { sender: "Emily", time: "11:05 AM", message: "Thank you!" },
    ],
  },
  {
    id: 4,
    name: "Liam Brown",
    time: "11:27 AM",
    message: "Hi, Doctor",
    profile: "https://randomuser.me/api/portraits/men/40.jpg",
    chat: [
      { sender: "Liam", time: "11:28 AM", message: "I am not feeling well." },
      { sender: "You", time: "11:30 AM", message: "What are your symptoms?" },
      {
        sender: "Liam",
        time: "11:35 AM",
        message: "I have a fever and headache.",
      },
      {
        sender: "You",
        time: "11:40 AM",
        message: "I will prescribe you some medication.",
      },
    ],
  },
  {
    id: 5,
    name: "Olivia Martin",
    time: "12:17 PM",
    message: "Hi, Doctor",
    profile: "https://randomuser.me/api/portraits/women/10.jpg",
    chat: [
      {
        sender: "Olivia",
        time: "12:18 PM",
        message: "I need to schedule an appointment.",
      },
      {
        sender: "You",
        time: "12:20 PM",
        message: "What date and time works for you?",
      },
      {
        sender: "Olivia",
        time: "12:25 PM",
        message: "How about tomorrow at 2 PM?",
      },
      { sender: "You", time: "12:30 PM", message: "That works for me." },
    ],
  },
  {
    id: 6,
    name: "Ava Lee",
    time: "1:27 PM",
    message: "Hi, Doctor",
    profile: "https://randomuser.me/api/portraits/women/60.jpg",
    chat: [
      {
        sender: "Ava",
        time: "1:28 PM",
        message: "I have a question about my test results.",
      },
      { sender: "You", time: "1:30 PM", message: "What is your question?" },
      {
        sender: "Ava",
        time: "1:35 PM",
        message: "Can you explain the results to me?",
      },
      {
        sender: "You",
        time: "1:40 PM",
        message: "I will explain the results to you.",
      },
    ],
  },
  {
    id: 7,
    name: "Ethan Hall",
    time: "2:27 PM",
    message: "Hi, Doctor",
    profile: "https://randomuser.me/api/portraits/men/20.jpg",
    chat: [
      {
        sender: "Ethan",
        time: "2:28 PM",
        message: "I need to refill my prescription.",
      },
      {
        sender: "You",
        time: "2:30 PM",
        message: "I will refill your prescription.",
      },
    ],
  },
  {
    id: 8,
    name: "Sophia Patel",
    time: "3:27 PM",
    message: "Hi, Doctor",
    profile: "https://randomuser.me/api/portraits/women/40.jpg",
    chat: [
      {
        sender: "Sophia",
        time: "3:28 PM",
        message: "I have a question about my treatment.",
      },
      { sender: "You", time: "3:30 PM", message: "What is your question?" },
      {
        sender: "Sophia",
        time: "3:35 PM",
        message: "Can I stop taking the medication?",
      },
      {
        sender: "You",
        time: "3:40 PM",
        message: "No, you should continue taking the medication.",
      },
    ],
  },
  {
    id: 9,
    name: "Mia Kim",
    time: "4:27 PM",
    message: "Hi, Doctor",
    profile: "https://randomuser.me/api/portraits/women/70.jpg",
    chat: [
      {
        sender: "Mia",
        time: "4:28 PM",
        message: "I need to schedule a follow-up appointment.",
      },
      {
        sender: "You",
        time: "4:30 PM",
        message: "What date and time works for you?",
      },
      {
        sender: "Mia",
        time: "4:35 PM",
        message: "How about next week at 10 AM?",
      },
      { sender: "You", time: "4:40 PM", message: "That works for me." },
    ],
  },
  {
    id: 10,
    name: "Noah Taylor",
    time: "5:27 PM",
    message: "Hi, Doctor",
    profile: "https://randomuser.me/api/portraits/men/30.jpg",
    chat: [
      {
        sender: "Noah",
        time: "5:28 PM",
        message: "I have a question about my insurance.",
      },
      { sender: "You", time: "5:30 PM", message: "What is your question?" },
      {
        sender: "Noah",
        time: "5:35 PM",
        message: "Does my insurance cover the treatment?",
      },
      {
        sender: "You",
        time: "5:40 PM",
        message: "Yes, your insurance covers the treatment.",
      },
    ],
  },
  {
    id: 11,
    name: "Isabella White",
    time: "6:27 PM",
    message: "Hi, Doctor",
    profile: "https://randomuser.me/api/portraits/women/80.jpg",
    chat: [
      {
        sender: "Isabella",
        time: "6:28 PM",
        message: "I need to cancel my appointment.",
      },
      {
        sender: "You",
        time: "6:30 PM",
        message: "What is the reason for cancellation?",
      },
      {
        sender: "Isabella",
        time: "6:35 PM",
        message: "I have a family emergency.",
      },
      {
        sender: "You",
        time: "6:40 PM",
        message: "I understand. I will cancel your appointment.",
      },
    ],
  },
  {
    id: 12,
    name: "Jackson Davis",
    time: "7:27 PM",
    message: "Hi, Doctor",
    profile: "https://randomuser.me/api/portraits/men/50.jpg",
    chat: [
      {
        sender: "Jackson",
        time: "7:28 PM",
        message: "I have a question about my medication.",
      },
      { sender: "You", time: "7:30 PM", message: "What is your question?" },
      {
        sender: "Jackson",
        time: "7:35 PM",
        message: "Can I take it with other medications?",
      },
      {
        sender: "You",
        time: "7:40 PM",
        message: "Yes, you can take it with other medications.",
      },
    ],
  },
];

export const FormData = {
  firstName: "vvv",
  lastName: "vvv",
  email: "vvv@gmail.com",
  password: "Vvv@123",
  confirmPassword: "Vvv@123",
  countryCode: "+91",
  phone: "7621043625",
  country: "",
  state: "",
  city: "",
  role: "admin",
  hospital: "",
};

export const HospitalFormData = {
  name: "",
  address: "",
  country: "",
  state: "",
  city: "",
  zipcode: "",
};

export const PatientBillFields = [
  { label: "Insurance Company", name: "insuranceCompany", type: "text" },
  { label: "Insurance Plan", name: "insurancePlan", type: "text" },
  { label: "Claim Amount", name: "claimAmount", type: "text" },
  { label: "Claimed Amount", name: "claimedAmount", type: "text" },
];

export const formDataObject = {
  patientName: "",
  phoneNumber: "",
  gender: "",
  age: "",
  doctorName: "",
  diseaseName: "",
  description: "",
  paymentType: "",
  billDate: new Date().toISOString().slice(0, 10),
  billTime: "",
  billNumber: "",
  discount: "",
  tax: "",
  amount: "",
  totalAmount: "",
  address: "",
  insuranceCompany: "",
  insurancePlan: "",
  claimAmount: "",
  claimedAmount: "",
};

export const PatientFormData = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
  phone: "",
  countryCode: "",
  age: "",
  height: "",
  weight: "",
  gender: "",
  bloodGroup: "",
  dob: "",
  country: "",
  state: "",
  city: "",
  address: "",
  role: "patient",
};

export const genders = ["male", "female", "other"];
export const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

export const PatientRegistrationFormFields = [
  { label: "First Name", name: "firstName", type: "text" },
  { label: "Last Name", name: "lastName", type: "text" },
  { label: "Email Address", name: "email", type: "email" },
  { label: "Phone Number", name: "phone", type: "tel" },
  // { label: "Age", name: "age", type: "number" },
  // { label: "Height(cm)", name: "height", type: "number" },
  // { label: "Weight(kg)", name: "weight", type: "number" },
  // { label: "Date of Birth", name: "dob", type: "date" },
];
