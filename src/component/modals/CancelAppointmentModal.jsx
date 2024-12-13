import { Modal } from "@mui/material";
import { LuCalendarX2 } from "react-icons/lu";
import PropTypes from "prop-types"; // Import PropTypes

const CancelAppointmentModal = ({ open, onClose }) => {
  const handleCancel = () => {
    // Handle appointment cancellation logic
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-lg">
        <div className="bg-card rounded-lg shadow-lg px-6 py-3 max-w-sm mx-auto w-full border-t-[6px] border-red-600">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-red-500 rounded-full p-3 text-white text-lg">
              <LuCalendarX2 />
            </div>
          </div>
          <h2 className="text-[24px] text-[#030229] font-bold text-center">
            Cancel Online Appointment?
          </h2>
          <p className="text-[#4F4F4F] text-sm font-normal text-center mb-6 mt-3">
            If you cancel the appointment, you have to return payment.
          </p>
          <div className="flex justify-between space-x-3">
            <button
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md w-[47%]"
              onClick={onClose}
            >
              No
            </button>
            <button
              className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md w-[47%]"
              onClick={handleCancel}
            >
              Payment Return
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

// PropTypes validation
CancelAppointmentModal.propTypes = {
  open: PropTypes.bool.isRequired, // Validate open as a required boolean
  onClose: PropTypes.func.isRequired, // Validate onClose as a required function
};

export default CancelAppointmentModal;
