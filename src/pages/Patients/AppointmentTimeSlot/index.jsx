import moment from "moment";
import { RescheduleAppointmentModal } from "@/components/NHModalComponents/ModalTemplate/ResheduleAppointmentModal";
import FullCalendar from "@fullcalendar/react";

export const AppointmentTimeSlot = () => {
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