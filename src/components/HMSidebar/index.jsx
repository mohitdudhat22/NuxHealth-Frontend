import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { X } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useAside } from "@/hooks/aside";
import { AppointmentCard } from "./AppointmentCard";

export const HMSidebar = ({ items, isSidebarOpen, handleClick }) => {
  const [billingDropdownOpen, setBillingDropdownOpen] = useState(false);
  const { logout } = useAuth();
  const location = useLocation();
  const { currentPage } = useAside();

  const determineNavLink = () => {
    if (location.pathname.includes("/patient")) {
      return "/patient";
    } else if (location.pathname.includes("/admin")) {
      return "/admin";
    } else if (location.pathname.includes("/reception")) {
      return "/reception";
    }
    return "/";
  };

  const logoLink = determineNavLink();

  return (
    <>
      <aside
        className={`bg-white flex-shrink-0 w-64 min-h-screen flex flex-col transition-all duration-300 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 fixed lg:static z-30`}
      >
        <div className="flex flex-col h-full">
          <div className="text-right pe-2">
            <button onClick={handleClick} className="md:hidden">
              <X size={24} />
            </button>
          </div>
          <div className="logo p-4 text-center flex items-center justify-between border-b">
            <NavLink to={logoLink}>
              <img
                src="/img/logo.png"
                alt="Logo"
                className="w-full max-w-[200px] mx-auto"
                width="100%"
                height="auto"
              />
            </NavLink>
          </div>
          <nav className="max-h-[calc(100vh_-_500px)] h-full overflow-auto flex-auto">
            <ul className="space-y-2 p-2 h-100">
              {items?.map((item, index) => {
                if (item?.dropdown) {
                  return (
                    <li key={index + item.text}>
                      <div>
                        <button
                          onClick={() =>
                            setBillingDropdownOpen((prev) => !prev)
                          }
                          className={`flex items-center w-full p-3 text-base font-semibold transition duration-300 ${
                            billingDropdownOpen
                              ? "bg-gradient-to-r from-[#D5F1FA] text-[#0EABEB]"
                              : "text-gray-500 hover:bg-gradient-to-r from-[#D5F1FA] hover:text-[#0EABEB]"
                          }`}
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
                            {item?.dropdownItems.map((subItem, subIndex) => (
                              <li key={subIndex}>
                                <NavLink
                                  to={subItem.to}
                                  className={({ isActive }) =>
                                    `flex items-center p-3 text-base font-semibold transition duration-300 hover:bg-gradient-to-r from-[#D5F1FA] hover:text-[#0EABEB] ${
                                      currentPage === item.key
                                        ? "bg-gradient-to-r from-[#D5F1FA] text-[#0EABEB]"
                                        : "text-gray-500"
                                    }`
                                  }
                                >
                                  <subItem.icon className="me-2" />
                                  {subItem.text}
                                </NavLink>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </li>
                  );
                }

                return (
                  <li key={index + item.text}>
                    <NavLink
                      to={item.to}
                      className={({ isActive }) =>
                        `flex items-center p-3 text-base font-semibold transition duration-300 hover:bg-gradient-to-r from-[#D5F1FA] hover:text-[#0EABEB] ${
                          currentPage === item.key
                            ? "bg-gradient-to-r from-[#D5F1FA] text-[#0EABEB]"
                            : "text-gray-500"
                        }`
                      }
                    >
                      <item.icon className="me-2" />
                      <span>{item.text}</span>
                    </NavLink>
                  </li>
                );
              })}
            </ul>
          </nav>
          <div className="mt-auto pb-2">
            <AppointmentCard />
            <div className="logout-btn">
              <button
                onClick={logout}
                className="flex items-center w-full p-3 bg-[rgba(225,29,42,0.16)] text-[#e11d29] font-semibold"
              >
                <img src="../img/logout.png" alt="Logout" className="mr-2" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};
