import { useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { toPng } from "html-to-image";
import signature from "../../assets/signature.svg";
import { FaDownload } from "react-icons/fa";
import PropTypes from "prop-types";
import toast from "react-hot-toast";

const PrescriptionModal = ({
  open,
  handleClose,
  prescriptionData,
  onDownload,
}) => {
  const modalRef = useRef(null);

  const downloadPrescriptionImage = async () => {
    if (modalRef.current) {
      try {
        const dataUrl = await toPng(modalRef.current, { quality: 0.95 });
        const link = document.createElement("a");
        link.href = dataUrl;
        link.download = "prescription.jpg"; // Default download name
        link.click();
        toast.success("Prescription image downloaded successfully.");
      } catch (error) {
        console.error("Failed to download image:", error);
        toast.error(
          "Failed to download the prescription image. Please try again.",
        );
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
          <div className="flex items-center">
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
                <img src="/image/bill-logo.png" alt="Logo" className="w-full" />
              </div>
              <div className="text-center sm:text-right">
                <p className="font-semibold text-lg">Dr. Bharat Patel</p>
                <span className="text-sm text-gray-600">
                  Obstetrics and Gynecology
                </span>
              </div>
            </div>

            <div className="mt-4 space-y-2 text-sm">
              <div className="flex flex-col sm:flex-row sm:justify-between gap-2">
                <p>
                  Patient Name:{" "}
                  <span className="font-medium">{`${prescriptionData?.patientId.firstName} ${prescriptionData?.patientId.lastName}`}</span>
                </p>
                <p>
                  Prescription Date:{" "}
                  <span className="font-medium">
                    {new Date(prescriptionData.date).toLocaleDateString(
                      "en-US",
                      {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      },
                    )}
                  </span>
                </p>
              </div>
              <div className="flex flex-col sm:flex-row sm:justify-between gap-2">
                <p>
                  Gender:{" "}
                  <span className="font-medium">
                    {prescriptionData.patientId.gender}
                  </span>
                </p>
                <p>
                  Age:{" "}
                  <span className="font-medium">
                    {prescriptionData.patientId.age}
                  </span>
                </p>
              </div>
              <p className="break-words">
                Address:{" "}
                <span className="font-medium">
                  {prescriptionData.patientId.address}
                </span>
              </p>
            </div>
          </div>

          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Medicine Name</TableCell>
                <TableCell>Strength</TableCell>
                <TableCell>Dose</TableCell>
                <TableCell>Duration</TableCell>
                <TableCell>When to Take</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {prescriptionData?.medications?.map((medicine, index) => (
                <TableRow key={index}>
                  <TableCell>{medicine.medicineName}</TableCell>
                  <TableCell>{medicine.strength}</TableCell>
                  <TableCell>{medicine.dose}</TableCell>
                  <TableCell>{medicine.duration}</TableCell>
                  <TableCell>{medicine.whenToTake}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <div className="mt-4">
            <h3 className="font-bold">Additional Note:</h3>
            <p>{prescriptionData.instructions}</p>
          </div>

          {signature && (
            <div className="mt-6 flex justify-end">
              <div className="text-center">
                <div className="border-t w-32 pt-2">
                  <img src={signature} alt="Signature" className="max-w-full" />
                </div>
                <p className="text-sm mt-1">Doctor Signature</p>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

PrescriptionModal.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  prescriptionData: PropTypes.shape({
    patientId: PropTypes.shape({
      firstName: PropTypes.string,
      lastName: PropTypes.string,
      gender: PropTypes.string,
      age: PropTypes.number,
      address: PropTypes.string,
    }),
    date: PropTypes.string,
    medications: PropTypes.arrayOf(
      PropTypes.shape({
        medicineName: PropTypes.string,
        strength: PropTypes.string,
        dose: PropTypes.string,
        duration: PropTypes.string,
        whenToTake: PropTypes.string,
      }),
    ),
    instructions: PropTypes.string,
  }).isRequired,
  onDownload: PropTypes.func,
};

export default PrescriptionModal;
