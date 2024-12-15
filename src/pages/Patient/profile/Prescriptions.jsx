import React, { useEffect, useState } from "react";
import { FaEye } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import * as htmlToImage from "html-to-image";
import moment from "moment";
import toast from "react-hot-toast";
import "../style.css";
import signature from "../../../assets/signature.svg";
import { useGlobal } from "../../../hooks/useGlobal";
import { useAuth } from "../../../hooks/useAuth";

const Prescriptions = () => {
  const { user } = useAuth();
  const { userData, patientPrescription, findPatientPrescriptions } =
    useGlobal();

  const [isSearchVisible, setSearchVisible] = useState(false);
  const [selectedPrescription, setSelectedPrescription] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  // Function to toggle search input visibility
  const toggleSearch = () => {
    setSearchVisible(!isSearchVisible);
  };
  useEffect(() => {
    findPatientPrescriptions(user?.id);
  }, []);

  const handleShowModal = (prescription) => {
    setSelectedPrescription(prescription);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedPrescription(null);
  };

  const handleDownload = async () => {
    try {
      const modalContent = document.getElementById(
        "prescription-modal-content",
      );
      const downloadBtn = modalContent.querySelector(".download-btn-container");
      const closeBtn = modalContent.querySelector(".close-btn-container");

      // Temporarily hide the download and close buttons
      if (downloadBtn) downloadBtn.style.display = "none";
      if (closeBtn) closeBtn.style.display = "none";

      const dataUrl = await htmlToImage.toPng(modalContent, {
        quality: 1.0,
        backgroundColor: "white",
        pixelRatio: 2,
      });

      // Restore the buttons
      if (downloadBtn) downloadBtn.style.display = "block";
      if (closeBtn) closeBtn.style.display = "block";

      // Create download link
      const link = document.createElement("a");
      link.download = `prescription-${selectedPrescription.patientId.firstName}-${new Date().toISOString()}.png`;
      link.href = dataUrl;
      link.click();
      toast.success("Prescription downloaded successfully.");
    } catch (error) {
      console.error("Error downloading prescription:", error);
      toast.error("Error downloading prescription.");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white shadow-lg w-full h-auto p-4 rounded-xl">
        <div className="flex flex-col md:flex-row justify-between items-center mb-3">
          <h1 className=" text-[18px] new-sm:text-[20px] new-lg:text-[22px] new-xl:text-[24px] new-xxl:text-[26px] font-bold text-[font-bold] mb-2 md:mb-0">
            Prescriptions
          </h1>
          <div className="relative w-full md:w-1/3">
            <input
              type="text"
              className={`bg-gray-100 px-5 py-2 rounded-3xl pl-10 w-full ${
                isSearchVisible ? "" : "hidden md:block"
              }`}
              placeholder="Search Here"
              onBlur={() => setSearchVisible(false)} // Hide input on blur
            />
            <button
              className="absolute left-3 top-1/2 transform -translate-y-1/2"
              onClick={toggleSearch}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                width="20"
                height="20"
                className="text-gray-500"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M11 4a7 7 0 100 14 7 7 0 000-14zM21 21l-4.35-4.35"
                />
              </svg>
            </button>
          </div>
        </div>

        <div className="overflow-y-auto pt-4" style={{ height: "720px" }}>
          <div className="grid grid-cols-1 new-sm
          :grid-cols-2 lg:grid-cols-4 gap-4">
            {patientPrescription?.map((prescription, index) => (
              <div
                key={index}
                className="w-full rounded-lg bg-white border border-gray-200 shadow-md"
              >
                <div className="flex justify-between items-center py-2 bg-gray-100 px-3">
                  <h6 className="text-[#030229] text-[18px] font-semibold">
                    {prescription.doctorId.name}
                  </h6>
                  <button
                    onClick={() => handleShowModal(prescription)}
                    className="w-7 h-7 flex items-center justify-center bg-white text-[#0EABEB] rounded-lg"
                  >
                    <FaEye />
                  </button>
                </div>
                <div className="p-3">
                  <div className="flex justify-between items-center">
                    <p className="text-[#818194] text-[16px] font-normal">
                      Hospital Name
                    </p>
                    <span className="text-[#4F4F4F] text-[16px] font-bold">
                      {prescription.doctorId.currentHospital}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="text-[#818194] text-[16px] font-normal">
                      Patient Issue
                    </p>
                    <span className="text-[#4F4F4F] text-[16px] font-bold">
                      {prescription?.appointmentId?.patient_issue}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="text-[#818194] text-[16px] font-normal">
                      Date
                    </p>
                    <span className="text-[#4F4F4F] text-[16px] font-bold">
                      {new Date(prescription.date).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && selectedPrescription && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-40">
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg w-11/12 max-w-md md:max-w-xl relative">
              <div id="prescription-modal-content" className="bg-white p-4">
                <div className="modal-header p-4">
                  <h5 className="modal-title text-[24px] text-[#030229] font-bold">
                    Prescription for {selectedPrescription.patientId.firstName}{" "}
                    {selectedPrescription.patientId.lastName}
                  </h5>
                  <div className="close-btn-container absolute top-3 right-3">
                    <button
                      type="button"
                      className="text-xl text-white rounded-full bg-red-600 w-6 h-6 flex items-center justify-center"
                      onClick={handleCloseModal}
                    >
                      <MdCancel />
                    </button>
                  </div>
                </div>

                <div className="modal-body p-4 pt-0">
                  <div className="max-w-xl mx-auto bg-bg-color rounded-lg p-4 border border-gray-200">
                    <div className="top bg-gray-100 rounded p-4">
                      <div className="head flex justify-between align-center">
                        <div className="logo w-[140px] sm:w-[238px]">
                          <img src="/image/bill-logo.png" alt="" />
                        </div>
                        <div className="name">
                          <p className="text-[24px] text-[#0EABEB] font-bold">
                            Dr. {selectedPrescription.doctorId.name}
                          </p>
                          <span className="text-[14px] text-[#818194] font-semibold">
                            {selectedPrescription.doctorId.speciality}
                          </span>
                        </div>
                      </div>

                      <div className="mt-4">
                        <div className="details text-sm">
                          <div className="flex align-center justify-between pb-2">
                            <p className="text-[16px] text-[#141414] font-semibold">
                              Patient Name:{" "}
                              <span className="text-[14px] text-[#818194] font-semibold">
                                {selectedPrescription.patientId.firstName}{" "}
                                {selectedPrescription.patientId.lastName}
                              </span>
                            </p>
                            <p className="text-[16px] text-[#141414] font-semibold">
                              Prescription Date:{" "}
                              <span className="text-[14px] text-[#818194] font-semibold">
                                {moment(selectedPrescription.date).format(
                                  "D MMM, YYYY",
                                )}
                              </span>
                            </p>
                          </div>
                          <div className="flex align-center justify-between pb-2">
                            <p className="text-[16px] text-[#141414] font-semibold">
                              Gender:{" "}
                              <span className="text-[14px] text-[#818194] font-semibold">
                                {selectedPrescription.patientId.gender}
                              </span>
                            </p>
                            <p className="w-[50%] text-[16px] text-[#141414] font-semibold">
                              Age:{" "}
                              <span className="text-[14px] text-[#818194] font-semibold">
                                {selectedPrescription.patientId.age}
                              </span>
                            </p>
                          </div>
                          <p className="text-[16px] text-[#141414] font-semibold">
                            Instructions:{" "}
                            <span className="text-[14px] text-[#818194] font-semibold">
                              {selectedPrescription.instructions}
                            </span>
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="overflow-x-auto">
                    <table className="w-[100%] mt-4 table-data table-auto whitespace-nowrap">
                      <thead className="bg-gray-100">
                        <tr>
                          <th className="text-[#030229] text-[14px] font-semibold p-3">
                            Medicine Name
                          </th>
                          <th className="text-[#030229] text-[14px] font-semibold p-3">
                            Strength
                          </th>
                          <th className="text-[#030229] text-[14px] font-semibold p-3">
                            Dose
                          </th>
                          <th className="text-[#030229] text-[14px] font-semibold p-3">
                            Duration
                          </th>
                          <th className="text-[#030229] text-[14px] font-semibold p-3">
                            When to Take
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {selectedPrescription.medications.map(
                          (medication, index) => (
                            <tr key={index} className="text-center">
                              <td className="text-[#141414] text-[16px] font-semibold py-3 border-b">
                                {medication.medicineName}
                              </td>
                              <td className="text-[#141414] text-[16px] font-semibold py-3 border-b">
                                {medication.strength}
                              </td>
                              <td className="text-[#141414] text-[16px] font-semibold py-3 border-b">
                                {medication.dose}
                              </td>
                              <td className="duration text-[#141414] text-[16px] font-semibold py-3 border-b">
                                <span className="bg-[#39973D1A] text-[#39973D] text-[14px] font-semibold p-2 rounded-full">
                                  {medication.duration}
                                </span>
                              </td>
                              <td className="take text-[#718EBF] text-[16px] font-semibold py-3 border-b">
                                <span className="bg-[#5678E91A] text-[718EBF] text-[14px] font-semibold p-2 rounded-full">
                                  {medication.whenToTake}
                                </span>
                              </td>
                            </tr>
                          ),
                        )}
                      </tbody>
                    </table>
                    </div>

                    <div className="mt-4 flex justify-between align-center">
                      <div className="sign border-b pb-2">
                        <div className="w-32 mt-4">
                          <img
                            src={selectedPrescription.doctorId.signature}
                            alt="Signature"
                            crossOrigin="anonymous"
                          />
                        </div>
                        <p>Doctor Signature</p>
                      </div>

                      <div className="download-btn-container">
                        <button
                          onClick={handleDownload}
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

export default Prescriptions;
