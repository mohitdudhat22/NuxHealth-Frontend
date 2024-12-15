import { useState } from "react";
import moment from "moment";
import PropTypes from "prop-types";

const RescheduleModal = ({
  isOpen,
  onClose,
  onReschedule,
  onDelete,
  selectedEvent,
}) => {
  const [newDate, setNewDate] = useState("");
  const [newTime, setNewTime] = useState("");

  if (!isOpen || !selectedEvent) return null;

  const handleReschedule = (e) => {
    e.preventDefault();
    const updatedAppointment = {
      ...selectedEvent.appointment,
      date: moment(`${newDate} ${newTime}`).toDate(),
      appointmentTime: moment(`${newDate} ${newTime}`).add(1, "hour").toDate(), // Assuming 1-hour appointments
    };
    onReschedule(updatedAppointment);
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center z-50">
      <div className="bg-white p-5 rounded-lg shadow-xl max-w-md w-full">
        <h2 className="text-xl font-semibold mb-4">Reschedule Appointment</h2>
        <form onSubmit={handleReschedule}>
          <div className="space-y-4">
            <div>
              <label className="font-medium block mb-1">Select Date</label>
              <input
                type="date"
                value={newDate}
                onChange={(e) => setNewDate(e.target.value)}
                className="w-full border rounded px-2 py-1"
                required
              />
            </div>
            <div>
              <label className="font-medium block mb-1">Select Time</label>
              <input
                type="time"
                value={newTime}
                onChange={(e) => setNewTime(e.target.value)}
                className="w-full border rounded px-2 py-1"
                required
              />
            </div>
          </div>
          <div className="flex justify-end mt-6 space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={() => onDelete(selectedEvent.id)}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Delete
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Reschedule
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

RescheduleModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onReschedule: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  selectedEvent: PropTypes.shape({
    id: PropTypes.string.isRequired,
    appointment: PropTypes.object.isRequired,
  }).isRequired,
};

export default RescheduleModal;
