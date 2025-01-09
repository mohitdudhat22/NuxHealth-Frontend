import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import moment from "moment";
import "./AppointmentTimeSlot.css";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { RescheduleAppointmentModal } from "@/components/NHModalComponents/ModalTemplate/ResheduleAppointmentModal";
import { useLocation } from "react-router-dom";

export const AppointmentTimeSlot = () => {
  const location = useLocation();
  const selectedAppointment = location.state?.appointment;

  // Convert appointment date and time to a valid Date object
  const getEventDate = (appointment) => {
    if (!appointment) return null;

    const dateString = `${appointment.appointmentDate} ${appointment.appointmentTime}`;
    return moment(dateString, "D MMM, YYYY h:mm A").toDate();
  };

  const [events, setEvents] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState({
    start: selectedAppointment ? getEventDate(selectedAppointment) : null,
    end: selectedAppointment
      ? moment(getEventDate(selectedAppointment)).add(1, "hour").toDate()
      : null,
  });

  useEffect(() => {
    if (selectedAppointment) {
      const newEvent = {
        title: "Rescheduled Appointment",
        start: getEventDate(selectedAppointment),
        end: moment(getEventDate(selectedAppointment)).add(1, "hour").toDate(), // 1-hour duration
      };
      setEvents([newEvent]);
    }
  }, [selectedAppointment]);

  const handleEventClick = (info) => {
    setSelectedSlot({ start: info.event.start, end: info.event.end });
    setIsModalOpen(true);
  };

  const handleModalOk = (date, time) => {
    const eventStart = moment(date)
      .set({
        hour: moment(time, "HH:mm").hour(),
        minute: moment(time, "HH:mm").minute(),
      })
      .toDate();

    const eventEnd = moment(eventStart).add(1, "hour").toDate();

    // Create the new rescheduled event
    const newEvent = {
      title: "Rescheduled Appointment",
      start: eventStart,
      end: eventEnd,
    };

    // Remove the old event (if any)
    const updatedEvents = events.filter(
      (event) => event.start !== selectedSlot.start
    );

    // Add the new event
    setEvents([...updatedEvents, newEvent]);
    setIsModalOpen(false);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const renderEventContent = (eventInfo) => {
    return (
      <div
        style={{
          backgroundColor: "#0EABEB",
          color: "white",
          borderRadius: "4px",
          border: "none",
          padding: "2px 5px",
        }}
      >
        {eventInfo.event.title}
      </div>
    );
  };

  const customButtons = {
    prev: {
      icon: FaArrowLeft,
      click: () => {
        const calendarApi = calendarRef.current.getApi();
        calendarApi.prev();
      },
    },
    next: {
      icon: FaArrowRight,
      click: () => {
        const calendarApi = calendarRef.current.getApi();
        calendarApi.next();
      },
    },
  };

  const calendarRef = React.createRef();

  return (
    <div className="appointment_time-slot" style={{ height: "100%" }}>
      <FullCalendar
        ref={calendarRef}
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="timeGridWeek"
        events={events}
        eventClick={handleEventClick}
        eventContent={renderEventContent}
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
        customButtons={customButtons}
        slotMinTime="08:00:00"
        slotMaxTime="18:00:00"
        allDaySlot={false}
        height="100%"
      />
      <RescheduleAppointmentModal
        handleOk={handleModalOk}
        handleClose={handleModalClose}
        rescheduleAppo={isModalOpen}
        Title="Reschedule Appointment"
        initialDate={selectedSlot.start}
        initialTime={moment(selectedSlot.start).format("HH:mm")}
      />
    </div>
  );
};