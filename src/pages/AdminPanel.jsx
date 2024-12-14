import { useState } from "react";
import { Route, Routes, NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";
import Header from "../component/Header";
import Dashboard from "./dashboard/Dashboard";
import DoctorManagement from "./doctorManagement/DoctorManagement";
import Profile from "./profile/Profile";
import { Edit } from "./profile/Edit";
import PatientManagement from "./patientManagement/PatientManagement";
import ReportingAndAnalytics from "./ReportingAndAnalytics/ReportingAndAnalytics";
import MonitorBilling from "./billPayment/MonitorBilling";
import InsuranceClaims from "./billPayment/InsuranceClaims";
import PaymentMethod from "./billPayment/PaymentMethod";
import DoctorAdd from "./adminPanel/DoctorAdd";
import DoctorEdit from "./adminPanel/DoctorEdit";
import CreateBill from "./invoice/CreateBill";
import EditBill from "./invoice/EditBill";
import Bill2 from "./invoice/Bill2";
import Bill3 from "./invoice/Bill3";
import { Invoice } from "../imports";
import EditDesignInvoice from "./billPayment/EditDesignInvoice";
import { FaLaptopMedical, FaUser, FaUsers } from "react-icons/fa";
import { RiBillLine } from "react-icons/ri";
import { useAuth } from "../hooks/useAuth";
import { useGlobal } from "../hooks/useGlobal";
import { SearchResult } from "./SearchResult";
import MainBill from "./patientPanel/MainBill";
import { MdAnalytics, MdDashboard } from "react-icons/md";

export default function AdminPanel() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [billingDropdownOpen, setBillingDropdownOpen] = useState(false);
  const { searchTerm, setSearchTerm } = useGlobal();
  const { selectedOption, setSelectedOption } = useGlobal();
  const { logout } = useAuth();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Menu items with conditions
  const menuItems = [
    {
      to: "/",
      icon: MdDashboard,
      text: "Dashboard",
    },
    {
      to: "/doctorManagement",
      icon: FaUser,
      text: "Doctor Management",
    },
    {
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
          to: "/monitorBilling",
          text: "Monitor Billing",
          icon: RiBillLine,
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
      to: "/reportingAndAnalytics",
      icon: MdAnalytics,
      text: "Reporting and Analytics",
    },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside
        className={`bg-white  w-64 h-screen flex flex-col transition-all duration-300 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 fixed lg:static z-30`}
      >
        <div className="flex flex-col h-full">
          <div className="text-right pe-2">
            <button onClick={toggleSidebar} className="md:hidden">
              <X size={24} />
            </button>
          </div>
          <div className="logo p-4 text-center flex items-center justify-between border-b">
            {/* <NavLink to="/patient"> */}
            <img
              src="/img/logo.png"
              alt="Logo"
              className="w-full max-w-[200px] mx-auto"
              width="100%"
              height="auto"
            />
            {/* </NavLink> */}
          </div>
          <nav>
            <ul className="space-y-2 p-2">
              {menuItems?.map((item, index) => {
                if (item.dropdown) {
                  return (
                    <li key={index}>
                      <div>
                        <button
                          onClick={() =>
                            setBillingDropdownOpen((prev) => !prev)
                          }
                          className="flex items-center w-full p-3 text-base font-semibold text-gray-500 hover:bg-gradient-to-r from-[#D5F1FA] hover:text-[#0EABEB] transition duration-300"
                        >
                          <item.icon className="me-2" />
                          <span>{item.text}</span>
                          <svg
                            className={`w-4 h-4 ml-auto transition-transform ${
                              billingDropdownOpen ? "rotate-180" : ""
                            }`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 9l-7 7-7-7"
                            />
                          </svg>
                        </button>
                        {billingDropdownOpen && (
                          <ul className="pl-6 mt-2 space-y-2">
                            {item.dropdownItems.map(
                              (subItem, subIndex) =>
                                subItem.condition && (
                                  <li key={subIndex}>
                                    <NavLink
                                      to={subItem.to}
                                      className="flex items-center p-2 text-sm text-gray-500 hover:text-[#0EABEB] transition duration-300"
                                    >
                                      <subItem.icon className="me-2" />
                                      {subItem.text}
                                    </NavLink>
                                  </li>
                                )
                            )}
                          </ul>
                        )}
                      </div>
                    </li>
                  );
                }

                return (
                  <li key={index}>
                    <NavLink
                      to={item.to}
                      className="flex items-center p-3 text-base font-semibold text-gray-500 hover:bg-gradient-to-r from-[#D5F1FA] hover:text-[#0EABEB] transition duration-300"
                    >
                      <item.icon className="me-2" />
                      <span>{item.text}</span>
                    </NavLink>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="fixed bottom-[30px] left-0 right-0">
            <button
              onClick={logout}
              className="flex items-center w-full p-3 bg-[rgba(225,29,42,0.16)] text-[#e11d29] font-semibold"
            >
              <img src="../img/logout.png" alt="Logout" className="mr-2" />
              Logout
            </button>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white  shadow-sm z-10">
          <div className="max-w-10xl py-1 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
            <button onClick={toggleSidebar} className="lg:hidden">
              {isSidebarOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
            <Header />
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
          <div className="max-w-10xl mx-auto">
            {searchTerm === "" ? (
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
                <Route
                  path="patientManagement"
                  element={<PatientManagement />}
                />
                <Route path="monitorBilling" element={<MonitorBilling />} />
                <Route path="insuranceClaims" element={<InsuranceClaims />} />
                <Route path="paymentMethod" element={<PaymentMethod />} />
                <Route path="invoice" element={<Invoice />} />
                <Route
                  path="reportingAndAnalytics"
                  element={<ReportingAndAnalytics />}
                />
              </Routes>
            ) : (
              <SearchResult />
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
