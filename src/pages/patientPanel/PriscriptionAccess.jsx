import { useEffect, useState } from "react";
import { IoEyeSharp, IoCloseSharp } from "react-icons/io5";
import { FaDownload, FaRegImage, FaCalendarAlt } from "react-icons/fa";
import PrescriptionModal from "../../component/modals/PrescriptionModal.jsx";
import CustomDateModal from "../../component/modals/CustomDateModal.jsx";
import { useAuth } from "../../hooks/useAuth.jsx";
import { useGlobal } from "../../hooks/useGlobal.jsx";

export default function PrescriptionAccess() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDateRangeModalOpen, setIsDateRangeModalOpen] = useState(false);
  const [selectedPrescription, setSelectedPrescription] = useState(null);
  const [dateRange, setDateRange] = useState([null, null]);
  const { findPatientPrescriptions, patientPrescription } = useGlobal();
  const { user } = useAuth();

  useEffect(() => {
    findPatientPrescriptions(user.id);
  }, []);

  // Function to handle the date range change
  const handleDateRangeChange = (newRange) => {
    setDateRange(newRange); // Update the date range with the new values
    setIsDateRangeModalOpen(false);
  };

  // Function to clear the date range
  const clearDateRange = (e) => {
    e.stopPropagation();
    setDateRange([null, null]);
  };

  // Function to filter prescriptions by date range
  const filterPrescriptionsByDate = (prescriptions, range) => {
    const [startDate, endDate] = range;
    if (!startDate || !endDate) return prescriptions;

    return prescriptions.filter((prescription) => {
      const prescriptionDate = new Date(prescription.date);
      return (
        prescriptionDate >= new Date(startDate) &&
        prescriptionDate <= new Date(endDate)
      );
    });
  };

  const openModal = (prescription) => {
    setSelectedPrescription(prescription);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedPrescription(null);
  };

  // Get filtered prescriptions based on date range
  const filteredPrescriptions = filterPrescriptionsByDate(
    patientPrescription,
    dateRange,
  );

  return (
    <>
      <div className="mx-3 mt-5">
        <div className="bg-white shadow-lg h-auto p-4 rounded-xl m-3">
          <div className="flex flex-col md:flex-row justify-between sm:items-center mb-3">
            <h1 className="text-xl font-semibold mb-2 md:mb-0">
              Prescription Access
            </h1>

            <div className="flex items-center space-x-3">
              <div
                className="flex items-center border rounded-md p-2 bg-white cursor-pointer"
                onClick={() => setIsDateRangeModalOpen(true)} // Open Custom Date Picker
              >
                <span className="pl-3 text-gray-500 me-1">
                  <FaCalendarAlt />
                </span>
                <input
                  type="text"
                  className="flex-1 focus:outline-none text-sm min-w-[189px] max-w-[300px] sm:min-w-[180px]"
                  value={
                    dateRange[0] && dateRange[1]
                      ? `${new Date(dateRange[0]).toLocaleDateString("en-US")} - ${new Date(
                          dateRange[1],
                        ).toLocaleDateString("en-US")}`
                      : "Select Date Range"
                  }
                  readOnly
                />
                <div
                  className="h-5 w-5 rounded-full bg-red-500 flex items-center justify-center cursor-pointer text-white"
                  onClick={clearDateRange} // Use the clearDateRange function here
                >
                  <IoCloseSharp />
                </div>
              </div>
            </div>
          </div>

          <div className="overflow-y-auto" style={{ height: "550px" }}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 new-lg:grid-cols-3 new-xxl:grid-cols-4 gap-4">
              {filteredPrescriptions?.map((prescription) => (
                <div
                  key={prescription._id}
                  className="w-full mx-auto bg-white rounded-lg shadow-md"
                >
                  <div className="bg-[#f6f8fb] p-2 flex items-center justify-between rounded-t-lg">
                    <h2 className="text-lg font-semibold text-foreground">
                      Dr. {prescription?.doctorId?.name || "N/A"}
                    </h2>
                    <div className="flex">
                      {/* <div className="bg-white rounded-lg border text-[#A7A7A7] hover:text-[#0EABEB] transition duration:300 p-2 me-2">
                        <FaDownload />
                      </div> */}
                      <div
                        onClick={() => openModal(prescription)}
                        className="bg-white rounded-lg border text-[#A7A7A7] hover:text-[#0EABEB] transition duration:300 p-2"
                      >
                        <IoEyeSharp />
                      </div>
                    </div>
                  </div>
                  <div className="p-3 border rounded-b-lg">
                    <div className="mt-1 flex items-center justify-between">
                      <span className="text-base font-normal text-[#818194]">
                        Hospital Name
                      </span>
                      <p className="text-sm font-medium text-[#4F4F4F]">
                        {prescription?.doctorId?.hospitalName || "N/A"}
                      </p>
                    </div>
                    <div className="mt-1 flex items-center justify-between">
                      <span className="text-base font-normal text-[#818194]">
                        Disease Name
                      </span>
                      <p className="text-sm font-medium text-[#4F4F4F]">
                        {prescription.diseaseName || "N/A"}
                      </p>
                    </div>
                    <div className="mt-1 flex items-center justify-between">
                      <span className="text-base font-normal text-[#818194]">
                        Date
                      </span>
                      <p className="text-sm font-medium text-[#4F4F4F]">
                        {new Date(prescription.date).toLocaleDateString(
                          "en-US",
                        ) || "N/A"}
                      </p>
                    </div>
                    <div className="mt-1 flex items-center justify-between">
                      <span className="text-base font-normal text-[#818194]">
                        Time
                      </span>
                      <p className="text-sm font-medium text-[#4F4F4F]">
                        {new Date(prescription.date).toLocaleTimeString(
                          "en-US",
                          {
                            hour: "2-digit",
                            minute: "2-digit",
                          },
                        ) || "N/A"}
                      </p>
                    </div>
                    <div className="mt-4 flex items-center border rounded-md p-1">
                      <div className="bg-[#f6f8fb] rounded-lg text-[#5678e9] p-3">
                        <FaRegImage />
                      </div>
                      <div className="ml-2">
                        <span className="text-[#030229] block">
                          {prescription.fileName || "Prescription.JPG"}
                        </span>
                        <span className="text-[#A7A7A7] text-sm">
                          {prescription.fileSize || "5.09 MB"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-40">
            <div className="fixed inset-0 flex items-center justify-center z-50">
              <PrescriptionModal
                open={isModalOpen}
                handleClose={handleModalClose}
                prescriptionData={selectedPrescription}
              />
            </div>
          </div>
        )}

        {/* Custom Date Range Modal */}
        <CustomDateModal
          open={isDateRangeModalOpen}
          onClose={() => setIsDateRangeModalOpen(false)}
          onApply={handleDateRangeChange} // Pass handleDateRangeChange as the onApply handler
        />
      </div>
    </>
  );
}
