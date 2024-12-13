import { NavLink } from "react-router-dom";
// import "./sidebar.css";
import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { MdDashboard } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { FaUsers } from "react-icons/fa";
import { MdAnalytics } from "react-icons/md";
import { FaSackDollar } from "react-icons/fa6";
import { IoIosArrowDown } from "react-icons/io";

const Sidebar = () => {
  const [isAccordionOpen, setAccordionOpen] = useState(false);
  const { logout } = useAuth();

  const toggleAccordion = () => {
    setAccordionOpen((prevState) => !prevState);
  };

  return (
    <>
      <div className="bg-white text-gray-400 w-[15%] h-screen fixed top-0 left-0 border border-r">
        <div className="logo font-bold mb-4 p-3">
          <img src="/img/logo.png" alt="Logo" className="w-3/4 h-auto" />
        </div>
        <div className="menu flex flex-col h-[84%] justify-between">
          <ul className="space-y-2">
            <li>
              <NavLink
                to="/"
                className="flex items-center p-3 text-base font-semibold text-gray-500 hover:bg-gradient-to-r from-[#D5F1FA] hover:text-[#0EABEB] transition duration-300"
              >
                <MdDashboard className="mr-3 text-xl " />
                <p>Dashboard</p>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/doctorManagement"
                className="flex items-center p-3 text-base font-semibold text-gray-500  hover:bg-gradient-to-r from-[#D5F1FA] hover:text-[#0EABEB] transition duration-300"
              >
                <FaUser className="mr-3 text-xl" />
                <p>Doctor Management</p>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/patientManagement"
                className="flex items-center p-3 text-base font-semibold text-gray-500  hover:bg-gradient-to-r from-[#D5F1FA] hover:text-[#0EABEB] transition duration-300"
              >
                <FaUsers className="mr-3 text-xl" />
                <p>Patient Management</p>
              </NavLink>
            </li>

            {/* Billing and Payments with Dropdown */}
            <li className="flex flex-col">
              <button
                onClick={toggleAccordion}
                className="flex items-center w-full p-3 text-base font-semibold text-gray-500  hover:bg-gradient-to-r from-[#D5F1FA] hover:text-[#0EABEB] transition duration-300"
              >
                <FaSackDollar className="mr-3 text-base" />
                <p className="flex items-center justify-between">
                  <span>Billing and Payments</span>{" "}
                  <IoIosArrowDown className="ml-10" />
                </p>
              </button>
              <ul
                className={`${
                  isAccordionOpen ? "block" : "hidden"
                } space-y-2 pl-8 list-disc`}
              >
                <li>
                  <NavLink
                    to="/monitorBilling"
                    className="block p-2 text-gray-500 hover:text-[#0EABEB] font-medium  text-md rounded transition duration-300"
                  >
                    Monitor Billing
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/insuranceClaims"
                    className="block p-2 text-gray-500 hover:text-[#0EABEB] font-medium  text-md transition duration-300"
                  >
                    Insurance Claims
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/paymentMethod"
                    className="block p-2 text-gray-500 hover:text-[#0EABEB] font-medium  text-md transition duration-300"
                  >
                    Payment Methods
                  </NavLink>
                </li>
              </ul>
            </li>

            <li>
              <NavLink
                to="/reportingAndAnalytics"
                className="flex items-center p-3 text-base font-semibold text-gray-500  hover:bg-gradient-to-r from-[#D5F1FA] hover:text-[#0EABEB] transition duration-300"
              >
                <MdAnalytics className="mr-3 text-xl" />
                <p>Reporting and Analytics</p>
              </NavLink>
            </li>
          </ul>

          <div className="">
            <button
              onClick={() => logout()}
              className="w-full flex items-center gap-3 p-4 text-red-600 bg-red-100 font-semibold hover:bg-red-200 transition duration-300"
            >
              <img src="../img/logout.png" alt="Logout" className="w-5 h-5" />
              Logout
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
