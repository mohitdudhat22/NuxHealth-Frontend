import React, { useRef, useState } from "react";
import moment from "moment";
import { RescheduleAppointmentModal } from "@/components/NHModalComponents/ModalTemplate/ResheduleAppointmentModal";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

export const AppointmentTimeSlot = () => {
  const calendarRef = useRef(null); // Define the calendarRef
  const [events, setEvents] = useState([]); // Example state for events
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState({ start: new Date() });

  const handleEventClick = (info) => {
    setSelectedSlot(info.event.start); // Example logic
    setIsModalOpen(true);
  };

  const renderEventContent = (eventInfo) => (
    <div>
      <b>{eventInfo.timeText}</b> <i>{eventInfo.event.title}</i>
    </div>
  );

  const handleModalOk = () => {
    setIsModalOpen(false);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const customButtons = {
    custom1: {
      text: "Custom Button",
      click: () => alert("Custom button clicked"),
    },
  };

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
