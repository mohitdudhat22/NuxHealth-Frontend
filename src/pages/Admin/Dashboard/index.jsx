import React, { useEffect, useState } from "react";
import {
  FaUsers,
  FaUser,
  FaFileAlt,
  FaAddressCard,
  FaEye,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import PatientsStatistics from "@/component/PatientComponents/PatientsStatistics.jsx";
import PatientsBreakdown from "@/component/PatientComponents/PatienBreakDown.jsx";
import toast from "react-hot-toast";
import apiService from "@/services/api.js";
import { useGlobal } from "@/hooks/useGlobal";

const Dashboard = () => {
  const navigate = useNavigate();
  const { getBills, allBills } = useGlobal();
  const [totalAppointments, setTotalAppointments] = useState(0);
  const [todaysAppointments, setTodaysAppointments] = useState([]);
  const [totalPatients, setTotalPatients] = useState(0);
  const [totalDoctors, setTotalDoctors] = useState(0);

  useEffect(() => {
    const fetchAllAppointments = async () => {
      try {
        const response = await apiService.GetallAppointmentsForCount();
        if (response && response.data && Array.isArray(response.data)) {
          const data = response.data;
          setTotalAppointments(data.length);
        } else {
          console.error("Unexpected response structure:", response);
          setTotalAppointments(0);
        }
      } catch (error) {
        console.error("Error fetching all appointments:", error);
        toast.error("Error fetching all appointments");
        setTotalAppointments(0);
      }
    };

    const fetchTodaysAppointments = async () => {
      const response = await apiService.GetAllTodayAppointments();
      const data = response.data;

      // Get today's date in 'YYYY-MM-DD' format (UTC)
      const today = new Date().toISOString().split("T")[0];

      // Filter appointments with today's date
      const filteredAppointments = data.filter((appointment) => {
        const appointmentDate = new Date(appointment.date)
          .toISOString()
          .split("T")[0];
        return appointmentDate === today;
      });

      setTodaysAppointments(filteredAppointments);
      console.log(filteredAppointments);
    };

    const fetchPatients = async () => {
      try {
        const response = await apiService.GetAllPatients();
        const data = response.data.data;
        setTotalPatients(data.length);
      } catch (error) {
        console.error("Error fetching patients:", error);
        toast.error("Error fetching patients");
      }
    };

    const fetchDoctors = async () => {
      try {
        const response = await apiService.GetAllDoctors();
        const data = response.data.data;
        setTotalDoctors(data.length);
      } catch (error) {
        console.error("Error fetching doctors:", error);
        toast.error("Error fetching doctors");
      }
    };

    fetchAllAppointments();
    fetchTodaysAppointments();
    fetchPatients();
    fetchDoctors();
    getBills();
  }, []);

  return (
    <div className="deshbord-section">
      <div className="row">
        <div className="main bg-[#F6F8FB]">
          <div className="top flex px-5 pt-3 pb-2">
            <div className="Patients-data w-[58%] px-4">
              <div className="total-data flex justify-between items-center mb-4">
                <div className="total-Patients w-[32%] bg-white rounded-lg p-4">
                  <div className="content flex items-center">
                    <div className="logo new-xxl:w-[60px] new-xxl:h-[60px] new-xl:w-[40px] new-xl:h-[40px] new-lg:w-[30px] new-lg:h-[30px] rounded-full bg-[#2e779326] flex justify-center items-center">
                      <FaUsers className="text-[#2e7793] w-7" />
                    </div>
                    <div className="details pl-4">
                      <p className="text-[#A7A7A7] new-xxl:text-[18px] new-xl:text-[13px] new-lg:text-[10px] font-normal">
                        Total Patients
                      </p>
                      <span className="block text-[#030229] new-xxl:text-[30px] new-xl:text-[25px] new-lg:text-[22px] font-extrabold">
                        {totalPatients}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="total-Docters w-[32%] bg-white rounded-lg p-4">
                  <div className="content flex items-center">
                    <div className="logo dr-logo new-xxl:w-[60px] new-xxl:h-[60px] new-xl:w-[40px] new-xl:h-[40px] new-lg:w-[30px] new-lg:h-[30px] rounded-full bg-[#5e5e9e26] flex justify-center items-center">
                      <FaUser className="text-[#5e5e9e] w-7" />
                    </div>
                    <div className="details pl-4">
                      <p className="text-[#A7A7A7] new-xxl:text-[18px] new-xl:text-[13px] new-lg:text-[10px] font-normal">
                        Total Doctors
                      </p>
                      <span className="block text-[#030229] new-xxl:text-[30px] new-xl:text-[25px] new-lg:text-[22px] font-extrabold">
                        {totalDoctors}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="total-Appointments w-[32%] bg-white rounded-lg p-4">
                  <div className="content flex items-center">
                    <div className="logo appo-logo new-xxl:w-[60px] new-xxl:h-[60px] new-xl:w-[40px] new-xl:h-[40px] new-lg:w-[30px] new-lg:h-[30px] rounded-full bg-[#41b16126] flex justify-center items-center">
                      <FaFileAlt className="text-[#41b161] w-7" />
                    </div>
                    <div className="details pl-4">
                      <p className="text-[#A7A7A7] new-xxl:text-[18px] new-xl:text-[13px] new-lg:text-[10px] font-normal">
                        Total Appointments
                      </p>
                      <span className="block text-[#030229] new-xxl:text-[30px] new-xl:text-[25px] new-lg:text-[22px] font-extrabold">
                        {totalAppointments}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <PatientsStatistics />
            </div>

            <div className="Billing-data new-xxl:h-[505px] new-xl:h-[495px] new-lg:h-[490px] w-[42%] bg-white rounded-lg p-4">
              <div className="head flex justify-between items-center mb-4 border-b pb-4">
                <div className="title">
                  <p className="text-[#030229] new-xxl:text-[26px] new-xl:text-[24px] new-lg:text-[22px] font-bold">
                    Billing & Payments
                  </p>
                </div>
                <div className="btn">
                  <button
                    className="flex items-center justify-center text-white new-xxl:text-[22px] new-xl:text-[18px] new-lg:text-[18px] font-semibold px-3 py-2 rounded-md bg-[#0eabeb] gap-2"
                    onClick={() => navigate("/createbill")}
                  >
                    <FaAddressCard className="text-white new-xxl:text-[22px] new-xl:text-[18px] new-lg:text-[18px]" />
                    Create Bills
                  </button>
                </div>
              </div>
              <div className="pending-bill h-[85%]">
                <div className="bill-status pt-2">
                  <p className="text-[#030229] new-xxl:text-[20px] new-xl:text-[18px] new-lg:text-[18px] font-semibold">
                    Pending Bills: <span>{allBills.length}</span>
                  </p>
                </div>
                <div className="pending-bill-data pt-5 h-[90%]">
                  {allBills.length === 0 ? (
                    <div className="img">
                      <img
                        src="../img/FrameBill.png"
                        alt="No Billing Data"
                        className="mx-auto"
                      />
                    </div>
                  ) : (
                    <div className="bill-table h-full overflow-y-scroll scrollbar-thin scrollbar-thumb-[#030229] scrollbar-track-gray-200">
                      <table className="w-full px-2">
                        <thead>
                          <tr className="bg-gray-100">
                            <th className="text-[#030229] text-sm font-semibold new-xxl:px-4 py-3">
                              Bill No
                            </th>
                            <th className="text-[#030229] text-sm font-semibold new-xxl:px-4 py-3">
                              Patient Name
                            </th>
                            <th className="text-[#030229] text-sm font-semibold new-xxl:px-4 py-3">
                              Disease Name
                            </th>
                            <th className="text-[#030229] text-sm font-semibold new-xxl:px-4 py-3">
                              Status
                            </th>
                            <th className="text-[#030229] text-sm font-semibold new-xxl:px-4 py-3">
                              Action
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {allBills.map((bill) => (
                            <tr key={bill.id} className="text-center">
                              <td className="bill-num px-2 py-1">
                                <p className="text-[#718ebf] bg-gray-100 rounded-full text-center px-4 py-1">
                                  {bill.billNumber}
                                </p>
                              </td>
                              <td className="patient-name px-2 py-1">
                                <p className="text-gray-700 text-xs font-medium">{`${bill.patientId?.firstName} ${bill.patientId?.lastName}`}</p>
                              </td>
                              <td className="disease-name px-2 py-1">
                                <p className="text-gray-700 text-xs font-medium">
                                  {bill.diseaseName}
                                </p>
                              </td>
                              <td
                                className={`${
                                  bill.status === "paid" ? "status" : "status1"
                                } px-2 py-1`}
                              >
                                <p
                                  className={`${
                                    bill.status === "paid"
                                      ? "bg-green-100 text-green-600"
                                      : "bg-red-100 text-red-600"
                                  } text-sm font-semibold px-5 py-1 rounded-full`}
                                >
                                  {bill.status}
                                </p>
                              </td>
                              <td className="action flex justify-center items-center px-2 py-1">
                                <div
                                  className="box w-7 h-7 bg-gray-100 flex items-center justify-center rounded-md cursor-pointer"
                                  onClick={() => navigate(`/bill/${bill.id}`)}
                                >
                                  <FaEye className="text-[#0eabeb]" />
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="bottom flex px-[20px] py-[10px] pb-[30px]">
            <div className="appointments-data w-[58%] px-[15px]">
              <div className="today-appointments">
                <div className="appointments-content bg-white p-5 rounded-lg h-[330px]">
                  <div className="head">
                    <div className="title flex justify-between items-center">
                      <p className="new-xxl:text-[26px] new-xl:text-[24px] new-lg:text-[22px] font-bold pb-3">
                        Today's Appointments List
                      </p>
                      <span className="text-blue-500 cursor-pointer text-[16px] font-medium">
                        {" "}
                        View All
                      </span>
                    </div>
                  </div>

                  {todaysAppointments?.length === 0 ? (
                    <div className="img h-[85%] pt-5">
                      <img
                        src="../img/Frame1.png"
                        alt="No Appointments Data"
                        className="object-cover mx-auto h-full w-[217px]"
                      />
                    </div>
                  ) : (
                    <div className="appointments-list h-[80%] flex overflow-y-scroll scrollbar-thin scrollbar-thumb-[#030229] scrollbar-track-[#f4f4f4]">
                      {todaysAppointments?.map((appointment, index) => (
                        <div
                          className="box new-xxl:w-[33%] new-xl:w-[49%] new-lg:w-[49%] p-2"
                          key={index}
                        >
                          <div className="content">
                            <div className="heading flex justify-between items-center bg-[#f6f8fb] p-3 rounded-t-lg">
                              <p className="text-[18px] text-[#030229] font-semibold">
                                {appointment?.patientId?.firstName}{" "}
                                {appointment?.patientId?.lastName}
                              </p>
                              <span>{appointment?.type}</span>
                            </div>
                            <div className="data border border-[#f4f4f4] p-3">
                              <ul>
                                <li>
                                  <p className="text-[16px] font-normal text-[#818194]">
                                    Doctor Name
                                  </p>
                                  <span className="text-sm font-bold text-[#4f4f4f]">
                                    Dr. {appointment?.doctorId?.name}
                                  </span>
                                </li>
                                <li>
                                  <p className="text-[16px] font-normal text-[#818194]">
                                    Disease Name
                                  </p>
                                  <span className="text-sm font-bold text-[#4f4f4f]">
                                    {appointment?.patient_issue}
                                  </span>
                                </li>
                                <li>
                                  <p className="text-[16px] font-normal text-[#818194]">
                                    Appointment Time
                                  </p>
                                  <span className="text-sm font-bold text-[#4f4f4f]">
                                    {appointment?.appointmentTime &&
                                      new Date(
                                        appointment.appointmentTime
                                      ).toLocaleTimeString([], {
                                        hour: "2-digit",
                                        minute: "2-digit",
                                        hour12: true,
                                      })}
                                  </span>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
            <PatientsBreakdown />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
