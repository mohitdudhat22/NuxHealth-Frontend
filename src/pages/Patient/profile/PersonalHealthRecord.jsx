import React, { useEffect, useState, useRef } from "react";
import { NavLink } from "react-router-dom";
import { FaEye } from "react-icons/fa";
import { FaHospital } from "react-icons/fa6";
import { MdCancel } from "react-icons/md";
import moment from "moment";
import * as htmlToImage from "html-to-image";
import toast from "react-hot-toast";
import "../style.css";
import signature from "../../../assets/signature.svg";
import { useGlobal } from "../../../hooks/useGlobal";
import { useAuth } from "../../../hooks/useAuth";

const PersonalHealthRecord = () => {
  const { user } = useAuth();
  const modalRef = useRef(); // Reference for the modal
  const [selectedPrescription, setSelectedPrescription] = useState(null);
  const [prescription, setPrescription] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState(null);
  const { userData, patientPrescription, findPatientPrescriptions } =
    useGlobal();
  const [isDownloading, setIsDownloading] = useState(false);

  useEffect(() => {
    findPatientPrescriptions(user?.id);
  }, []);

  const handleShowModal = (prescription) => {
    setSelectedPrescription(prescription);
    setModalData(prescription);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedPrescription(null);
  };

  // Function to handle downloading the modal as an image
  const handleDownloadImage = async () => {
    setIsDownloading(true);
    try {
      const modalContent = document.getElementById(
        "prescription-modal-content"
      );
      if (!modalContent) {
        throw new Error("Modal content not found");
      }

      // Hide buttons before capture
      const elementsToHide =
        modalContent.querySelectorAll(".hide-for-download");
      elementsToHide.forEach((el) => {
        if (el) el.style.display = "none";
      });

      const dataUrl = await htmlToImage.toPng(modalContent, {
        quality: 1.0,
        backgroundColor: "white",
        pixelRatio: 2,
        style: {
          // Ensure modal content is visible during capture
          opacity: "1",
          display: "block",
        },
      });

      // Restore hidden elements
      elementsToHide.forEach((el) => {
        if (el) el.style.display = "";
      });

      // Create and trigger download
      const link = document.createElement("a");
      link.download = `prescription-${modalData.patientId.firstName}-${new Date().toISOString()}.png`;
      link.href = dataUrl;
      link.click();
      toast.success("Prescription downloaded successfully.");
    } catch (error) {
      console.error("Error downloading prescription:", error);
      toast.error("Error downloading prescription.");
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="p-4 bg-[#f6f8fb]">
      <div className="mx-3 mx-auto">
        <div className="bg-white p-5 rounded-lg shadow-lg">
          <div className="flex justify-between items-center py-2">
            <h2 className="text-[18px] new-sm:text-[20px] new-lg:text-[22px] new-xl:text-[24px] new-xxl:text-[26px] text-[#030229] font-bold">
              Patient Details
            </h2>
            <NavLink
              to={"/patient/profile/profileEdit"}
              className=" text-white text-center text-[18px] new-xxl:text-[26px font-semibold rounded-md bg-[#0EABEB] p-2 new-xxl:w-[160px] "
            >
              Edit Profile
            </NavLink>
          </div>

          <div className="flex justify-between items-center py-2">
            <div className="w-[100%] sm:w-[10%] pt-[30px] sm:pt-[0px] h-full flex justify-center">
              <img
                src={
                  userData.avatar ||
                  "https://vectorified.com/images/default-user-icon-33.jpg"
                }
                alt="Patient"
                className="rounded-full object-cover w-[150px] new-xxl:w-[120px]"
              />
            </div>
            <div className="w-[100%] sm:w-[90%] pt-[30px] sm:pt-[0px] space-y-5 ps-5">
              {/* Patient Details Section */}
              <div className="grid grid-cols-2 sm:grid-cols-7 gap-4 text-xs">
                <div>
                  <span className="font-medium text-gray-400 text-[17px]">
                    Name:
                  </span>
                  <p className="text-[#141414] text-[15px] font-normal">
                    {userData.firstName + " " + userData.lastName}
                  </p>
                </div>
                <div>
                  <span className="font-medium text-gray-400 text-[17px]">
                    Number:
                  </span>
                  <p className="text-[#141414] text-[15px] font-normal">
                    {userData.phone}
                  </p>
                </div>
                <div>
                  <span className="font-medium text-gray-400 text-[17px]">
                    Email:
                  </span>
                  <p className="text-[#141414] text-[15px] font-normal">
                    {userData.email}
                  </p>
                </div>
                <div>
                  <span className="font-medium text-gray-400 text-[17px]">
                    Gender:
                  </span>
                  <p className="text-[#141414] text-[15px] font-normal">
                    {userData.gender}
                  </p>
                </div>
                <div>
                  <span className="font-medium text-gray-400 text-[17px]">
                    DOB:
                  </span>
                  <p className="text-[#141414] text-[15px] font-normal">
                    {/* /conver ISO in date format */}
                    {moment(userData.dob).format("D MMM, YYYY")}
                  </p>
                </div>
                <div>
                  <span className="font-medium text-gray-400 text-[17px]">
                    Age:
                  </span>
                  <p className="text-[#141414] text-[15px] font-normal">
                    {userData.age}
                  </p>
                </div>
                <div>
                  <span className="font-medium text-gray-400 text-[15px]">
                    Blood Group:
                  </span>
                  <p className="text-[#141414] text-[15px] font-normal">
                    {userData.bloodGroup}
                  </p>
                </div>
                <div>
                  <span className="font-medium text-gray-400 text-[17px] font-medium">
                    Address:
                  </span>
                  <p className="text-[#141414] text-[15px] font-normal">
                    {userData.address}
                  </p>
                </div>
                <div>
                  <span className="font-medium text-gray-400 text-[17px] font-medium">
                    City:
                  </span>
                  <p className="text-[#141414] text-[15px] font-normal">
                    {userData.city}
                  </p>
                </div>
                <div>
                  <span className="font-medium text-gray-400 text-[17px] font-medium">
                    State:
                  </span>
                  <p className="text-[#141414] text-[15px] font-normal">
                    {userData.state}
                  </p>
                </div>
                <div>
                  <span className="font-medium text-gray-400 text-[17px] font-medium">
                    Zip Code:
                  </span>
                  <p className="text-[#141414] text-[15px] font-normal">
                    90001
                  </p>
                </div>
                <div>
                  <span className="font-medium text-gray-400 text-[17px] font-medium">
                    Country:
                  </span>
                  <p className="text-[#141414] text-[15px] font-normal">
                    {userData.country}
                  </p>
                </div>
                <div>
                  <span className="font-medium text-gray-400 text-[17px] font-medium">
                    Emergency Contact:
                  </span>
                  <p className="text-[#141414] text-[15px] font-normal">
                    {userData.phone}
                  </p>
                </div>
                <div>
                  <span className="font-medium text-gray-400 text-[17px] font-medium">
                    Relationship:
                  </span>
                  <p className="text-[#141414] text-[15px] font-normal">
                    Brother
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-8 gap-4 mt-3">
          <div className="col-span-5 sm:col-span-5 bg-white rounded-lg p-3">
            <div className="flex justify-between items-center px-2 pb-2">
              <h1 className="text-[18px] new-sm:text-[20px] new-lg:text-[22px] new-xl:text-[24px] new-xxl:text-[26px] text-[#030229] font-bold">
                Medical History
              </h1>
              <NavLink
                to={"/patient/medicalHistory"}
                className="text-blue-500 hover:text-blue-700 text-[13px] new-lg:text-[14px] new-xl:text-[14px] new-xxl:text-[16px] font-medium"
              >
                View All History
              </NavLink>
            </div>

            <hr />

            <div className="overflow-x-auto pt-3 pb-3">
              <div className="flex flex-col md:flex-row md:-mx-4">
                {/* Medical History Items */}
                {["Dulce Schleifer", "Dulce Schleifer", "Dulce Schleifer"].map(
                  (name, index) => (
                    <div
                      className="w-[100%] sm:w-[33%] px-4 mb-6 md:mb-0 rounded-lg"
                      key={index}
                    >
                      <div className="bg-white rounded-lg shadow-md h-42">
                        <div className="flex justify-between items-center bg-[#F6F8FB] p-2 rounded-lg">
                          <h2 className="text-[18px] font-semibold text-gray-800">
                            {name}
                          </h2>
                          <span className="text-[13px] text-[#4F4F4F] font-semibold">
                            2 Jan, 2022
                          </span>
                        </div>

                        <div className="pt-3">
                          <span className="p-2 text-[#4F4F4F] text-[15px] font-bold">
                            Patient Issue
                          </span>
                          <p className="text-[#4F4F4F] p-2 text-[15px] font-normal">
                            The printing and typesetting industry. Lorem Ipsum
                            has been the industry's standard dummy text ever
                            since the 1500s, when an unknown printer took.
                          </p>
                        </div>
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>

          <div className="col-span-5 sm:col-span-3 bg-white rounded-lg p-3">
            <div className="flex justify-between items-center pb-5">
              <h1 className="text-[18px] new-sm:text-[20px] new-lg:text-[22px] new-xl:text-[24px] new-xxl:text-[26px] text-[#030229] font-bold">
                Prescriptions
              </h1>
              <NavLink
                to={"/patient/prescriptions"}
                className="text-blue-500 hover:text-blue-700 text-[13px] new-lg:text-[14px] new-xl:text-[14px] new-xxl:text-[16px] font-medium"
              >
                View All Prescriptions
              </NavLink>
            </div>
            <hr />

            {/* Scrollable container for the table */}
            <div className="overflow-x-hidden overflow-y-auto h-60">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="py-2 px-4 text-left text-[13px] font-semibold">
                      Hospital Name
                    </th>
                    <th className="py-2 px-4 text-left text-[13px] font-semibold">
                      Date
                    </th>
                    <th className="py-2 px-4 text-left text-[13px] font-semibold">
                      Dr. Name
                    </th>
                    <th className="py-2 px-4 text-left text-[13px] font-semibold">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {Array.isArray(patientPrescription) &&
                  patientPrescription.length > 0 ? (
                    patientPrescription.map((prescription, index) => (
                      <tr key={index}>
                        <td className="py-2 px-4 text-[11] text-[#4F4F4F] font-medium">
                          {prescription?.doctorId?.hospitalName || "N/A"}
                        </td>
                        <td className="py-2 px-4 text-[11] text-[#4F4F4F] font-medium">
                          {prescription.date
                            ? moment(prescription.date).format("D MMM, YYYY")
                            : "N/A"}
                        </td>
                        <td className="py-2 px-4 text-[11] text-[#4F4F4F] font-medium">
                          {prescription?.doctorId?.name || "N/A"}
                        </td>
                        <td className="py-2 px-4">
                          <span
                            onClick={() => handleShowModal(prescription)}
                            className="bg-[#F6F8FB] text-[#0EABEB] rounded-[5px] w-6 h-6 flex items-center justify-center cursor-pointer"
                          >
                            <FaEye />
                          </span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" className="py-2 px-4 text-center">
                        No prescriptions available
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <div className="col-span-5 sm:col-span-5 bg-white rounded-lg p-3">
            <div className="bg-white rounded-lg border-b p-3">
              <div className="flex justify-between items-center">
                <h2 className="text-[18px] new-sm:text-[20px] new-lg:text-[22px] new-xl:text-[24px] new-xxl:text-[26px] text-[#030229] font-bold">
                  Test Reports
                </h2>
                <NavLink
                  to={"/patient/testReport"}
                  className="text-blue-500 hover:text-blue-700 text-[13px] new-lg:text-[14px] new-xl:text-[14px] new-xxl:text-[16px] font-medium"
                >
                  View All Reports
                </NavLink>
              </div>
            </div>

            <div className="flex justify-between align-center p-3 overflow-y-scroll h-[220px]">
              <div className="w-[100%] sm:w-[50%] p-1">
                <div className="box rounded-lg  border p-2">
                  <div className="top flex justify-between align-center">
                    <div className="left flex align-center gap-3">
                      <div className="img ">
                        <img src="/img/Avatar.png" alt="" />
                      </div>
                      <div className="details">
                        <p className="text-[15px] text-[#141414] font-semibold">
                          Dr. Marcus Philips
                        </p>
                        <span className="text-[15px] text-[#A7A7A7] font-medium	">
                          2 Jan, 2022
                        </span>
                      </div>
                    </div>
                    <div className="right">
                      <div className="icon">
                        <span
                          onClick={() => handleShowModal(prescription)}
                          className="bg-[#F6F8FB] text-[#0EABEB] text-[15px] rounded-[5px] w-6 h-6 flex items-center justify-center"
                        >
                          <FaEye />
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="bottom flex justify-between align-center">
                    <div className="left">
                      <p className="text[#141414] text-[17px] font-semibold	">
                        Dieses :{" "}
                        <span className="text-[#818194] font-medium	">
                          Viral Infection
                        </span>
                      </p>
                    </div>
                    <div className="right">
                      <p className="text-[#39973D] text-[14px] font-medium">
                        Pathology Test
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="w-[100%] sm:w-[50%] p-1">
                <div className="box rounded-lg  border p-2">
                  <div className="top flex justify-between align-center">
                    <div className="left flex align-center gap-3">
                      <div className="img ">
                        <img src="/img/Avatar.png" alt="" />
                      </div>
                      <div className="details">
                        <p className="text-[15px] text-[#141414] font-semibold">
                          Dr. Marcus Philips
                        </p>
                        <span className="text-[15px] text-[#A7A7A7] font-medium	">
                          2 Jan, 2022
                        </span>
                      </div>
                    </div>
                    <div className="right">
                      <div className="icon">
                        <span className="bg-[#F6F8FB] text-[#0EABEB] text-[15px] rounded-[5px] w-6 h-6 flex items-center justify-center">
                          <FaEye />
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="bottom flex justify-between align-center">
                    <div className="left">
                      <p className="text[#141414] text-[17px] font-semibold	">
                        Dieses :{" "}
                        <span className="text-[#818194] font-medium	">
                          Viral Infection
                        </span>
                      </p>
                    </div>
                    <div className="right">
                      <p className="text-[#39973D] text-[14px] font-medium">
                        Pathology Test
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="w-[100%] sm:w-[50%] p-1">
                <div className="box rounded-lg  border p-2">
                  <div className="top flex justify-between align-center">
                    <div className="left flex align-center gap-3">
                      <div className="img ">
                        <img src="/img/Avatar.png" alt="" />
                      </div>
                      <div className="details">
                        <p className="text-[15px] text-[#141414] font-semibold">
                          Dr. Marcus Philips
                        </p>
                        <span className="text-[15px] text-[#A7A7A7] font-medium	">
                          2 Jan, 2022
                        </span>
                      </div>
                    </div>
                    <div className="right">
                      <div className="icon">
                        <span className="bg-[#F6F8FB] text-[#0EABEB] text-[15px] rounded-[5px] w-6 h-6 flex items-center justify-center">
                          <FaEye />
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="bottom flex justify-between align-center">
                    <div className="left">
                      <p className="text[#141414] text-[17px] font-semibold	">
                        Dieses :{" "}
                        <span className="text-[#818194] font-medium	">
                          Viral Infection
                        </span>
                      </p>
                    </div>
                    <div className="right">
                      <p className="text-[#39973D] text-[14px] font-medium">
                        Pathology Test
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="w-[100%] sm:w-[50%] p-1">
                <div className="box rounded-lg  border p-2">
                  <div className="top flex justify-between align-center">
                    <div className="left flex align-center gap-3">
                      <div className="img ">
                        <img src="/img/Avatar.png" alt="" />
                      </div>
                      <div className="details">
                        <p className="text-[15px] text-[#141414] font-semibold">
                          Dr. Marcus Philips
                        </p>
                        <span className="text-[15px] text-[#A7A7A7] font-medium	">
                          2 Jan, 2022
                        </span>
                      </div>
                    </div>
                    <div className="right">
                      <div className="icon">
                        <span className="bg-[#F6F8FB] text-[#0EABEB] text-[15px] rounded-[5px] w-6 h-6 flex items-center justify-center">
                          <FaEye />
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="bottom flex justify-between align-center">
                    <div className="left">
                      <p className="text[#141414] text-[17px] font-semibold	">
                        Dieses :{" "}
                        <span className="text-[#818194] font-medium	">
                          Viral Infection
                        </span>
                      </p>
                    </div>
                    <div className="right">
                      <p className="text-[#39973D] text-[14px] font-medium">
                        Pathology Test
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="w-[100%] sm:w-[50%] p-1">
                <div className="box rounded-lg  border p-2">
                  <div className="top flex justify-between align-center">
                    <div className="left flex align-center gap-3">
                      <div className="img ">
                        <img src="/img/Avatar.png" alt="" />
                      </div>
                      <div className="details">
                        <p className="text-[15px] text-[#141414] font-semibold">
                          Dr. Marcus Philips
                        </p>
                        <span className="text-[15px] text-[#A7A7A7] font-medium	">
                          2 Jan, 2022
                        </span>
                      </div>
                    </div>
                    <div className="right">
                      <div className="icon">
                        <span className="bg-[#F6F8FB] text-[#0EABEB] text-[15px] rounded-[5px] w-6 h-6 flex items-center justify-center">
                          <FaEye />
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="bottom flex justify-between align-center">
                    <div className="left">
                      <p className="text[#141414] text-[17px] font-semibold	">
                        Dieses :{" "}
                        <span className="text-[#818194] font-medium	">
                          Viral Infection
                        </span>
                      </p>
                    </div>
                    <div className="right">
                      <p className="text-[#39973D] text-[14px] font-medium">
                        Pathology Test
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="w-[100%] sm:w-[50%] p-1">
                <div className="box rounded-lg  border p-2">
                  <div className="top flex justify-between align-center">
                    <div className="left flex align-center gap-3">
                      <div className="img ">
                        <img src="/img/Avatar.png" alt="" />
                      </div>
                      <div className="details">
                        <p className="text-[15px] text-[#141414] font-semibold">
                          Dr. Marcus Philips
                        </p>
                        <span className="text-[15px] text-[#A7A7A7] font-medium	">
                          2 Jan, 2022
                        </span>
                      </div>
                    </div>
                    <div className="right">
                      <div className="icon">
                        <span className="bg-[#F6F8FB] text-[#0EABEB] text-[15px] rounded-[5px] w-6 h-6 flex items-center justify-center">
                          <FaEye />
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="bottom flex justify-between align-center">
                    <div className="left">
                      <p className="text[#141414] text-[17px] font-semibold	">
                        Dieses :{" "}
                        <span className="text-[#818194] font-medium	">
                          Viral Infection
                        </span>
                      </p>
                    </div>
                    <div className="right">
                      <p className="text-[#39973D] text-[14px] font-medium">
                        Pathology Test
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-span-5 sm:col-span-3 bg-white rounded-lg p-3">
            <h2 className="text-[18px] new-sm:text-[20px] new-lg:text-[22px] new-xl:text-[24px] new-sm:text-[20px] new-lg:text-[22px] new-xl:text-[24px] new-xxl:text-[26px] text-[#030229] font-bold font-bold border-b">
              Patient Status
            </h2>

            <div className="all-box flex items-center">
              <div className="box w-[100%] new-sm:w-[50%]  flex new-lg:flex-col new-xl:flex-row items-center gap-3 p-2 pt-3">
                <div className="icon bg-[#E9F9FF] text-[#36AAD6] text-[24px] p-3 rounded-full">
                  <FaHospital />
                </div>
                <div className="details">
                  <span className="text-[17px] text-[#141414] font-normal	">
                    Shamuba Hospital
                  </span>
                </div>
              </div>

              <div className="box w-[100%] new-sm:w-[50%]  flex new-lg:flex-col new-xl:flex-row items-center gap-3 p-2 pt-3">
                <div className="icon bg-[#c9fff6] text-[#3AB49B] text-[24px] p-3 rounded-full">
                  <FaHospital />
                </div>
                <div className="details">
                  <span className="text-[17px] text-[#141414] font-normal	">
                    Dr. Mathew Best
                  </span>
                </div>
              </div>

              <div className="box w-[100%] new-sm:w-[50%]  flex new-lg:flex-col new-xl:flex-row items-center gap-3 p-2 pt-3">
                <div className="icon bg-[#deffad] text-[#8BD024] text-[24px] p-3 rounded-full">
                  <FaHospital />
                </div>
                <div className="details">
                  <span className="text-[17px] text-[#141414] font-normal	">
                    2 Jan, 2022
                  </span>
                </div>
              </div>

              <div className="box w-[100%] new-sm:w-[50%]  flex new-lg:flex-col new-xl:flex-row items-center gap-3 p-2 pt-3">
                <div className="icon bg-[#e3c4ff] text-[#B269F5] text-[24px] p-3 rounded-full">
                  <FaHospital />
                </div>
                <div className="details">
                  <span className="text-[17px] text-[#141414] font-normal	">
                    Chance Carder
                  </span>
                </div>
              </div>
            </div>

            <div className="box flex new-lg:flex-col new-xl:flex-row items-center justify-between p-2">
              <div className="w-[17%] new-sm:w-[9%] new-lg:w-[15%] new-xl:w-[13%]">
                <div className="icon bg-[#E9F9FF] text-[#36AAD6] text-[24px] p-3 rounded-full">
                  <FaHospital />
                </div>
              </div>
              <div className="details w-[80%] new-sm:w-[88%] new-xl:w-[84%]">
                <p className="text-[17px] text-[#141414] font-normal	">
                  It is a long established fact that a reader will be distracted
                  by the readable content of a page when looking at its layout.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Prescription Modal */}
      {showModal && modalData && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-40">
          <div
            className="fixed inset-0 flex items-center justify-center z-50"
            ref={modalRef}
          >
            <div className="bg-white rounded-lg shadow-lg w-11/12 max-w-md md:max-w-xl relative">
              <div id="prescription-modal-content" className="bg-white p-4">
                <div className="modal-header p-4">
                  <h5 className="modal-title text-[24px] text-[#030229] font-bold">
                    Prescription for {modalData.patientId.firstName}{" "}
                    {modalData.patientId.lastName}
                  </h5>
                  <button
                    type="button"
                    className="hide-for-download absolute top-3 right-3 text-xl text-white rounded-full bg-red-600 w-6 h-6 flex items-center justify-center"
                    onClick={handleCloseModal}
                  >
                    <MdCancel />
                  </button>
                </div>

                <div className="modal-body p-4 pt-0">
                  <div className="max-w-xl mx-auto bg-bg-color rounded-lg p-4 border border-gray-200">
                    <div className="top bg-gray-100 rounded p-4">
                      <div className="head flex justify-between align-center ">
                        <div className="logo w-[140px] sm:w-[238px]">
                          <img src="/image/bill-logo.png" alt="" />
                        </div>
                        <div className="name">
                          <p className="text-[24px] text-[#0EABEB] font-bold">
                            Dr. {modalData.doctorId.name}
                          </p>
                          <span className="text-[14px] text-[#818194] font-semibold">
                            {modalData.doctorId.speciality}
                          </span>
                        </div>
                      </div>

                      <div className="mt-4">
                        <div className="details text-sm">
                          <div className="flex align-center justify-between pb-2">
                            <p className="text-[16px] text-[#141414] font-semibold">
                              Patient Name:{" "}
                              <span className="text-[14px] text-[#818194] font-semibold">
                                {modalData.patientId.firstName}{" "}
                                {modalData.patientId.lastName}
                              </span>
                            </p>
                            <p className="text-[16px] text-[#141414] font-semibold">
                              Prescription Date:{" "}
                              <span className="text-[14px] text-[#818194] font-semibold">
                                {moment(modalData.date).format("D MMM, YYYY")}
                              </span>
                            </p>
                          </div>
                          <div className="flex align-center justify-between pb-2">
                            <p className="text-[16px] text-[#141414] font-semibold">
                              Gender:{" "}
                              <span className="text-[14px] text-[#818194] font-semibold">
                                {modalData.patientId.gender}
                              </span>
                            </p>
                            <p className="w-[50%] text-[16px] text-[#141414] font-semibold">
                              Age:{" "}
                              <span className="text-[14px] text-[#818194] font-semibold">
                                {modalData.patientId.age}
                              </span>
                            </p>
                          </div>
                          <p className="text-[16px] text-[#141414] font-semibold">
                            Instructions:{" "}
                            <span className="text-[14px] text-[#818194] font-semibold">
                              {modalData.instructions}
                            </span>
                          </p>
                        </div>
                      </div>
                    </div>

                    <table className="w-[100%] mt-4 table-data">
                      <thead className="bg-gray-100">
                        <tr>
                          <th className="text-[#030229] text-[14px] font-semibold	p-3">
                            Medicine Name
                          </th>
                          <th className="text-[#030229] text-[14px] font-semibold	p-3">
                            Strength
                          </th>
                          <th className="text-[#030229] text-[14px] font-semibold	p-3">
                            Dose
                          </th>
                          <th className="text-[#030229] text-[14px] font-semibold	p-3">
                            Duration
                          </th>
                          <th className="text-[#030229] text-[14px] font-semibold	p-3">
                            When to Take
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {modalData.medications.map((medication, index) => (
                          <tr key={index} className="text-center">
                            <td className=" text-[#141414] text-[16px] font-semibold	py-3 border-b">
                              {medication.medicineName}
                            </td>
                            <td className=" text-[#141414] text-[16px] font-semibold	py-3 border-b">
                              {medication.strength}
                            </td>
                            <td className=" text-[#141414] text-[16px] font-semibold	py-3 border-b">
                              {medication.dose}
                            </td>
                            <td className="duration text-[#141414] text-[16px] font-semibold	py-3 border-b">
                              <span className="bg-[#39973D1A] text-[#39973D] text-[14px] font-semibold p-2 rounded-full">
                                {medication.duration}
                              </span>
                            </td>
                            <td className="take text-[#718EBF] text-[16px] font-semibold	py-3 border-b">
                              <span className="bg-[#5678E91A] text-[718EBF] text-[14px] font-semibold p-2 rounded-full">
                                {medication.whenToTake}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>

                    <div className="mt-4 flex justify-between align-center">
                      <div className="sign border-b pb-2">
                        <div className="w-32 mt-4">
                          <img
                            src={modalData.doctorId.signature}
                            alt="Signature"
                            crossOrigin="anonymous"
                          />
                        </div>
                        <p>Doctor Signature</p>
                      </div>

                      <div className="hide-for-download">
                        <button
                          onClick={handleDownloadImage}
                          disabled={isDownloading}
                          className="text-white text-[18px] bg-[#0EABEB] font-semibold py-[8px] px-[20px] rounded-xl disabled:bg-gray-400 hover:bg-[#0d9bd4] transition-colors"
                        >
                          {isDownloading ? (
                            <span className="flex items-center gap-2">
                              <svg
                                className="animate-spin h-5 w-5 text-white"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                              >
                                <circle
                                  className="opacity-25"
                                  cx="12"
                                  cy="12"
                                  r="10"
                                  stroke="currentColor"
                                  strokeWidth="4"
                                ></circle>
                                <path
                                  className="opacity-75"
                                  fill="currentColor"
                                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                ></path>
                              </svg>
                              Processing...
                            </span>
                          ) : (
                            "Download"
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PersonalHealthRecord;
