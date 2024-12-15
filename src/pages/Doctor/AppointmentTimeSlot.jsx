import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useGlobal } from "../../hooks/useGlobal";
import { useAuth } from "../../hooks/useAuth";
import RescheduleModal from "./RescheduleModal";
import TimeBlockModal from "./TimeBlockModal";
import apiService from "../../services/api";
import toast from "react-hot-toast";

const localizer = momentLocalizer(moment);

// Calendar configuration
const calendarConfig = {
  style: { height: 600 },
  views: ["week", "day"],
  defaultView: "week",
  popup: true,
  selectable: true,
};

const eventStyleGetter = (event) => ({
  style: { backgroundColor: event.isUnavailable ? "#d9534f" : "#3a87ad" },
});

const AppointmentTimeSlot = () => {
  // State management
  const [events, setEvents] = useState([]);
  const [modalState, setModalState] = useState({
    reschedule: { isOpen: false, event: null },
    timeBlock: { isOpen: false, slot: null },
  });
  const [unavailableTimes, setUnavailableTimes] = useState([]);
  const [isBlockingMode, setIsBlockingMode] = useState(true);

  const {
    allAppointments,
    getAppointmetnsForDoctor,
    updateAppointment,
    deleteAppointment,
    createAppointment,
  } = useGlobal();
  const { user } = useAuth();

  // Event mapping effect
  useEffect(() => {
    getAppointmetnsForDoctor(user.id);
  }, [user.id]);

  useEffect(() => {
    const mappedEvents = allAppointments?.map((appointment) => ({
      title: `${appointment.patientId.firstName} with Dr. ${appointment.doctorId.name}`,
      start: new Date(appointment.date),
      end: new Date(appointment.appointmentTime),
      allDay: false,
      id: appointment._id,
      appointment,
    }));
    setEvents(mappedEvents || []);
  }, [allAppointments]);

  // Fetch unavailable times
  useEffect(() => {
    const fetchUnavailableTimes = async () => {
      try {
        const response = await apiService.GetUnavailableTimes(user.id);
        const unavailableEvents = response.data.map((unavailable) => ({
          title: unavailable.title || "Unavailable",
          start: moment(
            `${unavailable.date} ${unavailable.timeRange.start}`,
          ).toDate(),
          end: moment(
            `${unavailable.date} ${unavailable.timeRange.end}`,
          ).toDate(),
          allDay: false,
          id: unavailable._id,
          isUnavailable: true,
          reason: unavailable.reason,
        }));
        setUnavailableTimes(unavailableEvents);
      } catch (error) {
        console.error("Error fetching unavailable times:", error);
        toast.error("Error fetching unavailable times.");
      }
    };

    fetchUnavailableTimes();
  }, [user.id]);

  // Modal handlers
  const handleModalState = (modalType, isOpen, data = null) => {
    setModalState((prev) => ({
      ...prev,
      [modalType]: {
        isOpen,
        ...(data && { [modalType === "reschedule" ? "event" : "slot"]: data }),
      },
    }));
  };

  // Event handlers
  const handleSelectEvent = (event) => {
    if (!event.isUnavailable) {
      handleModalState("reschedule", true, event);
    }
  };

  const handleSelectSlot = (slotInfo) => {
    const isUnavailable = unavailableTimes.some(
      (unavailable) =>
        slotInfo.start >= unavailable.start && slotInfo.end <= unavailable.end,
    );

    if (isBlockingMode) {
      handleModalState("timeBlock", true, slotInfo);
    } else if (!isUnavailable) {
      handleModalState("appointment", true, slotInfo);
    } else {
      alert("This time slot is unavailable.");
    }
  };

  // Action handlers
  const handleAddUnavailableTime = async (unavailableTimeData) => {
    try {
      const response = await apiService.AddUnavailableTime(
        user.id,
        unavailableTimeData,
      );
      const newUnavailableEvent = {
        title: unavailableTimeData.title,
        start: moment(
          `${unavailableTimeData.date} ${unavailableTimeData.timeRange.start}`,
        ).toDate(),
        end: moment(
          `${unavailableTimeData.date} ${unavailableTimeData.timeRange.end}`,
        ).toDate(),
        allDay: false,
        id: response.data._id,
        isUnavailable: true,
        reason: unavailableTimeData.reason,
      };
      setUnavailableTimes((prev) => [...prev, newUnavailableEvent]);
      handleModalState("timeBlock", false);
      toast.success("Unavailable time added successfully.");
    } catch (error) {
      console.error("Error adding unavailable time:", error);
      toast.error("Failed to add unavailable time. Please try again.");
    }
  };

  // Handle the rescheduling of an appointment
  const handleRescheduleAppointment = async (updatedAppointment) => {
    try {
      await updateAppointment(updatedAppointment._id, updatedAppointment);
      // Update the events state with the rescheduled data
      const updatedEvents = events.map((event) =>
        event.id === updatedAppointment._id
          ? {
              ...event,
              start: new Date(updatedAppointment.date),
              end: new Date(updatedAppointment.appointmentTime),
            }
          : event,
      );
      setEvents(updatedEvents);
      handleModalState("reschedule", false);
      toast.success("Appointment rescheduled successfully.");
    } catch (error) {
      console.error("Error rescheduling appointment:", error);
      toast.error("Error rescheduling appointment.");
    }
  };

  // Handle the deletion of an appointment
  const handleDeleteAppointment = async (appointmentId) => {
    try {
      await deleteAppointment(appointmentId);
      // Remove the event from the events state
      const updatedEvents = events.filter(
        (event) => event.id !== appointmentId,
      );
      setEvents(updatedEvents);
      handleModalState("reschedule", false);
      toast.success("Appointment deleted successfully.");
    } catch (error) {
      console.error("Error deleting appointment:", error);
      toast.error("Error deleting appointment.");
    }
  };

  // Handle the creation of a new appointment
  const handleCreateAppointment = async (appointmentData) => {
    try {
      await createAppointment(appointmentData);
      // Add the new appointment to the events state
      const newEvent = {
        title: `${appointmentData.patientId.firstName} with Dr. ${appointmentData.doctorId.name}`,
        start: new Date(appointmentData.date),
        end: new Date(appointmentData.appointmentTime),
        allDay: false,
        id: appointmentData._id,
        appointment: appointmentData,
      };
      setEvents([...events, newEvent]);
      handleModalState("appointment", false);
      toast.success("Appointment created successfully.");
    } catch (error) {
      console.error("Error creating appointment:", error);
      toast.error("Error creating appointment.");
    }
  };

  return (
    <div className="bg-[#F6F8FB] p-3 h-[90%]">
      <div className="AppointmentTimeSlot p-6 bg-white rounded-lg shadow-md m-6 h-full">
        <Calendar
          localizer={localizer}
          events={[...events, ...unavailableTimes]}
          startAccessor="start"
          endAccessor="end"
          {...calendarConfig}
          eventPropGetter={eventStyleGetter}
          onSelectEvent={handleSelectEvent}
          onSelectSlot={handleSelectSlot}
        />

        <RescheduleModal
          isOpen={modalState.reschedule.isOpen}
          onClose={() => handleModalState("reschedule", false)}
          onReschedule={handleRescheduleAppointment}
          onDelete={handleDeleteAppointment}
          selectedEvent={modalState.reschedule.event}
        />

        <TimeBlockModal
          isOpen={modalState.timeBlock.isOpen}
          onClose={() => handleModalState("timeBlock", false)}
          onAddUnavailableTime={handleAddUnavailableTime}
          selectedSlot={modalState.timeBlock.slot}
        />
      </div>
    </div>
  );
};

export default AppointmentTimeSlot;
