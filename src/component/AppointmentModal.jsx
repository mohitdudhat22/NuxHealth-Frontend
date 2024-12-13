import Modal from "react-modal";
import PropTypes from "prop-types";

const AppointmentModal = ({ modalData, onClose }) => {
  const { day, time } = modalData || {};

  return (
    <Modal
      isOpen={!!modalData}
      onRequestClose={onClose}
      contentLabel="Appointment Details"
    >
      <h3>Appointment Details</h3>
      <p>
        <strong>Day:</strong> {day}
      </p>
      <p>
        <strong>Time:</strong> {time}
      </p>
      <p>
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry.
      </p>
      <button onClick={onClose} className="button close">
        Close
      </button>
      <button className="button edit">Edit</button>
      <button className="button delete">Delete</button>
    </Modal>
  );
};

AppointmentModal.propTypes = {
  modalData: PropTypes.shape({
    day: PropTypes.string.isRequired,
    time: PropTypes.string.isRequired,
  }),
  onClose: PropTypes.func.isRequired,
};

export default AppointmentModal;
