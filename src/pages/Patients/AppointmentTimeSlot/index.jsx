import moment from "moment";
import { RescheduleAppointmentModal } from "@/components/NHModalComponents/ModalTemplate/ResheduleAppointmentModal";

export const AppointmentTimeSlot = () => {
  return (
    <div className="appointment_time-slot" style={{ height: "100%" }}>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        selectable
        onSelectEvent={handleSelectEvent}
        defaultView="week"
        views={["month", "week", "day"]}
        step={60}
        timeslots={1}
        min={new Date(0, 0, 0, 8, 0, 0)}
        max={new Date(0, 0, 0, 18, 0, 0)}
        eventPropGetter={eventPropGetter}
        components={{
          timeGutterHeader: TimeColumnHeader,
          toolbar: CustomToolbar,
        }}
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
