import React, { useState, useEffect } from "react";
import moment from "moment";
import { useAuth } from "../../hooks/useAuth";
import apiService from "../../services/api";
import toast from "react-hot-toast";

const AppointmentModal = ({
  isOpen,
  onClose,
  onBookAppointment,
  selectedSlot,
  isEditMode = false,
  existingData = {},
}) => {
  const [patientName, setPatientName] = useState("");
  const [patientIssue, setPatientIssue] = useState("");
  const [diseaseName, setDiseaseName] = useState("");
  const [unavailableTimes, setUnavailableTimes] = useState([]);
  const { user } = useAuth();
  const [errors, setErrors] = useState({});

  useEffect(() => {
    // Populate fields if in edit mode
    if (isEditMode && existingData) {
      setPatientName(existingData.patientName || "");
      setPatientIssue(existingData.patient_issue || "");
      setDiseaseName(existingData.diseaseName || "");
    }
  }, [isEditMode, existingData]);

  useEffect(() => {
    if (isOpen && user.id) {
      const fetchUnavailableTimes = async () => {
        try {
          const response = await apiService.GetUnavailableTimes(user.id);
          setUnavailableTimes(response.data);
        } catch (error) {
          console.error("Error fetching unavailable times:", error);
          toast.error("Error fetching unavailable times");
        }
      };

      fetchUnavailableTimes();
    }
  }, [isOpen, user.id]);

  if (!isOpen || !selectedSlot) return null;

  const appointmentDate = moment(selectedSlot.start).format("DD MMMM, YYYY");
  const appointmentTime = `${moment(selectedSlot.start).format("hh:mmA")} - ${moment(selectedSlot.end).format("hh:mmA")}`;

  const isTimeUnavailable = () => {
    return unavailableTimes.some((unavailable) => {
      const start = new Date(
        unavailable.date + " " + unavailable.timeRange.start,
      );
      const end = new Date(unavailable.date + " " + unavailable.timeRange.end);
      return selectedSlot.start >= start && selectedSlot.end <= end;
    });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!patientIssue) {
      newErrors.patientIssue = "Patient issue is required.";
    }
    if (isTimeUnavailable()) {
      newErrors.timeUnavailable =
        "The selected time slot is unavailable. Please choose a different time.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    if (isTimeUnavailable()) {
      alert(
        "The selected time slot is unavailable. Please choose a different time.",
      );
      return;
    }
    const appointmentData = {
      start: selectedSlot.start,
      end: selectedSlot.end,
      patient_issue: patientIssue,
      disease_name: diseaseName,
      date: new Date(selectedSlot.start),
      filteredData: {
        patientName,
        patientIssue,
        diseaseName,
      },
    };
    onBookAppointment(appointmentData);
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center z-50">
      <div className="bg-white p-5 rounded-lg shadow-xl max-w-md w-full">
        <h2 className="text-xl font-semibold mb-4">
          {isEditMode ? "Edit Appointment" : "Book Appointment"}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="font-medium">Appointment Type</span>
              <span className="text-yellow-500">
                {selectedSlot?.type || "Online"}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Patient Name</span>
              <span>{user.firstName + " " + user.lastName}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Appointment Date</span>
              <span>{appointmentDate}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Appointment Time</span>
              <span>{appointmentTime}</span>
            </div>
            <div>
              <label className="font-medium block mb-1">Patient Issue</label>
              <textarea
                value={patientIssue}
                onChange={(e) => setPatientIssue(e.target.value)}
                className={`w-full border rounded px-2 py-1  ${errors.patientIssue ? "border-red-500" : ""}`}
                placeholder="Enter Patient Issue"
                required
              />
              {errors.patientIssue && (
                <p className="text-red-500 text-sm">{errors.patientIssue}</p>
              )}
            </div>
            <div>
              <label className="font-medium block mb-1">
                Disease Name (Optional)
              </label>
              <input
                type="text"
                value={diseaseName}
                onChange={(e) => setDiseaseName(e.target.value)}
                className="w-full border rounded px-2 py-1"
                placeholder="Enter Disease Name"
              />
              {errors.timeUnavailable && (
                <p className="text-red-500 text-sm">{errors.timeUnavailable}</p>
              )}
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
              {isEditMode ? "Save Changes" : "Book Appointment"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AppointmentModal;
