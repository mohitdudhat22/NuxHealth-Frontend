import React, { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import moment from "moment";
import toast from "react-hot-toast";

const TimeBlockModal = ({
  isOpen,
  onClose,
  onAddUnavailableTime,
  selectedSlot,
}) => {
  const [title, setTitle] = useState("");
  const [reason, setReason] = useState("");
  const { user } = useAuth();

  if (!isOpen || !selectedSlot) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const startMoment = moment(selectedSlot.start);
    const endMoment = moment(selectedSlot.end);

    const unavailableTimeData = {
      title,
      reason,
      date: startMoment.format("YYYY-MM-DD"),
      timeRange: {
        start: startMoment.format("HH:mm"),
        end: endMoment.format("HH:mm"),
      },
      doctorId: user.id,
    };

    try {
      await onAddUnavailableTime(unavailableTimeData);
      setTitle("");
      setReason("");
      onClose();
      toast.success("Unavailable time added successfully.");
    } catch (error) {
      console.error("Error adding unavailable time:", error);
      toast.error("Failed to add unavailable time. Please try again.");
    }
  };

  const formatTimeSlot = () => {
    const startDate = new Date(selectedSlot.start);
    const endDate = new Date(selectedSlot.end);
    const date = startDate.toLocaleDateString();
    const startTime = startDate.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    const endTime = endDate.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    return `${date} ${startTime} - ${endTime}`;
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center z-50">
      <div className="bg-white p-5 rounded-lg shadow-xl max-w-md w-full">
        <h2 className="text-xl font-semibold mb-4">Block Time Slot</h2>
        <div className="mb-4 p-2 bg-gray-50 rounded">
          <p className="text-sm text-gray-600">Selected Time Slot:</p>
          <p className="font-medium">{formatTimeSlot()}</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label className="font-medium block mb-1">Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full border rounded px-2 py-1"
                placeholder="Enter title for blocking"
                required
              />
            </div>
            <div>
              <label className="font-medium block mb-1">Reason</label>
              <textarea
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                className="w-full border rounded px-2 py-1"
                placeholder="Enter reason for blocking"
                rows="3"
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
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Block Time
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TimeBlockModal;
