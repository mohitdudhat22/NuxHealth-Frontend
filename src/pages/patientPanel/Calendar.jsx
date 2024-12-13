import { useState, useEffect } from "react";
import { Calendar as BigCalendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useGlobal } from "../../hooks/useGlobal";
import { useAuth } from "../../hooks/useAuth";
import AppointmentModal from "./AppointmentModal";
import RescheduleModal from "./RescheduleModal";
import PropTypes from "prop-types";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import "../../App.css";

const localizer = momentLocalizer(moment);

const Calendar = ({
  filterData,
  selectedDoctor,
  onDateTimeSelect,
  handlePayment,
}) => {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isRescheduleModalOpen, setIsRescheduleModalOpen] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const {
    createAppointment,
    updateAppointment,
    deleteAppointment,
    allAppointments: allAppointements,
    getAppointmetnsForPatient,
  } = useGlobal();
  const { user } = useAuth();
  console.log(
    user,
    "<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<"
  );
  useEffect(() => {
    getAppointmetnsForPatient(user.id);
  }, [user.id]);

  useEffect(() => {
    const mappedEvents = allAppointements?.map((appointment) => ({
      title: `${appointment.patientId.firstName} with Dr. ${appointment.doctorId?.name}`,
      start: new Date(appointment.date),
      end: new Date(appointment.appointmentTime),
      allDay: false,
      id: appointment._id,
      appointment: appointment, // Store the full appointment data
    }));
    setEvents(mappedEvents);
  }, [allAppointements]);

  const handleSlotSelected = (slotInfo) => {
    setSelectedSlot(slotInfo);
    if (onDateTimeSelect) {
      const date = slotInfo.start;
      const time = slotInfo.start.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      });
      onDateTimeSelect(date, time);
    }
    setIsModalOpen(true);
  };

  const handleEventSelected = (event) => {
    setSelectedEvent(event);
    setIsRescheduleModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedSlot(null);
  };

  const handleCloseRescheduleModal = () => {
    setIsRescheduleModalOpen(false);
    setSelectedEvent(null);
  };
  const handleBookAppointment = async (appointmentData) => {
    try {
      await handlePayment(appointmentData);
      // await createAppointment(user.id, appointmentData, selectedDoctor);
      setEvents([...events, appointmentData]);
      handleCloseModal();
      navigate("/patient/appointment");
    } catch (error) {
      console.error("Error booking appointment:", error);
    }
  };

  const handleRescheduleAppointment = async (updatedAppointment) => {
    try {
      await updateAppointment(updatedAppointment._id, updatedAppointment);
      const updatedEvents = events.map((event) =>
        event.id === updatedAppointment.id
          ? { ...event, ...updatedAppointment }
          : event
      );
      setEvents(updatedEvents);
      handleCloseRescheduleModal();
      toast.success("Appointment rescheduled successfully.");

      if (onDateTimeSelect) {
        const date = new Date(updatedAppointment.date);
        const time = new Date(
          updatedAppointment.appointmentTime
        ).toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        });
        onDateTimeSelect(date, time);
      }
    } catch (error) {
      console.error("Error rescheduling appointment:", error);
      toast.error("Error rescheduling appointment.");
    }
  };

  const handleDeleteAppointment = async (appointmentId) => {
    try {
      await deleteAppointment(appointmentId);
      const updatedEvents = events.filter(
        (event) => event.id !== appointmentId
      );
      setEvents(updatedEvents);
      handleCloseRescheduleModal();
      toast.success("Appointment deleted successfully.");
    } catch (error) {
      console.error("Error deleting appointment:", error);
      toast.error("Error deleting appointment.");
    }
  };

  return (
    <div
      id="Calendar"
      className="container mx-auto new-xxl:p-6 new-xl:p-6 new-lg:p-3 new-sm:h-[1000px] new-lg:h-[490px] new-xl:h-[490px] new-xxl:h-[500px]"
    >
      <BigCalendar
        localizer={localizer}
        events={events}
        views={["month", "week", "day", "agenda"]}
        defaultView="week"
        defaultDate={new Date()}
        selectable
        onSelectSlot={handleSlotSelected}
        onSelectEvent={handleEventSelected}
        className=" bg-white shadow-md rounded-lg p-4"
      />
      <AppointmentModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onBookAppointment={handleBookAppointment}
        selectedSlot={selectedSlot}
        filterData={filterData}
      />
      <RescheduleModal
        isOpen={isRescheduleModalOpen}
        onClose={handleCloseRescheduleModal}
        onReschedule={handleRescheduleAppointment}
        onDelete={handleDeleteAppointment}
        selectedEvent={selectedEvent}
      />
    </div>
  );
};

Calendar.propTypes = {
  filterData: PropTypes.any.isRequired,
  selectedDoctor: PropTypes.any.isRequired,
  onDateTimeSelect: PropTypes.func,
};

export default Calendar;
