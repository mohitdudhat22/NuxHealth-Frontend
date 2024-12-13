import React, { useEffect, useState } from "react";
import { Tabs, Tab, TextField, IconButton, Badge } from "@mui/material";
import { Visibility } from "@mui/icons-material";
import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import PrescriptionModal from "../../component/modals/PrescriptionModal.jsx";
import { useGlobal } from "../../hooks/useGlobal.jsx";
import { FaEye } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";

const ManagePrescriptionTools = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPrescription, setSelectedPrescription] = useState(null);
  const { getAllPrescriptions, allPrescriptions } = useGlobal();

  useEffect(() => {
    getAllPrescriptions();
  }, []);

  const handleModalOpen = (prescription) => {
    setSelectedPrescription(prescription);
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setSelectedPrescription(null);
  };

  // Separate prescriptions into today's and older ones
  const today = new Date().toISOString().split("T")[0];
  const todayPrescriptions =
    allPrescriptions?.filter(
      (prescription) => prescription.date.split("T")[0] === today,
    ) || [];
  const olderPrescriptions =
    allPrescriptions?.filter(
      (prescription) => prescription.date.split("T")[0] !== today,
    ) || [];

  // Choose the appropriate data based on the active tab
  const currentPrescriptions =
    activeTab === 0 ? todayPrescriptions : olderPrescriptions;
  const currentTabName =
    activeTab === 0 ? "Today Prescriptions" : "Older Prescriptions";

  // Filtering the prescriptions based on search input
  const filteredPrescriptions = currentPrescriptions.filter((prescription) => {
    const searchString = searchTerm.toLowerCase();
    const patientName =
      `${prescription.patientId.firstName} ${prescription.patientId.lastName}`.toLowerCase();
    const phone = prescription.patientId.phone;
    const age = prescription.patientId.age?.toString() || "";

    return (
      patientName.includes(searchString) ||
      phone.includes(searchString) ||
      age.includes(searchString)
    );
  });

  // Format prescription data for the modal
  const formatPrescriptionForModal = (prescription) => ({
    patientName: `${prescription.patientId.firstName} ${prescription.patientId.lastName}`,
    prescriptionDate: new Date(prescription.date).toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    }),
    gender: prescription.patientId.gender,
    age: `${prescription.patientId.age} Years`,
    address: prescription.patientId.address,
    medicines: prescription.medications || [],
    additionalNote: prescription.instructions,
  });

  return (
    <div className="bg-[#F6F8FB] p-3 h-[92%]">
      <div className="manage-p p-8 bg-white shadow-lg rounded-lg">
        <Tabs
          value={activeTab}
          onChange={(e, newValue) => setActiveTab(newValue)}
          className="border-b"
        >
          <Tab label="Today Prescription" className="today bg-green-100" />
          <Tab label="Older Prescription" className="older" />
        </Tabs>

        <div className="head flex justify-between items-center py-3">
          <div className="new-xxl:text-[26px] new-xl:text-[24px] new-lg:text-[22px] font-bold text-[#030229]">
            <p>Patient Details</p>
          </div>

          <div className="search-btn flex">
            <div className="flex items-center bg-gray-100 rounded-full px-4 py-2 w-80">
              <div className="text-xl text-gray-700">
                <CiSearch />
              </div>
              <input
                type="text"
                placeholder="Search Patient"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-transparent pl-2 text-lg"
              />
            </div>
          </div>
        </div>
        <div className="max-h-[760px] overflow-y-auto">
          <table className="min-w-full table-auto">
            <thead className="sticky top-0 bg-gray-100 z-10">
              <tr>
                <th className="p-3 text-left text-[#030229] text-lg font-semibold rounded-tl-lg">
                  Patient Name
                </th>
                <th className="p-3 text-left text-[#030229] text-lg font-semibold">
                  Patient Number
                </th>
                <th className="p-3 text-left text-[#030229] text-lg font-semibold">
                  Appointment Status
                </th>
                <th className="p-3 text-left text-[#030229] text-lg font-semibold">
                  Prescription Date
                </th>
                <th className="p-3 text-left text-[#030229] text-lg font-semibold">
                  Age
                </th>
                <th className="p-3 text-left text-[#030229] text-lg font-semibold">
                  Gender
                </th>
                <th className="p-3 text-left text-[#030229] text-lg font-semibold rounded-tr-lg">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredPrescriptions.map((prescription) => (
                <tr key={prescription._id} className="border-b">
                  <td className="p-3 text-[#4F4F4F] text-base font-semibold">
                    {`${prescription.patientId.firstName} ${prescription.patientId.lastName}`}
                  </td>
                  <td className="p-3 text-[#4F4F4F] text-base font-semibold">
                    {prescription.patientId.phone}
                  </td>
                  <td className="type">
                    <h3
                      className={`px-5 py-2 text-[#4F4F4F] text-base font-semibold rounded-full w-[50%] text-center ${
                        prescription.status === "Active"
                          ? "bg-[#eef1fd] text-[#5678E9]"
                          : "bg-yellow-100 text-yellow-600"
                      }`}
                    >
                      {prescription.status}
                    </h3>
                  </td>
                  <td className="p-3 text-[#4F4F4F] text-base font-semibold">
                    {/* here we have to change the date format */}
                    {new Date(prescription.date).toLocaleDateString("en-US", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </td>
                  <td className="p-3 text-[#4F4F4F] text-base font-semibold">{`${prescription.patientId.age} Years`}</td>
                  <td className="p-3 gender ">
                    <span
                      className={`flex items-center justify-center w-10 h-10 rounded-full bg-[#F6F8FB] text-[#4F4F4F] text-lg ${
                        prescription.gender === "Male"
                          ? "text-blue-500"
                          : "text-pink-500"
                      }`}
                    >
                      {prescription.gender === "Male" ? "♂" : "♀"}
                    </span>
                  </td>
                  <td className="p-3">
                    <button className="text-sm flex items-center bg-[#0EABEB] text-white rounded-lg px-2 py-2 ml-2">
                      <FaEye onClick={() => handleModalOpen(prescription)} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {selectedPrescription && (
          <PrescriptionModal
            open={modalOpen}
            handleClose={handleModalClose}
            prescriptionData={formatPrescriptionForModal(selectedPrescription)}
          />
        )}
      </div>
    </div>
  );
};

export default ManagePrescriptionTools;
