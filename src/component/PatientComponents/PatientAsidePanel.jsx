import { NavLink } from "react-router-dom";
import "./patientAsidePanel.css";
import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { RiContactsBookFill } from "react-icons/ri";
import { FaCalendarCheck } from "react-icons/fa";
import { FaFilePrescription } from "react-icons/fa6";
import { FaLaptopMedical } from "react-icons/fa6";
import { IoMdChatbubbles } from "react-icons/io";
import { RiBillLine } from "react-icons/ri";
import { FaCalendarAlt } from "react-icons/fa";

export default function PatientAsidePanel() {
  const { logout } = useAuth();
  // const toggleAccordion = () => {
  //   setAccordionOpen((prevState) => !prevState);
  // };

  return (
    <>
      <div className="sidebar">
        <div className="asite">
          <div className="logo">
            <NavLink to={"/patient"}>
              <img src="/img/logo.png" alt="Logo" width="100%" height="auto" />
            </NavLink>
          </div>
          <nav className="mb-40">
            <ul className="space-y-2">
              <li>
                <NavLink to={"/patient"}>
                  <span className="flex items-center p-3 text-[#818194] hover:text-[#0eabeb] transition duration:300 rounded-lg">
                    <RiContactsBookFill className="me-2" />
                    Personal Health Record
                  </span>
                </NavLink>
              </li>
              <li>
                <NavLink to={"/patient/appointment"}>
                  <span className="flex items-center p-3 text-[#818194] hover:text-[#0eabeb] transition duration:300 rounded-lg">
                    <FaCalendarCheck className="me-2" />
                    Appointment Booking
                  </span>
                </NavLink>
              </li>
              <li>
                <NavLink to={"/patient/priscriptionAccess"}>
                  <span className="flex items-center p-3 text-[#818194] hover:text-[#0eabeb] transition duration:300 rounded-lg">
                    <FaFilePrescription className="me-2" /> Prescription Access
                  </span>
                </NavLink>
              </li>
              <li>
                <NavLink to={"/patient/teleconsultation"}>
                  <span className="flex items-center p-3 text-[#818194] hover:text-[#0eabeb] transition duration:300 rounded-lg">
                    <FaLaptopMedical className="me-2" />
                    Teleconsultation Access
                  </span>
                </NavLink>
              </li>
              <li>
                <NavLink to={"/patient/chatScreen"}>
                  <span className="flex items-center p-3 text-[#818194] hover:text-[#0eabeb] transition duration:300 rounded-lg">
                    <IoMdChatbubbles className="me-2" />
                    Chat
                  </span>
                </NavLink>
              </li>
              <li>
                <NavLink to={"/patient/bills"}>
                  <span className="flex items-center p-3 text-[#818194] hover:text-[#0eabeb] transition duration:300 rounded-lg">
                    {" "}
                    <RiBillLine className="me-2" />
                    Bills
                  </span>
                </NavLink>
              </li>
            </ul>
          </nav>
          <div className="aside-img">
            <div className="img">
              <img src="/img/header-img.png" width="150px" />
            </div>
            <div className="text">
              <h3>Hospital appointment</h3>
              <p>
                You have to fill up the form to be admitted to the hospital.
              </p>
              <div className="btn">
                <button>
                  <FaCalendarAlt />
                  <h3> Appointment</h3>
                </button>
              </div>
            </div>
          </div>
          <div className="logout-btn">
            <button className="flex" onClick={() => logout()}>
              <img src="../img/logout.png" alt="" /> Logout
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
