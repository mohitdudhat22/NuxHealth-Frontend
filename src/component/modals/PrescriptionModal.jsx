import { useRef } from "react";
import { Dialog, DialogContent, DialogTitle, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { toPng } from "html-to-image";
import signature from "../../assets/signature.svg";
import { FaDownload } from "react-icons/fa";
import moment from "moment";
import PropTypes from "prop-types";
import toast from "react-hot-toast";

const PrescriptionModal = ({ open, handleClose, prescriptionData }) => {
  const modalRef = useRef(null);

  const downloadPrescriptionImage = async () => {
    if (modalRef.current) {
      try {
        // Hide download and close buttons before capture
        const buttons = modalRef.current.querySelectorAll(".hide-for-download");
        buttons.forEach((button) => (button.style.display = "none"));

        const dataUrl = await toPng(modalRef.current, {
          quality: 1.0,
          backgroundColor: "white",
          pixelRatio: 2,
        });

        // Restore buttons after capture
        buttons.forEach((button) => (button.style.display = ""));

        const link = document.createElement("a");
        link.href = dataUrl;
        const fileName = `prescription-${
          prescriptionData?.patientId?.firstName ||
          prescriptionData?.patientName
        }-${moment().format("YYYY-MM-DD-HH-mm-ss")}.png`;
        link.download = fileName;
        link.click();
        toast.success("Prescription image downloaded successfully");
      } catch (error) {
        console.error("Failed to download image:", error);
        toast.error(
          "Failed to download the prescription image. Please try again.",
        );
        throw error;
      }
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      maxWidth="md"
      classes={{ paper: "max-h-[90vh] overflow-y-auto bg-white" }}
    >
      <DialogTitle>
        <div className="flex justify-between items-center">
          <span className="text-xl font-semibold">Prescription</span>
          <div className="flex items-center hide-for-download">
            <IconButton
              onClick={downloadPrescriptionImage}
              title="Download as Image"
            >
              <FaDownload />
            </IconButton>
            <IconButton onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </div>
        </div>
      </DialogTitle>

      <DialogContent ref={modalRef} style={{ backgroundColor: "white" }}>
        <div className="border rounded p-4 bg-white">
          <div className="bg-gray-100 rounded p-4 mb-4">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="w-32 md:w-40">
                <img
                  src="/image/bill-logo.png"
                  alt="Logo"
                  className="w-full"
                  crossOrigin="anonymous"
                />
              </div>
              <div className="text-center sm:text-right">
                <p className="text-[24px] text-[#0EABEB] font-bold">
                  Dr. {prescriptionData?.doctorId?.name || "Bharat Patel"}
                </p>
                <span className="text-[14px] text-[#818194] font-semibold">
                  {prescriptionData?.doctorId?.speciality ||
                    "Obstetrics and Gynecology"}
                </span>
              </div>
            </div>

            <div className="mt-4 space-y-2">
              <div className="flex flex-col sm:flex-row sm:justify-between gap-2">
                <p className="text-[16px] text-[#141414] font-semibold">
                  Patient Name:{" "}
                  <span className="text-[14px] text-[#818194] font-semibold">
                    {prescriptionData?.patientId?.firstName
                      ? `${prescriptionData.patientId.firstName} ${prescriptionData.patientId.lastName}`
                      : prescriptionData?.patientName}
                  </span>
                </p>
                <p className="text-[16px] text-[#141414] font-semibold">
                  Prescription Date:{" "}
                  <span className="text-[14px] text-[#818194] font-semibold">
                    {moment(
                      prescriptionData?.date ||
                        prescriptionData?.prescriptionDate,
                    ).format("D MMM, YYYY")}
                  </span>
                </p>
              </div>
              <div className="flex flex-col sm:flex-row sm:justify-between gap-2">
                <p className="text-[16px] text-[#141414] font-semibold">
                  Gender:{" "}
                  <span className="text-[14px] text-[#818194] font-semibold">
                    {prescriptionData?.patientId?.gender ||
                      prescriptionData?.gender}
                  </span>
                </p>
                <p className="text-[16px] text-[#141414] font-semibold">
                  Age:{" "}
                  <span className="text-[14px] text-[#818194] font-semibold">
                    {prescriptionData?.patientId?.age || prescriptionData?.age}
                  </span>
                </p>
              </div>
              <p className="text-[16px] text-[#141414] font-semibold break-words">
                Address:{" "}
                <span className="text-[14px] text-[#818194] font-semibold">
                  {prescriptionData?.patientId?.address ||
                    prescriptionData?.address}
                </span>
              </p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full table-auto whitespace-nowrap">
              <thead className="sticky top-0 bg-gray-100 z-10">
                <tr>
                  <th className="p-2 sm:p-3 text-left text-[#030229] text-sm sm:text-lg font-semibold rounded-tl-lg">
                    Medicine Name
                  </th>
                  <th className="p-2 sm:p-3 text-left text-[#030229] text-sm sm:text-lg font-semibold">
                    Strength
                  </th>
                  <th className="p-2 sm:p-3 text-left text-[#030229] text-sm sm:text-lg font-semibold">
                    Dose
                  </th>
                  <th className="p-2 sm:p-3 text-left text-[#030229] text-sm sm:text-lg font-semibold">
                    Duration
                  </th>
                  <th className="p-2 sm:p-3 text-left text-[#030229] text-sm sm:text-lg font-semibold rounded-tr-lg">
                    When to Take
                  </th>
                </tr>
              </thead>
              <tbody>
                {(prescriptionData?.medications || prescriptionData?.medicines)?.map((medicine, index) => (
                  <tr key={index} className="border-b">
                    <td className="p-2 sm:p-3 text-[#4F4F4F] text-sm sm:text-base font-semibold">
                      {medicine.medicineName}
                    </td>
                    <td className="p-2 sm:p-3 text-[#4F4F4F] text-sm sm:text-base font-semibold">
                      {medicine.strength}
                    </td>
                    <td className="p-2 sm:p-3 text-[#4F4F4F] text-sm sm:text-base font-semibold">
                      {medicine.dose}
                    </td>
                    <td className="p-2 sm:p-3">
                      <span className="bg-[#39973D1A] text-[#39973D] text-xs sm:text-[14px] font-semibold py-1 sm:py-2 px-2 sm:px-3 rounded-full">
                        {medicine.duration}
                      </span>
                    </td>
                    <td className="p-2 sm:p-3">
                      <span className="bg-[#5678E91A] text-[#718EBF] text-xs sm:text-[14px] font-semibold p-1 sm:p-2 rounded-full">
                        {medicine.whenToTake}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-4">
            <h3 className="font-bold text-base font-medium text-[#030229]">
              Additional Note
            </h3>
            <p className="text-[14px] text-[#818194] font-semibold">
              {prescriptionData?.instructions ||
                prescriptionData?.additionalNote}
            </p>
          </div>

          <div className="mt-4 flex justify-between align-center">
            <div className="sign border-b pb-2">
              <div className="w-32 mt-4">
                <img
                  src={prescriptionData?.doctorId?.signature || signature}
                  alt="Signature"
                  crossOrigin="anonymous"
                  className="max-w-full"
                />
              </div>
              <p>Doctor Signature</p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

// PropTypes validation
PrescriptionModal.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  prescriptionData: PropTypes.shape({
    address: PropTypes.string,
    age: PropTypes.number,
    gender: PropTypes.string,
    patientName: PropTypes.string,
    patientId: PropTypes.shape({
      firstName: PropTypes.string,
      lastName: PropTypes.string,
      gender: PropTypes.string,
      age: PropTypes.number,
      address: PropTypes.string,
    }),
    doctorId: PropTypes.shape({
      name: PropTypes.string,
      speciality: PropTypes.string,
      signature: PropTypes.string,
    }),
    date: PropTypes.string,
    prescriptionDate: PropTypes.string,
    medications: PropTypes.arrayOf(
      PropTypes.shape({
        medicineName: PropTypes.string,
        strength: PropTypes.string,
        dose: PropTypes.string,
        duration: PropTypes.string,
        whenToTake: PropTypes.string,
      }),
    ),
    medicines: PropTypes.arrayOf(
      PropTypes.shape({
        medicineName: PropTypes.string,
        strength: PropTypes.string,
        dose: PropTypes.string,
        duration: PropTypes.string,
        whenToTake: PropTypes.string,
      }),
    ),
    instructions: PropTypes.string,
    additionalNote: PropTypes.string,
  }),
  onDownload: PropTypes.func,
};

export default PrescriptionModal;
